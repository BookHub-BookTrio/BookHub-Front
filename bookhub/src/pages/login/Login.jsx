import React, { useState } from "react";
import axios from "axios";
import Logo_book from "../../component/image/Logo_book.png";
import "../home/Home.css";
import "../../assets/font.css";
import { TextFrame, StyledInput, LoginButton } from "./LoginStyles.jsx"; 
import Modal from "../../component/modal/Modal.jsx";

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [modalMessage, setModalMessage] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleLogin();
        }
    };

    const handleLogin = async () => {
        try {
            const response = await axios.post("http://localhost:8080/api/v1/oauth2/sign-in", {
                email,
                password,
            });

            const { token } = response.data;
            localStorage.setItem("token", token);
            setModalMessage("로그인 성공!"); // 모달 메시지 설정
            setIsModalOpen(true); // 모달 열기

            setTimeout(() => {
                window.location.href = "/"; // 로그인 후 이동
            }, 1000);
        } catch (error) {
            setModalMessage("로그인 실패: " + (error.response?.data?.message || "알 수 없는 오류"));
            setIsModalOpen(true);
        }
    };

    return (
        <div className="Home">
            <div className="overlap">
                <img className="image_logo" alt="로고_책만" src={Logo_book} />
                <div className="text-wrapper">BookHub</div>
            </div>
            
            <TextFrame>
                <StyledInput type="text" 
                placeholder="이메일 주소" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
            </TextFrame>

            <TextFrame>
                <StyledInput type="password" 
                placeholder="비밀번호" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
                />
            </TextFrame>

            <LoginButton onClick={handleLogin}>로그인</LoginButton>     

            {isModalOpen && <Modal message={modalMessage} onClose={() => setIsModalOpen(false)} />}
       
        </div>
    );
};

export default Login;