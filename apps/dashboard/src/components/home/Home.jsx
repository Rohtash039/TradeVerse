import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PortfolioOverview from "./component/PortfolioOverview";
import Positions from "./component/Positions";
import QuickExecute from "./component/QuickExecute";
import Sidebar from "./component/Sidebar";
import Topbar from "./component/Topbar";
import TradingChart from "./component/TradingChart";
import Watchlist from "./component/Watchlist";
import "./Home.css";
import PortfolioPage from "./component/portfolio/PortfolioPage";
import MarketsPage from "./component/markets/MarketsPage";
import NewsFeed from "./component/Newsfeed/NewsFeed";
import NewsView from "./component/News/NewsView";
import ProfilePage from "./component/profile/ProfilePage";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import { getCurrentUser, getPortfolio, getWatchlist, syncUser } from "../../utils/api";

export default function Home() {
  const [activePage, setActivePage] = useState("trade");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState("BINANCE:BTCUSDT");
  const [selectedCoinId, setSelectedCoinId] = useState("bitcoin");

  const [balance, setBalance] = useState(10000);
  const [positions, setPositions] = useState([]);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [tradeHistory, setTradeHistory] = useState([]);
  const [watchlist, setWatchlist] = useState([
    "bitcoin", "ethereum", "solana", "ripple", "dogecoin",
    "binancecoin", "cardano", "avalanche-2", "render-token",
    "fetch-ai", "pepe", "chainlink",
  ]);
  
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!sidebarOpen) return;

    const scrollY = window.scrollY;
    document.body.classList.add("drawer-scroll-lock");
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";

    return () => {
      document.body.classList.remove("drawer-scroll-lock");
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      window.scrollTo(0, scrollY);
    };
  }, [sidebarOpen]);

  const fetchAllUserData = async () => {
    try {
      setLoading(true);
      const [portfolioRes, watchlistRes] = await Promise.all([
        getPortfolio(),
        getWatchlist(),
      ]);

      if (portfolioRes.success && portfolioRes.portfolio) {
        setBalance(portfolioRes.portfolio.balance || 10000);
        setPositions(portfolioRes.portfolio.holdings || []);
      }
      if (watchlistRes.success && watchlistRes.symbols) {
        setWatchlist(watchlistRes.symbols);
      }
    } catch (err) {
      setError(err.message);
      console.error("Error fetching user data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        setUser(authUser);
        try {
          await syncUser();
          await fetchAllUserData();
        } catch (err) {
          console.error("Auth sync / load error:", err);
          setError(err.message);
        }
      } else {
        try {
          const response = await getCurrentUser();
          setUser(response.user);
          await fetchAllUserData();
        } catch (err) {
          setUser(null);
          const configuredUrl = import.meta.env.VITE_FRONTEND_URL;
          let frontendBaseUrl;
          if (configuredUrl) {
            frontendBaseUrl = configuredUrl;
          } else {
            const { protocol, hostname, port } = window.location;
            const frontendPort = port === '5174' ? '5173' : port === '3001' ? '3000' : port;
            frontendBaseUrl = `${protocol}//${hostname}${frontendPort ? `:${frontendPort}` : ''}/`;
          }
          const cleanBaseUrl = frontendBaseUrl.endsWith("/") ? frontendBaseUrl : `${frontendBaseUrl}/`;
          window.location.href = `${cleanBaseUrl}login`;
        }
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const saveUserData = async () => {
    // Legacy helper: Trades/watchlist updates are now handled server-side.
    // We fetch fresh data from the server instead.
    await fetchAllUserData();
  };

  const handleNavigate = (pageId) => {
    setActivePage(pageId);
    setSidebarOpen(false);
  };

  return (
    <div className={`home ${sidebarOpen ? "home-sidebar-open" : ""}`}>
      <Sidebar activeId={activePage} onNavigate={handleNavigate} isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <button
        type="button"
        className="home-sidebar-backdrop"
        aria-label="Close navigation"
        onClick={() => setSidebarOpen(false)}
      />
      <Topbar balanceValue={balance} onMenuClick={() => setSidebarOpen(true)} />

      {activePage === "trade" && (
        <>
          <main className="home-main">
            <PortfolioOverview
              balance={balance}
              positions={positions}
              currentPrice={currentPrice}
            />
            <Watchlist
              onSelectAsset={(asset) => {
                setSelectedCoin(`BINANCE:${asset.symbol}USDT`);
                setSelectedCoinId(asset.id);
                setCurrentPrice(asset.price);
              }}
              watchlist={watchlist}
              setWatchlist={setWatchlist}
            />
          </main>

          <div className="home-right-content-wrapper">
            <div className="home-top-row">
              <div className="home-center-col">
                <TradingChart
                  selectedCoin={selectedCoin}
                  selectedCoinId={selectedCoinId}
                  setCurrentPrice={setCurrentPrice}
                />
              </div>

              <div className="home-right-col">
                <QuickExecute
                  balance={balance}
                  setBalance={setBalance}
                  positions={positions}
                  setPositions={setPositions}
                  selectedCoin={selectedCoin}
                  currentPrice={currentPrice}
                  tradeHistory={tradeHistory}
                  setTradeHistory={setTradeHistory}
                  saveUserData={saveUserData}
                  watchlist={watchlist}
                />
              </div>
            </div>
           {/* <div className="home-bottom-row">
              <Positions
                positions={positions}
                currentPrice={currentPrice}
                setPositions={setPositions}
                balance={balance}
                setBalance={setBalance}
                tradeHistory={tradeHistory}
                setTradeHistory={setTradeHistory}
                saveUserData={saveUserData}
                watchlist={watchlist}
              />
              <NewsFeed />
            </div>*/}
          </div>
        </>
      )}

      {activePage == "portfolio" && <PortfolioPage />}
      {activePage == "markets" && <MarketsPage onNavigate={setActivePage} />}
      {activePage === "news" && <NewsView />}
      {activePage === "settings" && <ProfilePage user={user} />}
    </div>
  );
}











