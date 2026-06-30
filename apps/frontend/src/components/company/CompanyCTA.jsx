import "./CompanyCTA.css"
import { ArrowRight, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CompanyCTA(){
    const navigate = useNavigate();
    const trustItems = [
        'No credit card required',
        'Free demo account',
        '24/7 live support',
        'SOC 2 certified',
    ];
    return(
        <div className="company-start">
            <div className="company-start-content">
                <h2>Ready to Trade with <span className="gradient-text">TradeVerse</span>?</h2>
                <p>
                    Join over 2 million traders who trust our platform for 
                    institutional-grade execution, transparent pricing, and 24/7 expert support.
                </p>
            </div>

            <div className="trade-btns" style={{marginTop: "10px", marginBottom: "60px"}}>
                <button onClick={() => navigate("/signup")} className="btn-primary trade-prime platform-button platform-button-primary">Create Free Account <ArrowRight size={20} /></button>
                <button onClick={() => navigate("/login")} className="btn-secondary trade-secd platform-button platform-button-secondary"> Contact Sales </button>
            </div>

            <div className="company-start-row">
                {trustItems.map((items, i) => (
                    <div className="company-start-items"  key={i}>
                        <span className="start-icon">
                            <Check size={12} color="var(--success)" />
                        </span>
                        <p>{items}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}