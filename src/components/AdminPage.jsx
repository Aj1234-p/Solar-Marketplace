import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token || role !== 'admin') {
      alert('⚠️ Admin access only');
      navigate('/');
    }
  }, [navigate]);

  return (
    <div className="register-page">
      <div className="register-card">
        <h2 className="register-title">Admin Dashboard</h2>
        <p className="register-subtitle">
          Manage users, vendors, and solar marketplace data.
        </p>

        <p>Here you can later add:</p>
        <ul>
          <li>User list & management</li>
          <li>Vendors / products control</li>
          <li>Reports and analytics</li>
        </ul>
      </div>
    </div>
  );
};

export default AdminPage;
