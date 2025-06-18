import { useState, useEffect } from "react";
import CommunityForm from "./CommunityForm";
import axios from "../../component/refreshToken/api.jsx";
import State from "../../component/community/State.jsx";
import FooterButton from "../../component/button/FooterButton.jsx";
import { useNavigate } from "react-router-dom";
import Modal from "../../component/modal/Modal.jsx";

const CommunityWrite = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [nickname, setNickname] = useState("");
  const [pictureUrl, setPicturUrl] = useState("");
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const navigate = useNavigate();

  // 사용자 정보 받아오기
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/member`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`, 
          },
        });
        setNickname(response.data.data.nickname); 
        setPicturUrl(response.data.data.pictureUrl);  
      } catch (err) {
        console.error("유저 정보 불러오기 실패:", err);
      }
    };
    fetchUser();
  }, []);

  // 작성 버튼 클릭 → 먼저 확인 모달
  const handleClickCreate = () => {
    setConfirmModalOpen(true);
  };

  // 확인 모달의 "확인" 버튼 눌렀을 때 글 작성 진행
  const handleConfirmWrite = async () => {
    setConfirmModalOpen(false);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/community`,
        {
          title,
          content,
          nickname
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      console.log("글 생성 성공:", response.data);
      setSuccessModalOpen(true);
    } catch (err) {
      console.error("글 생성 실패:", err);
    }
  };

  // 작성 완료 모달 닫기 → 커뮤니티 페이지 이동
  const handleSuccessClose = () => {
    setSuccessModalOpen(false);
    navigate("/community");
  };

   useEffect(() => {
    if (successModalOpen) {
      const timer = setTimeout(() => {
        navigate("/community");
      }, 1500); // 2.5초 뒤 자동 이동

      return () => clearTimeout(timer); 
    }
  }, [successModalOpen, navigate]);

  return (
    <>
      <State type="write" />
      <CommunityForm
        mode="create"
        title={title}
        content={content}
        nickname={nickname}
        onChangeTitle={(e) => setTitle(e.target.value)}
        onChangeContent={(e) => setContent(e.target.value)}
        pictureUrl={pictureUrl}
      />
      <FooterButton status="create" onClickCreate={handleClickCreate} />

      {/* 작성 확인 모달 */}
      {confirmModalOpen && (
        <Modal
          title="게시글을 작성하시겠습니까?"
          content="작성 후에는 수정이 가능합니다."
          onClose={handleConfirmWrite}
          onCancel={() => setConfirmModalOpen(false)} 
        />
      )}

      {/* 작성 완료 모달 */}
      {successModalOpen && (
        <Modal
          title="게시글 작성 완료🎉"
          content="게시글이 성공적으로 작성되었습니다."
          onClose={handleSuccessClose} 
          onCancel={handleSuccessClose}
        />
      )}
    </>
  );
};

export default CommunityWrite;
