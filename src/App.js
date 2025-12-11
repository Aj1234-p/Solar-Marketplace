import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import ProfilePage from './components/ProfilePage';
import RegisterPage from './components/RegisterPage';
import AdminPage from './components/AdminPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Home page (your existing component) */}
        <Route path="/" element={<HomePage />} />

        {/* Login page */}
        <Route path="/login" element={<LoginPage />} />

        {/* Profile page (after sign in) */}
        <Route path="/profile" element={<ProfilePage />} />

         <Route path="/register" element={<RegisterPage />} />

         <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;
