import React from 'react';
import styles from "../mypage/MyPage.module.css";
import defaultProfileIcon from "../../component/image/Profile.png";

const MyPageProfile = ({ formData, onEditClick }) => {
  const profileImageUrl = formData.profileImage || defaultProfileIcon;

  console.log("프로필 이미지 URL:", profileImageUrl);

  return (
  <div className={styles.container}>
    <div className={styles.profileSection}>
      <img src={profileImageUrl} alt="Profile" className={styles.profileImage} referrerPolicy="no-referrer" />
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
};

export default MyPageProfile;