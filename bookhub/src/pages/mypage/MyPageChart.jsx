import React, { useEffect, useState, useMemo } from 'react';
import axios from "axios";
import styles from "./MyPage.module.css";
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

const getLast6Months = () => {
  const now = new Date();
  const labels = [];
  const monthArr = [];

  for (let i = 5; i >= 0; i--) { //이번 달 포함 최근 6개월
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    labels.push(date.toLocaleString("en-US", { month: "short" }));
    monthArr.push({ year: date.getFullYear(), month: date.getMonth() + 1 });
  }

  return { labels, monthArr};
};

const categoryDisplay = {
  ESSAY: "에세이",
  NOVEL: "소설",
  SELF_HELP: "자기개발",
  POETRY: "시",
  TECHNOLOGY: "기술/IT",
  ETC: "기타",
};

const MyPageChart = () => {
  const [recentCounts, setRecentCounts] = useState([]);
  const [genreData, setGenreData] = useState([]);
  const { labels: recentLabel, monthArr } = useMemo(() => {
		return getLast6Months();
	}, []);

  useEffect(() => {
    const fetchMonthlyCounts = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) return;

      const promises = monthArr.map(({ year, month }) =>
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/wish/month-statistics`, {
          headers: { Authorization: `Bearer ${token}` },
          params: { year, month },
        }).then(res => res.data.data).catch(() => 0)
      );

      const counts = await Promise.all(promises);
      setRecentCounts(counts);
    };
    fetchMonthlyCounts();
  }, [monthArr]);

  useEffect(() => {
    const fetchGenreStats = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) return;

      try {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/wish/book-genre`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setGenreData(res.data.data);
      } catch (error) {
        console.error("장르 통계 조회 실패", error);
      }
    };
    fetchGenreStats();
  }, []);

  const barData = useMemo(() => ({
    labels: recentLabel,
    datasets: [{
      label: 'Books Read',
      data: recentCounts,
      backgroundColor: '#7C8C6E',
    }],
  }), [recentCounts, recentLabel]);

  const maxY = useMemo(() => {
    const maxCount = Math.max(...recentCounts, 0);
    return maxCount === 0 ? 2 : maxCount + 1;
  }, [recentCounts]);

  const pieData = useMemo(() => {
    if (genreData.length === 0) {
      return {
        labels: ['책을 읽읍시다'],
        datasets: [{
          data:[1], backgroundColor: ['#e0e0e0'], borderColor: ['#ccc'], borderWidth: 1}]
      }
    }
    return {
    labels: genreData.map(item => categoryDisplay[item.category] || item.category),
    datasets: [{
      data: genreData.map(item => item.percentage),
      backgroundColor: ['#42593C', '#A2AF94', '#D3D7C7', '#D1C4A7', '#E9DCC7', '#F0EDE5'],
    }],
  };
  }, [genreData]);

  return (
    <section>
      <h2 className={styles.barTitle}>My Literary Journey</h2>
      <div className={styles.chartWrapper}>
        <div className={styles.barChart}>
          <Bar data={barData} options={{ responsive: true, plugins: { legend: { display: false } },
        scales: {y: { beginAtZero: true, max: maxY, ticks: {stepSize: 1, precision: 0}}}}} />
        </div>
        <div className={styles.dnaSection}>
          <h2 className={styles.pieTitle}>My Literary DNA</h2>
          <Pie data={pieData} />
        </div>
      </div>
    </section>
  );
};

export default MyPageChart;