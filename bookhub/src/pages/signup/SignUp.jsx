import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/font.css";
import { TextFrame, StyledInput, SignupButton, LabelContainer, LabelText, ErrorMessage } from "./SignupStyles.jsx"; 
import Modal from "../../component/modal/Modal.jsx";
import Wrapper from "../../component/layout/Wrapper.jsx";

export const Signup = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    
    const handleCloseModal = () => {
        setShowModal(false);
        navigate("/", { replace: true });
    };

    // 입력값과 에러 상태 관리
    const [formData, setFormData] = useState({
        name: "",
        nickname: "",
        email: "",
        password: "",
        passwordCheck: "",
    });
    
    // 서버 에러 메시지 상태 (필드별로 관리)
    const [serverErrors, setServerErrors] = useState({});

    // 입력값 변경 핸들러
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        // 입력 중이면 해당 필드의 에러 메시지 초기화
        setServerErrors({
            ...serverErrors,
            [name]: "",
        });
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSubmit();
        }
    };

    // 폼 제출 핸들러
    const handleSubmit = async (e) => {
        e.preventDefault();
        setServerErrors({}); // 기존 에러 초기화

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/internal/join`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (data.statusCode === 200) {
                const { accessToken, refreshToken } = data.data;

                
                localStorage.setItem("accessToken", accessToken);
                localStorage.setItem("refreshToken", refreshToken);
                
                setShowModal(true);
            } else {
                if (data.errors) {
                    setServerErrors(data.errors);  // 각 필드 에러 (name, email 등)
                } else {
                    setServerErrors({ general: data.message || "회원가입 실패" });  // 일반 에러
                }
            }
        } catch (error) {
            setServerErrors({ general: "서버 오류가 발생했습니다." });
        }
    };
    

    return (
        <Wrapper>
        <div className="Home">
            <div className="overlap2">
                <div className="text-wrapper-signup">BookHub</div>
            </div>

            <form onSubmit={handleSubmit}>
                <LabelContainer>
                    <LabelText>이름</LabelText>
                    {serverErrors.name && <ErrorMessage>{serverErrors.name}</ErrorMessage>} 
                    <TextFrame>
                        <StyledInput 
                            type="text" 
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="이름 입력"
                        />
                    </TextFrame>
                    
                    <LabelText>별명</LabelText>
                    {serverErrors.nickname && <ErrorMessage>{serverErrors.nickname}</ErrorMessage>}
                    <TextFrame>
                        <StyledInput 
                            type="text" 
                            name="nickname"
                            value={formData.nickname}
                            onChange={handleChange}
                            placeholder="별명 입력"
                        />
                    </TextFrame>

                    <LabelText>이메일</LabelText>
                    {serverErrors.email && <ErrorMessage>{serverErrors.email}</ErrorMessage>}
                    <TextFrame>
                        <StyledInput 
                            type="email" 
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="이메일 입력"
                        />
                    </TextFrame>

                    <LabelText>비밀번호</LabelText>
                    {serverErrors.password && <ErrorMessage>{serverErrors.password}</ErrorMessage>}
                    <TextFrame>
                        <StyledInput 
                            type="password" 
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="비밀번호 입력"
                        />
                    </TextFrame>

                    <LabelText>비밀번호 확인</LabelText>
                    {serverErrors.passwordCheck && <ErrorMessage>{serverErrors.passwordCheck}</ErrorMessage>}
                    <TextFrame>
                        <StyledInput 
                            type="password" 
                            name="passwordCheck"
                            value={formData.passwordCheck}
                            onChange={handleChange}
                            placeholder="비밀번호 확인"
                        />
                    </TextFrame>

                </LabelContainer>

                <SignupButton type="submit">회원가입</SignupButton>
            </form>

            {showModal && (
                <Modal
                    title="회원가입 성공 🎉"
                    content="BookHub에 오신 걸 환영합니다!"
                    onClose={handleCloseModal}
                    onKeyDown={handleKeyDown}
                />
            )}
        </div>
        </Wrapper>
    );
};

export default Signup;
