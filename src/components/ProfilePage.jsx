// ============================================
// ProfilePage.jsx - User Profile Page
// ============================================

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfilePage.css';

function ProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [savedCalculations, setSavedCalculations] = useState([]);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      alert('⚠️ Please login first');
      navigate('/');
      return;
    }

    try {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      console.log('✅ User loaded:', parsedUser);
      
      // Fetch user profile from backend
      fetchUserProfile(token);
      fetchSavedCalculations(token);
    } catch (error) {
      console.error('Error parsing user data:', error);
      navigate('/');
    }
  }, [navigate]);

  const fetchUserProfile = async (token) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        console.log('✅ Profile fetched:', data.user);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSavedCalculations = async (token) => {
    try {
      const response = await fetch('http://localhost:5000/api/calculations', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setSavedCalculations(data.data || []);
        console.log('✅ Calculations fetched:', data.data?.length || 0);
      }
    } catch (error) {
      console.error('Error fetching calculations:', error);
    }
  };

  
  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      alert('✅ Logged out successfully!');
      navigate('/');
    }
  };

  const deleteCalculation = async (id) => {
    if (!window.confirm('Delete this calculation?')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/calculations/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setSavedCalculations(prev => prev.filter(calc => calc._id !== id));
        alert('✅ Calculation deleted');
      }
    } catch (error) {
      console.error('Error deleting calculation:', error);
      alert('❌ Failed to delete calculation');
    }
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0a0e27',
        color: 'white'
      }}>
        <div className="loading-spinner"></div>
        <p style={{ marginLeft: '20px', fontSize: '18px' }}>Loading profile...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a0e27',
      color: 'white',
      padding: '20px'
    }}>
      {/* Header */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        marginBottom: '30px'
      }}>
        <div style={{
          background: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(20px)',
          borderRadius: '25px',
          padding: '20px 30px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          border: '2px solid rgba(255,200,50,0.3)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }} onClick={() => navigate('/')}>
            <span style={{ fontSize: '32px' }}>☀️</span>
            <span style={{
              fontSize: '20px',
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #ffc832, #ff6b35)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              SOLAR MARKETPLACE
            </span>
          </div>

          <div style={{ display: 'flex', gap: '15px' }}>
            <button
              onClick={() => navigate('/')}
              style={{
                padding: '12px 24px',
                background: 'transparent',
                border: '2px solid #ffc832',
                borderRadius: '25px',
                color: '#ffc832',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              ← BACK TO HOME
            </button>
            <button
              onClick={handleLogout}
              style={{
                padding: '12px 24px',
                background: 'linear-gradient(135deg, #ffc832, #ff6b35)',
                border: 'none',
                borderRadius: '25px',
                color: '#0a0e27',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              LOGOUT
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Profile Card */}
        <div style={{
          background: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(20px)',
          borderRadius: '25px',
          padding: '40px',
          marginBottom: '30px',
          border: '2px solid rgba(255,200,50,0.3)',
          textAlign: 'center'
        }}>
          <div style={{
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #ffc832, #ff6b35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '48px',
            margin: '0 auto 20px'
          }}>
            👤
          </div>

          <h1 style={{
            fontSize: '36px',
            marginBottom: '10px',
            background: 'linear-gradient(135deg, #ffc832, #ff6b35)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            {user.name}
          </h1>

          <p style={{ color: '#aaa', fontSize: '18px', marginBottom: '20px' }}>
            📧 {user.email}
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '20px',
            marginTop: '30px'
          }}>
            <div style={{
              background: 'rgba(255,200,50,0.1)',
              padding: '20px',
              borderRadius: '15px',
              border: '2px solid rgba(255,200,50,0.3)'
            }}>
              <div style={{ fontSize: '32px', color: '#ffc832', fontWeight: 'bold', marginBottom: '5px' }}>
                {savedCalculations.length}
              </div>
              <div style={{ color: '#aaa', fontSize: '14px' }}>Saved Calculations</div>
            </div>

            <div style={{
              background: 'rgba(255,200,50,0.1)',
              padding: '20px',
              borderRadius: '15px',
              border: '2px solid rgba(255,200,50,0.3)'
            }}>
              <div style={{ fontSize: '32px', color: '#ffc832', fontWeight: 'bold', marginBottom: '5px' }}>
                {user.role || 'Customer'}
              </div>
              <div style={{ color: '#aaa', fontSize: '14px' }}>Account Type</div>
            </div>

            <div style={{
              background: 'rgba(255,200,50,0.1)',
              padding: '20px',
              borderRadius: '15px',
              border: '2px solid rgba(255,200,50,0.3)'
            }}>
              <div style={{ fontSize: '32px', color: '#ffc832', fontWeight: 'bold', marginBottom: '5px' }}>
                {new Date(user.createdAt).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}
              </div>
              <div style={{ color: '#aaa', fontSize: '14px' }}>Member Since</div>
            </div>
          </div>
        </div>

        {/* Saved Calculations */}
        <div style={{
          background: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(20px)',
          borderRadius: '25px',
          padding: '40px',
          border: '2px solid rgba(255,200,50,0.3)'
        }}>
          <h2 style={{
            fontSize: '28px',
            marginBottom: '30px',
            borderBottom: '2px solid #ffc832',
            paddingBottom: '15px',
            background: 'linear-gradient(135deg, #ffc832, #ff6b35)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            📊 Your Saved Calculations
          </h2>

          {savedCalculations.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '60px 20px',
              color: '#aaa'
            }}>
              <div style={{ fontSize: '64px', marginBottom: '20px' }}>📭</div>
              <h3 style={{ fontSize: '24px', marginBottom: '10px', color: '#fff' }}>
                No Calculations Yet
              </h3>
              <p style={{ marginBottom: '30px' }}>
                Start by using our AI Solar Calculator on the homepage
              </p>
              <button
                onClick={() => navigate('/#calculator')}
                style={{
                  padding: '15px 30px',
                  background: 'linear-gradient(135deg, #ffc832, #ff6b35)',
                  border: 'none',
                  borderRadius: '25px',
                  color: '#0a0e27',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '16px'
                }}
              >
                GO TO CALCULATOR
              </button>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '25px'
            }}>
              {savedCalculations.map((calc, idx) => (
                <div key={calc._id || idx} style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '2px solid rgba(255,200,50,0.3)',
                  borderRadius: '20px',
                  padding: '25px',
                  transition: 'all 0.3s',
                  cursor: 'default'
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '20px',
                    paddingBottom: '15px',
                    borderBottom: '1px solid rgba(255,200,50,0.2)'
                  }}>
                    <h3 style={{ color: '#ffc832', fontSize: '18px', margin: 0 }}>
                      📍 {calc.input?.location || 'N/A'}
                    </h3>
                    <span style={{ color: '#888', fontSize: '12px' }}>
                      {new Date(calc.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <div style={{ marginBottom: '15px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
                      <div>
                        <div style={{ color: '#aaa', fontSize: '12px' }}>Monthly Bill</div>
                        <div style={{ color: '#fff', fontSize: '16px', fontWeight: 'bold' }}>
                          ₹{calc.input?.billAmount?.toLocaleString('en-IN')}
                        </div>
                      </div>
                      <div>
                        <div style={{ color: '#aaa', fontSize: '12px' }}>System Size</div>
                        <div style={{ color: '#ffc832', fontSize: '16px', fontWeight: 'bold' }}>
                          {calc.output?.systemSize} kW
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
                      <div>
                        <div style={{ color: '#aaa', fontSize: '12px' }}>Total Cost</div>
                        <div style={{ color: '#fff', fontSize: '16px', fontWeight: 'bold' }}>
                          ₹{calc.output?.totalCost?.toLocaleString('en-IN')}
                        </div>
                      </div>
                      <div>
                        <div style={{ color: '#aaa', fontSize: '12px' }}>After Subsidy</div>
                        <div style={{ color: '#4ade80', fontSize: '16px', fontWeight: 'bold' }}>
                          ₹{calc.output?.netCost?.toLocaleString('en-IN')}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                      <div>
                        <div style={{ color: '#aaa', fontSize: '12px' }}>25Y Savings</div>
                        <div style={{ color: '#fff', fontSize: '16px', fontWeight: 'bold' }}>
                          ₹{calc.output?.savings?.toLocaleString('en-IN')}
                        </div>
                      </div>
                      <div>
                        <div style={{ color: '#aaa', fontSize: '12px' }}>ROI</div>
                        <div style={{ color: '#ffc832', fontSize: '16px', fontWeight: 'bold' }}>
                          {calc.output?.roi}%
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => deleteCalculation(calc._id)}
                    style={{
                      width: '100%',
                      padding: '12px',
                      background: 'transparent',
                      border: '2px solid #ff6b35',
                      borderRadius: '10px',
                      color: '#ff6b35',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                      fontSize: '14px',
                      transition: 'all 0.3s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#ff6b35';
                      e.currentTarget.style.color = 'white';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = '#ff6b35';
                    }}
                  >
                    🗑️ DELETE
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;