import { useEffect, useState } from "react";
import { Activity } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";


export default function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;

    const scrollY = window.scrollY;
    document.body.classList.add("nav-scroll-lock");
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";

    return () => {
      document.body.classList.remove("nav-scroll-lock");
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      window.scrollTo(0, scrollY);
    };
  }, [menuOpen]);

  const loginfun = () => {
    navigate("/login");
  };

  return (
    <div>

      <div className="bg-blobs">
        <div className="blob-1"></div>
        <div className="blob-2"></div>
      </div>
      
      <nav className="glass-nav">
        <div className="container item">
          <div className="icon">

            <Activity color="#00f0ff" size={28} />
            <h2>
              <Link to="/" className="dec" style={{color: "white"}}>
                Trade<span className="gradient-text">Verse</span> 
              </Link>
            </h2>

          </div>
          <div className={`tabs ${menuOpen ? "open" : ""}`}>

            <NavLink to="/markets" className="dec" onClick={() => setMenuOpen(false)}> <span>Markets</span> </NavLink>
            <NavLink to="/trade" className="dec" onClick={() => setMenuOpen(false)}> <span>Trade</span> </NavLink> 
            <NavLink to="/features" className="dec" onClick={() => setMenuOpen(false)}> <span>Features</span> </NavLink> 
            <NavLink to="/company" className="dec" onClick={() => setMenuOpen(false)}> <span>Company</span> </NavLink>

          </div>
          <div className={`btns ${menuOpen ? "open" : ""}`}>

            <button onClick={() => { loginfun(); setMenuOpen(false); }} id="login-btn" className="btn-secondary">Log In</button>
            <button onClick={() => { navigate("/signup"); setMenuOpen(false); }} className="btn-primary">Get Started</button>

          </div>
          <button className={`hamburger ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" aria-expanded={menuOpen}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>
    </div>
  );
}




