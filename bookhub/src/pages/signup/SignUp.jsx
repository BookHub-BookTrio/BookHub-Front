import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/font.css";
import { TextFrame, StyledInput, SignupButton, LabelContainer, LabelText, ErrorMessage } from "./SignupStyles.jsx"; 
import Modal from "../../component/modal/Modal.jsx";
import Wrapper from "../../component/layout/Wrapper.jsx";

export const Signup = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState("success");
    const [formData, setFormData] = useState({
        name: "",
        nickname: "",
        email: "",
        password: "",
        passwordCheck: "",
    });
    const [serverErrors, setServerErrors] = useState({});

    const handleCloseModal = () => {
        setShowModal(false);
        if (modalType === "success") {
            navigate("/", { replace: true });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        const errorMessage = validateField(name, value);
        setServerErrors((prev) => ({ ...prev, [name]: errorMessage }));
    };

    const validateField = (name, value) => {
        if (value.trim() === "") {
            switch (name) {
                case "name": return "이름을 입력해주세요.";
                case "nickname": return "별명을 입력해주세요.";
                case "email": return "이메일을 입력해주세요.";
                case "password": return "비밀번호를 입력해주세요.";
                case "passwordCheck": return "비밀번호 확인을 입력해주세요.";
                default: return "입력해주세요.";
            }
        }

        if (name === "email") {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) return "유효한 이메일 형식이 아닙니다.";
        }

        if (name === "passwordCheck" && value !== formData.password) {
            return "비밀번호가 일치하지 않습니다.";
        }

        return "";
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        const errorMessage = validateField(name, value);

        if (errorMessage) {
            setServerErrors((prev) => ({ ...prev, [name]: errorMessage }));
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSubmit();
        }
    };

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();
        setServerErrors({});

        const newErrors = {};
        Object.entries(formData).forEach(([key, value]) => {
            const error = validateField(key, value);
            if (error) newErrors[key] = error;
        });

        if (Object.keys(newErrors).length > 0) {
            setServerErrors(newErrors);
            setModalType("missing");
            setShowModal(true);
            return;
        }

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
                setModalType("success");
                setShowModal(true);
            } else {
                if (data.errors) {
                    setServerErrors(data.errors);
                } else {
                    setServerErrors({ general: data.message || "회원가입 실패" });
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
                            onBlur={handleBlur}
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
                            onBlur={handleBlur}
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
                            onBlur={handleBlur}
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
                            onBlur={handleBlur}
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
                            onBlur={handleBlur}
                            placeholder="비밀번호 확인"
                        />
                    </TextFrame>

                </LabelContainer>

                <SignupButton type="submit">회원가입</SignupButton>
            </form>

                {showModal && (
                    <Modal
                        title={
                            modalType === "success"
                                ? "회원가입 성공 🎉"
                                : "입력 누락 ⚠️"
                        }
                        content={
                            modalType === "success"
                                ? "BookHub에 오신 걸 환영합니다!"
                                : "필수 항목을 모두 입력해주세요."
                        }
                        onClose={handleCloseModal}
                        onKeyDown={handleKeyDown}
                    />
                )}
            </div>
        </Wrapper>
    );
};

export default Signup;
