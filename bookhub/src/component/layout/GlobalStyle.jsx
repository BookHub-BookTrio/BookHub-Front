import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  /* 스크롤바 숨기기 */
  ::-webkit-scrollbar {
    width: 0px;  
    height: 0px; 
  }
`;

export default GlobalStyle;