import "./TradeHero.css"
import TradeHero from "./TradeHero";
import TradeStats from "./TradeStats";
import TradeFeatures from "./TradeFeatures";
import TradeSteps from "./TradeSteps";
import TradeStart from "./TradeStart";

export default function Trade(){
    return(
        <>
            <TradeHero/>
            <TradeStats/>
            <TradeFeatures/>
            <TradeSteps/>
            {/* <TradeStart/> */}
        </>
    );
}