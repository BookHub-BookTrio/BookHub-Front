import { useState, useEffect } from "react";
import axios from "axios";

const useMainBook = () => {
  const [todayBooks, setTodayBooks] = useState([]);
  const [newPublishedBooks, setNewPublishedBooks] = useState([]);
  const [bestSellerBooks, setBestSellerBooks] = useState([]);

  const fetchTodayBooks = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/book/random`);
      setTodayBooks(response.data.data);
    } catch (error) {
      console.error(error.response?.data?.message || "도서 정보를 불러오는 중 오류가 발생했습니다.");
      setTodayBooks([
        { title: "BOOK NAME" },
        { title: "BOOK NAME" }
      ]);
    }
  };

  const fetchNewPublishedBooks = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/book/new`);
      setNewPublishedBooks(response.data.data);
    } catch (error) {
      console.error(error.response?.data?.message || "신간 정보를 불러오는 중 오류가 발생했습니다.");
    }
  };

  const fetchBestSellerBooks = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/book/bestseller`);
      setBestSellerBooks(response.data.data);
    } catch (error) {
      console.error(error.response?.data?.message || "베스트셀러 정보를 불러오는 중 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    fetchTodayBooks();
    fetchNewPublishedBooks();
    fetchBestSellerBooks();
  }, []);

  return { todayBooks, newPublishedBooks, bestSellerBooks };
};

export default useMainBook;
