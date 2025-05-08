import styled from "styled-components";
import React from "react";

// 커뮤니티 상태에 따라 writing ../ post/ editing .. 으로 변경
const BadgeWrapper = styled.div`
  background-color: ${({ type }) => (type === "post" ? "black" : "white")};
  color: ${({ type }) => (type === "post" ? "white" : "black")};
  position: absolute;
  top: 150px;
  left: 250px;

  display: inline-flex;
  justify-content: center;
  align-items: center;

  padding: 12px 22px;
  font-family: 'Slackey-Regular', sans-serif;
  font-size: 23px;
  letter-spacing: 0.5px;
  border-radius: 50% / 50%; // 자동 타원 유지
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1);
  border: ${({ type }) => (type === "post" ? "none" : "1.5px solid #d9d9d9")};
  white-space: nowrap; // 텍스트 줄바꿈 방지
`;

const State = ({ type }) => {
  let text = "";
  switch (type) {
    case "write":
      text = "WRITING...";
      break;
    case "edit":
      text = "EDITING...";
      break;
    default:
      text = "POST";
  }  
  return <BadgeWrapper type={type}>{text}</BadgeWrapper>;
};

export default State;
