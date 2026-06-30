import CompanyAbout from "./CompanyAbout";
import CompanyCTA from "./CompanyCTA";
import CompanyHero from "./CompanyHero";
import CompanyMission from "./CompanyMission";
import CompanyStats from "./CompanyStats";
import CompanyTeam from "./CompanyTeam";

export default function Company(){
    return(
        <>
            <CompanyHero/>
            <CompanyAbout/>
            <CompanyMission/>
            <CompanyStats/>
            <CompanyTeam/>
            <CompanyCTA/>
        </>
    );
}