import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "../../component/modal/Modal.jsx"; 
import Home from "../home/Home.jsx";

const KakaoCallback = () => {
  const navigate = useNavigate();
  const [modal, setModal] = useState({
    visible: false,
    title: "",
    content: "",
    success: false,
    isLoading: false,
  });

  const code = new URL(window.location.href).searchParams.get("code");

  useEffect(() => {
    const fetchTokens = async () => {
      if (!code) {
        return;
      }

      setModal({
        visible: true,
        title: "로딩 중",
        content: "로그인 처리 중입니다...",
        success: false,
        isLoading: true,
      });

      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/v1/oauth2?code=${code}`
        );

        const { accessToken, refreshToken } = response.data.data;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        setModal({
          visible: true,
          title: "로그인 성공",
          content: "로그인에 성공했습니다! 🎉",
          success: true,
          isLoading: false,
        });
      } catch (error) {
        console.error("로그인 실패", error);

        const errorMessage =
          error?.response?.data?.message || "로그인에 실패했습니다.\n다시 시도해주세요.";

        setModal({
          visible: true,
          title: "로그인 실패",
          content: errorMessage,
          success: false,
          isLoading: false,
        });
      } finally {
      }
    };

    fetchTokens();
  }, [code]);

  const handleModalClose = () => {
    setModal({ ...modal, visible: false });
    if (!modal.isLoading) {
      navigate(modal.success ? "/" : "/home", { replace: true });
    }
  };

  return (
    <div>
      <Home />

      {modal.visible && (
        <Modal
          title={modal.title}
          content={modal.content}
          onClose={handleModalClose}
          onCancel={handleModalClose}
        />
      )}
    </div>
  );
};

export default KakaoCallback;
