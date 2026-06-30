import "./FeatureCards.css"
import {Zap, BarChart2, Shield, Globe, Lock, Smartphone} from "lucide-react"

export default function FeatureCards(){
    const features = [
        {
            icon: <Zap size={24} />,
            title: 'Lightning Execution',
            description: 'Experience sub-millisecond trade execution speeds powered by our institutional-grade matching engine.'
        },
        {
            icon: <BarChart2 size={24} />,
            title: 'Advanced Charting',
            description: 'Analyze markets with 100+ technical indicators, drawing tools, and real-time customizable chart layouts.'
        },
        {
            icon: <Shield size={24} />,
            title: 'Bank-Grade Security',
            description: 'Your assets are protected by cold storage, multi-signature wallets, and rigorous security audits.'
        },
        {
            icon: <Globe size={24} />,
            title: 'Global Markets',
            description: 'Access thousands of markets across crypto, forex, commodities, and indices from a single account.'
        },
        {
            icon: <Lock size={24} />,
            title: 'Deep Liquidity',
            description: 'Trade with minimal slippage thanks to aggregated liquidity from top-tier providers and indices from a single account.'
        },
        {
            icon: <Smartphone size={24} />,
            title: 'Mobile Power',
            description: 'Never miss an opportunity with our fully-featured mobile app designed for traders on the go.'
        }
    ]; 
    return(
        <div className="feature-card">
            <h3 className="feature-card-head">Platform <span className="gradient-text">Highlights</span></h3>
            <p className="feature-card-para">
                Everything you need to master the markets, 
                built into one seamless interface.
            </p>

            <div className="feature-card-content">
                {features.map((items, i) => (
                    <div className="feature-card-item" key={i}>
                        <div className="feature-card-icon">{items.icon}</div>
                        <h3 className="feature-card-heads">{items.title}</h3>
                        <p className="feature-card-paras">{items.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}