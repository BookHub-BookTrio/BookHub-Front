import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import WishForm from "../../component/wish/WishForm";

const WishDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [wish, setWish] = useState(null);

	useEffect(() => {
		// 디자인용 가짜 데이터
		const mockWish = {
			bookname: "소년이 온다",
			author: "한강",
			progress: "읽는 중",
			category: "NOVEL",
			star: "😊",
			content: "꼭 완독해야지!!!",
		};
		setWish(mockWish);
	}, []);
	
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

  const handleDelete = async () => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/wish/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      navigate("/wish");
    } catch (error) {
      alert("삭제 실패!");
    }
  };

  if (!wish) return <div>Loading...</div>

  return (
    <WishForm
      bookname={wish.bookname}
      author={wish.author}
      progress={wish.progress}
      category={wish.category}
      star={wish.star}
      content={wish.content}
      showBack={() => navigate(-1)}
      showDelete={handleDelete}
      showEdit={() => navigate("/wish-edit/:id")}
      isEdit={true}
    />
  );
};

export default WishDetail;