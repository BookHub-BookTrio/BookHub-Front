import { useState, useEffect, useCallback } from "react";
import axios from "../refreshToken/api.jsx";
import { useNavigate, useParams } from "react-router-dom";

const useCommunityDetail = () => {
  const [communityData, setCommunityData] = useState(null);
  const [currentUserNickname, setCurrentUserNickname] = useState(null);
  const [pictureUrl, setPictureUrl] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isAuthor, setIsAuthor] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCancelEditModal, setShowCancelEditModal] = useState(false);
  const [animating, setAnimating] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  // 초기 데이터(커뮤니티, 유저, 북마크) 한 번에 가져오기
  const fetchAllData =useCallback(async () => {
    try {
      const [communityRes, userRes, bookmarkRes] = await Promise.all([
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/community/detail`, {
          params: { id },
          headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
        }),
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/member`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
        }),
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/community/bookmark`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
        }),
      ]);

      const community = communityRes.data.data;
      const user = userRes.data.data;
      const bookmarks = bookmarkRes.data;

      setCommunityData(community);
      setCurrentUserNickname(user.nickname);
      setPictureUrl(user.pictureUrl);

      setIsBookmarked(bookmarks.some((item) => item.id.toString() === id));
      setEditedTitle(community?.title || "");
      setEditedContent(community?.content || "");
    } catch (error) {
      console.error("데이터 불러오기 실패:", error);
    }
  }, [id]);

  // 게시글 작성자인지 체크
  useEffect(() => {
    if (communityData && currentUserNickname) {
      setIsAuthor(communityData.nickname === currentUserNickname);
    }
  }, [communityData, currentUserNickname]);

  // 편집 모드 진입 시 제목, 내용 초기화
  useEffect(() => {
    if (isEditing && communityData) {
      setEditedTitle(communityData.title || "");
      setEditedContent(communityData.content || "");
    }
  }, [isEditing, communityData]);

  // 뒤로가기 버튼 클릭 시 편집 취소 모달 띄우기
  useEffect(() => {
    if (isEditing) {
      window.history.pushState(null, "", window.location.href);
    }
    const handlePopState = () => {
      if (isEditing) {
        setShowCancelEditModal(true);
        window.history.pushState(null, "", window.location.href);
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [isEditing]);

  // 초기 데이터 로딩
  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  // 북마크 토글 및 애니메이션
  const onClickBookmark = async (e) => {
    e.currentTarget.classList.remove("animate");
    void e.currentTarget.offsetWidth; // 리플로우 강제 트리거
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
            headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
          }
        );
        setIsBookmarked(true);
      } else {
        await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/v1/community/bookmark`, {
          params: { communityId: id },
          headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
        });
        setIsBookmarked(false);
      }
    } catch (error) {
      alert("북마크 처리 중 오류가 발생했습니다.");
    }
  };

  // 수정 확정 처리
  const onClickConfirmEdit = async () => {
    try {
      await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/community`,
        { title: editedTitle, content: editedContent },
        {
          params: { id },
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      await fetchAllData();
      setIsEditing(false);
    } catch (error) {
      alert("수정 실패");
    } finally {
      setShowEditModal(false);
    }
  };

  // 삭제 처리
  const onClickDelete = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/v1/community`, {
        params: { id },
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
      });
      navigate("/community");
    } catch (error) {
      alert("삭제 실패");
    } finally {
      setShowDeleteModal(false);
    }
  };

  // 편집 취소 확정
  const handleConfirmCancelEdit = () => {
    setIsEditing(false);
    setShowCancelEditModal(false);
    window.history.back();
  };

  // 편집 취소 모달 닫기
  const handleCancelCancelEdit = () => {
    setShowCancelEditModal(false);
    window.history.pushState(null, "", window.location.href);
  };

  return {
    communityData,
    currentUserNickname,
    pictureUrl,
    isBookmarked,
    isAuthor,
    isEditing,
    editedTitle,
    editedContent,
    showDeleteModal,
    showEditModal,
    showCancelEditModal,
    animating,
    setEditedTitle,
    setEditedContent,
    setShowDeleteModal,
    setShowEditModal,
    setIsEditing,
    setShowCancelEditModal,
    onClickBookmark,
    onClickConfirmEdit,
    onClickDelete,
    handleConfirmCancelEdit,
    handleCancelCancelEdit,
  };
};

export default useCommunityDetail;
