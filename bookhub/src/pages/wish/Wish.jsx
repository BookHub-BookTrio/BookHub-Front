import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import styles from "./Wish.module.css";

const Wish = () => {
  const [listData, setListData] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const pageFromState = location.state?.page;
    if (pageFromState) setCurrentPage(pageFromState);
  }, [location.state]);

  const itemsPerPage = 7;

  const filteredData = listData.filter((item) =>
    item.bookname?.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredData.slice(startIndex, startIndex + itemsPerPage);
  const emptyRows = Array(itemsPerPage - currentItems.length).fill({});


  useEffect(() => {
    const fetchWishList = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/v1/wish`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        const sorted = response.data.data.sort((a, b) => b.id - a.id);
        setListData(sorted);
      } catch (error) {
        console.error("위시리스트 가져오기 실패:", error.response?.data || error.message);
      }
    };
    fetchWishList();
  }, []);
  
  //진행 상황
  const progressOptions = {
    UNREAD: "읽기 전",
    READING: "읽는 중",
    FINISHED: "완료",
  };

  const categoryOptions = {
    ESSAY: "에세이",
    NOVEL: "소설",
    SELF_HELP: "자기개발",
    POETRY: "시",
    TECHNOLOGY: "기술/IT",
    ETC: "기타",
  };

  const starOptions = {
    GOOD: "😊",
    NORMAL: "😐",
    BAD: "😞",
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
            {currentItems.map((item) => (
              <tr key={item.id} onClick={() => navigate(`/wish-detail/${item.id}`, {state: {page: currentPage}})} className={styles.tableRow}>
                <td>{item.bookname}</td>
                <td>{item.author}</td>
                <td><button className={styles.progressButton}><span className={styles.progressDot}></span>{progressOptions[item.progress]}</button></td>
                <td>{categoryOptions[item.category]}</td>
                <td>{starOptions[item.star]}</td>
                <td onClick={(e) => e.stopPropagation()}> 
                  <button className={styles.editButton}
                  onClick={() => navigate(`/wish-edit/${item.id}`, {state: {page: currentPage}})}>✎</button>
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
