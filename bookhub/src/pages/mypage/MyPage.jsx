import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import styles from "../mypage/MyPage.module.css";
import profileIcon from "../../../src/component/image/Profile.png"; // 프로필 이미지
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend, } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

//막대 그래프 요소 받아야 함
const getLast6Months = () => {
  const now = new Date();
  const labels = [];
  const monthIndexArr = [];

  for (let i = 1; i <= 6; i++) {
    const date = new Date(now.getFullYear(), now.getMonth() -i, 1);
    const monthIndex = date.getMonth(); //0~11
    labels.push(date.toLocaleString("en-US", { month: "short"})); //Jan, Feb...로 나오게
    monthIndexArr.push(monthIndex);
  }
  //과거부터 정렬
  return { labels: labels.reverse(), monthIndexArr: monthIndexArr.reverse() };
};

//백에서 받아야 함
const fullData = [8, 12, 14, 18, 15, 5, 6, 24, 13, 17, 7, 11];

//최근 6개월과 데이터만 추출
const { labels: recentLabel, monthIndexArr } = getLast6Months();
const recentData = monthIndexArr.map(index => fullData[index]);

const barData = {
  labels: recentLabel,
  datasets: [
    {
      label: 'Books Read',
      data: recentData,
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

  const [formData, setFormData] = useState({
    name: "",
    nickname: "",
    introduction: "",
    email: "",
  });

  const handleEditClick = () => {
    navigate(`/mypage-edit`);
  };

  //회원 정보 가져오기 GET
  useEffect(() => {
    const fetchMemberInfo = async () => {
      // const token = localStorage.getItem("accessToken");

      // //로그인 상태 아니면 접근 불가
      // if (!token) {
      //   const goLogin = window.confirm("로그인이 필요합니다. 로그인 페이지로 이동할까요?");
      //   if (goLogin) {
      //     navigate("/home");
      //   }else {
      //     navigate("/");
      //   }
      //   return;
      // }

      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/v1/member`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        const data = response.data.data;
        console.log("회원정보:", data); //디버깅용

        setFormData({
          name: data.name || "",
          nickname: data.nickname || "",
          introduction: data.introduction || "",
          email: data.email || "",
        });
      } catch (error) {
        console.error("회원 정보 가져오기 실패:", error.response?.data || error.message);
        alert("회원 정보를 불러오는 데 실패했습니다.");
      }
    };
    fetchMemberInfo();
  }, [navigate]);

  return (
    <div className={styles.background}>
    <div className={styles.container}>
      {/* 프로필 영역 */}
      <div className={styles.profileSection}>
        <img src={profileIcon} alt="Profile" className={styles.profileImage} />
      </div>

      {/* 내 정보 - 백에서 가져오기 */} 
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