import styled from "styled-components";

// 전체 페이지 스타일
export const SignupContainer = styled.div`
  position: relative;
  width: 1440px;
  height: 990px;
  background: #FFFFFF;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

// 로고 스타일
export const LogoText = styled.div`
  font-family: 'Rubik Bubbles';
  font-size: 51.43px;
  color: #000000;
  text-align: center;  
  margin-top: -20px !important;
`;

// 입력 필드 스타일
export const TextFrame = styled.div`
  box-sizing: border-box;
  width: 401px;
  height: 57px;
  background: #FFFFFF;
  border: 1.5px solid #000000;
  border-radius: 10.25px;
  display: flex;
  align-items: center;
  padding-left: 15px;
  margin-bottom: 10px;
  position: relative;
`;

export const StyledInput = styled.input`
  width: 100%;
  height: 70%;
  border: none;
  outline: none;
  font-family: 'Pretendard';
  font-size: 15px;
`;

// 회원가입 버튼 스타일
export const SignupButton = styled.button`
  width: 403.51px;
  height: 60px;
  background: #000000;
  border: 1.29px solid #FFFFFF;
  border-radius: 10.31px;
  font-family: 'Pretendard';
  font-weight: 700;
  font-size: 18.05px;
  color: #FFFFFF;
  cursor: pointer;
  margin-top: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: #333333;
  }
`;

// 인풋 위 텍스트
export const LabelContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 7px; 
    margin-bottom: 10px;
`;

export const LabelText = styled.div`
    color: #000000;
    font-family: "Pretendard-Bold", Helvetica;
    font-size: 15px;
    font-weight: 700;
    height: 20px;
    width: 197px;
    letter-spacing: 0;
    line-height: 19.2px;
`;
// 오류 메시지 스타일
export const ErrorMessage = styled.div`
    color: red;
    font-size: 13px;
    border-radius: 5px;
    text-align: right;
    margin-top: -27.8px;
    margin-bottom: 1.5px;
    padding: 0px;
`;
