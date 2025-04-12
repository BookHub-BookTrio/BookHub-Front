import React from "react";
import { useNavigate } from 'react-router-dom';
import styles from "../mypage/MyPage.module.css";
import Header from "../../../src/component/header/Header.jsx";
import profileIcon from "../../../src/component/image/Profile.png"; // 프로필 이미지
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend, } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

//막대 그래프 요소 받아야 함
const barData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].slice(-6),
  datasets: [
    {
      label: 'Books Read',
      data: [8, 12, 14, 18, 15, 5, 6, 24, 13, 17, 7, 11].slice(-6),
      backgroundColor: '#7C8C6E',
    },
  ],
};

//원 그래프 요소 받아야 함
const pieData = {
  labels: ['소설', '에세이', '자기계발서', '기타', '시'],
  datasets: [
    {
      label: 'Genre',
      data: [26, 24, 19, 16, 15],
      backgroundColor: ['#42593C', '#A2AF94', '#D3D7C7', '#D1C4A7', '#E9DCC7'],
    },
  ],
};

const Mypage = () => {
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate(`/mypage-edit`);
  };

  return (
    <div className={styles.background}>
      <Header />
    <div className={styles.container}>
      {/* 프로필 영역 */}
      <div className={styles.profileSection}>
        <img src={profileIcon} alt="Profile" className={styles.profileImage} />
      </div>

      {/* 내 정보 - 백에서 가져오기 */} 
      <div className={styles.infoContainer}>
        {[
          { label: "이름", value: "민정" },
          { label: "별명", value: "민대뉘" },
          { label: "소개", value: "독서왕을 꿈꾸는 삐약이" },
          { label: "이메일", value: "0519suzy@naver.com" },
        ].map((item, index) => (
          <div className={styles.infoRow} key={index}>
            <span className={styles.label}>{item.label}</span>
            <span className={styles.value}>{item.value}</span>
          </div>
        ))}
      </div>

      {/* EDIT 버튼 */}
      <button className={styles.editButton} onClick={handleEditClick}>EDIT</button>
    </div>

    <main className={styles.mainContent}>
        <h2 className={styles.barTitle}>My Literary Journey</h2>
        <div className={styles.chartWrapper}>
          <div className={styles.barChart}>
            <Bar data={barData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
          </div>
          <div className={styles.dnaSection}>
            <h2 className={styles.pieTitle}>My Literary DNA</h2>
            <Pie data={pieData} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Mypage;