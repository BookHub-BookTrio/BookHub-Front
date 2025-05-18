import { BrowserRouter, Routes, Route } from "react-router-dom";
import Test from "../src/pages/Test.jsx";
import Home from "../src/pages/home/Home.jsx";
import MyPage from "../src/pages/mypage/MyPage.jsx";
import MyPageEdit from "../src/pages/mypage/MyPageEdit.jsx";
import Login from "../src/pages/login/Login.jsx";
import KakaoCallback from "./pages/home/KakaoCallback.jsx";
import SignUp from "./pages/signup/SignUp.jsx";
import Main from "./pages/main/Main.jsx";
import Wish from "./pages/wish/Wish.jsx";
import WishCreate from "./pages/wish/WishCreate.jsx";
import WishDetail from "./pages/wish/WishDetail.jsx";
import WishEdit from "./pages/wish/WishEdit.jsx";
import Layout from "./component/layout/Layout.jsx"
import GlobalStyle from "./component/layout/GlobalStyle.jsx";
import Community from "./pages/community/Community.jsx";
import CommunityDetail from "./pages/community/CommunityDetail.jsx";
import CommunityWrite from "./pages/community/CommunityWrite.jsx";

function App() {
  return (
    <BrowserRouter>
    <GlobalStyle />
      <Routes>
      {/* header O */}
        <Route element={<Layout />}>
          <Route path="/" element={<Main />} />
          <Route path="/community" element={<Community />} />
          <Route path="/community/:id" element={<CommunityDetail />} /> 
          <Route path="/community/write" element={<CommunityWrite />} /> 
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/mypage-edit" element={<MyPageEdit />} />
          <Route path="/test" element={<Test />} />
          <Route path="/wish" element={<Wish />} />
          <Route path="/wish-create" element={<WishCreate />} />
          <Route path="/wish-detail/:id" element={<WishDetail />} />
          <Route path="/wish-edit/:id" element={<WishEdit />} />
        </Route>
        
      {/* header X */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/api/v1/oauth2" element={<KakaoCallback />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;