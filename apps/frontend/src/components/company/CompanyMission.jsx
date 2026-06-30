import "./CompanyMission.css"
import {Target, Eye} from "lucide-react"
export default function CompanyMission(){
    return(
        <div className="company-mission">
            <div className="mission-text">
                <h2>Driven by <span className="gradient-text">Purpose</span></h2>
                <p>
                    Every line of code we write and every market we integrate is guided by a 
                    clear mission and an ambitious vision for the future of decentralized finance.
                </p>
            </div>

            <div className="mission-content">
                <div className="mission-card">
                    <div className="mission-card-icon mission-icon">
                        <Target size={32} color="var(--primary-neon)" />
                    </div>
                    <h2>Our Mission</h2>
                    <p>
                        To eliminate barriers in global trading by providing
                        institutional-grade infrastructure to every individual. We believe
                        that transparent markets, fair pricing, and zero-friction access
                        are fundamental rights — not privileges reserved for Wall Street.
                    </p>
                    <div className="mission-quote">
                        <p>
                            We do not just build software — we build financial equity for
                            the next billion traders entering the global economy.
                        </p>
                    </div>
                </div>
                
                <div className="mission-card">
                    <div className="mission-card-icon eye">
                        <Eye size={32} color="var(--secondary-purple)" />
                    </div>
                    <h2>Our Vision</h2>
                    <p>
                        To become the single global gateway for all tradeable assets —
                        equities, crypto, commodities, and forex — unified under one
                        platform, one wallet, and one seamless experience accessible from
                        any device, anywhere on Earth.
                    </p>
                    <div className="mission-quote">
                        <p>
                            A world where geography, wealth, and background never limit your
                            ability to participate in the financial markets.
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
}