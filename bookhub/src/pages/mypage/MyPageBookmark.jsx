import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../mypage/MyPage.module.css";
import axios from "axios";
import { BsBookmarkFill } from "react-icons/bs";

const MyPageBookmark = () => {
  const [bookmark, setBookmark] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/community/bookmark`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookmark(res.data || []);
      } catch (err) {
        console.error("북마크 조회 실패", err);
        setBookmark([]);
      }
    };

    fetchBookmarks();
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
    <section>
      <h2 className={styles.bookmarkTitle}>My Community Bookmark</h2>
      <table className={styles.bookmarkTable}>
        <thead><tr><th></th></tr></thead>
        <tbody>
          {currentItems.map((item, idx) => (
              <tr key={`data-${idx}`} className={styles.bookmarkRow}
              onClick={() => navigate(`/community/${item.id}`)}>
                <td className={styles.bmTitle}>{item.title}</td>
                <td><span className={styles.bmNickname}>{item.nickname}</span></td>
                <td className={styles.dateCol}><span className={styles.bmDate}>{item.createdat.slice(0, 10).replace(/-/g, '.')}</span></td>
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
    </section>
  );
};

export default MyPageBookmark;
