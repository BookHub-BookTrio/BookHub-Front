import React, { useState, useEffect } from "react";
import "./Header.css";
import { useNavigate, useLocation } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import logo from "../../component/image/Logo.png";
import LoginButton from "../button/LoginButton";
import Modal from "../modal/Modal";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !!localStorage.getItem("accessToken"); 
  });

  const handleNavigation = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken"); 
    setIsLoggedIn(false);
    setShowLogoutModal(false);
    navigate("/");
    setMenuOpen(false);
  };

  const handleLogin = () => {
    setShowLoginModal(false);
    handleNavigation("/home");
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
        <div className={`text-wrapper-4 ${location.pathname.startsWith("/mypage") ? "active" : ""}`} onClick={() => handleNavigation("/mypage")}>
          MYPAGE
        </div>
        <div className={`text-wrapper-4 ${location.pathname.startsWith("/wish") ? "active" : ""}`} onClick={() => handleNavigation("/wish")}>
          WISH
        </div>
        <div className={`text-wrapper-4 ${location.pathname.startsWith("/community") ? "active" : ""}`} onClick={() => handleNavigation("/community")}>
          COMMUNITY
        </div>

        {isLoggedIn ? (
          <div className="text-wrapper-4 login-logout" onClick={() => setShowLogoutModal(true)}>
            LOGOUT
          </div>
        ) : (
          <div className="text-wrapper-4 login-logout" onClick={() => setShowLoginModal(true)}>
            LOGIN
          </div>
        )}
      </nav>

      <LoginButton />
      <div className="rectangle" />   

      {showLogoutModal && (
        <Modal
          title="로그아웃"
          content="로그아웃 하시겠습니까?"
          onClose={handleLogout}
          onCancel={() => setShowLogoutModal(false)}
        />
      )}

      {showLoginModal && (
        <Modal
          title="로그인"
          content="로그인하시겠습니까?"
          onClose={handleLogin}
          onCancel={() => setShowLoginModal(false)}
        />
      )}
    </div>
  );
};

export default Header;
