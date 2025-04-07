import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "../../component/modal/Modal.jsx"; 
import Home from "../home/Home.jsx";

const KakaoCallback = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const code = new URL(window.location.href).searchParams.get("code");

  useEffect(() => {
    if (code) {
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/oauth2?code=${code}`)
        .then((response) => {
          const { accessToken, refreshToken } = response.data.data;
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);
          navigate("/", { replace: true });
        })
        .catch((error) => {
          console.error("로그인 실패", error);
          setShowModal(true); // 실패 시 모달 표시
        })
        .finally(() => {
          setIsLoading(false); // 요청 끝나면 로딩 상태 해제
        });
    } else {
      setIsLoading(false); // code가 없으면 바로 로딩 해제
    }
  }, [code, navigate]);

  const handleCloseModal = () => {
    setShowModal(false);
    navigate("/home", { replace: true });
  };

  return (
    <div>
      <Home />

      {isLoading && (
        <Modal message="로딩중 ..." onClose={() => {}} />
      )}

      {showModal && (
        <Modal
          message={"로그인에 실패했습니다.\n 다시 시도해주세요."}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default KakaoCallback;
