import styled from "styled-components";

export const StyledEllipsis = ({ total, currentIndex, onDotClick }) => {
  return (
    <EllipsisWrapper>
      {Array.from({ length: total }).map((_, i) => (
        <Dot
          key={i}
          className={i === currentIndex ? "active" : ""}
          onClick={() => onDotClick(i)}
        />
      ))}
    </EllipsisWrapper>
  );
};

const EllipsisWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 12px;
`;

const Dot = styled.div`
  width: 10px;
  height: 10px;
  margin: 0 6px;
  border-radius: 50%;
  background-color: #ccc;
  cursor: pointer;
  transition: background-color 0.3s;

  &.active {
    background-color: #000;
  }

  &:hover {
    background-color: #555;
  }
`;
