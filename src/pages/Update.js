import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";
import Footer from '../part/Footer';
import Header from '../part/Header';
import { getPlaceholder, getErrorMessage } from '../utils/validity'; // 유틸리티 함수 import

export default function Update() {
  const location = useLocation();
  const { item } = location.state || {};
  const navigate = useNavigate();

  // 초기 값 설정
  const [formData, setFormData] = useState({
    name: item?.name || '',
    email: item?.email || '',
    phone: item?.phone || '',
    position: item?.position || '',
  });

  // 입력 값 유효성 상태
  const [formValidity, setFormValidity] = useState({
    name: null,
    email: null,
    phone: null,
    position: null,
  });

  // 입력 값 변경 처리
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // 실시간으로 유효성 검사
    const newValidity = {
      name: formData.name.length >= 2,
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email),
      phone: /^(070|02|0[0-9][0-9])-\d{3,4}-\d{4}$/.test(formData.phone),
      position: formData.position.trim() !== '',
    };

    setFormValidity(newValidity);

    // 유효성 검사를 통과한 경우에만 API 업데이트
    if (Object.values(newValidity).every((isValid) => isValid)) {
      axios.put(`https://672818a4270bd0b975544ed3.mockapi.io/people/${item.id}`, {
        ...formData,
        [name]: value,
      })
      .then((res) => {
        console.log('API 업데이트 성공:', res);
      })
      .catch((err) => {
        console.error('API 업데이트 실패:', err);
      });
    }
  };

  const back = () => {
    navigate("/list");
  };

  // 초기 item이 없으면 목록으로 리디렉션하고 alert 표시
  useEffect(() => {
    if (!item) {
      alert('정보를 편집할 직원을 선택하세요.');
      navigate("/list");
    } else {
      setFormData({
        name: item.name,
        email: item.email,
        phone: item.phone,
        position: item.position,
      });
    }
  }, [item, navigate]);

  if (!item) return null;

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header active="add" />

      <div id="container" className="d-flex justify-content-center my-3 px-3">
        <form className="needs-validation" noValidate>
          <span className="fs-5 fw-bold">직원 정보 수정</span>
          <div className="mt-3">
            {Object.keys(formData).map((key) => (
              <div className="row mb-3" key={key}>
                <div className="col">
                  <input
                    type="text"
                    name={key}
                    value={formData[key]}
                    placeholder={getPlaceholder(key)} // 유틸리티 함수 사용
                    className={`form-control ${formValidity[key] === null ? '' : formValidity[key] ? 'is-valid' : 'is-invalid'}`}
                    onChange={handleChange}
                  />
                  <div className="invalid-feedback">{getErrorMessage(key)}</div>
                  <div className="valid-feedback">사용가능 합니다</div>
                </div>
              </div>
            ))}
          </div>
          <button type="button" className="btn btn-primary" onClick={back}>
            완료
          </button>
        </form>
      </div>

      <Footer />
    </div>
  );
}
