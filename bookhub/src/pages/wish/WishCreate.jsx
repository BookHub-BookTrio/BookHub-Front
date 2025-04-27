import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./WishCreate.module.css";

const WishCreate = () => {
  const navigate = useNavigate();

  const [bookname, setBookname] = useState("");
  const [author, setAuthor] = useState("");
  const [progress, setProgress] = useState("읽기 전");
  const [category, setCategory] = useState("");
  const [star, setStar] = useState("🫥");
  const [content, setContent] = useState("");
  const [showStarOptions, setShowStarOptions] = useState(false);
  const [showCategoryOptions, setShowCategoryOptions] = useState(false);

  const progressOptions = ["읽기 전", "읽는 중", "완료"];

  const categoryDisplay = {
    ESSAY: "에세이",
    NOVEL: "소설",
    SELF_HELP: "자기개발",
    POETRY: "시",
    TECHNOLOGY: "기술/IT",
    ETC: "기타",
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

  const handleDone = () => {
    console.log({
      bookname,
      author,
      progress,
      category,
      star,
      content,
    });
    navigate("/wish");
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
                  <button
                    className={styles.categoryButton}
                    onClick={() => setShowCategoryOptions((prev) => !prev)}
                  >
                    {categoryDisplay[category] || "카테고리"}
                  </button>
                  {showCategoryOptions && (
                    <div className={styles.categoryOptions}>
                      {Object.keys(categoryDisplay).map((key) => (
                        <button key={key} onClick={() => handleCategoryClick(key)}>
                          {categoryDisplay[key]}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </td>
            </tr>
            <tr>
              <th>만족도</th>
              <td>
                <div className={styles.starArea}>
                  <button
                    className={styles.starButton}
                    onClick={() => setShowStarOptions((prev) => !prev)}
                  >
                    {star}
                  </button>
                  {showStarOptions && (
                    <div className={styles.starOptions}>
                      <button onClick={() => handleStarClick("😊")}>😊</button>
                      <button onClick={() => handleStarClick("😐")}>😐</button>
                      <button onClick={() => handleStarClick("😞")}>😞</button>
                    </div>
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
          <button className={styles.doneButton} onClick={handleDone}>DONE</button>
        </div>
      </div>
    </div>
  );
};

export default WishCreate;
