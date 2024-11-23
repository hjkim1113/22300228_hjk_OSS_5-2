import React, { useState, useRef } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from '../part/Footer';
import Header from '../part/Header';
import { getPlaceholder, getErrorMessage } from '../utils/validity'; // 유틸리티 함수 import

export default function Add() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
  });

  const [formValidity, setFormValidity] = useState({
    name: null,
    email: null,
    phone: null,
    position: null,
  });

  const formRefs = {
    name: useRef(),
    email: useRef(),
    phone: useRef(),
    position: useRef(),
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleValidation = () => {
    const newValidity = {
      name: formData.name.length >= 2,
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email),
      phone: /^(070|02|0[0-9][0-9])-\d{3,4}-\d{4}$/.test(formData.phone),
      position: formData.position.trim() !== '',
    };

    setFormValidity(newValidity);

    return Object.values(newValidity).every((isValid) => isValid);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (handleValidation()) {
      
      console.log('Submitted Data:', formData);

      axios.post("https://672818a4270bd0b975544ed3.mockapi.io/people", formData)
      .then((res) => {
        alert('성공적으로 저장되었습니다!');
        navigate("/list");
      })
      .catch((e) => {
        console.log(`데이터를 가져오는 중 에러가 발생했습니다 : ${e}`);
      });

    } else {
      alert('입력값을 다시 확인해 주세요.');
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header active="add" />

      <div id="container" className="d-flex justify-content-center my-3 px-3">
        <form className="needs-validation" noValidate onSubmit={handleSubmit}>
          <span className="fs-5 fw-bold">추가할 직원 정보 입력</span>
          <div className="mt-3">
            {Object.keys(formData).map((key) => (
              <div className="row mb-3" key={key}>
                <div className="col">
                  <input
                    ref={formRefs[key]}
                    type="text"
                    name={key}
                    value={formData[key]}
                    placeholder={getPlaceholder(key)} // 유틸리티 함수 사용
                    className={`form-control ${formValidity[key] === null ? '' : formValidity[key] ? 'is-valid' : 'is-invalid'}`}
                    onChange={handleChange}
                  />
                  <div className="invalid-feedback">{getErrorMessage(key)}</div> {/* 유틸리티 함수 사용 */}
                  <div className="valid-feedback">사용가능 합니다</div>
                </div>
              </div>
            ))}
          </div>
          <button type="submit" className="btn btn-primary">
            확인
          </button>
        </form>
      </div>

      <Footer />
    </div>
  );
}
