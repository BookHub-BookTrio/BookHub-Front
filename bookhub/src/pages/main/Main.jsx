import React, { useEffect, useRef, useState } from "react";
import * as S from "./MainStyles.jsx";
import MainBook from "../../component/image/MainBook_remove.png";
import MainBook_aladin from "../../component/image/MainBook_aladin.png";
import Arrow1 from "../../component/image/Arrow.png";
import BookCard from "../../component/main_aladin/BookCard.jsx";
import AOS from "aos";
import useMainBook from "../../component/hooks/useMainBook.js";

export const Main = () => {
  const overlap3Ref = useRef(null);
  const bookCardRef = useRef(null);
  const bestRef = useRef(null);
  const newPubRef = useRef(null);
  const arrowRef = useRef(null);

  const [isVisible, setIsVisible] = useState(false);
  const [isBookVisible, setIsBookVisible] = useState(false);
  const [isExtraVisible, setIsExtraVisible] = useState(false);

  const { todayBooks, newPublishedBooks, bestSellerBooks } = useMainBook();  // 커스텀 훅 호출

  // main - 2aladin api random 2 팝업
  const [selectedBook, setSelectedBook] = useState(null); 
  const [showPopup, setShowPopup] = useState(false);

  // main - 3 aladin api best 2 get
  const [bestIndex, setBestIndex] = useState(0);
  const [newPubIndex, setNewPubIndex] = useState(0);
  
  // ellipsis 연동 
  const bestPageCount = Math.ceil(bestSellerBooks.length / 3);
  const newPubPageCount = Math.ceil(newPublishedBooks.length / 3);

  const handleBookClick = (book) => {
    setSelectedBook(book);
    setShowPopup(true);
  };

  const handlePrev = (setter, pageCount) => {
    setter(prev => (prev - 1 + pageCount) % pageCount);
  };
  const handleNext = (setter, pageCount) => {
    setter(prev => (prev + 1) % pageCount);
  };
  
  useEffect(() => {
    AOS.init({ 
      easing: "ease-out", 
      duration: 2000
    });

    // main_2 오늘의 책 (텍스트) 감지
    const observer1 = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    // main_2, 3 감지
    const targetMap = new Map();

    const handleIntersection = (entries) => {
      entries.forEach(entry => {
        targetMap.set(entry.target, entry.isIntersecting);
      });
  
      // 하나라도 보이면 true
      const isAnyVisible = Array.from(targetMap.values()).some(val => val === true);
      setIsBookVisible(isAnyVisible);
    };
  
    const observer2 = new IntersectionObserver(handleIntersection, {
      threshold: 0.3,
    });
  
    const targets = [bookCardRef.current, bestRef.current, newPubRef.current, arrowRef.current];
    targets.forEach((target) => {
      if (target) {
        targetMap.set(target, false);
        observer2.observe(target);
      }
    });

    // main_3 newPublished + bestSeller 텍스트
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

  // 기본 더미 카드 렌더링 함수
  const renderDummyCards = () => (
    <>
      <BookCard title="title" author="작가" image="/default-cover.png" />
      <BookCard title="title" author="작가" image="/default-cover.png" />
      <BookCard title="title" author="작가" image="/default-cover.png" />
    </>
  );

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
      <S.StyledTodayBook ref={overlap3Ref} $isVisible={isVisible}>
        <p>📜 TODAY’S <br /> BOOK</p>
        <S.ArrowImage src={Arrow1} alt="arrow" />
        <p className="today">오늘의 추천 책을<br /> 확인해 보세요</p>
      </S.StyledTodayBook>

      <S.BlurEffect className="top-left" $isVisible={isBookVisible} />
      <S.BlurEffect className="bottom-right" $isVisible={isBookVisible} />

      <S.StyledBookCard ref={bookCardRef} $isVisible={isVisible}  style={{ visibility: showPopup ? "hidden" : "visible" }}>
        {todayBooks.map((book, idx) => (
        <S.BookWrapper key={idx} onClick={() => handleBookClick(book)}>
          <S.BookImage src={MainBook_aladin} alt="aladin" $isVisible={isVisible} />
            {!book.cover && <S.BookName>{book.title}</S.BookName>}
            {book.cover && (
              <S.BookImage_2 src={book.cover} alt="aladin_book" />
            )}
        </S.BookWrapper>
        ))}
      </S.StyledBookCard>

      {/* Main_2 popup */}
      {showPopup && selectedBook && (
        <S.PopupOverlay onClick={() => setShowPopup(false)}>
         <S.PopupBox data-aos="fade-up" data-aos-duration="300"
         onClick={(e) => e.stopPropagation()}>
          <S.BookCover style={{ backgroundImage: `url(${selectedBook.cover})` }} />
            <S.BookContent>
              <S.BookTitlePopup>{selectedBook.title}</S.BookTitlePopup>
              <S.BookAuthorPopup>{selectedBook.author}</S.BookAuthorPopup>
              <S.BookDescriptionPopup>{selectedBook.description}</S.BookDescriptionPopup>
              <S.BookPublisherPopup>출판사: {selectedBook.publisher}</S.BookPublisherPopup>
              <S.CloseButton onClick={() => setShowPopup(false)}>닫기</S.CloseButton>
            </S.BookContent>
         </S.PopupBox>
        </S.PopupOverlay>
      )}

      {/* Main_3 */}
      <S.Main3Container>
        <S.StyledTodayBook_best ref={bestRef} $isVisible={isExtraVisible}>
          <p className="best"> 🏆 Best seller 🏆 </p>
          <S.ArrowImage_best src={Arrow1} alt="arrow" $flip $small/>
        </S.StyledTodayBook_best>

        <S.StyledHr ref={arrowRef} $isVisible={isExtraVisible}/>

        <S.StyledTodayBook_pub ref={newPubRef} $isVisible={isExtraVisible}>
          <p className="pub"> ✨ New <br /> Published ✨</p>
          <S.ArrowImage src={Arrow1} alt="arrow" $small/>
        </S.StyledTodayBook_pub>

        <S.BookCardContainer_best $isVisible={isExtraVisible}>
          <S.NavButton onClick={() => handlePrev(setBestIndex, bestPageCount)}>&lt;</S.NavButton>
          {(bestSellerBooks && bestSellerBooks.length > 0) ? (
            bestSellerBooks
            .slice(bestIndex * 3, bestIndex * 3 + 3)
            .map((book, idx) => (
          <BookCard
            key={idx}
            title={book.title}
            author={book.author}
            image={book.cover}
            onClick={() => {
              setSelectedBook(book);
              setShowPopup(true);
            }}
          />
          ))
          ) : renderDummyCards()}     

          <S.NavButton onClick={() => handleNext(setBestIndex, bestPageCount)}>&gt;</S.NavButton>
        </S.BookCardContainer_best>
        <S.StyledEllipsis_best>
          {Array.from({ length: bestPageCount }, (_, idx) => (
          <S.Dot key={idx} $active={idx === bestIndex} />
          ))}
        </S.StyledEllipsis_best>

        <S.StyledHr />

        <S.BookCardContainer_pub $isVisible={isExtraVisible}>
        <S.NavButton onClick={() => handleNext(setNewPubIndex, newPubPageCount)}>&lt;</S.NavButton>
          {(newPublishedBooks && newPublishedBooks.length > 0) ? (
            newPublishedBooks
            .slice(newPubIndex * 3, newPubIndex * 3 + 3)
            .map((book, idx) => (
          <BookCard
            key={idx}
            title={book.title}
            author={book.author}
            image={book.cover}
            onClick={() => {
              setSelectedBook(book);
              setShowPopup(true);
            }}
          />
          ))
          ) : renderDummyCards()}

        <S.NavButton onClick={() => handleNext(setNewPubIndex, newPubPageCount)}>&gt;</S.NavButton>
        </S.BookCardContainer_pub>
        <S.StyledEllipsis_pub>
          {Array.from({ length: newPubPageCount }, (_, idx) => (
          <S.Dot key={idx} $active={idx === newPubIndex} />
          ))}
        </S.StyledEllipsis_pub>

      </S.Main3Container>

    </S.MainContainer>
  );
};

export default Main;
