import React from 'react'
import { useNavigate } from "react-router-dom";

export default function Header(props) {
  const navigate = useNavigate();

  const goToList = () => {
    navigate("/list"); // "/about" 경로로 이동
  };

  const goToDetail = () => {
    navigate("/detail"); // "/about" 경로로 이동
  };

  const goToUpdate = () => {
    navigate("/update"); // "/about" 경로로 이동
  };

  const goToAdd = () => {
    navigate("/add"); // "/about" 경로로 이동
  };

  return (
    <header className="border-bottom">
      <div id="header_inner" className="d-flex flex-wrap justify-content-center py-3 mx-auto">
        <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none ms-3 float-start">
          <svg className="bi me-2" width="40" height="32" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464l349.5 0c-8.9-63.3-63.3-112-129-112l-91.4 0c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304l91.4 0C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7L29.7 512C13.3 512 0 498.7 0 482.3z"/>
          </svg>
          <span className="fs-4">직원 정보</span>
        </a>
        <ul className="nav nav-pills me-3 float-end">
          <li className="nav-item">
            <button
              className={`nav-link ${props.active === "list" ? "active" : ""}`}
              onClick={goToList}
            >
              리스트 보기
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${props.active === "add" ? "active" : ""}`}
              onClick={goToAdd}
            >
              추가하기
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${props.active === "detail" ? "active" : ""}`}
              onClick={goToDetail}
            >
              상세정보
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${props.active === "update" ? "active" : ""}`}
              onClick={goToUpdate}
            >
              편집하기
            </button>
          </li>
        </ul>
      </div>
    </header>
  )
}
