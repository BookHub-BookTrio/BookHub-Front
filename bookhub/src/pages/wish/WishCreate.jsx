import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import WishForm from "../../component/wish/WishForm";
import Modal from "../../component/modal/Modal";

const WishCreate = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [bookname, setBookname] = useState("");
  const [author, setAuthor] = useState("");
  const [progress, setProgress] = useState("읽기 전");
  const [category, setCategory] = useState("");
  const [star, setStar] = useState("");
  const [content, setContent] = useState("");
  const [showStarOptions, setShowStarOptions] = useState(true);
  const [showCategoryOptions, setShowCategoryOptions] = useState(true);

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (location.state?.page) {
      setCurrentPage(location.state.page);
    }
  }, [location.state]);

  const progressOptions = ["읽기 전", "읽는 중", "완료"];

  const progressMap = {
    "읽기 전": "UNREAD",
    "읽는 중": "READING",
    "완료": "FINISHED",
  };

  const handleProgressClick = () => {
    const currentIndex = progressOptions.indexOf(progress);
    const nextProgress = progressOptions[(currentIndex + 1) % progressOptions.length];
    setProgress(nextProgress);
  };

  //등록 요청
  const handleCreate = () => {
    setShowConfirmModal(true);
  };

  const confirmCreate = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/wish`,
        {
          bookname,
          author,
          progress: progressMap[progress],
          category,
          star,
          content,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      setShowConfirmModal(false);
      setShowCompleteModal(true);
      
      setTimeout(() => {
        navigate("/wish", {state: {page: currentPage}});
      }, 1500); //1.5초 후 자동 닫힘
    } catch (error) {
      console.error("등록 실패:", error.response?.data || error.message);
      alert("등록에 실패했습니다.");
    }
  };

  // 완료 모달 수동 닫기 (확인 or X 클릭 시)
  const closeCompleteModal = () => {
    setShowCompleteModal(false);
    navigate("/wish", {state: {page: currentPage}});
  };

  return (
    <>
    <WishForm
    bookname = {bookname}
    author = {author}
    progress = {progress}
    category = {category}
    star = {star}
    content = {content}
    showCategoryOptions = {showCategoryOptions}
    showStarOptions = {showStarOptions}
    onBooknameChange={(e) => setBookname(e.target.value)}
    onAuthorChange={(e) => setAuthor(e.target.value)}
    onProgressClick={handleProgressClick}
    onCategoryClick={(key) => {
      setCategory(key);
      setShowCategoryOptions(false);
    }}
    onStarClick={(key) => {
      setStar(key);
      setShowStarOptions(false);
    }}
    onContentChange={(e) => setContent(e.target.value)}
    onToggleCategoryOptions={() => setShowCategoryOptions(true)}
    onToggleStarOptions={() => setShowStarOptions(true)}
    showCreate={handleCreate}
    showBack={() => navigate("/wish", {state: {page: currentPage}})}
    />

    {showConfirmModal && (
        <Modal
          title="작성하시겠습니까?"
          content="확인을 누르면 작성이 완료됩니다."
          onClose={confirmCreate}
          onCancel={() => setShowConfirmModal(false)}
        />
      )}

      {showCompleteModal && (
        <Modal
          title="게시글 작성 완료🎉"
          content="게시글이 성공적으로 작성되었습니다."
          onClose={closeCompleteModal}
          onCancel={closeCompleteModal}
        />
      )}
    </>
  );
};

export default WishCreate;
