import React from "react";
import kakaoLogin from "../../component/image/kakaoLogin.png";
import Logo_book from "../../component/image/Logo_book.png";
import "./Home.css";
import "../../assets/font.css";


export const Home = () => {
    return (
        <div className="Home">
            <div className="overlap">
                <img className="image_logo" alt="로고_책만" src={Logo_book} />

                <div className="text-wrapper">BookHub</div>
            </div>
            
            <img className="image" alt="카카오 로그인 버튼" src={kakaoLogin} />
            
            <div className="auth-options">
                <span className="text-wrapper-2">이메일로 로그인</span>
                <span className="text-wrapper-3">이메일로 회원가입</span>
            </div>
            
        </div>
    );
};

export default Home;