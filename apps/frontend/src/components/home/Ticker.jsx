// Ticker means short name of the stock name of a stock
// assets means Assets are tradable items (stocks, crypto, forex) that have value and can be bought or sold in a trading platform.
import { useState, useEffect } from "react";
import { TrendingUp } from "lucide-react";
import "./Ticker.css"

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

// Static fallback data in case API is unavailable
const FALLBACK_ASSETS = [
    {sym: "BTC/USD", price: "68,432", change: "+2.4%", up: true},
    { sym: 'ETH/USD', price: '3,892.50', change: '+1.1%', up: true },
    { sym: 'SOL/USD', price: '142.11', change: '-0.8%', up: false },
    { sym: 'DOGE/USD', price: '0.42', change: '+3.5%', up: true },
    { sym: 'XRP/USD', price: '0.63', change: '-1.2%', up: false },
    { sym: 'BNB/USD', price: '612.20', change: '+0.5%', up: true }
];

export default function Ticker(){
    const [assets, setAssets] = useState(FALLBACK_ASSETS);

    useEffect(() => {
        async function fetchTickerData() {
            try {
                const res = await fetch(`${API_BASE}/api/market/quotes`);
                if (!res.ok) throw new Error(`API error: ${res.status}`);
                const data = await res.json();
                
                // The API returns { success: true, data: { quotes: [...] } }
                const quotes = data?.data?.quotes;
                if (quotes && quotes.length > 0) {
                    const mapped = quotes.map((coin) => ({
                        sym: `${coin.symbol}/USD`,
                        price: coin.price.toLocaleString('en-US', { 
                            minimumFractionDigits: 2, 
                            maximumFractionDigits: 2 
                        }),
                        change: `${coin.change24h >= 0 ? '+' : ''}${coin.change24h.toFixed(1)}%`,
                        up: coin.change24h >= 0,
                    }));
                    setAssets(mapped);
                }
            } catch (err) {
                // Keep fallback data on error — ticker still renders
                console.warn("Ticker: Could not fetch live data, using fallback.", err.message);
            }
        }

        fetchTickerData();

        // Refresh ticker data every 30 seconds
        const interval = setInterval(fetchTickerData, 30000);
        return () => clearInterval(interval);
    }, []);

    const scrolAssets = [...assets, ...assets, ...assets];

    return(
        <div className="ticker-wrap w-100">
            <div className="ticker-content">
                {scrolAssets.map((item, idx) => (
                    <div key={idx} className="ticker-item">
                        <span>{item.sym}</span>
                        <span>{item.price}</span>
                        <span className={item.up ? "text-success" : "text-danger"}>{item.change}</span>
                        {item.up ? <TrendingUp size={14} className="text-success"/> :
                                <TrendingUp size={14} className="text-danger" style={{transform: "scaleY(-1)"}} />
                        }
                    </div>
                ))}
            </div>
        </div>
    );
}