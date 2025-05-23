import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import media from "../../assets/media";

const ButtonContainer = styled.div`
  position: fixed;
  bottom: 0;
  width: 70%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 40px;
  margin-left: 200px;
  z-index: 1011;
  
  ${media.tablet} {
    margin-left: 10%;
    margin-bottom: 15%;
  }
  ${media.mobile} {
    right: 60px;   
    flex-wrap: nowrap;
    gap: 50px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;

  @media (max-width: 600px) {
    justify-content: space-between;
    width: 100%;
  }
`;

const SubmitButton = styled.button`
  background-color: black;
  color: white;
  border: none;
  width: 140px;
  padding: 14px 0;
  border-radius: 40px;
  cursor: pointer;
  font-family: "Slackey-Regular";
  font-size: 18px;
  white-space: nowrap;
  letter-spacing: 0.7px;
  z-index:1011;
  ${media.mobile} {
    width: 100px;
    font-size: 14px;
  }
`;

const FooterButton = ({ status, onClickCreate, onClickDelete, onClickEdit, onClickDone }) => {
  const navigate = useNavigate();

  return (
    <ButtonContainer>
      <ButtonGroup>
        <SubmitButton onClick={() => navigate(-1)}>BACK</SubmitButton>
      </ButtonGroup>
      <ButtonGroup>
        {status === "allpost" && (
          <>
            <SubmitButton onClick={onClickCreate}>CREATE</SubmitButton>
          </>
        )}
        {status === "mypost" && (
          <>
            <SubmitButton onClick={onClickDelete}>DELETE</SubmitButton>
            <SubmitButton onClick={onClickEdit}>EDIT</SubmitButton>
          </>
        )}
        {status === "edit" && (
          <>
            <SubmitButton onClick={onClickDone}>DONE</SubmitButton>
          </>
        )}
        {status === "create" && (
          <>
            <SubmitButton onClick={onClickCreate}>CREATE</SubmitButton>
          </>
        )}
      </ButtonGroup>
    </ButtonContainer>
  );
};

export default FooterButton;
