import React from 'react';
import { Outlet, useLocation } from "react-router-dom";
import Header from "../header/Header.jsx";
import Wrapper from './Wrapper.jsx';

function Layout() {
  const location = useLocation(); 

  return (
    <>
      <Header />
      <main>
        <Wrapper key={location.pathname}>
          <Outlet />
        </Wrapper>  
      </main>
    </>
  );
}

export default Layout;
