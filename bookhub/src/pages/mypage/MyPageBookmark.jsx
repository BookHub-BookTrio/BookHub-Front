import React, { useEffect, useState } from "react";
import styles from "../mypage/MyPage.module.css";
// import axios from "axios";
import { BsBookmarkFill } from "react-icons/bs";

const dummyBookmark = [
  { title: "오늘의 책", nickname: "현댠이", createdat: "2025.03.15" },
  { title: "독서 금단 현상", nickname: "민대뉘", createdat: "2024.05.19" },
  { title: "렛츠 고 스테디", nickname: "우때 뭐하영", createdat: "2024.08.21" },
  { title: "오구쌀피자쿰척", nickname: "이예응가", createdat: "2024.05.09" },
  { title: "마지막 연습문제", nickname: "책벌레", createdat: "2023.12.12" },
  { title: "토요일 독서모임", nickname: "지각왕", createdat: "2023.11.05" },
];

const MyPageBookmark = () => {
  const [bookmark, setBookmark] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    setBookmark(dummyBookmark);

    // const fetchBookmarks = async () => {
    //   try {
    //     const token = localStorage.getItem("accessToken");
    //     const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/community/bookmark`, {
    //       headers: { Authorization: `Bearer ${token}` },
    //     });
    //     setBookmark(res.data.data || []);
    //   } catch (err) {
    //     console.error("북마크 조회 실패", err);
    //     setBookmark([]);
    //   }
    // };

    // fetchBookmarks();
  }, []);

  const totalPages = Math.ceil(bookmark.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = bookmark.slice(startIndex, startIndex + itemsPerPage);
  const emptyRows = Array(itemsPerPage - currentItems.length).fill({});

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.mainContent}>
      <h2 className={styles.bookmarkTitle}>My Community Bookmark</h2>
      <table className={styles.bookmarkTable}>
        <thead><tr><th></th></tr></thead>
        <tbody>
          {currentItems.map((item, idx) => (
              <tr key={`data-${idx}`} className={styles.bookmarkRow}>
                <td className={styles.bmTitle}>{item.title}</td>
                <td><span className={styles.bmNickname}>{item.nickname}</span></td>
                <td className={styles.dateCol}><span className={styles.bmDate}>{item.createdat}</span></td>
                <td className={styles.bmIconFilled}><BsBookmarkFill /></td>
              </tr>
            ))}
          {emptyRows.map((_, idx) => (
              <tr key={`empty-${idx}`} className={styles.bookmarkRow}>
                <td>&nbsp;</td>
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
      </div>
    </div>
  );
};

export default MyPageBookmark;
