import styled from "styled-components";
import GradientBg from "../../component/image/Eclipse.png";
import media from "../../assets/media";

export const CommunityContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: fixed;
  overflow: hidden; 
  
  p {
    font-family: "Slackey-Regular", Helvetica;
    font-size: 30px;
    font-weight: 500;
    letter-spacing: 0;
    margin-left: 240px;
    margin-top: 10px;
    align-items: left;
    position: fixed; 
    top: 140px;   
    ${media.tablet} {
      margin-left: 120px;
      margin-top: 90px;
    }  
    ${media.mobile} {
      margin-left: 20px;
      font-size: 20px;
    }   
  }
  background-image: url(${GradientBg});
  background-repeat: no-repeat;
  background-size: cover;
  ${media.tablet} {
    background-position: center center;
  }
  ${media.mobile} {
      background-position: center center;
  }
`;

export const CommunityArticle = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 20%;
  align-items: center;
  margin: 0 auto; 
  width: 900px;
  top: -15px;
  position: relative;
  background-color: white;
  border-bottom: 1.3px solid rgb(40, 36, 36);
  padding: 1.2rem 2rem;
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
  z-index: 2;
  border-radius: ${(props) => (props.$first ? "4px 4px 0px 0px" : props.last ? "0px 0px 4px 4px" : "0px")};
  border-top: ${(props) => (props.$first ? "1.3px solid rgb(40, 36, 36);" : "none")};
  
  &:hover {
    background-color:rgb(244, 244, 244);
    cursor: pointer;
  }
  ${media.tablet} {
    width: 80%;
  }
`;

export const CommunityTitle = styled.div`
  font-weight: bold;
  font-size: 1rem;
  width: 220px;
  white-space: nowrap;    
  text-overflow: ellipsis;
  overflow: hidden;
  box-sizing: border-box;
`;

export const CommunityDate = styled.div`
  background-color: black;
  color: white;
  padding: 0.4rem 1.2rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 1px;
  font-family: "Pretendard-Medium", Helvetica;
  margin-right: 150px;

  ${media.tablet} {
    margin-right: 100px;
  }
`;

export const CommunityArrow = styled.img`
  width: 50px;
  height: 18px;
`;

export const Rectangle = styled.div`
  position: absolute;
  top: 298px;
  left: 305px;
  width: 960px;
  height: 400px;
  background-color:rgb(226, 226, 226);
  border-radius: 4px;
  opacity: 0.5;
  z-index: -1;

  ${media.tablet} {
    left: 100px;
    top: 440px;
  }
  ${media.mobile} {
    left: 10px;
    top: 202px;
  }
`;