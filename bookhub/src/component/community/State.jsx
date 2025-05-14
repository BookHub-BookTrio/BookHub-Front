import styled from "styled-components";
import React from "react";
import media from "../../assets/media";

// 커뮤니티 상태에 따라 writing ../ post/ editing .. 으로 변경
const BadgeWrapper = styled.div`
  background-color: ${({ type, isPostAuthor }) =>
    type === "post"
      ? isPostAuthor
        ? "black"  // 내 게시글일 때 검정 배경
        : "white"  // 다른 사람의 게시글일 때 흰색 배경
      : "white"};  // writing, editing 상태일 때는 항상 흰색 배경

  color: ${({ type, isPostAuthor }) =>
    type === "post"
      ? isPostAuthor
        ? "white"  // 내 게시글일 때 흰색 글씨
        : "black"  // 다른 사람의 게시글일 때 검정 글씨
      : "black"};  // writing, editing 상태일 때는 항상 검정 글씨

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

  ${media.tablet} {
    z-index: 1011;
    left: 50%;
    transform: translate(-50%, -50%);
    top: 22%;
  }
    ${media.mobile} {
    left: 10%;  
    z-index: 1011;
  }
`;

const State = ({ type, isPostAuthor }) => {
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
  return <BadgeWrapper type={type} isPostAuthor={isPostAuthor}>{text}</BadgeWrapper>;
};

export default State;
