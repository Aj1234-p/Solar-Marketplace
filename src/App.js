import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import ProfilePage from './components/ProfilePage';
import RegisterPage from './components/RegisterPage';
import AdminPage from './components/AdminPage';
import ProductPage from './components/ProductPage';
import DashboardPage from './components/DashboardPage';
import CartPage from './components/CartPage';
import SavedCalculations from './components/SavedCalculations';
import Settings from './components/Settings';
import './App.css';
// import DashboardPage from './components/DashboardPage';

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
        {/* Register Page */}
         <Route path="/register" element={<RegisterPage />} />
          <Route path="/cart" element={<CartPage />} />
         <Route path="/admin" element={<AdminPage />} />
         <Route path="/products" element={<ProductPage />} />
         <Route path="/dashboard" element={<DashboardPage />} />
       <Route path="/saved-calculations" element={<SavedCalculations />} />
       <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
}

export default App;
