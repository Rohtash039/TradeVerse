import "./CompanyTeam.css"
import { FaLinkedin, FaXTwitter } from "react-icons/fa6";
export default function CompanyTeam(){
    const team = [
        {
            initials: 'RB',
            bgClass: 'bg-cyan',
            name: 'Rohtash Bainsla',
            role: 'CEO & Co-Founder',
            bio: 'Former VP at Goldman Sachs with 15+ years in institutional trading systems and market microstructure.',
            socials: ['linkedin', 'twitter'],
        },
        {
            initials: 'SS',
            bgClass: 'bg-purple',
            name: 'Sourabh Sharma',
            role: 'CTO',
            bio: 'Ex-AWS principal engineer. Architect of our zero-downtime matching engine servicing 2M+ concurrent users.',
            socials: ['linkedin', 'twitter'],
        },
        {
            initials: 'RS',
            bgClass: 'bg-green',
            name: 'Roshan Sahoo',
            role: 'Chief Risk Officer',
            bio: 'PhD in Financial Mathematics from MIT. Built risk frameworks for three Fortune 500 financial institutions.',
            socials: ['linkedin', 'twitter'],
        },
        {
            initials: 'AK',
            bgClass: 'bg-amber',
            name: 'Aman Kumar',
            role: 'Head of Product',
            bio: 'Previously led product at Stripe and Coinbase. Passionate about democratizing complex financial tools.',
            socials: ['linkedin', 'twitter'],
        },
    ];  
    return(
        <div className="company-team">
            <div className="company-team-content">
                <h2>Meet the <span className="gradient-text">Leadership</span></h2>
                <p>
                    A world-class team of engineers, traders, and strategists 
                    building the infrastructure that powers the next generation of global finance.
                </p>
            </div>

            <div className="team-card">
                {team.map((m, i) => (
                    <div key={i} className="team-card-content">
                    <div className="team-avatar-wrapper">
                        <div className={`team-avatar-bg ${m.bgClass}`}>
                        {m.initials}
                        </div>
                    </div>
                    <div className="team-card-info">
                        <h3 className="team-card-name outfit">{m.name}</h3>
                        <p className="team-card-role">{m.role}</p>
                        <p className="team-card-bio">{m.bio}</p>
                        <div className="team-card-socials">
                        {m.socials.includes('linkedin') && (
                            <span className="team-social-icon">
                            <FaLinkedin size={15} color="var(--text-muted)" />
                            </span>
                        )}
                        {m.socials.includes('twitter') && (
                            <span className="team-social-icon">
                            <FaXTwitter size={15} color="var(--text-muted)" />
                            </span>
                        )}
                        </div>
                    </div>
                    </div>
                ))}
            </div>
        </div>
    );
}