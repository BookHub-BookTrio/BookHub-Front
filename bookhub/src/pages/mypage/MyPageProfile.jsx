import React from 'react';
import styles from "../mypage/MyPage.module.css";
import defaultProfileIcon from "../../component/image/Profile.png";

const MyPageProfile = ({ formData, onEditClick }) => {
  const pictureUrl = formData.pictureUrl || defaultProfileIcon;

  return (
  <div className={styles.container}>
    <div className={styles.profileSection}>
      <img src={pictureUrl} alt="Profile" className={styles.profileImage} style={{
    objectFit: pictureUrl === defaultProfileIcon ? "contain" : "cover",
    backgroundColor: "white"}} />
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