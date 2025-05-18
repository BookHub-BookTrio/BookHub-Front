import { useState, useEffect } from "react";
import CommunityForm from "./CommunityForm.jsx";
import State from "../../component/community/State.jsx";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import FooterButton from "../../component/button/FooterButton.jsx";
import Modal from "../../component/modal/Modal.jsx";

const CommunityDetail = () => {
  const [communityData, setCommunityData] = useState(null);
  const [currentUserNickname, setCurrentUserNickname] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");
  const [isAuthor, setIsAuthor] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // 게시글 데이터 불러오기
  const fetchCommunityData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/community/detail`, {
        params: { id },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      const data = response.data.data;
      setCommunityData(data);
      setEditedTitle(data?.title || "");
      setEditedContent(data?.content || "");
    } catch (error) {
      console.error("게시글 데이터 불러오기 실패:", error);
    }
  };

  const fetchCurrentUser = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/member`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      const userNickname = response.data.data.nickname;
      setCurrentUserNickname(userNickname);
    } catch (error) {
      console.error("현재 사용자 정보 불러오기 실패:", error);
    }
  };

  // 북마크 상태 불러오기
  useEffect(() => {
    const fetchBookmarkStatus = async () => {
      if (!id) return;
      try {
        const token = localStorage.getItem("accessToken");
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/community/bookmark`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const bookmarkedList = res.data?.data || [];
        const matched = bookmarkedList.some((item) => item.communityId === Number(id));
        setIsBookmarked(matched);
      } catch (err) {
        console.error("북마크 상태 조회 실패:", err);
      }
    };
    fetchBookmarkStatus();
  }, [id]);

  // 북마크 토글 함수
  const handleBookmarkClick = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (isBookmarked) {
        await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/v1/community/bookmark?communityId=${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIsBookmarked(false);
      } else {
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/community/bookmark?communityId=${id}`, {}, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIsBookmarked(true);
      }
    } catch (err) {
      console.error("북마크 토글 실패:", err);
    }
  };

  useEffect(() => {
    fetchCommunityData();
    fetchCurrentUser();
  }, [id]);

  useEffect(() => {
    if (communityData && currentUserNickname) {
      if (communityData.nickname === currentUserNickname) {
        setIsAuthor(true);
      }
    }
  }, [communityData, currentUserNickname]);

  const handleModalClose = () => {
    setShowDeleteModal(false);
    setShowEditModal(false); 
  };

  const onClickEdit = () => {
    setIsEditing(true); // 수정 모드로 전환
  };

  const onClickDone = () => {
    setShowEditModal(true);
  };

  const onClickConfirmEdit = async () => {
    try {
      await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/community`,
        {
          title: editedTitle,
          content: editedContent,
        },
        {
          params: { id },
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      await fetchCommunityData();
      setIsEditing(false);
    } catch (error) {
      alert("수정 실패");
    } finally {
      setShowEditModal(false);
    }
  };

  const onClickDelete = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/v1/community`, {
        params: { id },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      navigate("/community");
    } catch (error) {
      alert("삭제 실패");
    } finally {
      setShowDeleteModal(false);
    }
  };

  if (!communityData) {
    return <div>로딩 중...</div>;
  }

  return (
    <>
      <State type={isEditing ? "edit" : communityData ? "post" : "write"} isPostAuthor={isAuthor} />
      <FooterButton
        status={isEditing ? "edit" : isAuthor ? "mypost" : "other"}
        onClickEdit={onClickEdit}
        onClickDelete={() => setShowDeleteModal(true)}
        onClickDone={onClickDone}
      />

      {isEditing ? (
        <CommunityForm
          mode="edit"
          title={editedTitle}
          content={editedContent}
          onChangeTitle={(e) => setEditedTitle(e.target.value)}
          onChangeContent={(e) => setEditedContent(e.target.value)}
        />
      ) : (
        <CommunityForm
          mode="read"
          title={communityData.title}
          content={communityData.content}
          writer={communityData.nickname}
          createdat={communityData.createdat}
          communityId={communityData.id}
          isBookmarked={isBookmarked}
          onBookmarkClick={handleBookmarkClick}
        />
      )}

      {/* 삭제 확인 모달 */}
      {showDeleteModal && (
        <Modal
          title="삭제하시겠습니까?"
          content={
            <>
              삭제하면 해당 게시글은 <br />
              되돌릴 수 없습니다.
            </>
          }
          onClose={onClickDelete}
          onCancel={handleModalClose}
        />
      )}

      {/* 수정 확인 모달 */}
      {showEditModal && (
        <Modal
          title="수정하시겠습니까?"
          content={
            <>
              확인을 누르면 게시글이 수정됩니다.
            </>
          }
          onClose={onClickConfirmEdit} 
          onCancel={handleModalClose}
        />
      )}
    </>
  );
};

export default CommunityDetail;
