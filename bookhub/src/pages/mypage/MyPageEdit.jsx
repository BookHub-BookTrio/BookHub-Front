import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./MyPageEdit.module.css";
import Modal from "../../component/modal/Modal";
import profileIcon from "../../component/image/Profile.png"; // 프로필 이미지
import pencil from "../../component/image/Pencil.png"; // 수정란 옆 연필 이미지


const MyPageEdit = () => {
  const [formData, setFormData] = useState({
    name: "",
    nickname: "",
    introduction: "",
    email: "",
    pictureUrl: "",
  });
  
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);

  const inputRefs = useRef([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //페이지 이동
  const navigate = useNavigate();

  //회원 정보 가져오기 GET
  useEffect(() => {
    const fetchMemberInfo = async () => {
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
          pictureUrl: data.pictureUrl || "",
        });
      } catch (error) {
        console.error("회원 정보 가져오기 실패:", error.response?.data || error.message);
        alert("회원 정보를 불러오는 데 실패했습니다.");
      }
    };
    fetchMemberInfo();
  }, []);

  //회원 정보 수정 PUT
  const handleConfirm = async () => {
    setShowConfirmModal(false);
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/member`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      console.log("응답:", response.data);
      setShowConfirmModal(false);
      setShowCompleteModal(true);

      setTimeout(() => {
        navigate(`/mypage`);
      }, 1500); //1.5초 후 자동 닫힘
    } catch (error) {
      console.error("에러:", error.response?.data || error.message);
      alert("회원 정보 수정에 실패했습니다.");
    }
  };

  // 완료 모달 수동 닫기 (확인 or X 클릭 시)
  const closeCompleteModal = () => {
    setShowCompleteModal(false);
    navigate(`/mypage`);
  };

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        
        {/* 프로필 영역 */}
        <div className={styles.profileSection}>
          <img src={formData.pictureUrl || profileIcon} alt="Profile" className={styles.profileImage} 
          style={{objectFit: formData.pictureUrl ? "cover" : "contain", backgroundColor: "white"}}/>
        </div>

        {/* 정보 입력 영역 */}
        <div className={styles.infoContainer}>
          {[
            { label: "이름", name: "name", value: formData.name },
            { label: "별명", name: "nickname", value: formData.nickname },
            { label: "소개", name: "introduction", value: formData.introduction },
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
        <button className={styles.doneButton} onClick={() => setShowConfirmModal(true)}>DONE</button>

        {showConfirmModal && (
          <Modal
            title="수정하시겠습니까?"
            content="확인을 누르면 수정됩니다."
            onClose={handleConfirm}
            onCancel={() => setShowConfirmModal(false)}
          />
        )}

        {showCompleteModal && (
          <Modal
            title="수정 완료"
            content="회원 정보가 수정되었습니다."
            onClose={closeCompleteModal}
            onCancel={closeCompleteModal}
          />
        )}
      </div>
    </div>
  );
};

export default MyPageEdit;
