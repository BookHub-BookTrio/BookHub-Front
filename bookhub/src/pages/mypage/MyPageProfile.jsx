import React from 'react';
import styles from "../mypage/MyPage.module.css";
import profileIcon from "../../component/image/Profile.png";

const MyPageProfile = ({ formData, onEditClick }) => (
  <div className={styles.container}>
    <div className={styles.profileSection}>
      <img src={profileIcon} alt="Profile" className={styles.profileImage} />
    </div>
    <div className={styles.infoContainer}>
      {[
        { label: "이름", value: formData.name },
        { label: "별명", value: formData.nickname },
        { label: "소개", value: formData.introduction },
        { label: "이메일", value: formData.email },
      ].map((item, index) => (
        <div className={styles.infoRow} key={index}>
          <span className={styles.label}>{item.label}</span>
          <span className={styles.value}>{item.value}</span>
        </div>
      ))}
    </div>
    <button className={styles.editButton} onClick={onEditClick}>EDIT</button>
  </div>
);

export default MyPageProfile;