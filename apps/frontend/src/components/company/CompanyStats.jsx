import "./CompanyStats.css"
import { BarChart2, Users, TrendingUp, Clock } from "lucide-react";
export default function CompanyStats(){
    const stats = [
        {
            icon: <BarChart2 size={28} color="var(--primary-neon)" />,
            value: '$50B+',
            label: 'Quarterly Volume',
        },
        {
            icon: <Users size={28} color="var(--secondary-purple)" />,
            value: '2M+',
            label: 'Active Traders',
        },
        {
            icon: <TrendingUp size={28} color="var(--success)" />,
            value: '350+',
            label: 'Tradeable Markets',
        },
        {
            icon: <Clock size={28} color="#f59e0b" />,
            value: '99.99%',
            label: 'Platform Uptime',
        },
    ];
    return(
        <div className="company-stats">
            <div className="company-stats-content">
                <h2>Numbers That <span className="gradient-text">Speak</span></h2>
                <p>
                    Our growth is a reflection of the trust 
                    millions of traders place in us every single day.
                </p>
            </div>

            <div className="stats-visual">
                {stats.map((items, i) => (
                    <div className="stats-visual-content">
                        <div className="stats-visual-icon">{items.icon}</div>
                        <h2 className="gradient-text">{items.value}</h2>
                        <p>{items.label}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}