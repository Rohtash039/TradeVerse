import  "./CompanyAbout.css"
import {Globe, Shield, Zap} from "lucide-react"

export default function CompanyAbout(){
    const values = [
        {
            icon: <Globe size={24} color="var(--primary-neon)" />,
            colorClass: 'cyan',
            title: 'Global-First Infrastructure',
            desc: 'Co-located servers in 12 financial hubs ensure sub-millisecond access for traders worldwide.',
        },
        {
            icon: <Shield size={24} color="var(--secondary-purple)" />,
            colorClass: 'purple',
            title: 'Regulatory Compliance',
            desc: 'Licensed and regulated across multiple jurisdictions, adhering to the highest standards of financial governance.',
        },
        {
            icon: <Zap size={24} color="var(--success)" />,
            colorClass: 'green',
            title: 'Relentless Innovation',
            desc: 'Our R&D team ships new features every sprint — from AI-driven alerts to cross-chain settlement.',
        },
    ];

    return(
        <div className="company-about">
            <div className="company-about-info1">
                <p className="info1-about">WHO WE ARE</p>
                <h3>A fintech company redefining 
                    <span className="gradient-text"> how the world trades</span>
                </h3>
                <p className="about-info1-para">
                    Founded in 2021 in Singapore, TradeVerse was born from the belief that 
                    every trader — from a student placing their first order to a hedge 
                    fund managing billions — deserves access to lightning-fast, reliable, 
                    and transparent markets.
                </p>
                <p className="about-info1-para">
                    Today we serve over 2 million active users across 180 countries, 
                    processing more than $50 billion in quarterly volume through our 
                    proprietary matching engine.
                </p>

                <div className="about-highlights">
                    <div className="about-highlights-item">
                        <h3 className="gradient-text">180+</h3>
                        <p>Countries</p>
                    </div>
                    <div className="about-highlights-item">
                        <h3 className="gradient-text">350+</h3>
                        <p>MARKETS</p>
                    </div>
                    <div className="about-highlights-item">
                        <h3 className="gradient-text">99.99%</h3>
                        <p>UPTIME</p>
                    </div>
                </div>
            </div>
            <div className="company-about-info2">
                {values.map((items, i) => (
                    <div className="about-values" key={i}>
                        <div className="about-icons">{items.icon}</div>
                         <div className="about-values-content">
                            <h2>{items.title}</h2>
                            <p>{items.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}