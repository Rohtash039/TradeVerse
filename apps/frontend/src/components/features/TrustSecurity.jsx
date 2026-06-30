import { ShieldCheck, Lock, Award } from "lucide-react";
import "./TrustSecurity.css"

export default function TrustSecurity(){
    return(
        <div className="container">
            <div className="trust-secr-content">
                <ShieldCheck className="trust-main-icon" size={48}/>
                <h3 className="trust-head">
                    Institutional Grade <span className="gradient-text">Security</span>
                </h3>
                <p className="trust-para">
                    We employ the highest standards of security, 
                    compliance, and asset protection.
                </p>
            </div>

            <div className="trust-box">
                <div className="trust-item">
                    <Lock className="trust-icon" size={32}/>
                    <h3>Cold Storage</h3>
                    <p>98% of user assets are stored offline in geographically distributed cold wallets.</p>
                </div>

                <div className="trust-item">
                    <Award className="trust-icon" size={32}/>
                    <h3>Regulatory Compliance</h3>
                    <p>Fully compliant with global regulatory frameworks and financial standards.</p>
                </div>

                <div className="trust-item">
                    <ShieldCheck className="trust-icon" size={32}/>
                    <h3>24/7 Monitoring</h3>
                    <p>Continuous threat detection and automated risk management systems.</p>
                </div>
            </div>
        </div>
    );
}