import { Star } from "lucide-react";
import "./Testimonials.css"

export default function Testimonials(){
    return(
        <section className="section-padding">
            <div className="container" style={{ textAlign: 'center' }}>

               <h2 className="trust-heading">Trusted by 
                  <span className="gradient-text">Professionals</span>
               </h2>

               <div className="trust-template">
                  <div className="glass-card card-trust">

                     <div className="card-star">
                           <Star fill="#f59e0b" color="#f59e0b" size={16}/>
                           <Star fill="#f59e0b" color="#f59e0b" size={16}/>
                           <Star fill="#f59e0b" color="#f59e0b" size={16}/>
                           <Star fill="#f59e0b" color="#f59e0b" size={16}/>
                           <Star fill="#f59e0b" color="#f59e0b" size={16}/>
                     </div>

                     <p className="card-content">
                        "TradeVerse has completely transformed how our firm manages liquidity routing. 
                        The engine speed is unmatchable."
                     </p>

                     <div className="card-owner">
                        <div className="card-owner-design"></div>
                        <div>
                           <h4 className="card-owner-heading">Elena Rostova</h4>
                           <p className="card-owner-para">Head Quant, Horizon Capital</p></div>
                     </div>
                  </div>

                  <div className="glass-card card-trust">

                     <div className="card-star">
                        <Star fill="#f59e0b" color="#f59e0b" size={16}/>
                        <Star fill="#f59e0b" color="#f59e0b" size={16}/>
                        <Star fill="#f59e0b" color="#f59e0b" size={16}/>
                        <Star fill="#f59e0b" color="#f59e0b" size={16}/>
                        <Star fill="#f59e0b" color="#f59e0b" size={16}/>
                     </div>

                     <p className="card-content">
                        "The only platform that didn't fail me during the immense market volatility of last quarter. 
                        Highly recommended."
                     </p>

                     <div className="card-owner">

                        <div className="card-owner-design"></div>
                        <div>
                           <h4 className="card-owner-heading">Marcus Chen</h4>
                           <p className="card-owner-para">Independent Day Trader</p>
                        </div>

                     </div>

                  </div>

                  <div className="glass-card card-trust">

                     <div className="card-star">
                        <Star fill="#f59e0b" color="#f59e0b" size={16}/>
                        <Star fill="#f59e0b" color="#f59e0b" size={16}/>
                        <Star fill="#f59e0b" color="#f59e0b" size={16}/>
                        <Star fill="#f59e0b" color="#f59e0b" size={16}/>
                        <Star fill="#f59e0b" color="#f59e0b" size={16}/>
                     </div>

                     <p className="card-content">
                        "Zero latency. Clean API documentation. 
                        Setting up our algorithmic strategies took days rather than months."
                     </p>

                     <div className="card-owner">

                        <div className="card-owner-design"></div>
                        <div>
                           <h4 className="card-owner-heading">James O'Connor</h4>
                           <p className="card-owner-para">CTO, AlgoTrade Web</p>
                        </div>

                     </div>

                  </div>

               </div>

            </div>
            
         </section>
    );
}