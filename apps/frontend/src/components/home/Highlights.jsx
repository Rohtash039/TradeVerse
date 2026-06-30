import {Activity, Globe, Shield } from "lucide-react";
import "./Features.css"

export default function Highlights(){
    return(
         <section className="section-padding" style={{ marginTop: "-150px" }}>

           <div className="container border-f">
               <div className="elite">

                  <h2 className="heading-elite">Platform <span className="gradient-text">Highlights</span> </h2>
                  <p className="pa">
                     Everything you need to execute your strategy perfectly, 
                     wrapped in a beautiful, intuitive interface.
                  </p>

               </div>

               <div className="elite-div">
                  <div className="glass-card" style={{ padding: "40px" }}>

                     <Globe color="#8b5cf6" size={32} style={{ marginBottom: '16px' }} />
                     <h3 className="elite-group-heading">Multi-device Sync</h3>
                     <p className="text-muted-light elite-group-para">
                        Carry your workspace wherever you go. 
                        Changes persist seamlessly across Web, Desktop, and Mobile setups.
                     </p>

                  </div>

                  <div className="glass-card" style={{ padding: "40px" }}>

                     <Activity color="#0ea5e9" size={32} style={{ marginBottom: '16px' }} />
                     <h3 className="elite-group-heading">API First Approach</h3>
                     <p className="text-muted-light elite-group-para">
                        Connect your custom trading algorithms directly through 
                        our high-throughput REST and WebSocket APIs.
                     </p>

                  </div>

                  <div className="glass-card" style={{ padding: "40px" }}>

                     <Shield color="#10b981" size={32} style={{ marginBottom: '16px' }} />
                     <h3 className="elite-group-heading">Institutional Grade UI</h3>
                     <p className="text-muted-light elite-group-para">
                        Completely customizable dashboard letting you drag, pin, 
                        and optimize components strictly for your workflow.
                     </p>

                  </div>
                  
               </div>
            </div>
        </section>
    );
}