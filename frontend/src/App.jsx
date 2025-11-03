import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';

import SearchPage from './pages/SearchPage';
import SearchHistory from './component/SearchHistory';


const App = () => {
  return (

    <div className='h-screen'>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<SearchPage />} />
        <Route path="/history" element={<SearchHistory />} />
        
      </Routes>
    </div>

  );
};

export default App;
