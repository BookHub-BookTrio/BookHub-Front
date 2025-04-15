import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import AOS from "aos";
import "aos/dist/aos.css";

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: pre-line;
`;

const ModalContent = styled.div`
  position: relative; 
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  width: 300px;
  font-size: 17px;
  font-family: "Pretendard-Regular", Helvetica;
`;

const CloseButton = styled.button`
  margin-top: 10px;
  padding: 5px 10px;
  background: #455d3e;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-family: "Pretendard-Regular", Helvetica;
`;

const XButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
`;

const ModalTitle = styled.h2`
  font-family: "Pretendard-Regular", Helvetica;
  margin-bottom: 10px;
`;

const ModalText = styled.p`
  font-family: "Pretendard-Regular", Helvetica;
  white-space: pre-line;
`;

const Modal = ({ title, content, onClose, onCancel }) => {
  useEffect(() => {
    AOS.init({ duration: 400, easing: "ease-out" });
  
    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        onClose();
      }
    };
  
    window.addEventListener("keydown", handleKeyDown);
  
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);
  

  return ReactDOM.createPortal(
    <ModalBackdrop>
      <ModalContent data-aos="zoom-in">
        <XButton onClick={onCancel}>✖</XButton>
        <ModalTitle>{title}</ModalTitle>
        <ModalText>{content}</ModalText>
        <CloseButton onClick={onClose}>확인</CloseButton>
      </ModalContent>
    </ModalBackdrop>,
    document.body
  );
};

export default Modal;
