import { useState, useEffect } from "react";
import CommunityForm from "./CommunityForm.jsx";
import State from "../../component/community/State.jsx";
import axios from "axios";
import { useParams } from "react-router-dom";
import FooterButton from "../../component/button/FooterButton.jsx";

const CommunityDetail = () => {
  const [communityData, setCommunityData] = useState(null);
  const [currentUserEmail, setCurrentUserEmail] = useState(null);
  const [isAuthor, setIsAuthor] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchCommunityData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/community/detail`, {
          params: { id },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });

        setCommunityData(response.data.data);
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

        const userEmail = response.data.data.email;
        setCurrentUserEmail(userEmail);
      } catch (error) {
        console.error("현재 사용자 정보 불러오기 실패:", error);
      }
    };

    fetchCommunityData();
    fetchCurrentUser();
  }, [id]);

  useEffect(() => {
    if (communityData && currentUserEmail) {
      if (communityData.member.email === currentUserEmail) {
        setIsAuthor(true);
      }
    }
  }, [communityData, currentUserEmail]);

  if (!communityData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <State type="post" />
      <FooterButton status={isAuthor ? "mypost" : "other"} />
      <CommunityForm
        mode="read"
        title={communityData.title}
        content={communityData.content}
        writer={communityData.member.nickname}
        createdat={communityData.createdat}
      />
    </>
  );
};

export default CommunityDetail;
