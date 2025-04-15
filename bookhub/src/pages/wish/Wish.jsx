import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Wish.module.css";

const Wish = () => {
  const [listData, setListData] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

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
        setListData(response.data.data);
      } catch (error) {
        console.error("위시리스트 가져오기 실패:", error.response?.data || error.message);
      }
    };
    fetchWishList();
  }, []);

  const handelPageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <h2 className={styles.title}>Book Wish List</h2>
        <div className={styles.searchArea}>
          <input type="text" placeholder="책 제목 검색" value={search} onChange={(e) => setSearch(e.target.value)} />
          <button className={styles.searchButton}>SEARCH</button>
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
            {currentItems.map((item,index) => (
              <tr key={index}>
                <td>{item.bookname}</td>
                <td>{item.author}</td>
                <td>
                  <button className={styles.statusButton}>{item.status}</button>
                </td>
                <td>{item.category}</td>
                <td>{item.star}</td>
                <td>
                  <button className={styles.editButton}>✎</button>
                </td>
              </tr>
            ))}

            {emptyRows.map((_, idx) => (
              <tr key={`empty-${idx}`}>
                <td>&nbsp;</td>
                <td></td>
                <td><button className={styles.statusButton}></button></td>
                <td></td>
                <td></td>
                <td><button className={styles.editButton}></button></td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className={styles.pagination}>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
            key={i}
            className={currentPage === i + 1 ? styles.active : ""}
            onClick={() => handelPageChange(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>

        <button className={styles.createButton}>CREATE</button>
      </div>
    </div>
  );
};

export default Wish;
