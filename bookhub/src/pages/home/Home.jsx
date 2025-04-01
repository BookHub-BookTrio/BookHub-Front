import React from "react";
import { useNavigate } from "react-router-dom";
import kakaoLogin from "../../component/image/kakaoLogin.png";
import Logo_book from "../../component/image/Logo_book.png";
import "./Home.css";
import "../../assets/font.css";

const REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
const REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;
const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

export const Home = () => {
    const navigate = useNavigate();

    const handleKakaoLogin = () => {
        window.location.href = KAKAO_AUTH_URL;
    };

    return (
        <div className="Home">
            <div className="overlap">
                <img className="image_logo" alt="로고_책만" src={Logo_book} />

                <div className="text-wrapper">BookHub</div>
            </div>
            
            <img 
                className="image" 
                alt="카카오 로그인 버튼"
                src={kakaoLogin} 
                onClick={handleKakaoLogin}
                style={{ cursor: "pointer" }}
            />
            
            <div className="auth-options">
                <span 
                    className="text-wrapper-2"
                    onClick={() => navigate("/login")}
                    style={{ cursor: "pointer" }}
                    >이메일로 로그인
                </span>
                <span 
                    className="text-wrapper-3"
                    onClick={() => navigate("/signup")}
                    >이메일로 회원가입
                </span>
            </div>
            
        </div>
    );
};

export default Home;