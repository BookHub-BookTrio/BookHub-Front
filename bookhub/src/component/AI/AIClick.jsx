import React, { useState } from "react";
import AIPopup from "./AIPopup.jsx"; 
import aiImage from "../image/AI.png";

const AIClick = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      message: "책 제목을 입력해주세요!\n제가 줄거리 요약해드릴게요 ✨",
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
      <img
        src={aiImage}
        alt="AI"
        onClick={handleOpen}
        style={{
          width: "100px",
          cursor: "pointer",
          position: "fixed",
          bottom: "70px",
          right: "220px",
          zIndex: 1000,
        }}
      />

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
