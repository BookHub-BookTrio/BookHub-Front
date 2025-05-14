import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import WishForm from "../../component/wish/WishForm";

const WishEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [wish, setWish] = useState({
    bookname: "",
    author: "",
    progress: "읽기 전",
    category: "",
    star: "",
    content: "",
  });

  const [showStarOptions, setShowStarOptions] = useState(false);
  const [showCategoryOptions, setShowCategoryOptions] = useState(false);

  const progressOptions = ["읽기 전", "읽는 중", "완료"];

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
        console.error("불러오기 실패:", error.response?.data || error.message);
        alert("게시글을 불러오는 데 실패했습니다.");
      }
    };
    fetchWish();
  }, [id]);

  //필드별 상태 변경 
  const handleChange = (key, value) => {
    setWish((prev) => ({ ...prev, [key]: value }));
  };

  const handleProgressClick = () => {
    const index = progressOptions.indexOf(wish.progress);
    const next = progressOptions[(index + 1) % progressOptions.length];
    handleChange("progress", next);
  };

  //수정 요청
  const handleEdit = async () => {
    try {
      await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/v1/wish?id=${id}`,
        {
          bookname: wish.bookname,
          author: wish.author,
          progress: wish.progress,
          category: wish.category,
          star: wish.star,
          content: wish.content,
        }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      alert("수정 완료");
      navigate("/wish");
    } catch (error) {
      console.error("수정 실패:", error.response?.data || error.message);
      alert("수정 실패");
    }
  };

  return (
    <WishForm
      bookname={wish.bookname}
      author={wish.author}
      progress={wish.progress}
      category={wish.category}
      star={wish.star}
      content={wish.content}
      showCategoryOptions={showCategoryOptions}
      showStarOptions={showStarOptions}
      onBooknameChange={(e) => handleChange("bookname", e.target.value)}
      onAuthorChange={(e) => handleChange("author", e.target.value)}
      onProgressClick={handleProgressClick}
      onCategoryClick={(key) => {
        handleChange("category", key);
        setShowCategoryOptions(false);
      }}
      onStarClick={(emoji) => {
        handleChange("star", emoji);
        setShowStarOptions(false);
      }}
      onContentChange={(e) => handleChange("content", e.target.value)}
      onToggleCategoryOptions={() => setShowCategoryOptions((prev) => !prev)}
      onToggleStarOptions={() => setShowStarOptions((prev) => !prev)}
      showBack={() => navigate(-1)}
      showDone={handleEdit}
      isEdit={true}
    />
  );
};

export default WishEdit;
