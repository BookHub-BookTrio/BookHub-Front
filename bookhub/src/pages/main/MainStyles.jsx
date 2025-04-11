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
    margin-left: -70px;
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