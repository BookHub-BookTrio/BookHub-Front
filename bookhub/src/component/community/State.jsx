import styled from "styled-components";
import React from "react";

// 커뮤니티 상태에 따라 writing ../ post/ editing .. 으로 변경
const BadgeWrapper = styled.div`
  background-color: ${({ type }) => (type === "write" ? "white" : "black")};
  color: ${({ type }) => (type === "write" ? "black" : "white")};
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
  border: ${({ type }) => (type === "write" ? "1.5px solid #d9d9d9" : "none")};
  white-space: nowrap; // 텍스트 줄바꿈 방지
`;

const State = ({ type }) => {
  const text = type === "write" ? "WRITING..." : "POST";
  return <BadgeWrapper type={type}>{text}</BadgeWrapper>;
};

export default State;
