import { CheckCircle, BarChart2 } from "lucide-react";
import "./Benifits.css";

export default function Benifits() {
  return (
    <section className="section-padding">
      <div className="container cont-ben">
        <div className="content-ben">
          <h2 className="heading-ben">
            Master the markets with <br />
            <span className="gradient-text">Advanced Tools</span>
          </h2>
          <p className="para-ben">
            Built for the modern trader, TradeVerse provides an arsenal of
            analytical capabilities to find the right edge.
          </p>

          <div className="main-ben">
            <div className="main-content-ben">
              <CheckCircle
                color="var(--success)"
                size={24}
                className="circle-ben"
              />
              <p>
                <strong className="strong-ben">Real-time Analytics</strong>
                Stream market data straight to your personalized dashboard with
                zero latency.
              </p>
            </div>
            <div className="main-content-ben">
              <CheckCircle
                color="var(--success)"
                size={24}
                className="circle-ben"
              />
              <p>
                <strong className="strong-ben">Zero Hidden Fees</strong>
                Transparent pricing structures meant for scalpers and day
                traders.
              </p>
            </div>
            <div className="main-content-ben">
              <CheckCircle
                color="var(--success)"
                size={24}
                className="circle-ben"
              />
              <p>
                <strong className="strong-ben">Global Assets</strong>Access
                equities, crypto, forex, and commodities from one unified
                wallet.
              </p>
            </div>
          </div>
        </div>

        <div className="main-secd-ben glass-card">
           <img src="benifit.png" alt="" className="benifit-image"/>
        </div>
      </div>
    </section>
  );
}
