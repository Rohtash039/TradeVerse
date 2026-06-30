import { Activity } from "lucide-react";
import { FaXTwitter, FaLinkedin, FaGithub } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import "./Footer.css"
import { useFlash } from "../context/FlashContext";

export default function Footer(){
    const navigate = useNavigate();
    const { showFlash } = useFlash();

    const handleSubscribe = () => {
      showFlash("You're subscribed! We hope you enjoy being with us.", "success");
      setTimeout(() => {
        navigate("/signup");
      }, 1500);
    };


    return(
        <footer className="main-footer">
          <div className="container">
            <div className="main-footer-div">

              <div>
                
                <div className="activity-div">
                  <Activity color="var(--primary-neon)" size={28} />
                  <h4 className="activity-heading">
                    Trade
                    <span className="gradient-text">Verse</span>
                  </h4>
                </div>

                <p className="footer-content">
                  The next generation platform for global multi-asset trading. 
                  Empowering both retail and institutional traders 
                  with high speed execution.
                </p>

                <div className="icons-div">

                  <div className="footer-icons"><FaXTwitter size={18} color="white"/></div>
                  <div className="footer-icons"><FaLinkedin size={18} color="white"/></div>
                  <div className="footer-icons"><FaGithub size={18} color="white"/></div>

                </div>

              </div>
              
              <div>
                <h5 className="description">Platform</h5>
                <a href="#" className="footer-link">Trading Dashboard</a>
                <a href="#" className="footer-link">Market Data</a>
                <a href="#" className="footer-link">Margin Trading</a>
                <a href="#" className="footer-link">API Access</a>
              </div>

              <div>
                <h5 className="description">Company</h5>
                <a href="#" className="footer-link">About Us</a>
                <a href="#" className="footer-link">Careers</a>
                <a href="#" className="footer-link">Security</a>
                <a href="#" className="footer-link">Contact Support</a>
              </div>

              <div>

                <h5 className="description">Newsletter</h5>
                <p className="news-para">
                  Subscribe to get market insights 
                  and platform updates directly to your inbox.
                </p>

                <div className="news-input-div">
                  <input type="email" placeholder="Email address" className="news-input" />
                  <button
                    type="button"
                    className="btn-primary platform-button platform-button-primary"
                    onClick={handleSubscribe}
                  >
                    Subscribe
                  </button>
                </div>

              </div>

            </div>
            
            <div className="privacy-div">
              <p className="copy">&copy; 2026 TradeVerse Inc. All rights reserved.</p>

              <div className="icons-div">
                <a href="#" className="copy">Privacy Policy</a>
                <a href="#" className="copy">Terms of Service</a>
                <a href="#" className="copy">Legal</a>
              </div>
              
            </div>

          </div>

        </footer>
    );
}