import styled from "styled-components";
import "../../assets/media.css";
import media from "../../assets/media.jsx";

export const TextFrame = styled.div`
    background-color: #ffffff;
    border: 1.43px solid #000000;
    border-radius: 11.45px;
    height: 65px;
    width: 417px;
    overflow: hidden;
    position: relative;
    margin-bottom: 7px;

    ${media.mobile} {
        width: 70%;
    }
`;

export const StyledInput = styled.input`
    color:#33;
    font-family: "Pretendard-Bold", Helvetica;
    font-size: 17px;
    font-weight: 700;
    height: 22px;
    width: 360px;
    left: 26px;
    letter-spacing: 0;
    line-height: 21.5px;
    position: absolute;
    top: 21px;
    border: none;
    outline: none;
    &::placeholder {
        color: #b8b8b8; 
    }
`;

export const LoginButton = styled.button`
    width: 420px;
    height: 60px;
    font-size: 17px;
    font-weight: 700;
    font-family: "Pretendard-Medium", Helvetica;
    color:rgb(254, 254, 254);
    letter-spacing: 0;
    line-height: 21.5px;
    background-color: black;
    border: none;
    border-radius: 11.45px;
    cursor: pointer;
    margin-top: 15px;
    &:hover {
        background-color: #333;
    }
    
    ${media.mobile} {
        width: 70%;
    }
`;

export const ErrorMessage = styled.div`
  position: absolute;
  top: 5px;  
  right: 10px;  
  font-size: 11px;
  color:rgba(254, 65, 65, 0.88);
  font-weight: 600;
  pointer-events: none;
`;
