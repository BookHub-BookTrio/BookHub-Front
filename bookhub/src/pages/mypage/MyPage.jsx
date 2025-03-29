import React, { useState } from "react";
import styles from "./MyPage.module.css";
import profileIcon from "../../component/image/Profile.png"; // 프로필 이미지
// import doneIcon from "../"; // 수정 아이콘

const Mypage = () => {
  const [formData, setFormData] = useState({
    name: "",
    nickname: "",
    bio: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...FormData, [e.target.name]: e.target.value});
  };

  return (
    <div className={styles.container}>

      {/* 헤더 */}
      {/* <header className={styles.header}>
        <div className={styles.logo}> BookHub</div>
        <nav>
          <span className={styles.active}>MYPAGE</span>
          <span>HOME</span>
          <span>WISH</span>
          <span>COMMUNITY</span>
        
          <button className={styles.logout}>로그아웃</button>
        </nav>
      </header>  */}

      {/* 프로필 영역 */}
      <div className={styles.profileSection}>
        <img src={profileIcon} alt="Profile" className={styles.profileImage} />
      </div>

      {/* 정보 입력 영역 -> 입력 받게 변경해야함 */} 
      <div className={styles.infoContainer}>
        {[
          { label: "이름", name: "name", value: formData.name },
          { label: "별명", name: "nickname", value: formData.nickname },
          { label: "소개", name: "bio", value: formData.bio },
          { label: "이메일", name: "email", value: formData.email },
          { label: "비밀번호", name: "password", value: formData.password },
        ].map((item, index) => (
          <div className={styles.infoRow} key={index}>
            <span className={styles.label}>{item.label}</span>
            <input
              type={item.name === "password" ? "password" : "text"}
              name={item.name}
              value={item.value}
              onChange={handleChange}
              className={styles.inputField}
              placeholder="입력하세요"
            />
            {/* <img src={doneIcon} alt="Edit" className={styles.editIcon} /> */}
          </div>
        ))}
      </div>

      {/* 완료 버튼 */}
      <button className={styles.doneButton}>DONE</button>
    </div>
  );
};

export default Mypage;
