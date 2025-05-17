import React, { useState, useEffect } from "react";
import axios from "axios";
import * as S from "./CommunityFormStyles.jsx";
import * as Sd from "./CommunityStyles.jsx";
import ProfileImage from "../../component/image/Profile.png";
import { FiBookmark } from "react-icons/fi";

const CommunityForm = ({ 
  mode,
  title,
  content,
  onChangeTitle,
  onChangeContent,
  writer,
  createdat
}) => {
  const isReadOnly = mode === "read";
  const [nickname, setNickname] = useState("별명");

  useEffect(() => {
    if (isReadOnly) {
      setNickname(writer || "별명 없음");
    } else {
      const fetchNickname = async () => {
        try {
          const token = localStorage.getItem("accessToken");
          const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/member`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setNickname(res.data.data.nickname);
        } catch (error) {
          console.error("닉네임 불러오기 실패:", error);
        }
      };

      fetchNickname();
    }
  }, [isReadOnly, writer]);

  return (
    <Sd.CommunityContainer>
      <S.Rectangle />
      <S.CommunityArticle>
        <S.InnerContainer>
          <S.TitleRow>
            {isReadOnly ? (
              <S.CommunityTitle>{title}</S.CommunityTitle>
            ) : (
              <S.CommunityTitleInput
                placeholder="제목을 입력하세요"
                value={title}
                onChange={onChangeTitle}
              />
            )}
            <S.CommunityDateBadge>
                {`${new Date(createdat || Date.now()).getFullYear()}
                .${String(new Date(createdat || Date.now()).getMonth() + 1).padStart(2, '0')}
                .${String(new Date(createdat || Date.now()).getDate()).padStart(2, '0')}`}
            </S.CommunityDateBadge>
          </S.TitleRow>

          <S.Divider />

          {isReadOnly ? (
            <S.CommunityContent>{content}</S.CommunityContent>
          ) : (
            <S.CommunityContentInput
              placeholder="내용을 입력하세요"
              value={content}
              onChange={onChangeContent}
            />
          )}

          <S.InfoRow>
            <S.BookmarkIcon>
              <FiBookmark size={20} />
            </S.BookmarkIcon>

            <S.UserInfoContainer>
              <S.UserInfoWrapper>
                <S.ProfileImage src={ProfileImage} alt="프로필" />
                <S.Nickname>{nickname}</S.Nickname>
              </S.UserInfoWrapper>
              <S.UserDivider />
            </S.UserInfoContainer>
          </S.InfoRow>
         
        </S.InnerContainer>
      </S.CommunityArticle>
    </Sd.CommunityContainer>
  );
};

export default CommunityForm;
