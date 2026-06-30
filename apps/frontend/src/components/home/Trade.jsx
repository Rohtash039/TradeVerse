import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./Trade.css"

export default function Trade() {
  const navigate = useNavigate();
  return (
    <section className="container sec">
      <div className="trade">

        <div className="op" >
          <span className="dot"></span>
          <span className="system"> Systems Operational </span>
        </div>

        <h1 className="heading"> Trade the Future with <br />
            <span className="gradient-text">Absolute Precision</span>
        </h1>
        <p className="para">
          Experience lightning-fast execution, military-grade security, and an
          interface so advanced it feels like tomorrow. Start your journey into
          seamless multi-asset trading.
        </p>

        <div className="btns">
          <button onClick={() => navigate("/signup")} className="btn-primary prime platform-button platform-button-primary">Open Account <ArrowRight size={20} /></button>
          <button onClick={() => navigate("/markets")} className="btn-secondary secd platform-button platform-button-secondary"> View Markets</button>
        </div>

        <div className="quality">
          <div>
            <h4 className="custom-text">$50B+</h4>
            <p className="custom-para">Quarterly Volume</p>
          </div>

          <div>
            <h4 className="custom-text">0.01ms</h4>
            <p className="custom-para">Execution Speed</p>
          </div>

          <div>
            <h4 className="custom-text">24/7</h4>
            <p className="custom-para">Expert Support</p>
          </div>

        </div>

      </div>

      <div className="graphic">
        <div className="graphic-box"></div>
        <img src="hero-graphic.png" alt="Trading Dashboard visualization" className="graphic-img"/>
      </div>
      
    </section>
  );
}
