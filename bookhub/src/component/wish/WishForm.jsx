import styles from "./WishForm.module.css";

const WishForm = ({
    bookname,
    author,
    progress,
    category,
    star,
    content,
    showStarOptions,
    showCategoryOptions,
    onBooknameChange,
    onAuthorChange,
    onProgressClick,
    onCategoryClick,
    onStarClick,
    onContentChange,
    onToggleCategoryOptions,
    onToggleStarOptions,
		showBack = false,
		showCreate = false,
		showEdit = false,
		showDelete = false,
  	showDone = false,
  }) => {
    const categoryDisplay = {
      ESSAY: "에세이",
      NOVEL: "소설",
      SELF_HELP: "자기개발",
      POETRY: "시",
      TECHNOLOGY: "기술/IT",
      ETC: "기타",
    };
  
    const starOptions = {GOOD: "😊", NORMAL: "😐", BAD: "😞", "😊":"😊", "😐":"😐", "😞":"😞"};
  
    return (
      <div className={styles.background}>
        <div className={styles.container}>
          <div className={styles.titleArea}>
            <label className={styles.titleLabel}>도서명</label>
            <input
              type="text"
              className={styles.titleInput}
              value={bookname}
              onChange={onBooknameChange}
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
                    onChange={onAuthorChange}
                    placeholder="작가명을 입력하세요"
                  />
                </td>
              </tr>
              <tr>
                <th>진행상황</th>
                <td>
                  <button className={styles.progressButton} onClick={onProgressClick}>
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
                          <button key={key} onClick={() => onCategoryClick(key)}>
                            {categoryDisplay[key]}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <button
                        className={styles.categoryButton}
                        onClick={onToggleCategoryOptions}
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
                        {starOptions.map((opt) => (
                          <button key={opt} onClick={() => onStarClick(opt)}>
                            {opt}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <button className={styles.starButton} onClick={onToggleStarOptions}>
                        {starOptions[star] || star}
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
              onChange={onContentChange}
              placeholder="감상을 입력하세요"
            />
          </div>
  
          <div className={styles.buttonGroup}>
            <div className={styles.leftGroup}>
              {showBack && (
							<button className={styles.backButton} onClick={showBack}>BACK</button>)}
            </div>

            <div className={styles.rightGroup}>
              {showCreate && (
                <button className={styles.createButton} onClick={showCreate}>CREATE</button>)}
              {showDone && (
		  					<button className={styles.doneButton} onClick={showDone}>DONE</button>)}
			  			<div className={styles.detailButton}> 
				  			{showDelete && (
              	  <button className={styles.deleteButton} onClick={showDelete}>DELETE</button>)}
						  	{showEdit && (
               	  <button className={styles.editButton} onClick={showEdit}>EDIT</button>)}
              </div>      		
					  </div>      
			  	</div>
      </div>
    </div>
  );
};

export default WishForm;