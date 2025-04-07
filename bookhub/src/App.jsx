import { BrowserRouter, Routes, Route } from "react-router-dom";
import Test from "../src/pages/Test.jsx";
import Home from "../src/pages/home/Home.jsx";
import MyPage from "../src/pages/mypage/MyPage.jsx";
import Login from "../src/pages/login/Login.jsx";
import KakaoCallback from "./pages/home/KakaoCallback.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/test" element={<Test />} />
        <Route path="/home" element={<Home />} />
        <Route path="/mypage-edit" element={<MyPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/auth/kakao" element={<KakaoCallback />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;