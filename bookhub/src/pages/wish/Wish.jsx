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
      { id: 1, bookname: "죽고싶지만 떡볶이는 먹고싶어", author: "박세희", progress: "읽기 전", category: "에세이", star: "🙂" },
      { id: 2, bookname: "죽고싶지만 떡볶이는 먹고싶어", author: "박세희", progress: "읽기 전", category: "에세이", star: "🙂" },
      { id: 3, bookname: "죽고싶지만 떡볶이는 먹고싶어", author: "박세희", progress: "읽는 중", category: "에세이", star: "🙂" },
      { id: 4, bookname: "죽고싶지만 떡볶이는 먹고싶어", author: "박세희", progress: "읽는 중", category: "에세이", star: "🙂" },
      { id: 5, bookname: "죽고싶지만 떡볶이는 먹고싶어", author: "박세희", progress: "읽기 전", category: "에세이", star: "🙂" },
      { id: 6, bookname: "채식주의자", author: "한강", progress: "완료", category: "소설", star: "😊" },
      { id: 7, bookname: "채식주의자", author: "한강", progress: "완료", category: "소설", star: "😊" },
      { id: 8, bookname: "채식주의자", author: "한강", progress: "완료", category: "소설", star: "😊" },
      { id: 9, bookname: "죽고싶지만 떡볶이는 먹고싶어", author: "박세희", progress: "읽기 전", category: "에세이", star: "🙂" },
      { id: 10, bookname: "죽고싶지만 떡볶이는 먹고싶어", author: "박세희", progress: "읽는 중", category: "에세이", star: "🙂" },
      { id: 11, bookname: "죽고싶지만 떡볶이는 먹고싶어", author: "박세희", progress: "읽는 중", category: "에세이", star: "🙂" },
      { id: 12, bookname: "죽고싶지만 떡볶이는 먹고싶어", author: "박세희", progress: "읽기 전", category: "에세이", star: "🙂" },
      { id: 13, bookname: "죽고싶지만 떡볶이는 먹고싶어", author: "박세희", progress: "읽는 중", category: "에세이", star: "🙂" },
      { id: 14, bookname: "채식주의자", author: "한강", progress: "완료", category: "소설", star: "😊" },
      { id: 15, bookname: "채식주의자", author: "한강", progress: "읽기 전", category: "소설", star: "😊" },
      { id: 16, bookname: "채식주의자", author: "한강", progress: "완료", category: "소설", star: "😊" },
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
  const progressOptions = ["읽기 전", "읽는 중", "완료"];

  //statusButton 클릭 시 상태 바뀜
  const handleProgressClick = (index) => {
    setListData((prev) =>
      prev.map((item, i) => {
        if (i === index) {
          const currentIndex = progressOptions.indexOf(item.progress);
          const nextProgress =
            progressOptions[(currentIndex + 1) % progressOptions.length];
          return { ...item, progress: nextProgress };
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
              <th className={styles.titleCol}>독서 목록</th>
              <th className={styles.authorCol}>작가명</th>
              <th className={styles.progressCol}>진행상황</th>
              <th className={styles.categoryCol}>카테고리</th>
              <th className={styles.starCol}>만족도</th>
              <th className={styles.actionCol}></th>
            </tr>
          </thead>

          <tbody>
            {currentItems.map((item, index) => (
              <tr key={item.id} onClick={() => navigate(`/wish-detail/${item.id}`)} className={styles.tableRow}>
                <td>{item.bookname}</td>
                <td>{item.author}</td>
                <td onClick={(e) => e.stopPropagation()}>
                  <button className={`${styles.progressButton} ${styles[item.progress]}`}
                  onClick={() => handleProgressClick(startIndex + index)}>
                    <span className={styles.progressDot}></span>
                    {item.progress}
                  </button>
                </td>
                <td>{item.category}</td>
                <td>{item.star}</td>
                <td onClick={(e) => e.stopPropagation()}> 
                  <button className={styles.editButton}
                  onClick={() => navigate(`/wish-edit/${item.id}`)}>✎</button>
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
