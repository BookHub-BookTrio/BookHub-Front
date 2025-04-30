import React, { useState, useEffect } from "react";
import * as S from "./CommunityStyles.jsx";
import CommunityArrow from "../../component/image/CommunityArrow.png";
import Pagination from "../../component/button/Pagination.jsx";
import axios from "axios";

export const Community = () => {
  const [communityData, setCommunityData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(communityData.length / itemsPerPage);

  const handleCommunityPrev = () => {
    setCurrentPage((prev) => (prev === 1 ? totalPages : prev - 1));
  };

  const handleCommunityNext = () => {
    setCurrentPage((prev) => (prev === totalPages ? 1 : prev + 1));
  };

  const currentItems = communityData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    const fetchCommunityData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/community`); 
        setCommunityData(response.data.data);
      } catch (error) {
        console.error("커뮤니티 데이터를 불러오는 데 실패했습니다:", error);
      }
    };

    fetchCommunityData();
  }, []);

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
              <S.CommunityDate>
                {currentItems[index].createdat.substring(0, 10).replace(/-/g, '.')}
              </S.CommunityDate>
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
