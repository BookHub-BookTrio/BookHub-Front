import styled, { keyframes } from "styled-components";
import media from "../../assets/media";
import { BubblyButton } from "../../component/community/BubblyButton";

export const Rectangle = styled.div`
  position: absolute;
  top: 322px;
  left: 325px;
  width: 965px;
  height: 360px;
  background-color:rgb(226, 226, 226);
  border-radius: 4px;
  opacity: 0.5;
  z-index: -1;
  ${media.tablet} {
    left: 20px;
    top: 450px;
    width: 87%;
  }
    ${media.mobile} {
    left: 12px;
    top: 260px;
    height: 365px;
    width: 85%;
    }
`;

export const CommunityArticle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 1.5rem auto;
  width: 900px;
  height: 320px;
  padding: 1.5rem 2rem;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.05);
  position: relative;
  border-top: 1px solid;
  ${media.tablet} {
    width: 80%;
  }
  ${media.mobile} {
    width: 70%;
  }
`;

export const InnerContainer = styled.div`
  width: 100%;
  padding: 0 1rem; 
  box-sizing: border-box;
  z-index: 1000;
`;

export const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  font-family: "Pretendard-Bold", sans-serif;
`;

export const CommunityTitle = styled.h2`
  font-size: 18px;
  font-weight: 1000;
  letter-spacing: 0.5px;
  color: #111;

  ${media.mobile} {
    max-width: 170px;
    font-size: 1rem;
  }
`;

export const CommunityDateBadge = styled.div`
  background-color: black;
  color: white;
  padding: 0.45rem 0.91rem;
  border-radius: 15px;
  font-size: 14px;
  font-weight: 600;
  ${media.mobile} {
    font-size: 0.6rem;
    padding: 0.25rem; 
  }
`;

export const Divider = styled.hr`
  width: 100%;
  border: none;
  border-top: 1.5px solid #eee;
  margin: 0.8rem 0;
`;

export const CommunityContent = styled.div`
  font-size: 0.95rem;
  color: #222;
  white-space: pre-line;
  display: flex;
  align-items: center; 
  justify-content: left; 
  height: 190px;
  font-size: 16px;

  ${media.mobile} {
    font-size: 0.85rem;
  }
`;

export const pop = keyframes`
  0%   { transform: scale(1); }
  25%  { transform: scale(1.3); }
  50%  { transform: scale(0.9); }
  75%  { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

export const BookmarkIcon = styled(BubblyButton)`
  &.animate {
    animation: ${pop} 0.7s forwards;
  }
  margin-right: 0.5rem;
  cursor: pointer;
  font-size: 20px;
  color: ${({ isBookmarked }) => (isBookmarked ? "#FFD700" : "#999")};
  z-index: 1011;
`;

export const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  font-size: 0.85rem;
  color: #555;
`;

// 사용자 정보
export const UserInfoContainer = styled.div`
  display:flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
`;

export const UserInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
  font-size: 0.9rem;
`;

export const ProfileImage = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  object-fit: cover;
`;

export const Nickname = styled.span`
  color: black;

  ${media.mobile} {
    font-size: 0.7rem;
  }
`;

export const UserDivider = styled.hr`
  width: 80px;
  border: none;
  border-top: 1.5px solid rgb(0, 0, 0);
`;

export const CommunityContentInput = styled.textarea`
  font-family: "Pretendard-Regular", Helvetica;
  font-weight: 400;
  color: #222;
  white-space: pre-line;
  display: flex;
  align-items: center; 
  justify-content: left; 
  height: 190px;
  width: 80%;
  font-size: 16px;
  outline: none;
  border: none;
  resize: none;
`

export const CommunityTitleInput = styled.input`
  font-size: 18px;
  font-weight: 800;
  font-family: "Pretendard-Bold", sans-serif;
  letter-spacing: 0.5px;
  color: #111;
  width: 80%;
  border: none;
  outline: none;
`