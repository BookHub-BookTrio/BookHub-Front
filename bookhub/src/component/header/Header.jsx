import React, { useState, useEffect } from "react";
import "./Header.css";
import { useNavigate, useLocation } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import logo from "../../component/image/Logo.png";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavigation = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-in-out" });
  }, []);

  useEffect(() => {
    if (menuOpen) {
      AOS.refreshHard();
    }
  }, [menuOpen]);

  return (
    <div className="header">
      <img className="logo" alt="logo" src={logo} onClick={() => handleNavigation("/")} />
      <div className="rectangle" />

      <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </button>

      <nav
        className={`nav-menu ${menuOpen ? "open" : ""}`}
        data-aos={menuOpen ? "fade-up" : ""}
      >
        <div className={`text-wrapper-4 ${location.pathname === "/" ? "active" : ""}`} onClick={() => handleNavigation("/")}>
          HOME
        </div>
        <div className={`text-wrapper-4 ${location.pathname === "/mypage" ? "active" : ""}`} onClick={() => handleNavigation("/mypage")}>
          MYPAGE
        </div>
        <div className={`text-wrapper-4 ${location.pathname === "/wish" ? "active" : ""}`} onClick={() => handleNavigation("/wish")}>
          WISH
        </div>
        <div className={`text-wrapper-4 ${location.pathname === "/community" ? "active" : ""}`} onClick={() => handleNavigation("/community")}>
          COMMUNITY
        </div>
      </nav>

      <button className="logout-btn" onClick={() => handleNavigation("/home")}>LOGOUT</button>
    </div>
  );
};

export default Header;
