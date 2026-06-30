import "./TradeFeatures.css"
import { TrendingUp, Crosshair, Lock } from "lucide-react";

export default function TradeFeatures(){
    const blocks = [
        {
            title: "Advanced Charting Engine",
            description: "Analyze the markets with pinpoint accuracy. Utilize over 100+ technical indicators, drawing tools, and real-time tick-by-tick data to identify your next big move.",
            icon: <TrendingUp size={32} color="var(--primary-neon)" />,
            img: "engine.png"
        },
        {
            title: "Tactical Order Types",
            description: "Take control of your entries and exits using complex stop-loss, take-profit, trailing stops, and post-only conditions. We give you the tools to trade your definitive plan.",
            icon: <Crosshair size={32} color="var(--secondary-purple)" />,
            img: "sell.png"
        },
        {
            title: "Margin & Leverage",
            description: "Amplify your purchasing power with up to 100x leverage on select pairs. Comprehensive risk engine prevents negative balances and manages liquidations safely.",
            icon: <Lock size={32} color="var(--success)" />,
            img: "margin.png"
        }
    ];

    return(
        <div className="container feature-main">
            {blocks.map((items, i) => (
                <div key={i} className={`feature-content ${i % 2 !== 0 ? 'reversed' : ''}`}>
    
                    <div className="feature-text">
                        <div className="feature-icon">{items.icon}</div>
                        <h3 className="feature-head">{items.title}</h3>
                        <p className="feature-desc">{items.description}</p>
                    </div>

                    <div className="feature-image-wrapper">
                        <img src={items.img} alt="" className="feature-image"/>
                    </div>

                </div>
            ))}
        </div>
    );
}