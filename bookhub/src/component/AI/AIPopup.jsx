import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import styled, { createGlobalStyle } from "styled-components";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import AIProfile from "../image/AIProfile.png";
import Aos from "aos";
import "aos/dist/aos.css"
import userProfile from "../image/Profile.png";

// 채팅 라이브러리 css custom으로 덮어쓰기
const ChatCustomStyle = createGlobalStyle`
  .cs-main-container {
    border: none !important;
  }

  .cs-chat-container .cs-message-list {
    padding-bottom: 15px;
  }

  .cs-message-input { // 입력 창 배경, 텍스트 
    background-color: white !important;
    font-size: 16px !important;
    color: #111 !important;
    border-radius: 12px !important;
    border: 1px solid #ccc !important;
    padding: 12px !important;
  }
  .cs-message-input__content-editor-wrapper {
    background-color: white !important;
  }
  .cs-button.cs-send { // 보내기 버튼
    color: white !important;
    border-radius: 8px !important;
  }
  .cs-message-input__content-editor {
    background-color: white !important;
  }
  .cs-typing-indicator { // 타이핑 인디케이터
    font-family: "Pretendard-Medium", sans-serif !important;
    font-size: 14px !important;
    margin-left: 8px !important;
  }

  .cs-message--incoming .cs-message__content { // ai 메세지 배경 
    background-color:rgba(199, 228, 192, 0.86) !important;
    color: #111 !important;
    border-radius: 12px !important;
  }

  .cs-message--outgoing .cs-message__content { // 사용자 메세지 배경
    background-color:rgb(247, 239, 202) !important;
    color: #000 !important;
    border-radius: 12px !important;
  }

  .cs-message__content { // 메세지 내용
    font-size: 15px !important;
    line-height: 1.6;
  }
`;

const AIArea = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 12px 0 6px 12px;
`;

const UserArea = styled(AIArea)`
  justify-content: flex-end;
  margin: 12px 12px 4px 0; 
`

const AIAvatar = styled.img`
  width: 26px;
  height: 26px;
  border-radius: 50%;
`;

const AIName = styled.span`
  font-weight: bold;
  font-size: 12.5px;
  color: #333;
  font-family: "Slackey-Regular", sans-serif;
`;

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const ModalContainer = styled.div`
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  width: 800px;
  height: 500px;
  max-width: 90%;
  padding: 40px;
  position: relative;
  font-family: "Pretendard-Regular", sans-serif;
`;

const XButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  z-index: 10;
`;

const AIPopup = ({
  messages,
  setMessages,
  inputValue,
  setInputValue,
  onCancel,
}) => {
  const [isTyping, setIsTyping] = React.useState(false);

  useEffect(() => {
    Aos.init({ duration: 400, easing: "ease-out" });  

    // 모달창 열렸을 때 뒷 배경 고정
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newMessage = {
      message: inputValue,
      direction: "outgoing",
      sender: "user",
      position: "outgoing",
    };
    setMessages((prev) => [...prev, newMessage]);
    setInputValue("");
    setIsTyping(true);

    // AI 답변 
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          message: `"${inputValue}"에 대한 줄거리입니다.`,
          direction: "incoming",
          sender: "AI",
          position: "incoming",
        },
      ]);
      setIsTyping(false);
    }, 1500);
  };
  

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return ReactDOM.createPortal(
    <>
    <ChatCustomStyle />
    <ModalBackdrop>
      <ModalContainer data-aos="zoom-in">
        <XButton onClick={onCancel}>×</XButton>
        <MainContainer>
          <ChatContainer>
            <MessageList
              typingIndicator={
                isTyping ? <TypingIndicator content="AI가 답변 중..." /> : null
              }
            >
              {messages.map((msg, i) => (
                <div key={i}>
                  {msg.sender === "AI" && (
                    <AIArea>
                      <AIAvatar src={AIProfile} alt="AI Avatar" />
                      <AIName>AI</AIName>
                    </AIArea>
                  )}
                  {msg.sender === "user" && (
                    <UserArea>
                      <AIAvatar src={userProfile} alt="User Avatar" />
                      <AIName>Nickname</AIName>
                    </UserArea>
                  )}
                  <Message
                    key={i}
                    model={{
                      message: msg.message,
                      direction: msg.direction,
                      sender: msg.sender,
                      position: msg.position,
                      avatarSpacer: true,
                      avatar: msg.sender === "AI" ? AIProfile : null,
                      showAvatar: msg.sender === "AI"
                    }}
                  />
                </div>
              ))}
            </MessageList>
            <MessageInput
              placeholder="책 제목을 입력해주세요."
              value={inputValue}
              onChange={(val) => setInputValue(val)}
              onSend={handleSend}
              onKeyDown={handleKeyDown}
              attachButton={false}
              sendButton={true}
            />
          </ChatContainer>
        </MainContainer>
      </ModalContainer>
    </ModalBackdrop>
    </>,
    document.body
  );
};

export default AIPopup;
