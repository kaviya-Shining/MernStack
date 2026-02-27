import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { QuoteProvider } from "./context/QuoteContext";
import Sidebar from "./components/Sidebar";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import ThemePage from "./pages/ThemePage";
import Favorites from "./pages/Favorites";
import { Toaster } from "react-hot-toast";
import "./styles/global.css";

function AnimatedRoutes() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/";

  return (
    <div className={`app-container ${isLoginPage ? "login-layout" : "main-layout"}`}>
      {!isLoginPage && <Sidebar />}
      <div className="content-area">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/theme/:theme" element={<ThemePage />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </AnimatePresence>
      </div>
    </div>
  );
}

import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <QuoteProvider>
        <Toaster position="top-right" />
        <AnimatedRoutes />
      </QuoteProvider>
    </BrowserRouter>
  );
}

export default App;