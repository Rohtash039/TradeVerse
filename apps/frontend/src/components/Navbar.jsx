import { Activity } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";


export default function Navbar() {
  const navigate = useNavigate();

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
          <div className="tabs">

            <NavLink to="/markets" className="dec"> <span>Markets</span> </NavLink>
            <NavLink to="/trade" className="dec"> <span>Trade</span> </NavLink> 
            <NavLink to="/features" className="dec"> <span>Features</span> </NavLink> 
            <NavLink to="/company" className="dec"> <span>Company</span> </NavLink>

          </div>
          <div className="btns">

            <button onClick={loginfun} id="login-btn" className="btn-secondary">Log In</button>
            <button onClick={() => navigate("/signup")} className="btn-primary">Get Started</button>

          </div>
        </div>
      </nav>
    </div>
  );
}
