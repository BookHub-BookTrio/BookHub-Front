import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../modal/Modal.jsx";
import styled from "styled-components";

const StyledLogoutButton = styled.button`
  background-color: black;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 10px;
  cursor: pointer;
  font-family: "Slackey-Regular", Helvetica;
  font-size: 18px;

  /* 로그아웃 버튼 숨기기 */
  @media (max-width: 820px) {
   display: none;
  }
`

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
        setShowModal(false);
        if (isLoggedIn) {
            // 로그아웃 처리
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            setIsLoggedIn(false);
            navigate("/", { replace: true }); // 로그아웃 시 홈으로 이동
        } else {
            // 로그인 처리
            navigate("/home");
        }
        setShowModal(false);
    };

    const closeModalOnly = () => {
        setShowModal(false);
    };

    return (
        <>
            <StyledLogoutButton onClick={handleClick}>
                {isLoggedIn ? "LOGOUT" : "LOGIN"}
            </StyledLogoutButton>

            {showModal && (
                <Modal
                    title={isLoggedIn ? "로그아웃 하시겠습니까?" : "로그인 하시겠습니까?"}
                    content={isLoggedIn ? "확인 시 로그아웃됩니다." : "확인 시 로그인 페이지로 이동합니다."}
                    onClose={confirmAction}
                    onCancel={closeModalOnly}
                />
            )}
        </>
    );
};

export default LoginButton;
