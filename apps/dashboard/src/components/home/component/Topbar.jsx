import { useState } from "react";
import "./Topbar.css"
import {Bell, Eye, EyeOff, Search, Wallet} from "lucide-react"
export default function Topbar({ balanceValue = 10000 }) {
    const [showBalance, setShowBalance] = useState(true);
    const formatted = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(balanceValue);

    return(
        <header className="topbar">
            <div className="topbar-left">
                <div className="topbar-brand">
                    Trade <span className="topbar-brand-accent">Verse</span>
                    <span className="topbar-pro">PRO</span>
                </div>
            

                {/* <div className="topbar-separator" /> */}

                {/* <div className="topbar-search" role="button" tabIndex={0}>
                    <Search size={15} className="topbar-search-icon" />
                    <span className="topbar-search-text">Search markets...</span>
                    <div className="topbar-search-kbd">
                        <kbd>⌘</kbd>
                        <kbd>K</kbd>
                    </div>
                </div> */}
            </div>


            <div className="topbar-right">
                <div className="topbar-wallet" onClick={()=> setShowBalance(!showBalance)}>
                    <Wallet size={16} className="topbar-wallet-icon" />
                    <span className={`topbar-wallet-value mono ${!showBalance ? 'topbar-wallet-value-hidden': ''}`}>
                        {showBalance ? formatted : '••••••'}
                    </span>
                    <span className="topbar-wallet-toggle">
                        {showBalance ? <Eye size={14} /> : <EyeOff size={14} />}
                    </span> 
                </div>

                <div className="topbar-status">
                    <span className="topbar-status-dot" />
                    <span>Operational</span>
                </div>

                <button className="topbar-icon-btn">
                    <Bell size={18} />
                    <span className="topbar-icon-btn-badge" />
                </button>
            </div>
        </header>
    );
}