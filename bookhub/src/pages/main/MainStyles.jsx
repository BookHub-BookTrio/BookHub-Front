import styled, { keyframes } from "styled-components";
import { FaBook } from "react-icons/fa";
import GradientBg from "../../component/image/Gradient.svg";
import media from "../../assets/media.jsx";

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

  ${media.mobile} {
    background-position: 120% 14% !important;
    background-size: 64% !important;
  }

  ${media.tablet} {
    background-position: 105% 17%;
    background-size: 55%;
  }
  overflow-x:clip;
`;

export const Overlap = styled.div`
  margin-top: 120px;
  text-align: left;
  width: 80%;
`;

/* BOOK HUB & BOOK TRIO */
export const BookTitle = styled.h1`
  font-family: "RubikBubbles-Regular", Helvetica;
  font-size: 90px;
  font-weight: 400;
  letter-spacing: 0;
  margin-left: 220px;
  line-height: normal;

  ${media.mobile} {
  margin-left: 40px;
    font-size: 40px !important;
    margin-bottom: 30% !important;
  }

  ${media.tablet} {
    margin-left: 120px;
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

  ${media.mobile} {
    margin-left: 40px;
    font-size : 20px !important;
    margin-top: 20px;  
  }

  ${media.tablet} {
    width: 350px;
    margin-left: 120px;
    margin-top: 20px;
    line-height: 40px;
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

  ${media.mobile} {
    margin-left: 40px;
    width: 180px;
    height: auto;
    font-size : 22px;
  }
  ${media.tablet} {
    margin-left: 120px;
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

  ${media.mobile} {
    top: 14%;
    right: 6% !important;
    width: 135px !important;
  }

  ${media.tablet} {
    right: 10%;
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
      
    ${media.mobile} {
      font-size: 14px;
    }
  }

  p {
    font-family: "Slackey-Regular", Helvetica;
    font-weight: 400;
    font-size: 30px;
    color: #333;
    text-align: left;
    margin: 5px 0;

    ${media.mobile} {
      font-size: 14px;
    }
  }
  
  ${media.mobile} {
    margin-left: 20px;
    padding-bottom: 40px;
    transform: translateY(-80px); 
  }
  ${media.tablet} {
    margin-left: 120px;
  }
`;

// 화살표
export const ArrowImage = styled.img`
  margin: 10px 0;
  margin-left: 35px;
  width: ${(props) => (props.small ? "120px" : "138px")}; // 길이 조건부
  transform: ${(props) => (props.flip ? "scaleX(-1)" : "none")};
  ${media.mobile} {
    width: 100px;
  }
`;

// best 화살표
export const ArrowImage_best = styled.img`
  margin: 10px 0;
  margin-right: 100px;
  width: ${(props) => (props.small ? "120px" : "138px")}; // 길이 조건부
  transform: ${(props) => (props.flip ? "scaleX(-1)" : "none")};
  ${media.mobile} {
  width: 90px;
  margin-right: 5%;
  }
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

  ${media.tablet} {
    margin-left: 80px;
    margin-top: 80px;
  }

  ${media.mobile} {
    margin-left: 1.7%;
    margin-top: -40px;
  }
    z-index: 1000;
`;

export const BookImage = styled.img`
  width: 100%;
  height: 100%;
  margin-left: 60px;
  opacity: ${(props) => (props.isVisible ? "1" : "0")};
  transform: translateY(${(props) => (props.isVisible ? "0" : "30px")});
  transition: opacity 1s ease-in-out, transform 1s ease-in-out;

  ${media.tablet} {
    width: 280px;
  }

  ${media.mobile} {
    width: 180px;
    margin-left: 10px;
  }
`;


export const BookImage_2 = styled.img `
  position: absolute;
top: 5%;
cursor:pointer;
transform: rotate(-8.5deg);
  box-shadow: 10px 10px 30px rgba(0, 0, 0, 0.3);
color: #f2b9bf;
font-family: "Slackey-Regular", Helvetica;
font-size: 35px;
font-weight: 500;
text-align: left;

margin-left: 21.1%;
width: 80%;
z-index:1010;
border-radius: 30px;
height: 91%;
object-fit: cover

${media.tablet} {
  font-size: 40px;
  width: 88%;
  margin-left: 29%;
}

${media.mobile} {
  font-size: 25px;
  margin-left: 4%;
  height: 92%;
  width: 88%;
}
`
export const BookWrapper = styled.div`
  position: relative;
  display: inline-block;
  width: 360px;
  height: 480px;
  
  ${media.tablet} {
    width: 280px;
    height: 400px;
  }

  ${media.mobile} {
    width: 180px;
    height: 280px;
  }
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

  ${media.tablet} {
    font-size: 40px;
  }

  ${media.mobile} {
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
  pointer-events: none;
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

  ${media.tablet} {
    width: 400px;
  }
  ${media.mobile} {
    width: 200px;
  }
`;

// main - 3번째
export const Main3Container = styled.div `
 position: relative;
 width: 100%;
 margin-top: 100px;
 
 ${media.tablet} {
  padding-bottom: 20px;
 }
  ${media.mobile} {
  padding-bottom: 80px;
  }
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

    ${media.tablet} {
      font-size: 25px;
    }

    ${media.mobile} {
      font-size: 14px;
    }
  }

  ${media.tablet} {
    margin-right: 50px;
    padding-top: 50%;
    transform: translateY(-350px); 
  }
  ${media.mobile} {
    margin-right: 5px;
  }
`;


// new published 글씨
export const StyledTodayBook_pub = styled.div`
  margin-top: 50px; 
  transform: translateY(-150px);
  opacity: ${(props) => (props.isVisible ? "1" : "0")};
  transition: opacity 0.5s ease-in-out;
  transition-delay: ${(props) => (props.isVisible ? "0.5s" : "0s")};
  margin-left: 220px;

  .pub {
    font-family: "Slackey-Regular", Helvetica;
    font-weight: 400;
    font-size: 30px;
    color: #333;
    text-align: left;
    margin: 5px 0;
    margin-top: -300px;
    ${media.tablet} {
      font-size: 25px;
    }

    ${media.mobile} {
      font-size: 14px;

    }
  }
  
  ${media.tablet} {
    margin-left: 100px;
    transform: translateY(-210px); 
  }

  ${media.mobile}   {         
    margin-left: 4%;
    transform: translateY(-200px); 

  }

`;

// best seller 밑 밑줄
export const StyledHr = styled.hr`
  border: none;
  border-top: 2px solid #ccc;
  width: 55%;
  margin-top: 60px;
  margin-bottom: 540px;
  opacity: ${props => (props.isVisible ? 1 : 0)};
  transition: opacity 0.5s ease-in-out;
`;

// best seller 
export const BookCardContainer_best = styled.div`
  display: flex;
  margin-left: 300px; 
  margin-top: -720px; 
  gap: 30px;
  opacity: ${(props) => (props.isVisible ? "1" : "0")};
  transition: opacity 0.5s ease-in-out;

  ${media.tablet} {
    margin-left: 20px;
  }
  ${media.mobile} {
    margin-left: 10px;
  }
`;

// new published
export const BookCardContainer_pub = styled.div`
  display: flex;
  margin-left: 628px; 
  margin-top: -560px;  
  margin-bottom: 15px;
  gap: 30px;
  opacity: ${(props) => (props.isVisible ? "1" : "0")};
  transition: opacity 0.5s ease-in-out;
  transition-delay: ${(props) => (props.isVisible ? "0.5s" : "0s")};

  ${media.tablet} {
    margin-left: 40px;
    transform: translateY(180px); 
  }

  ${media.mobile}{
    margin-left: 20px;
    transform: translateY(140px);
    margin-bottom: 70px;
  }
`;

export const StyledEllipsis_best = styled.div`
  display: flex;
  margin-top: 10px;
  margin-left: 38%;
  ${media.mobile} {
    transform: translateY(170px);
    margin-left: 45%; 
  } 
  ${media.tablet} {
  margin-left: 45%;
  }
`;
export const StyledEllipsis_pub = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  margin-left: 17%;
  ${media.mobile} {
  margin-left: 5%;
    transform: translateY(270px); 
  } 
  ${media.tablet} {
    transform: translateY(190px);
    margin: 0 auto;
  }
`;

export const Dot = styled.div`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  margin: 0 4px;
  margin-bottom: 20px;
  background-color: ${(props) => (props.active ? "#000" : "#ccc")};
  transition: background-color 0.3s;
`;

// 팝업
export const PopupOverlay = styled.div`
position: fixed;
top: 0;
left: 0;
width: 100vw;
height: 100%;
background: rgba(0, 0, 0, 0.5);
display: flex;
justify-content: center;
align-items: center;
z-index: 1011;
`;

export const PopupBox = styled.div`
display: flex;
width: 90%;
max-width: 1000px;
height: 80dvh;
max-height: 700px;
background: white;
border-radius: 16px;
overflow: hidden;
box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
`;

// 왼쪽: 책 표지
export const BookCover = styled.div`
width: 50%;
background-size: cover;
background-position: center;
${media.mobile} {
width: 200px;
height: auto;
}`;

// 오른쪽: 책 내용
export const BookContent = styled.div`
width: 45%;
padding: 40px;
display: flex;
flex-direction: column;
justify-content: space-between;
`;

export const BookTitlePopup = styled.h2`
font-size: 24px;
font-weight: bold;
margin-bottom: 20px;
text-align: center;
`;

export const BookDescriptionPopup = styled.p`
font-size: 16px;
line-height: 2.0;
flex-grow: 1;
${media.mobile} {
  height: 100px;
  overflow-y: auto;
}
`;

export const BookAuthorPopup = styled.h4`
 text-align: right;
 font-size: 14px;
`;

export const BookPublisherPopup = styled.p`
 font-size: 14px;
`

export const CloseButton = styled.button`
align-self: flex-end;
margin-top: 20px;
background: #455d3e;
padding: 6px 12px;
border-radius: 8px;
cursor: pointer;
border: none;
color: white;
`;

// Main 3 책 넘기는 화살표
export const NavButton = styled.button`
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #748C70;
  padding: 0 10px;
  z-index:1010;
  &:hover {
    color: #000;
  }
  
  ${media.mobile} {
    transform: translateY(170px); 
  } 
`;
