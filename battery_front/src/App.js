import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import Map from "./pages/Map";
import Rental from "./pages/Rental";
import MyPage from "./pages/MyPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Map" element={<Map />} />
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/SignUpPage" element={<SignUpPage />} />
        <Route path="/Rental" element={<Rental />} />
        <Route path="/MyPage" element={<MyPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
