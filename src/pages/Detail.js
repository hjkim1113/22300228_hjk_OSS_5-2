import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../part/Header';
import Footer from '../part/Footer';
import axios from 'axios';

export default function Detail() {
  const location = useLocation();
  const { item } = location.state || {};
  const navigate = useNavigate();

  const back = () => {
    navigate("/list");
  };

  const editList = () => {
    navigate("/update", { state: { item } });
  };

  const removeList = () => {
    axios.delete(`https://672818a4270bd0b975544ed3.mockapi.io/people/${item.id}`)
    .then(() => {
      alert("삭제되었습니다.");
      navigate("/list"); // 삭제 후 목록 페이지로 이동
    })
    .catch((e) => {
      console.log(`삭제 중 에러가 발생했습니다: ${e}`);
    });
  };

  useEffect(() => {
    if (!item) {
      alert('상세 정보를 볼 직원을 선택하세요.');
      navigate("/list");
    }
  }, [item, navigate]);

  if (!item) return null;

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header active="detail" />
      <div className="d-flex justify-content-center my-3 mx-auto">
        <div className="mt-3">
          <div className="row mb-3">
            <span className="fs-5 fw-bold">상세 정보</span>
          </div>

          <div className="row mb-3">
            <div className="col">이름 : {item.name}</div>
          </div>

          <div className="row mb-3">
            <div className="col">이메일 : {item.email}</div>
          </div>

          <div className="row mb-3">
            <div className="col">전화번호 : {item.phone}</div>
          </div>

          <div className="row mb-3">
            <div className="col">분야 : {item.position}</div>
          </div>
          
          <div className="d-flex gap-1">
            <button className="btn btn-outline-primary" onClick={back}>목록</button>
            <button className="btn btn-outline-secondary" onClick={editList}>수정</button>
            <button className="btn btn-outline-danger" onClick={removeList}>삭제</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
