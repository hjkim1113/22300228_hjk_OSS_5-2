import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import List from './pages/List';
import Detail from './pages/Detail';
import Update from './pages/Update';
import Add from './pages/Add';

export default class AppRouter extends Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route path="/"element={<List />} />
          <Route path="/list" element={<List />} />
          <Route path="/detail" element={<Detail />} />
          <Route path="/update" element={<Update />} />
          <Route path="/add" element={<Add />} />
        </Routes>
      </Router>
    );
  }
}
