import React, { useState } from "react";
import * as S from "./CommunityStyles.jsx";
import CommunityArrow from "../../component/image/CommunityArrow.png";
import Pagination from "../../component/button/Pagination.jsx";

const dummyData = [
  { id: 1, title: "커뮤니티 제목", date: "2025.03.15" },
  { id: 2, title: "커뮤니티 제목", date: "2025.03.15" },
  { id: 3, title: "커뮤니티 제목", date: "2025.03.15" },
  { id: 4, title: "커뮤니티 제목", date: "2025.03.15" },
  { id: 5, title: "커뮤니티 제목", date: "2025.03.15" },
  { id: 6, title: "커뮤니티 제목", date: "2025.03.15" },
  { id: 7, title: "커뮤니티 제목", date: "2025.03.15" },
];

export const Community = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(dummyData.length / itemsPerPage);

  const handleCommunityPrev = () => {
    setCurrentPage((prev) => (prev === 1 ? totalPages : prev - 1));
  };

  const handleCommunityNext = () => {
    setCurrentPage((prev) => (prev === totalPages ? 1 : prev + 1));
  };

  const currentItems = dummyData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <S.CommunityContainer>
      <p>Community</p>
      <S.Rectangle />

      {[...Array(itemsPerPage)].map((_, index) => (
        <S.CommunityArticle
          key={index}
          first={index === 0} // 첫 번째 항목
          last={index === itemsPerPage - 1} // 마지막 항목
        >
          {currentItems[index] ? (
            <>
              <S.CommunityTitle>{currentItems[index].title}</S.CommunityTitle>
              <S.CommunityDate>{currentItems[index].date}</S.CommunityDate>
              <S.CommunityArrow src={CommunityArrow} alt="arrow" />
            </>
          ) : (
            // 데이터가 없으면 빈 항목 표시
            <>
              <S.CommunityTitle>&nbsp;</S.CommunityTitle>
              <S.CommunityDate style={{ visibility: 'hidden' }}>&nbsp;</S.CommunityDate>
              <S.CommunityArrow src={CommunityArrow} alt="arrow" style={{ visibility: 'hidden' }} />
            </>
          )}
        </S.CommunityArticle>
      ))}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPrev={handleCommunityPrev}
        onNext={handleCommunityNext}
      />
    </S.CommunityContainer>
  );
};

export default Community;
