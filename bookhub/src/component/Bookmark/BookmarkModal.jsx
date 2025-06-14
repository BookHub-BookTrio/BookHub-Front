import React, { useEffect, useState } from "react";
import Modal from "../modal/Modal";
import axios from "axios";

const BookmarkModal = ({ item, onClose }) => {
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/v1/community/detail`,
          {
            params: { id: item?.id },
            headers: { Authorization: `Bearer ${token}` },
          }
        );
				console.log("커뮤니티 상세 응답:", res.data);
        setDetail(res.data.data);
      } catch (err) {
        console.error("상세 내용 불러오기 실패", err.response?.data || err.message);
        setDetail({ content: "내용을 불러오지 못했습니다." });
      }
    };

    if (item?.id) {
      fetchDetail();
    }
  }, [item]);

  if (!item) return null;

 const formattedDate = item.createdat?.slice(0, 10).replace(/-/g, ".");

  const content = (
    <div style={{ textAlign: "left", lineHeight: "1.6" }}>
      <div><strong>👤 작성자:</strong> {item.nickname || "알 수 없음"}</div>
			<div><strong>📅 작성일:</strong> {formattedDate || "알 수 없음"}</div>
      <div style={{ marginTop: "12px", whiteSpace: "pre-line" }}>
        {detail?.content || "로딩 중..."}
      </div>
    </div>
  );

  return (
    <Modal
      title={item.title || "제목 없음"}
      content={content}
      onClose={onClose}
      onCancel={onClose}
    />
  );
};

export default BookmarkModal;