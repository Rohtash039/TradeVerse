import "./TradeSteps.css"

export default function TradeSteps(){
    const steps = [
        { num: "01", title: "Create Account", desc: "Sign up in minutes with our streamlined verification process." },
        { num: "02", title: "Fund Wallet", desc: "Deposit crypto or fiat instantly using multiple payment methods." },
        { num: "03", title: "Start Trading", desc: "Access the markets and execute your first trade with zero fees." }
    ];

    return(
        <div className="steps-main">
            <h1 className="step-head">How to begin</h1>
            <div className="step-content">
                {steps.map((items, i) => (
                        <div className="step-text" key={i}>
                            <span className="step-circle">{items.num}</span>
                            <h3>{items.title}</h3>
                            <p>{items.desc}</p>
                        </div>
                ))}
            </div>
        </div>
    );
}