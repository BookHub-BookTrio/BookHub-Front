import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import styles from "./MyPage.module.css";
import Modal from "../../component/modal/Modal";
import MyPageProfile from "./MyPageProfile";
import MyPageChart from "./MyPageChart";
import MyPageBookmark from "./MyPageBookmark";

const Mypage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    nickname: "",
    introduction: "",
    email: "",
  });

  const chartRef = useRef(null);
  const bookmarkRef = useRef(null);
  const [chartVisible, setChartVisible] = useState(false);
  const [bookmarkVisible, setBookmarkVisible] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleEditClick = () => {
    navigate(`/mypage-edit`);
  };

  //회원 정보 가져오기 GET
  useEffect(() => {
    const fetchMemberInfo = async () => {
      const token = localStorage.getItem("accessToken");

      //로그인 상태 아니면 접근 불가
      if (!token) {
        setIsLoggedIn(false); 
        setShowLoginModal(true);
        return;
      }

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

  useEffect(() => {
    const options ={
     threshold: 0.1,
      root: document.querySelector(`.${styles.mainContainer}`),
    };

    const chartObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setChartVisible(true);
    }, { options });

    const bookmarkObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setBookmarkVisible(true);
    }, { options });

    if (chartRef.current) chartObserver.observe(chartRef.current);
    if (bookmarkRef.current) bookmarkObserver.observe(bookmarkRef.current);

    return () => {
      chartObserver.disconnect();
      bookmarkObserver.disconnect();
    };
  }, []);

  return (
    <>
    {!isLoggedIn && showLoginModal && (
      <Modal
      title="로그인이 필요합니다"
      content="로그인 페이지로 이동하시겠습니까?"
      onClose={() => navigate("/home")}
      onCancel={() => navigate("/")} />
    )}
    {isLoggedIn && (
    <div className={styles.background}>
      <div className={styles.container}> {/* 왼쪽 프로필 고정 */}
        <MyPageProfile formData={formData} onEditClick={handleEditClick} />
      </div>

      <div className={styles.mainContainer}>
        <div className={styles.mainContent}> {/* 오른쪽 스크롤 영역 */}
          <div ref={chartRef} className={`${styles.fadeInSection} ${chartVisible ? styles.visible : ''}`}
          style={{ marginBottom: "500px"}}>
            <MyPageChart />
          </div>
          <div ref={bookmarkRef} className={`${styles.fadeInSection} ${bookmarkVisible ? styles.visible : ''}`}>
            <MyPageBookmark />
          </div>
        </div>
      </div>
    </div>
    )}
    </>
  );
};

export default Mypage;