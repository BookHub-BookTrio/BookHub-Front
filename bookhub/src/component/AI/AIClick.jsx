import React, { useState } from "react";
import styled from "styled-components";
import AIPopup from "./AIPopup.jsx"; 
import aiImage from "../image/AI.png";
import media from "../../assets/media.jsx";

const AIIcon = styled.img`
  width: 100px;
  cursor: pointer;
  position: fixed;
  bottom: 70px;
  right: 220px;
  z-index: 1110;

  ${media.tablet} {
    right: 70px;
  }  

  ${media.mobile} {
    right: 30px;
    width: 80px;
  } 
  
`;

const AIClick = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      message: "책 제목을 입력해주세요!\n제가 간단한 줄거리와 추천 대상도 함께 알려드릴게요 ✨",
      direction: "incoming",
      sender: "AI",
      position: "incoming",
    },
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <AIIcon src={aiImage} alt="AI" onClick={handleOpen} />

      {isOpen && (
        <AIPopup
          messages={messages}
          setMessages={setMessages}
          inputValue={inputValue}
          setInputValue={setInputValue}
          onClose={handleClose}
          onCancel={handleClose}
        />
      )}
    </>
  );
};

export default AIClick;
