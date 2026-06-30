import Home from "./components/home/Home";
import {Routes, Route} from "react-router-dom";
import Markets from "./components/markets/Markets";
import Trade from "./components/trade/Trade";
import Features from "./components/features/Features";
import Company from "./components/company/Company";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";

function App() {
  return(
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/markets" element={<Markets/>}/>
      <Route path="/trade" element={<Trade/>}/>
      <Route path="/features" element={<Features/>}/>
      <Route path="/company" element={<Company/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
    </Routes>
  );
}

export default App
