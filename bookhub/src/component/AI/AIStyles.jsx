import styled, { createGlobalStyle } from "styled-components";
import media from "../../assets/media";

// 채팅 라이브러리 css custom으로 덮어쓰기
export const ChatCustomStyle = createGlobalStyle`
  .cs-main-container {
    border: none !important;
  }

  .cs-chat-container .cs-message-list {
    padding-bottom: 30px;
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
    margin-top: 8px !important;
  }

  .cs-message--incoming .cs-message__content { // ai 메세지 배경 
    background-color:rgba(211, 231, 206, 0.86) !important;
    color: #111 !important;
    border-radius: 12px !important;
    margin-bottom: 15px !important;
    max-width: 600px !important;
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

export const AIArea = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 12px 0 6px 12px;
`;

export const UserArea = styled(AIArea)`
  justify-content: flex-end;
  margin: 12px 12px 4px 0; 
`

export const AIAvatar = styled.img`
  width: 26px;
  height: 26px;
  border-radius: 50%;
`;

export const AIName = styled.span`
  font-weight: bold;
  font-size: 12.5px;
  color: #333;
  font-family: "Slackey-Regular", sans-serif;
`;

export const ModalBackdrop = styled.div`
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

export const ModalContainer = styled.div`
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  width: 800px;
  height: 500px;
  max-width: 90%;
  padding: 40px;
  position: relative;
  font-family: "Pretendard-Regular", sans-serif;

  ${media.tablet} {
    width: 80%;
  }  

  ${media.mobile} {
    width: 80%;
  } 
`;

export const XButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  z-index: 10;
`;
