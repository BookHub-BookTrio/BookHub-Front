import { BrowserRouter, Routes, Route } from "react-router-dom";
import Test from "../src/pages/Test.jsx";
import Home from "../src/pages/home/Home.jsx";
import MyPageEdit from "../src/pages/mypage/MyPageEdit.jsx";
import Login from "../src/pages/login/Login.jsx";
import KakaoCallback from "./pages/home/KakaoCallback.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/test" element={<Test />} />
        <Route path="/home" element={<Home />} />
        <Route path="/mypage-edit" element={<MyPageEdit />} />
        <Route path="/login" element={<Login />} />
        <Route path="/auth/kakao" element={<KakaoCallback />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;