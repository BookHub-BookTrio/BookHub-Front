import { useState } from "react";
import CommunityForm from "./CommunityForm.jsx";
import State from "../../component/community/State.jsx";
// 커뮤니티 상세 페이지

const CommunityDetail = () => {
// 더미 데이터
  const [detail] = useState({
    title: "커뮤니티 제목",
    content: "커뮤니티\n내용\n내용\n테스트",
    createdat: "2025-04-29T12:34:56",
    writer: "별명",
  });

  return (
    <>
    <State type="post" />
    <CommunityForm
      mode="read"
      title={detail.title}
      content={detail.content}
      writer={detail.writer}
      createdat={detail.createdat}
    />
    </>
  );
};

export default CommunityDetail;
