import React from "react";
import styled from "styled-components";
import media from "../../assets/media";

const PaginationWrapper = styled.div`
  text-align: center;
  justify-content: center;
  gap: 40px;
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 10px; 
  left: 50%; 
  transform: translateX(-50%); 
  padding-bottom: 120px;
  
  ${media.tablet} {
    padding-bottom: 220px;
  }
  
  ${media.mobile} {
    padding-bottom: 150px;
  }
`;

const PaginationButton = styled.button`
  border: none;
  background: none;
  font-size: 18px;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: default;
  }
`;

const ActivePage = styled.span`
  font-weight: regular;
  font-size: 18px;
  margin-bottom: 5px;
`;

const Pagination = ({ currentPage, totalPages, onPrev, onNext }) => {
  return (
    <PaginationWrapper>
      <PaginationButton onClick={onPrev} disabled={currentPage === 1}>
        &lt;
      </PaginationButton>
      <ActivePage>{currentPage}</ActivePage>
      <PaginationButton onClick={onNext} disabled={currentPage === totalPages}>
        &gt;
      </PaginationButton>
    </PaginationWrapper>
  );
};

export default Pagination;
