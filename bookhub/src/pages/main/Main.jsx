import React from "react";
import * as S from "./MainStyles.jsx";
import MainBook from "../../component/image/MainBook_remove.png";
import Header from "../../component/header/Header.jsx";

export const Main = () => {
  return (
    <S.MainContainer>
      <Header />
      <S.Overlap>
        <S.BookTitle>BOOK HUB
                    <br />
                    &amp; BOOK <br />
                    TRIO</S.BookTitle>
        <S.Description>Enjoy your book with BookHub</S.Description>

        <S.ViewBookButton onClick={() => window.open("https://www.aladin.co.kr/", "_blank")}>
          view book <S.BookIcon />
        </S.ViewBookButton>
      </S.Overlap>

      <S.MainImage src={MainBook} alt="MainBook" />

    </S.MainContainer>
  );
};

export default Main;
