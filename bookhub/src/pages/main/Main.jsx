import React, { useEffect, useRef, useState } from "react";
import * as S from "./MainStyles.jsx";
import MainBook from "../../component/image/MainBook_remove.png";
import MainBook_aladin from "../../component/image/MainBook_aladin.png";
import Arrow1 from "../../component/image/Arrow.png";
import BookCard from "../../component/main_aladin/BookCard.jsx";
import axios from "axios";

export const Main = () => {
  const overlap3Ref = useRef(null);
  const bookCardRef = useRef(null);
  const bestRef = useRef(null);
  const newPubRef = useRef(null);
  const arrowRef = useRef(null);

  const [isVisible, setIsVisible] = useState(false);
  const [isBookVisible, setIsBookVisible] = useState(false);
  const [isExtraVisible, setIsExtraVisible] = useState(false);

// Main - 2 추천 책 조회
const fetchTodayBooks = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/book/random`);
    setTodayBooks(response.data.data);
  } catch (error) {
    console.error(error.response?.data?.message || "도서 정보를 불러오는 중 오류가 발생했습니다.");
    // API 요청 실패 시 더미 데이터로 기본 컴포넌트 유지
    setTodayBooks([
      { title: "BOOK NAME" },
      { title: "BOOK NAME" }
    ]);
  }
};

  // main - 2 aladin api random 2 get
  const [todayBooks, setTodayBooks] = useState([]);

  // main - 2aladin api random 2 팝업
  const [selectedBook, setSelectedBook] = useState(null); 
  const [showPopup, setShowPopup] = useState(false);

 // main - 3 aladin api new 2 get
 const [newPublishedBooks, setNewPublishedBooks ] = useState([]);
 // main - 3 aladin api best 2 get
 const [bestSellerBooks3, setBestSellerBooks] = useState([]);


  const handleBookClick = (book) => {
    setSelectedBook(book);
    setShowPopup(true);
  };

  const fetchNewPublishedBooks = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/book/new`);
      setNewPublishedBooks(response.data.data);
    } catch (error) {
      console.error(error.response?.data?.message || "신간 정보를 불러오는 중 오류가 발생했습니다.");
    }
  };

  const fetchBestSellerBooks = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/book/bestseller`);
      setBestSellerBooks(response.data.data);
    } catch (error) {
      console.error(error.response?.data?.message || "베스트셀러 정보를 불러오는 중 오류가 발생했습니다.");
    }
  };
  
  useEffect(() => {

    fetchTodayBooks();
    fetchNewPublishedBooks();
    fetchBestSellerBooks();

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
        {todayBooks.map((book, idx) => (
        <S.BookWrapper key={idx} onClick={() => handleBookClick(book)}>
          <S.BookImage src={MainBook_aladin} alt="aladin" isVisible={isBookVisible} />
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
          {(bestSellerBooks3 && bestSellerBooks3.length > 0) ? (
            bestSellerBooks3.map((book, idx) => (
          <BookCard
            key={idx}
            title={book.title}
            author={book.author}
            image={book.cover}
          />
          ))
          ) : (
          // 서버 연결 없을 시 기본 더미 데이터
          <>
            <BookCard title="title" author="작가" image="/default-cover.png" />
            <BookCard title="title" author="작가" image="/default-cover.png" />
            <BookCard title="title" author="작가" image="/default-cover.png" />
          </>
          )}
        </S.BookCardContainer_best>
        <S.StyledEllipsis />

        <S.StyledHr />

        <S.BookCardContainer_pub>
          {(newPublishedBooks && newPublishedBooks.length > 0) ? (
            newPublishedBooks.map((book, idx) => (
          <BookCard
            key={idx}
            title={book.title}
            author={book.author}
            image={book.cover}
          />
          ))
          ) : (
        // 서버 연결 없을 시 기본 더미 데이터
        <>
          <BookCard title="title" author="작가" image="/default-cover.png" />
          <BookCard title="title" author="작가" image="/default-cover.png" />
          <BookCard title="title" author="작가" image="/default-cover.png" />
        </>
          )}
        </S.BookCardContainer_pub>
        <S.StyledEllipsis_pub />

      </S.Main3Container>

    </S.MainContainer>
  );
};

export default Main;
