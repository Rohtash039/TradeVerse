import "./TradeStats.css"

export default function TradeStats(){
    const stats = [
        { label: "24h Volume", value: "$12.4B+" },
        { label: "Supported Markets", value: "350+" },
        { label: "Order Execution", value: "< 2ms" },
        { label: "Active Traders", value: "2M+" }
    ];
    return(
        <div className="stats-main">
            {stats.map((item, i) => (
                <div key={i} className="stats-div">
                    <span className="stat-value gradient-text">{item.value}</span>
                    <span>{item.label}</span>
                </div>
            ))}
        </div>
    );
}