import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./WishCreate.module.css";

const WishCreate = () => {
  const navigate = useNavigate();

  const [bookname, setBookname] = useState("");
  const [author, setAuthor] = useState("");
  const [progress, setProgress] = useState("읽기 전");
  const [category, setCategory] = useState("");
  const [star, setStar] = useState("🫥");
  const [content, setContent] = useState("");
  const [showStarOptions, setShowStarOptions] = useState(true);
  const [showCategoryOptions, setShowCategoryOptions] = useState(true);

  const progressOptions = ["읽기 전", "읽는 중", "완료"];

  const categoryDisplay = {
    ESSAY: "에세이",
    NOVEL: "소설",
    SELF_HELP: "자기개발",
    POETRY: "시",
    TECHNOLOGY: "기술/IT",
    ETC: "기타",
  };

  const progressMap = {
    "읽기 전": "UNREAD",
    "읽는 중": "READING",
    "완료": "FINISHED",
  };

  const starMap = {
    "😊": "good",
    "😐": "normal",
    "😞": "bad",
    "🫥": null,
  };

  const handleProgressClick = () => {
    const currentIndex = progressOptions.indexOf(progress);
    const nextProgress = progressOptions[(currentIndex + 1) % progressOptions.length];
    setProgress(nextProgress);
  };

  const handleStarClick = (value) => {
    setStar(value);
    setShowStarOptions(false);
  };

  const handleCategoryClick = (selected) => {
    setCategory(selected);
    setShowCategoryOptions(false);
  };

  const handleCreate = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/wish`,
        {
          bookname,
          author,
          progress: progressMap[progress],
          category,
          star: starMap[star],
          content,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      console.log("등록 성공:", response.data);
      navigate("/wish");
    } catch (error) {
      console.error("등록 실패:", error.response?.data || error.message);
      alert("등록에 실패했습니다.");
    }
  };

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <div className={styles.titleArea}>
          <label className={styles.titleLabel}>도서명</label>
          <input
            type="text"
            className={styles.titleInput}
            value={bookname}
            onChange={(e) => setBookname(e.target.value)}
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
                <button className={styles.progressButton} onClick={handleProgressClick}>
                  <span className={styles.progressDot}></span> {progress}
                </button>
              </td>
            </tr>
            <tr>
              <th>카테고리</th>
              <td>
                <div className={styles.categoryArea}>
                  {showCategoryOptions ? (
                    <div className={styles.categoryOptions}>
                      {Object.keys(categoryDisplay).map((key) => (
                        <button key={key} onClick={() => handleCategoryClick(key)}>
                          {categoryDisplay[key]}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <button
                      className={styles.categoryButton}
                      onClick={() => setShowCategoryOptions(true)}
                    >
                      {categoryDisplay[category] || "카테고리"}
                    </button>
                  )}
                </div>
              </td>
            </tr>
            <tr>
              <th>만족도</th>
              <td>
                <div className={styles.starArea}>
                  {showStarOptions ? (
                    <div className={styles.starOptions}>
                      <button onClick={() => handleStarClick("😊")}>😊</button>
                      <button onClick={() => handleStarClick("😐")}>😐</button>
                      <button onClick={() => handleStarClick("😞")}>😞</button>
                    </div>
                  ) : (
                    <button
                      className={styles.starButton}
                      onClick={() => setShowStarOptions(true)}
                    >
                      {star}
                    </button>
                  )}
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <div className={styles.contentArea}>
          <textarea
            className={styles.textarea}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="감상을 입력하세요"
          />
        </div>

        <div className={styles.buttonGroup}>
          <button className={styles.backButton} onClick={() => navigate(-1)}>BACK</button>
          <button className={styles.createButton} onClick={handleCreate}>CREATE</button>
        </div>
      </div>
    </div>
  );
};

export default WishCreate;
