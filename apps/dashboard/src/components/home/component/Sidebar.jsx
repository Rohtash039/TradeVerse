import "./Sidebar.css"
import {LineChart, Briefcase, BarChart3, Newspaper, Settings, Layers, LogOut } from "lucide-react"
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase";
import { clearSession } from "../../../utils/api";

export default function Sidebar({activeId, onNavigate, isOpen = false}){
    const getFrontendHomeUrl = () => {
        const configuredUrl = import.meta.env.VITE_FRONTEND_URL;

        if (configuredUrl) {
            return configuredUrl;
        }

        const { protocol, hostname, port } = window.location;
        const frontendPort = port === '5174' ? '5173' : port === '3001' ? '3000' : port;

        return `${protocol}//${hostname}${frontendPort ? `:${frontendPort}` : ''}/`;
    };

    const goToFrontendHome = async () => {
        try {
            await clearSession();
            await signOut(auth);
        } catch (error) {
            console.error("Error signing out:", error);
        } finally {
            window.location.href = getFrontendHomeUrl();
        }
    };

    const nav_items = [
        { id: 'trade', icon: LineChart, label: 'Trade', active: true },
        { id: 'portfolio', icon: Briefcase, label: 'Portfolio' },
        { id: 'markets', icon: BarChart3, label: 'Markets' },
        { id: 'news', icon: Newspaper, label: 'News' },
    ];

    const bottom_items = [
        { id: 'settings', icon: Settings, label: 'Settings' },
    ];

    return(
        <aside className={`sidebar ${isOpen ? "sidebar-open" : ""}`}>
            <div className="sidebar-logo" onClick={() => onNavigate('trade')}>
                <Layers size={20} />   
            </div>

            <nav className="sidebar-nav">
                {nav_items.map((items) => (
                    <button 
                    key={items.id}
                    className={`sidebar-link ${activeId==items.id ? 'sidebar-link-active': ''}`}
                    onClick={() => onNavigate(items.id)}
                    >
                        <items.icon size={20} />
                        <span className="sidebar-nav-span">{items.label}</span>
                    </button>
                ))}
            </nav>

            <div className="sidebar-divider"></div>

            <div className="sidebar-bottom">
                {bottom_items.map((items) => (
                    <button 
                    key={items.id}
                    className={`sidebar-link ${activeId==items.id ? 'sidebar-link-active': ''}`}
                    onClick={() => onNavigate(items.id)}
                    >
                        <items.icon size={20} />
                        <span className="sidebar-nav-span">{items.label}</span>
                    </button>
                ))}
            </div>

            <button
                type="button"
                className="sidebar-avatar"
                onClick={goToFrontendHome}
            >
                <LogOut size={18} strokeWidth={2} />
                <span className="sidebar-nav-span">Logout</span>
            </button>
        </aside>
    );
}


