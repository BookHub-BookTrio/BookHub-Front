import React from "react";
import Logo_book from "../../component/image/Logo_book.png";
import "../home/Home.css";
import "../../assets/font.css";
import { TextFrame, StyledInput, LoginButton } from "./LoginStyles.jsx"; 

export const Login = () => {
    return (
        <div className="Home">
            <div className="overlap">
                <img className="image_logo" alt="로고_책만" src={Logo_book} />
                <div className="text-wrapper">BookHub</div>
            </div>
            
            <TextFrame>
                <StyledInput type="text" placeholder="이메일 주소" />
            </TextFrame>

            <TextFrame>
                <StyledInput type="password" placeholder="비밀번호" />
            </TextFrame>

            <LoginButton>로그인</LoginButton>            
        </div>
    );
};

export default Login;