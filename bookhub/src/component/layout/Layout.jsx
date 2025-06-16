import { Outlet, useLocation } from "react-router-dom";
import Header from "../header/Header.jsx";
import Wrapper from "./Wrapper.jsx";
import { Helmet } from "react-helmet";

function Layout() {
  const location = useLocation();
  const path = location.pathname;
  
  // 경로에 따른 타이틀 결정 함수 - 헤더 없는 페이지는 layout을 거치지 않기에 별도로 설정
  const getTitle = (path) => {
    if (path.startsWith("/mypage")) return "Book Hub | MyPage";
    if (path.startsWith("/wish")) return "Book Hub | Wish";
    if (path.startsWith("/community")) return "Book Hub | Community";
    if (path === "/") return "Book Hub";
    return "Book Hub";
  };

  return (
    <>
      <Helmet>
        <title>{getTitle(path)}</title>
      </Helmet>

      <Header />
      <main>
        <Wrapper key={path}>
          <Outlet />
        </Wrapper>
      </main>
    </>
  );
}

export default Layout;
