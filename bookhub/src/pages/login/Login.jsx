import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Logo_book from "../../component/image/Logo_book.png";
import "../home/Home.css";
import "../../assets/font.css";
import { TextFrame, StyledInput, LoginButton } from "./LoginStyles.jsx"; 
import Modal from "../../component/modal/Modal.jsx";
import Wrapper from "../../component/layout/Wrapper.jsx";

export const Login = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [errorModal, setErrorModal] = useState({ show: false, title: "", content: "" });
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");    
    
    const closeModal = () => setShowModal(false);
    const handleCloseModal = () => {
        setShowModal(false);
        navigate("/", { replace: true });
    };
    const handleCloseErrorModal = () => {
        setErrorModal({ show: false, title: "", content: "" });
    };
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleLogin();
        }
    };

    const handleLogin = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/internal/login`, {
                email,
                password,
            });

            const { accessToken, refreshToken } = response.data.data;
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
            setShowModal(true);
        
        } catch (error) {
            const errorMessage =
                error.response?.data?.message || "알 수 없는 오류가 발생했습니다.";

            setErrorModal({
                show: true,
                title: "로그인 실패",
                content: errorMessage,
            });
        }
    };

    return (
        <Wrapper>
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

            {showModal && (
                <Modal
                    title="로그인 성공🎉"
                    content="홈으로 이동합니다."
                    onClose={handleCloseModal}
                    onCancel={closeModal}
                    onKeyDown={handleKeyDown}
                />
            )}
            {errorModal.show && (
                <Modal
                    title={errorModal.title}
                    content={errorModal.content}
                    onClose={handleCloseErrorModal}
                    onCancel={handleCloseErrorModal}
                />
            )}
        </div>
        </Wrapper>
    );
};

export default Login;