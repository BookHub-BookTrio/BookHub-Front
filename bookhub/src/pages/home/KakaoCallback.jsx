import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const KakaoCallback = () => {
    const location = useLocation();
    const navigate = useNavigate(); 
    const code = new URLSearchParams(location.search).get("code");

    useEffect(() => {
        if (code) {
            axios.get(`http://localhost:8080/auth/kakao/callback?code=${code}`)
                .then(response => {
                    console.log("카카오 로그인 성공:", response.data);

                    navigate('/main');
                })
                .catch(error => {
                    console.error("카카오 로그인 실패:", error);
                });
        }
    }, [code, navigate]);

    return <div>로그인 처리 중...</div>;
};

export default KakaoCallback;
