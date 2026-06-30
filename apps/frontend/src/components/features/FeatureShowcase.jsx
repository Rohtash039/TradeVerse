import "./FeatureShowcase.css"

export default function FeatureShowcase(){
    return(
        <div className="show-case">
            <div className="show-case-content">
                <h3>
                    Visualizing
                    <br /> <span className="gradient-text">Market Data</span>
                </h3>
                <p>
                    Our proprietary charting engine provides crystal
                    clear representation of complex market movements. 
                    Spot trends instantly and make data-driven decisions with confidence.
                </p>
                <ul>
                    <li><div className="list-dot"></div> Built-in Volume Profile</li>
                    <li><div className="list-dot"></div> Multi-timeframe Analysis</li>
                    <li><div className="list-dot"></div> Custom Alert Triggers</li>
                </ul>
            </div>

            <div className="show-case-img">
                <img src="show.png" alt="" />
            </div>
        </div>
    );
}