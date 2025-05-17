import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import styles from "./MyPage.module.css";
import MyPageProfile from "./MyPageProfile";
import MyPageChart from "./MyPageChart";

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
      const token = localStorage.getItem("accessToken");

      //로그인 상태 아니면 접근 불가
      if (!token) {
        const goLogin = window.confirm("로그인이 필요합니다. 로그인 페이지로 이동할까요?");
        if (goLogin) {
          navigate("/home");
        }else {
          navigate("/");
        }
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

  return (
    <div className={styles.background}>
      <MyPageProfile formData={formData} onEditClick={handleEditClick} />
      <MyPageChart />
    </div>
  );
};

export default Mypage;