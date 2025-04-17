import styled, { keyframes } from "styled-components";
import { FaBook } from "react-icons/fa";
import GradientBg from "../../component/image/Gradient.svg";

// main - 1번째
export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  height: 1600px;
  min-height: 100vh;
  background: #fff;
  position: relative;
  background-image: url(${GradientBg});
  background-position: 90% 18%;
  background-size: 50%;
  background-repeat: no-repeat;

  @media (max-width: 480px) {
    background-position: 120% 12% !important;
    background-size: 62% !important;
  }

  @media (max-width: 820px) {
    background-position: 115% 11%;
    background-size: 55%;
  }
`;

export const Overlap = styled.div`
  margin-top: 120px;
  text-align: left;
  width: 80%;

  @media (max-width: 480px) {
    margin-left: 100px;
  }

`;

/* BOOK HUB & BOOK TRIO */
export const BookTitle = styled.h1`
  font-family: "RubikBubbles-Regular", Helvetica;
  font-size: 90px;
  font-weight: 400;
  letter-spacing: 0;
  margin-left: 220px;
  line-height: normal;

  @media (max-width: 480px) {
  margin-left: 40px;
    font-size: 40px !important;
    margin-bottom: 30% !important;
  }

  @media (max-width: 820px) {
    font-size: 60px;
    margin-bottom: 20%;
  }
`;

// enjoy your book
export const Description = styled.p` 
  color: #cbd3bd;
  font-family: "RubikBubbles-Regular", Helvetica;
    font-size: 30px;
    font-weight: 400;
    letter-spacing: 0;
    margin-left: 220px;
    margin-top:-20px;
    padding-bottom: 20px;

    @media (max-width: 480px) {
      margin-left: 40px;

        font-size : 25px !important;
        margin-top: 20px;
        
  }

`;

// view book 
export const ViewBookButton = styled.div`
  display: flex;
  align-items: center;
  margin-left: 220px;
  height: 45px;
  justify-content: center;
  background-color: #748C70;
  color: white;
  width: 214px;
  padding: 10px 15px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s;
  font-family: "RubikBubbles-Regular", Helvetica;
  font-size: 25px;
  font-weight: 400;
  &:hover {
    background: #94a591;
    transform: scale(1.05);
    transition: transform 0.2s ease-in-out;
  }

    @media (max-width: 480px) {
        margin-left: 40px;
        font-size : 22px;
  }
    @media (max-width: 820px) {
    height: 30px; 
  }

`;

export const BookIcon = styled(FaBook)`
  margin-left: 10%;
`;

const floatAnimation = keyframes` 
    0% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-15px);
    }
    100% {
        transform: translateY(0);
    }
`;

// main Book _removed 이미지
export const MainImage = styled.img`

  width: 380px;
  height: auto;
  position: absolute;
  top: 18%;
  right: 17%;
  animation: ${floatAnimation} 3s ease-in-out infinite;

  @media (max-width: 480px) {
    top: 12.5%;
    right: 6% !important;
    width: 135px !important;
  }

  @media (max-width: 820px) {
    right: 6%;
    width: 220px;
  }
`;

// main - 2번째
export const StyledTodayBook = styled.div`
  margin-top: 300px;
  opacity: ${(props) => (props.isVisible ? "1" : "0")};
  transition: opacity 0.5s ease-in-out;
  margin-left: 220px;
  z-index: 1001;
  // 한글
  .today {
    font-family: "Pretendard-Bold", Helvetica;
    font-weight: 400;
    font-size: 19px;
    text-align: left;
    letter-spacing: 2px;
    }

  p {
    font-family: "Slackey-Regular", Helvetica;
    font-weight: 400;
    font-size: 30px;
    color: #333;
    text-align: left;
    margin: 5px 0;

    @media (max-width: 820px) {
      font-size: 25px;
    }

    @media (max-width: 480px) {
      font-size: 14px;
    }
  }
`;

// 화살표
export const ArrowImage = styled.img`
  margin: 10px 0;
  margin-left: 35px;
  width: ${(props) => (props.small ? "120px" : "138px")}; // 길이 조건부
  transform: ${(props) => (props.flip ? "scaleX(-1)" : "none")};
