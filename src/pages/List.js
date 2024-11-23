import React, { useState, useEffect } from 'react';
import Footer from '../part/Footer';
import Header from '../part/Header';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function List() {
  const [state, setState] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('https://672818a4270bd0b975544ed3.mockapi.io/people')
      .then((res) => {
        console.log(res.data);
        setState(res.data);
      })
      .catch((e) => {
        console.log(`데이터를 가져오는 중 에러가 발생했습니다 : ${e}`);
      });
  }, []);

  function rowClick(item) {
    navigate('/detail', { state: { item } });
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header active="list" />
      <div className="container-fluid m-0">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col" id="total">
                {state.length}명
              </th>
              <th scope="col">이름</th>
              <th scope="col">분야</th>
              <th scope="col">이메일</th>
              <th scope="col">전화번호</th>
            </tr>
          </thead>
          <tbody>
            {state.map((item) => (
              <tr key={item.id} onClick={() => rowClick(item)}>
                <th scope="row">{parseInt(item.id) + 1}</th>
                <td>{item.name}</td>
                <td>{item.position}</td>
                <td className="email_hide">{item.email}</td>
                <td>{item.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  );
}
