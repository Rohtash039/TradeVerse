import "./TradeHero.css"
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function TradeHero(){
    const navigate = useNavigate();
    return(
        <div className="trade-hero">
            <div className="trade-span">
                <span>Bulit for Professionals</span>
            </div>

            <div className="trade-hero-content">
                <h1 className="trade-heading">
                    Unleash Your <span className="gradient-text">Trading Potential</span>
                </h1>
                <p className="trade-para">
                    Access deep liquidity pools, advanced charting mechanics, and 
                    lightning-fast execution speeds designed to give you 
                    the competitive edge in the global market.
                </p>
            </div>

            <div className="trade-btns">
                <button onClick={() => navigate("/signup")} className="btn-primary trade-prime platform-button platform-button-primary">Start Trading <ArrowRight size={20} /></button>
                <button onClick={() => navigate("/")} className="btn-secondary trade-secd platform-button platform-button-secondary"> Explore Platform</button>
            </div>
        </div>
    );
}