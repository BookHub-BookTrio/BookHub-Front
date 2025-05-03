import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
import styles from "./Wish.module.css";

const Wish = () => {
  const [listData, setListData] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const itemsPerPage = 7;

  const filteredData = listData.filter((item) =>
    item.bookname?.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredData.slice(startIndex, startIndex + itemsPerPage);
  const emptyRows = Array(itemsPerPage - currentItems.length).fill({});


  useEffect(() => {
    const mockData = [
      { bookname: "죽고싶지만 떡볶이는 먹고싶어", author: "박세희", status: "읽기 전", category: "에세이", star: "🙂" },
      { bookname: "죽고싶지만 떡볶이는 먹고싶어", author: "박세희", status: "읽기 전", category: "에세이", star: "🙂" },
      { bookname: "죽고싶지만 떡볶이는 먹고싶어", author: "박세희", status: "읽는 중", category: "에세이", star: "🙂" },
      { bookname: "죽고싶지만 떡볶이는 먹고싶어", author: "박세희", status: "읽는 중", category: "에세이", star: "🙂" },
      { bookname: "죽고싶지만 떡볶이는 먹고싶어", author: "박세희", status: "읽기 전", category: "에세이", star: "🙂" },
      { bookname: "채식주의자", author: "한강", status: "완료", category: "소설", star: "😊" },
      { bookname: "채식주의자", author: "한강", status: "완료", category: "소설", star: "😊" },
      { bookname: "채식주의자", author: "한강", status: "완료", category: "소설", star: "😊" },
      { bookname: "죽고싶지만 떡볶이는 먹고싶어", author: "박세희", status: "읽기 전", category: "에세이", star: "🙂" },
      { bookname: "죽고싶지만 떡볶이는 먹고싶어", author: "박세희", status: "읽는 중", category: "에세이", star: "🙂" },
      { bookname: "죽고싶지만 떡볶이는 먹고싶어", author: "박세희", status: "읽는 중", category: "에세이", star: "🙂" },
      { bookname: "죽고싶지만 떡볶이는 먹고싶어", author: "박세희", status: "읽기 전", category: "에세이", star: "🙂" },
      { bookname: "죽고싶지만 떡볶이는 먹고싶어", author: "박세희", status: "읽는 중", category: "에세이", star: "🙂" },
      { bookname: "채식주의자", author: "한강", status: "완료", category: "소설", star: "😊" },
      { bookname: "채식주의자", author: "한강", status: "읽기 전", category: "소설", star: "😊" },
      { bookname: "채식주의자", author: "한강", status: "완료", category: "소설", star: "😊" },
    ];

    setListData(mockData);
    // const fetchWishList = async () => {
    //   try {
    //     const response = await axios.get(
    //       `${process.env.REACT_APP_BACKEND_URL}/api/v1/wish`, {
    //         headers: {
    //           Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    //         },
    //       }
    //     );
    //     setListData(response.data.data);
    //   } catch (error) {
    //     console.error("위시리스트 가져오기 실패:", error.response?.data || error.message);
    //   }
    // };
    // fetchWishList();
  }, []);
  
  //진행 상황
  const statusOptions = ["읽기 전", "읽는 중", "완료"];

  //statusButton 클릭 시 상태 바뀜
  const handleStatusClick = (index) => {
    setListData((prev) =>
      prev.map((item, i) => {
        if (i === index) {
          const currentIndex = statusOptions.indexOf(item.status);
          const nextStatus =
            statusOptions[(currentIndex + 1) % statusOptions.length];
          return { ...item, status: nextStatus };
        }
        return item;
      })
    );
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev -1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <div className={styles.headerArea}>
          <h2 className={styles.title}>
            Book
            <br />
            Wish List
          </h2>
          <div className={styles.searchArea}>
            <input
              type="text"
              placeholder="책 제목 검색"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className={styles.searchButton}>SEARCH</button>
          </div>
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>독서 목록</th>
              <th>작가명</th>
              <th>진행상황</th>
              <th>카테고리</th>
              <th>만족도</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {currentItems.map((item, index) => (
              <tr key={index}>
                <td>{item.bookname}</td>
                <td>{item.author}</td>
                <td>
                  <button className={`${styles.statusButton} ${styles[item.status]}`}
                  onClick={() => handleStatusClick(startIndex + index)}>
                    <span className={styles.statusDot}></span>
                    {item.status}
                  </button>
                </td>
                <td>{item.category}</td>
                <td>{item.star}</td>
                <td>
                  <button className={styles.editButton}>✎</button>
                </td>
              </tr>
            ))}

            {emptyRows.map((_, idx) => (
              <tr kdy={`empty-${idx}`}>
                <td>&nbsp;</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className={styles.pagination}>
          <button onClick={handlePrev} disabled={currentPage === 1}>
            &lt;
          </button>
          <span>&nbsp;&nbsp; {currentPage} &nbsp;&nbsp;</span>
          <button onClick={handleNext} disabled={currentPage === totalPages}>
            &gt;
          </button>
        </div>

        <button className={styles.createButton} onClick={() => navigate("/wish-create")}>CREATE</button>
      </div>
    </div>
  );
};

export default Wish;
