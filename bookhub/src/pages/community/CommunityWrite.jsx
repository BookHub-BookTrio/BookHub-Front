import { useState, useEffect } from "react";
import CommunityForm from "./CommunityForm";
import axios from "axios";
import State from "../../component/community/State.jsx";
import FooterButton from "../../component/button/FooterButton.jsx";
import { useNavigate } from "react-router-dom";
import Modal from "../../component/modal/Modal.jsx"

const CommunityWrite = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [nickname, setNickname] = useState(""); 
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

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
      } catch (err) {
        console.error("유저 정보 불러오기 실패:", err);
      }
    };
    fetchUser();
  }, []);

  // 커뮤니티 글 생성
  const createPost = async () => {
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
      setShowModal(true);
    } catch (err) {
      console.error("글 생성 실패:", err);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    navigate("/community");
  };

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
      />
      <FooterButton status="create" onClickCreate={createPost} />
      {showModal && (
        <Modal
          title="게시글 작성 완료🎉"
          content="게시글이 성공적으로 작성되었습니다."
          onClose={handleModalClose}
          onCancel={handleModalClose}
        />
      )}
    </>
  );
};

export default CommunityWrite;
