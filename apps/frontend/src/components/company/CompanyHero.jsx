import "./CompanyHero.css"
import { ArrowRight } from "lucide-react";

export default function CompanyHero(){

    const milestones = [
        { year: '2021', label: 'Founded' },
        { year: '2022', label: 'Series A · $40M' },
        { year: '2023', label: '1M+ Active Users' },
        { year: '2024', label: 'Global Expansion' },
        { year: '2025', label: '$50B+ Volume' },
    ];

    return(
        <div className="company-hero">

            <div className="company-hero-span">
                <div className="company-dot"></div>
                <span>
                    About TradeVerse
                </span>
            </div>

            <h3 className="company-hero-head">
                Building the Future of <br />
                <span className="gradient-text">Global Finance</span>
            </h3>

            <p className="company-hero-para">
                We are a team of engineers, traders, and visionaries 
                united by a single mission — to democratize access to 
                institutional-grade trading technology for everyone, everywhere.
            </p>

            <div className="hero-milestone">
                {milestones.map((items, i) => (
                    <div className="milestones" key={i}>
                        <span>{items.year}</span>
                        <div className="milestone-dot"></div>
                        <p>{items.label}</p>
                    </div>
                ))}
            </div>
     
        </div>
    );
}