import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../modal/Modal.jsx";

export const LoginButton = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // 로그인 여부 판단 (토큰 존재 여부)
        const accessToken = localStorage.getItem("accessToken");
        setIsLoggedIn(!!accessToken);
    }, []);

    const handleClick = () => {
        setShowModal(true);
    };

    const confirmAction = () => {
        if (isLoggedIn) {
            // 로그아웃 처리
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            setIsLoggedIn(false);
        } else {
            // 로그인 처리
            navigate("/login");
        }

        setShowModal(false);
        navigate("/home", { replace: true });
    };

    const closeModalOnly = () => {
        setShowModal(false);
    };

    return (
        <>
            <button className="logout-btn" onClick={handleClick}>
                {isLoggedIn ? "LOGOUT" : "LOGIN"}
            </button>

            {showModal && (
                <Modal
                    title={isLoggedIn ? "로그아웃 하시겠습니까?" : "로그인 하시겠습니까?"}
                    content={isLoggedIn ? "확인 시 홈으로 이동합니다." : "확인 시 로그인 페이지로 이동합니다."}
                    onClose={confirmAction}
                    onCancel={closeModalOnly}
                />
            )}
        </>
    );
};

export default LoginButton;