`;

// best 화살표
export const ArrowImage_best = styled.img`
  margin: 10px 0;
  margin-right: 100px;
  width: ${(props) => (props.small ? "120px" : "138px")}; // 길이 조건부
  transform: ${(props) => (props.flip ? "scaleX(-1)" : "none")};
`;

export const StyledBookCard = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  position: relative;
  margin-top: -190px;
  margin-left: 30%;
  opacity: ${(props) => (props.isVisible ? "1" : "0")};
  transform: translateY(${(props) => (props.isVisible ? "0" : "30px")});
  transition: opacity 0.8s ease-in-out, transform 0.8s ease-in-out;
  animation: ${floatAnimation} 3s ease-in-out infinite;

  @media (max-width: 820px) {
    margin-left: 80px;
    margin-top: 80px;
  }

  @media (max-width: 480px) {
    margin-left: 25%;
  }
`;

export const BookImage = styled.img`
  width: 340px;
  height: auto;
  margin-left: 60px;
  opacity: ${(props) => (props.isVisible ? "1" : "0")};
  transform: translateY(${(props) => (props.isVisible ? "0" : "30px")});
  transition: opacity 1s ease-in-out, transform 1s ease-in-out;

  @media (max-width: 820px) {
    width: 280px;
  }

  @media (max-width: 480px) {
    width: 180px;
    margin-left: 10px;
  }
`;


export const BookWrapper = styled.div`
  position: relative;
  display: inline-block;
`;


export const BookName = styled.div`
  position: absolute;
  top: 30%;
  transform: rotate(-8.86deg);
  color: #f2b9bf;
  font-family: "Slackey-Regular", Helvetica;
  font-size: 55px;
  font-weight: 400;
  text-align: center;
  width: 80%;
  margin-left: 60px;

  @media (max-width: 820px) {
    font-size: 40px;
  }

  @media (max-width: 480px) {
    font-size: 25px;
    left : -40px;
  }
`;


export const BlurEffect = styled.div`
  position: fixed;
  width: 600px; // 크기 조절
  height: 600px;
  background-image: url(${GradientBg});
  background-size: cover;
  background-position: center;
  opacity: ${(props) => (props.isVisible ? "1" : "0")}; 
  transition: opacity 1s ease-in-out;
  filter: blur(50px);

  &.top-left {
    top: -20%;
    left: -15%;
    z-index:1000;
  }

  &.bottom-right {
    bottom: -20%;
    right: -10%;
    z-index: 1001;
  }
`;

// main - 3번째
export const Main3Container = styled.div `
 position: relative;
 width: 100%;
 margin-top: 100px;
`;

// best seller 글씨
export const StyledTodayBook_best = styled.div`
  margin-top: 300px;
  transform: translateY(-170px);

  display: flex;
  flex-direction: column;
  align-items: flex-end;
  opacity: ${(props) => (props.isVisible ? "1" : "0")};
  transition: opacity 0.5s ease-in-out;
  margin-right: 17vw;
  gap: 10px; 

  .best {
    font-family: "Slackey-Regular", Helvetica;
    font-weight: 400;
    font-size: 30px;
    color: #333;
    margin: 0;

    @media (max-width: 820px) {
      font-size: 25px;
    }

    @media (max-width: 480px) {
      font-size: 14px;
    }
  }
`;


// new published 글씨
export const StyledTodayBook_pub = styled.div`
  margin-top: 50px; 
  transform: translateY(-150px);
  opacity: ${(props) => (props.isVisible ? "1" : "0")};
  transition: opacity 0.5s ease-in-out;
  margin-left: 220px;

  .pub {
    font-family: "Slackey-Regular", Helvetica;
    font-weight: 400;
    font-size: 30px;
    color: #333;
    text-align: left;
    margin: 5px 0;
    margin-top: -300px;
    @media (max-width: 820px) {
      font-size: 25px;
    }

    @media (max-width: 480px) {
      font-size: 14px;
    }
  }
`;

// best seller 밑 밑줄
export const StyledHr = styled.hr`
  border: none;
  border-top: 2px solid #ccc;
  width: 55%;
  margin-top: 50px;
  margin-bottom: 570px;
  opacity: ${props => (props.isVisible ? 1 : 0)};
  transition: opacity 0.5s ease-in-out;
`;