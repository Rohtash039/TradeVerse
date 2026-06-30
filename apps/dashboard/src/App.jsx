import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Login from "./components/home/component/pages/Login";
import Signup from "./components/home/component/pages/Signup";
import { FlashProvider } from "./context/FlashContext";
import FlashMessage from "./components/FlashMessage";
import ProtectedRoute from "./components/ProtectedRoute";


function App() {
  return (
    <BrowserRouter>
      <FlashProvider>
        <FlashMessage />
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
          </Route>

          <Route path="/login" element={<Login/>} />

          <Route path="/signup" element={<Signup/>} />
        </Routes>
      </FlashProvider>
    </BrowserRouter>
  );
}

export default App;

