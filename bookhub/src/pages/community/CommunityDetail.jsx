import { useState, useEffect } from "react";
import CommunityForm from "./CommunityForm.jsx";
import State from "../../component/community/State.jsx";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import FooterButton from "../../component/button/FooterButton.jsx";
import Modal from "../../component/modal/Modal.jsx";
import Wrapper from "../../component/layout/Wrapper.jsx";

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
  const [animating, setAnimating] = useState(false);
  const [pictureUrl, setPictureUrl] = useState(null);
  const [showCancelEditModal, setShowCancelEditModal] = useState(false);

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
      const pictureUrl = response.data.data.pictureUrl;
      setCurrentUserNickname(userNickname);
      setPictureUrl(pictureUrl);
    } catch (error) {
      console.error("현재 사용자 정보 불러오기 실패:", error);
    }
  };

  const fetchBookmarkStatus = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/community/bookmark`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    const bookmarkedList = response.data;
    const isBookmarkedPost = bookmarkedList.some((item) => item.id.toString() === id); 

    setIsBookmarked(isBookmarkedPost);
  } catch (error) {
    console.error("북마크 상태 확인 실패:", error);
  }
};

  useEffect(() => {
    fetchCommunityData();
    fetchCurrentUser();
    fetchBookmarkStatus();
  }, [id]);

  useEffect(() => {
    if (communityData && currentUserNickname) {
      if (communityData.nickname === currentUserNickname) {
        setIsAuthor(true);
      }
    }
  }, [communityData, currentUserNickname]);

  // 뒤로가기 이벤트 제어
  useEffect(() => {
    if (isEditing) {
      window.history.pushState(null, "", window.location.href);
    }

    const handlePopState = (e) => {
      if (isEditing) {
        setShowCancelEditModal(true);
        window.history.pushState(null, "", window.location.href);
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isEditing]);

  // 수정 취소 모달 확인 (뒤로가기를 허용하고 편집 종료)
  const handleConfirmCancelEdit = () => {
    setIsEditing(false);
    setShowCancelEditModal(false);
    window.history.back(); 
  };

  // 수정 취소 모달 취소 (뒤로가기 무효화)
  const handleCancelCancelEdit = () => {
    setShowCancelEditModal(false);
    window.history.pushState(null, "", window.location.href);
  };

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

  const onClickBookmark = async (e) => {
    e.currentTarget.classList.remove("animate");
    void e.currentTarget.offsetWidth;
    e.currentTarget.classList.add("animate");
    setAnimating(true);
    setTimeout(() => setAnimating(false), 750);
  try {
    if (!isBookmarked) {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/community/bookmark`,
        {},
        {
          params: { communityId: id },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      setIsBookmarked(true);
    } else {
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/community/bookmark`,
        {
          params: { communityId: id },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      setIsBookmarked(false);
    }
  } catch (error) {
    alert("북마크 처리 중 오류가 발생했습니다.");
    console.error("북마크 에러:", error);
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
        isBookmarked={isBookmarked}
        onClickEdit={onClickEdit}
        onClickDelete={() => setShowDeleteModal(true)}
        onClickDone={onClickDone}
      />

      {isEditing ? (
        <Wrapper key="edit">
        <CommunityForm
          mode="edit"
          title={editedTitle}
          content={editedContent}
          onChangeTitle={(e) => setEditedTitle(e.target.value)}
          onChangeContent={(e) => setEditedContent(e.target.value)}
          pictureUrl={pictureUrl}
        />
        </Wrapper>
      ) : (
        <Wrapper key="read">
        <CommunityForm
          mode="read"
          title={communityData.title}
          content={communityData.content}
          writer={communityData.nickname}
          createdat={communityData.createdat}
          onClickBookmark={onClickBookmark}
          isBookmarked={isBookmarked}
          animating={animating}
          pictureUrl={pictureUrl}
        />
        </Wrapper>
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
          content={<>확인을 누르면 게시글이 수정됩니다.</>}
          onClose={onClickConfirmEdit}
          onCancel={handleModalClose}
        />
      )}

      {/* 수정 취소 확인 모달 */}
      {showCancelEditModal && (
        <Modal
          title="수정을 취소하시겠습니까?"
          content="취소하면 변경사항이 저장되지 않습니다."
          onClose={handleConfirmCancelEdit}
          onCancel={handleCancelCancelEdit}
        />
      )}
    </>
  );
};

export default CommunityDetail;
