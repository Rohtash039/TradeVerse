import { Sparkles, ArrowRight } from "lucide-react";
import "./FeatureHero.css"

export default function FeatureHero(){
    return(
        <div className="feature-hero">
            <div className="feature-span">
                <Sparkles size={16} />
                <span style={{color: "var(--primary-neon)"}}>Next-Generation Platform</span>
            </div>

            <h3 className="feature-head">
                Trading Capabilities <br /><span className="gradient-text">Redefined</span>
            </h3>

            <p className="feature-para">
                Experience ultra-low latency execution, advanced charting tools, 
                and institutional-grade security. Built for traders who demand the best.
            </p>
            
        </div>
    );
}