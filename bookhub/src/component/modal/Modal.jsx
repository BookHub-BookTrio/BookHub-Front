import React, { useEffect } from "react";
import styled from "styled-components";
import AOS from "aos";
import "aos/dist/aos.css";

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
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

const Modal = ({ message, onClose }) => {
  useEffect(() => {
    AOS.init({ duration: 400, easing: "ease-out" });
  }, []);

  return (
    <ModalBackdrop>
      <ModalContent data-aos="zoom-in">
        <p>{message}</p>
        <CloseButton onClick={onClose}>확인</CloseButton>
      </ModalContent>
    </ModalBackdrop>
  );
};

export default Modal;
