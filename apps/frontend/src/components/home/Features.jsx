import { Zap, Shield, TrendingUp } from "lucide-react";
import "./Features.css"

export default function Features() {
  return (
    <section className="section-padding">

      <div className="container border-f">

        <div className="elite">
          <h2 className="heading-elite">
            Engineered for <span className="gradient-text">Elites</span>
          </h2>
          <p className="text-muted-light pa">
            Our matching engine handles millions of operations with zero
            downtime.
          </p>

        </div>

        <div className="elite-div">

          <div className="glass-card" style={{ padding: "40px" }}>

            <div className="elite-group">
              <Zap color="#0ea5e9" size={32} />
            </div>

            <h3 className="elite-group-heading">Hyper Execution</h3>
            <p className="text-muted-light elite-group-para">
              Skip the wait. Our distributed node network guarantees your order
              hits the book in milliseconds.
            </p>

          </div>

          <div className="glass-card" style={{ padding: "40px" }}>

            <div className="elite-group">
              <Shield color="#8b5cf6" size={32} />
            </div>

            <h3 className="elite-group-heading">Ironclad Security</h3>
            <p className="text-muted-light elite-group-para">
              Cold storage architecture combined with multi-signature validation
              keeps your assets untouchable.
            </p>

          </div>

          <div className="glass-card" style={{ padding: "40px" }}>

            <div className="elite-group">
              <TrendingUp color="#10b981" size={32} />
            </div>

            <h3 className="elite-group-heading">Deep Liquidity</h3>
            <p className="text-muted-light elite-group-para">
              Trade any size with confidence. Our aggregated liquidity pools
              ensure minimal slippage on large blocks.
            </p>

          </div>

        </div>

      </div>

    </section>
  );
}
