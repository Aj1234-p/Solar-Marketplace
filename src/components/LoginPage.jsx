import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      if (!res.data.success) {
        setError(res.data.message || 'Login failed');
        return;
      }

      // save to localStorage
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      localStorage.setItem('role', res.data.user.role);

      // go to profile/admin
      if (res.data.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/profile');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <h2 className="register-title">Sign in</h2>
        <p className="register-subtitle">
          Access your solar marketplace and dashboard.
        </p>

        {error && (
          <p style={{ color: 'red', fontSize: 13, marginBottom: 8 }}>{error}</p>
        )}

        <form className="register-form" onSubmit={handleSubmit}>
          <input
            className="register-input"
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="register-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="register-button">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
