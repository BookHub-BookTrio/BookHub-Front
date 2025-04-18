import React, { useEffect, useRef, useState } from "react";
import * as S from "./MainStyles.jsx";
import MainBook from "../../component/image/MainBook_remove.png";
import MainBook_aladin from "../../component/image/MainBook_aladin.png";
import Arrow1 from "../../component/image/Arrow.png";
import BookCard from "../../component/main_aladin/BookCard.jsx";

export const Main = () => {
  const overlap3Ref = useRef(null);
  const bookCardRef = useRef(null);
  const bestRef = useRef(null);
  const newPubRef = useRef(null);
  const arrowRef = useRef(null);

  const [isVisible, setIsVisible] = useState(false);
  const [isBookVisible, setIsBookVisible] = useState(false);
  const [isExtraVisible, setIsExtraVisible] = useState(false);

// 더미 데이터
const bestSellerBooks = [
  {
    title: "title",
    author: "author",
    cover: ".jpg"
  },
  {
    title: "title",
    author: "author",
    cover: ".jpg"
  },
  {
    title: "title",
    author: "author",
    cover: ".jpg"
  }
];

  // main - 2aladin api random 2 팝업
  const [selectedBook, setSelectedBook] = useState(null); 
  const [showPopup, setShowPopup] = useState(false);

  const handleBookClick = (book) => {
    setSelectedBook(book);
    setShowPopup(true);
  };
  
  useEffect(() => {
    // main_2 오늘의 책 (텍스트) 감지
    const observer1 = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    // main_2 책 이미지 감지
    const observer2 = new IntersectionObserver(
      ([entry]) => {
        setIsBookVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    // main_3 newPublished + bestSeller 감지
    const observer3 = new IntersectionObserver(
      ([entry]) => {
        setIsExtraVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );
    
    if (overlap3Ref.current) observer1.observe(overlap3Ref.current);
    if (bookCardRef.current) observer2.observe(bookCardRef.current);
    if (bestRef.current) observer3.observe(bestRef.current);
    if (arrowRef.current) observer3.observe(arrowRef.current);
    if (newPubRef.current) observer3.observe(newPubRef.current);

    return () => {
      observer1.disconnect();
      observer2.disconnect();
      observer3.disconnect();
    };
  }, []);

  return (
    <S.MainContainer>

      {/* Main_1 */}
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

      {/* Main_2 */}
      <S.StyledTodayBook ref={overlap3Ref} isVisible={isVisible}>
        <p>📜 TODAY’S <br /> BOOK</p>
        <S.ArrowImage src={Arrow1} alt="arrow" />
        <p className="today">오늘의 추천 책을<br /> 확인해 보세요</p>
      </S.StyledTodayBook>

      <S.BlurEffect className="top-left" isVisible={isBookVisible} />
      <S.BlurEffect className="bottom-right" isVisible={isBookVisible} />

      <S.StyledBookCard ref={bookCardRef} isVisible={isBookVisible}>
        <S.BookWrapper>
            <S.BookImage src={MainBook_aladin} alt="aladin" isVisible={isBookVisible} />
            <S.BookName onClick={handleBookClick}>BOOK <br />NAME</S.BookName>
        </S.BookWrapper>

        <S.BookWrapper>
            <S.BookImage src={MainBook_aladin} alt="aladin_2" isVisible={isBookVisible} />
            <S.BookName onClick={handleBookClick}>BOOK <br />NAME</S.BookName>
        </S.BookWrapper>
      </S.StyledBookCard>

      {/* Main_2 popup */}
      {showPopup && selectedBook && (
        <S.PopupOverlay onClick={() => setShowPopup(false)}>
         <S.PopupBox onClick={(e) => e.stopPropagation()}>
          <S.BookCover style={{ backgroundImage: `url(${selectedBook.cover})` }} />
            <S.BookContent>
              <S.BookTitlePopup>{selectedBook.title}</S.BookTitlePopup>
              <S.BookDescription>{selectedBook.description}</S.BookDescription>
              <S.CloseButton onClick={() => setShowPopup(false)}>닫기</S.CloseButton>
            </S.BookContent>
         </S.PopupBox>
        </S.PopupOverlay>
      )};

      {/* Main_3 */}
      <S.Main3Container>
        <S.StyledTodayBook_best ref={bestRef} isVisible={isExtraVisible}>
          <p className="best"> 🏆 Best seller 🏆 </p>
          <S.ArrowImage_best src={Arrow1} alt="arrow" flip small/>
        </S.StyledTodayBook_best>

        <S.StyledHr ref={arrowRef} isVisible={isExtraVisible}/>

        <S.StyledTodayBook_pub ref={newPubRef} isVisible={isExtraVisible}>
          <p className="pub"> ✨ New <br /> Published ✨</p>
          <S.ArrowImage src={Arrow1} alt="arrow" small/>
        </S.StyledTodayBook_pub>

        <S.BookCardContainer_best>
            {bestSellerBooks.map((book, idx) => (
          <BookCard
            key={idx}
            title={book.title}
            author={book.author}
            image={book.cover}
          />
          ))}  
        </S.BookCardContainer_best>
        <S.StyledEllipsis />

        <S.StyledHr />

        <S.BookCardContainer_pub>
            {bestSellerBooks.map((book, idx) => (
          <BookCard
            key={idx}
            title={book.title}
            author={book.author}
            image={book.cover}
          />
          ))}
        </S.BookCardContainer_pub>
        <S.StyledEllipsis_pub />

      </S.Main3Container>

    </S.MainContainer>
  );
};

export default Main;
