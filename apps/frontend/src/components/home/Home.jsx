import Benifits from "./Benifits";
import Features from "./Features";
import Highlights from "./Highlights";
import Testimonials from "./Testimonials";
import Ticker from "./Ticker";
import Trade from "./Trade";

export default function Home(){
    return(
        <>
            <Ticker/>
            <Trade/>
            <Features/>
            <Benifits/>
            <Highlights/>
            <Testimonials/>
        </>
    );
}