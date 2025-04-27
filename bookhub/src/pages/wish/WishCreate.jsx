import React, { useState } from "react";
import styles from "./WishCreate.module.css";

const WishCreate = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");
  const [satisfaction, setSatisfaction] = useState("");
  const [review, setReview] = useState("");

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <div className={styles.titleArea}>
          <label className={styles.titleLabel}>도서명</label>
          <input
            type="text"
            className={styles.titleInput}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="도서명을 입력하세요"
          />
        </div>

        <table className={styles.infoTable}>
          <tbody>
            <tr>
              <th>작가</th>
              <td>
                <input
                  type="text"
                  className={styles.authorInput}
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="작가명을 입력하세요"
                />
              </td>
            </tr>
            <tr>
              <th>진행상황</th>
              <td>
                <button className={styles.statusButton} onClick={() => setStatus(status)}>
                  <span className={styles.statusDot}></span>
                  {status ? status : "진행상황 선택"}
                </button>
              </td>
            </tr>
            <tr>
              <th>카테고리</th>
              <td>
                <button className={styles.categoryButton} onclick={() => setCategory(category)}>
                  {category ? category : "카테고리 선택"}
                </button>
              </td>
            </tr>
            <tr>
              <th>만족도</th>
              <td>
                <button className={styles.satisfactionButton} onclick={() => setSatisfaction(satisfaction)}>
                  {satisfaction ? satisfaction : "😐"}
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <div className={styles.reviewArea}>
          <textarea
            className={styles.textarea}
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="감상을 입력하세요"
          />
        </div>

        <div className={styles.buttonGroup}>
          <button className={styles.backButton}>BACK</button>
          <button className={styles.doneButton}>DONE</button>
        </div>
      </div>
    </div>
  );
};

export default WishCreate;
