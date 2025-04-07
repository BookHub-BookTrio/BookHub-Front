import React, { useState, useRef } from "react";
import styles from "./MyPage.module.css";
import Header from "../../component/header/Header.jsx";
import profileIcon from "../../component/image/Profile.png"; // 프로필 이미지
import pencil from "../../component/image/Pencil.png"; // 수정란 옆 연필 이미지

const MyPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    nickname: "",
    bio: "",
    email: "",
  });

  const inputRefs = useRef([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className={styles.background}>
      <Header />
      <div className={styles.container}>
        
        {/* 프로필 영역 */}
        <div className={styles.profileSection}>
          <img src={profileIcon} alt="Profile" className={styles.profileImage} />
        </div>

        {/* 정보 입력 영역 */}
        <div className={styles.infoContainer}>
          {[
            { label: "이름", name: "name", value: formData.name },
            { label: "별명", name: "nickname", value: formData.nickname },
            { label: "소개", name: "bio", value: formData.bio },
            { label: "이메일", name: "email", value: formData.email },
          ].map((item, index) => (
            <div className={styles.infoRow} key={index}>
              <span className={styles.label}>{item.label}</span>
              <input
                type="text"
                name={item.name}
                value={item.value}
                onChange={handleChange}
                className={styles.inputField}
                placeholder="입력하세요"
                ref={(el) => (inputRefs.current[index] = el)} // input 참조 저장
              />
              <img src={pencil} alt="" className={styles.pencil}
              onClick={() => inputRefs.current[index]?.focus()} />
            </div>
          ))}
        </div>

        {/* 완료 버튼 */}
        <button className={styles.doneButton}>DONE</button>
      </div>
    </div>
  );
};

export default MyPage;
