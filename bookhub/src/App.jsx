import { BrowserRouter, Routes, Route } from "react-router-dom";
import Test from "../src/pages/Test.jsx";
import Home from "../src/pages/home/Home.jsx";
import MyPage from "../src/pages/mypage/MyPage.jsx";
import MyPageEdit from "../src/pages/mypage/MyPageEdit.jsx";
import Login from "../src/pages/login/Login.jsx";
import KakaoCallback from "./pages/home/KakaoCallback.jsx";
import SignUp from "./pages/signup/SignUp.jsx";
import Main from "./pages/main/Main.jsx";
import Layout from "./component/layout/Layout.jsx"
import GlobalStyle from "./component/layout/GlobalStyle.jsx";

function App() {
  return (
    <BrowserRouter>
    <GlobalStyle />
      <Routes>
      {/* header O */}
        <Route element={<Layout />}>
          <Route path="/" element={<Main />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/mypage-edit" element={<MyPageEdit />} />
          <Route path="/test" element={<Test />} />
        </Route>
        
      {/* header X */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/auth/kakao" element={<KakaoCallback />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;