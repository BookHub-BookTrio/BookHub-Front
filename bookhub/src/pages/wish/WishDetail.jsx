import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "../../component/refreshToken/api.jsx";
import WishForm from "../../component/wish/WishForm";
import Modal from "../../component/modal/Modal";

const WishDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [wish, setWish] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const currentPage = location.state?.page || 1;

  //데이터 불러오기
  useEffect(() => {
    const fetchWish = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/v1/wish/detail`,
          {
            params: { id },
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        setWish(response.data.data);
      } catch (error) {
        console.error("불러오기 실패:", error);
        alert("데이터를 불러오지 못했습니다.");
        navigate("/wish", {state: { page: currentPage}});
      }
    };

    fetchWish();
  }, [id, navigate, currentPage]);

  // 삭제 처리
  const confirmDelete = async () => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/wish?id=${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      setShowDeleteModal(false);
      setShowCompleteModal(true);

      setTimeout(() => {
        navigate("/wish", {state: {page: currentPage}});
      }, 1500); //1.5초 후 자동 닫힘
    } catch (error) {
      alert("삭제 실패!");
    }
  };

  // 완료 모달 수동 닫기 (확인 or X 클릭 시)
  const closeCompleteModal = () => {
    setShowCompleteModal(false);
    navigate(`/wish`);
  };

  if (!wish) return <div>Loading...</div>;

  return (
    <>
      <WishForm
        bookname={wish.bookname}
        author={wish.author}
        progress={wish.progress}
        category={wish.category}
        star={wish.star}
        content={wish.content}
        showBack={() => navigate("/wish", {state: { page: currentPage}})}
        showDelete={() => setShowDeleteModal(true)}
        showEdit={() => navigate(`/wish-edit/${id}`, {state: { page: currentPage}})}
        isEdit={true}
      />

      {showDeleteModal && (
        <Modal
          title="삭제하시겠습니까?"
          content={
            <>
              삭제하면 해당 기록은 <br />
              되돌릴 수 없습니다.
            </>
          }
          onClose={confirmDelete}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}

      {showCompleteModal && (
      <Modal
      title="삭제 완료"
      onClose={closeCompleteModal}
      onCancel={closeCompleteModal}
      />)
      }
    </>
  );
};

export default WishDetail;