import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', {
        name,
        email,
        password,
        phone,
      });

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      
      navigate('/profile');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <h2 className="register-title">Create your account</h2>
        <p className="register-subtitle">
          Join the platform to explore solar solutions tailored for you.
        </p>

        {error && (
          <p style={{ color: 'red', fontSize: 13, marginBottom: 8 }}>{error}</p>
        )}

        <form className="register-form" onSubmit={handleSubmit}>
          <input
            className="register-input"
            type="text"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="register-input"
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="register-input"
            type="text"
            placeholder="Phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            className="register-input"
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="register-button">
            Get started
          </button>
        </form>

        <div className="register-footer">
          Already have an account?{' '}
          <span onClick={() => navigate('/login')}>Sign in</span>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
