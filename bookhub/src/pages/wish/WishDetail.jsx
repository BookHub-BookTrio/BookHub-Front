import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import WishForm from "../../component/wish/WishForm";
import Modal from "../../component/modal/Modal";

const WishDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [wish, setWish] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

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
        navigate("/wish");
      }
    };

    fetchWish();
  }, [id, navigate]);

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
      navigate("/wish");
    } catch (error) {
      alert("삭제 실패!");
    } finally {
      setShowDeleteModal(false);
    }
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
        showBack={() => navigate(-1)}
        showDelete={() => setShowDeleteModal(true)} // ✅ 모달 열기
        showEdit={() => navigate(`/wish-edit/${id}`)}
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
    </>
  );
};

export default WishDetail;