import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import WishForm from "../../component/wish/WishForm";

const WishCreate = () => {
  const navigate = useNavigate();

  const [bookname, setBookname] = useState("");
  const [author, setAuthor] = useState("");
  const [progress, setProgress] = useState("읽기 전");
  const [category, setCategory] = useState("");
  const [star, setStar] = useState("");
  const [content, setContent] = useState("");
  const [showStarOptions, setShowStarOptions] = useState(true);
  const [showCategoryOptions, setShowCategoryOptions] = useState(true);

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

  const handleCreate = async () => {
    try {
      const response = await axios.post(
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
      console.log("등록 성공:", response.data);
      navigate("/wish");
    } catch (error) {
      console.error("등록 실패:", error.response?.data || error.message);
      alert("등록에 실패했습니다.");
    }
  };

  return (
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
    showBack={() => navigate(-1)}
    />
  );
};

export default WishCreate;
