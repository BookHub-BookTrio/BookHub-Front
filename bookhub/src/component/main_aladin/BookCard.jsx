import React from 'react';
import styled from 'styled-components';
import media from '../../assets/media.jsx';

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Pretendard', sans-serif;
  overflow-x: hidden;
  cursor: pointer;
  z-index: 10;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  background-color: transparent;
  &:hover {
    transform: scale(1.03);
  }
  ${media.mobile} {
    transform: translateY(170px); 
  }
`;

const Image = styled.img`
  width: 170px;
  height: 240px;
  object-fit: cover;
  border-radius: 0 25px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15);
  ${media.mobile} {
    height: 140px;
  }
`;

const Title = styled.div`
  font-family: "Pretendard-Regular", Helvetica;
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-height: 1.4em; /* ← 추가 */
  max-height: calc(1.4em * 2); /* ← 줄 수에 맞게 계산 */
  font-size: 14px;
  font-weight: 600;
  margin-top: 10px;
  width: 180px;
  text-align: center;

  ${media.mobile} {
    font-size: 10px; 
    width: 70px;
  }
`;

const Author = styled.div`
  font-family: "Pretendard-Regular", Helvetica;
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  line-height: 1.4em; /* ← 추가 */
  max-height: calc(1.4em * 2); /* ← 줄 수에 맞게 계산 */
  font-size: 13px;
  width: 180px;
  color: #555;
  text-align: center;
    ${media.mobile} {
    font-size: 10px; }
`;


const BookCard = ({ title, author, image, onClick }) => {
  return (
    <Card onClick={onClick}>
      <Image src={image} alt={title} />
      <Title>{title}</Title>
      <Author>{author}</Author>
    </Card>
    
  );
};

export default BookCard;
