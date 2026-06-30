import "./TradeStart.css"
import {ArrowRight} from "lucide-react"
import { useNavigate } from "react-router-dom";

export default function TradeStart(){
    const navigate = useNavigate();
    return(
        <div className="container trade-start">
            <div className="glass-card trade-card">
                <h3>Ready to get started?</h3>
                <p>Join millions of users accessing global markets instantly.</p>
                <div className="trade-card-btns">
                    <button onClick={() => navigate("/signup")} className="btn-primary platform-button platform-button-primary">Create Free Account <ArrowRight size={20} /></button>
                    <button onClick={() => navigate("/login")} className="btn-secondary">Log In</button>
                </div>
            </div>
        </div>
    );
}