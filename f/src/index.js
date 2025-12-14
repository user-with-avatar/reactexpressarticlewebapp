import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Article from './Article';
import Search from './Search';
import Header from './Header';
import Login from './Login';
import Register from './Register';
import Create from './Create';
import Edit from './Edit';

import './styles.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Header />
      <div className='thebody'><div className='inthebodyholder'>
      <Routes>
        <Route path='/' element={<Search />} />
        <Route path='/:id' element={<Article />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/create' element={<Create />} />
        <Route path='/edit/:id' element={<Edit />} />
      </Routes></div></div>
    </BrowserRouter>
  </React.StrictMode>
)