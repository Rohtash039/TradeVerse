import FeatureCards from "./FeatureCards";
import FeatureHero from "./FeatureHero";
import FeatureShowcase from "./FeatureShowcase";
import TrustSecurity from "./TrustSecurity";

export default function Features(){
    return(
        <>
            <FeatureHero/>
            <FeatureCards/>
            <FeatureShowcase/>
            <TrustSecurity/>
        </>
    );
}