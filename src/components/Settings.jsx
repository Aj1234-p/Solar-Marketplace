import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

export default function Settings() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [editingName, setEditingName] = useState(false);
  const [newName, setNewName] = useState('');
  const [selectedColor, setSelectedColor] = useState('#ffc832');

  const profileColors = [
    '#FF6B35', '#FFC832', '#4ECDC4', '#95E1D3',
    '#F38181', '#AA96DA', '#FCBAD3', '#A8D8EA'
  ];

  const loadUserData = React.useCallback(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      alert('Please login first!');
      navigate('/login');
      return;
    }

    try {
      const parsed = JSON.parse(userData);
      setUser(parsed);
      setNewName(parsed.name);
      setSelectedColor(parsed.profileColor || '#ffc832');
    } catch (error) {
      console.error('Error parsing user data:', error);
    }
  }, [navigate]); // Add navigate as dependency

  useEffect(() => {
    loadUserData();
  }, [loadUserData]); // Include loadUserData

const handleSaveName = async () => {
  if (!newName.trim()) {
    alert('Name cannot be empty!');
    return;
  }

  const token = localStorage.getItem('token');
  try {
    const response = await fetch('http://localhost:5000/api/user/update-profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ name: newName })
    });

    if (response.ok) {
      const data = await response.json();
      const updatedUser = data.user || { ...user, name: newName }; // Use response or newName
      setUser(updatedUser);
      
      // ✅ CRITICAL: Update localStorage so navbar reads it
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      setEditingName(false);
      alert('✅ Name updated successfully!');
    } else {
      const errorData = await response.json();
      alert(`❌ ${errorData.message || 'Failed to update name'}`);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('❌ Cannot connect to server');
  }
};

const handleChangeColor = async (color) => {
  setSelectedColor(color);
  
  const token = localStorage.getItem('token');
  try {
    const response = await fetch('http://localhost:5000/api/user/update-profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ profileColor: color })
    });

    if (response.ok) {
      const updatedUser = { ...user, profileColor: color };
      setUser(updatedUser);
      
      // ✅ CRITICAL: Update localStorage so navbar reads it
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      alert('✅ Color updated!');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};


  if (!user) {
    return (
      <div style={{ textAlign: 'center', padding: '100px', color: '#fff', background: '#0a0e27', minHeight: '100vh' }}>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "'Rajdhani', sans-serif", background: '#0a0e27', minHeight: '100vh', color: '#fff', padding: '20px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        
        {/* Back Button */}
        <div style={{ marginBottom: '30px' }}>
          <button
            onClick={() => navigate('/')}
            style={{
              padding: '10px 20px',
              background: 'transparent',
              border: '2px solid #ffc832',
              borderRadius: '12px',
              color: '#ffc832',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '14px'
            }}
          >
            ← Back to Home
          </button>
        </div>

        <div style={{
          background: 'rgba(255, 255, 255, 0.03)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 200, 50, 0.3)',
          borderRadius: '25px',
          padding: '40px'
        }}>
          
          <h1 style={{
            fontFamily: "'Orbitron', sans-serif",
            color: '#ffc832',
            marginBottom: '10px',
            fontSize: '36px'
          }}>
            ⚙️ Settings
          </h1>
          <p style={{ color: '#aaa', marginBottom: '40px', fontSize: '16px' }}>
            Customize your profile settings
          </p>

          {/* Edit Profile Name */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 200, 50, 0.2)',
            borderRadius: '15px',
            padding: '30px',
            marginBottom: '25px'
          }}>
            <h3 style={{ fontSize: '22px', marginBottom: '20px', color: '#ffc832' }}>
              ✏️ Edit Profile Name
            </h3>
            
            {editingName ? (
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  style={{
                    flex: '1 1 300px',
                    padding: '12px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '2px solid #ffc832',
                    borderRadius: '10px',
                    color: '#fff',
                    fontSize: '16px',
                    fontFamily: "'Rajdhani', sans-serif"
                  }}
                  placeholder="Enter new name"
                />
                <button
                  onClick={handleSaveName}
                  style={{
                    padding: '12px 24px',
                    background: 'linear-gradient(135deg, #ffc832 0%, #ff6b35 100%)',
                    border: 'none',
                    borderRadius: '10px',
                    color: '#0a0e27',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                >
                  ✅ Save
                </button>
                <button
                  onClick={() => {
                    setEditingName(false);
                    setNewName(user.name);
                  }}
                  style={{
                    padding: '12px 24px',
                    background: 'transparent',
                    border: '2px solid #ff6b35',
                    borderRadius: '10px',
                    color: '#ff6b35',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                >
                  ✖ Cancel
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
                <div>
                  <p style={{ color: '#aaa', fontSize: '14px', marginBottom: '5px' }}>Current Name:</p>
                  <p style={{ fontSize: '20px', fontWeight: 'bold' }}>{user.name}</p>
                </div>
                <button
                  onClick={() => setEditingName(true)}
                  style={{
                    padding: '10px 20px',
                    background: '#ffc832',
                    border: 'none',
                    borderRadius: '10px',
                    color: '#0a0e27',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                >
                  Edit Name
                </button>
              </div>
            )}
          </div>

          {/* Change Profile Color */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 200, 50, 0.2)',
            borderRadius: '15px',
            padding: '30px'
          }}>
            <h3 style={{ fontSize: '22px', marginBottom: '20px', color: '#ffc832' }}>
              🎨 Change Profile Color
            </h3>
            <p style={{ color: '#aaa', marginBottom: '25px', fontSize: '14px' }}>
              Select a color for your profile avatar in the navbar
            </p>
            
            {/* Color Preview */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              marginBottom: '30px',
              padding: '20px',
              background: 'rgba(255, 200, 50, 0.05)',
              borderRadius: '12px',
              border: '1px solid rgba(255, 200, 50, 0.2)'
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: selectedColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '36px',
                fontWeight: 'bold',
                color: '#0a0e27',
                border: '4px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3)'
              }}>
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <p style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '5px' }}>Preview</p>
                <p style={{ fontSize: '14px', color: '#aaa' }}>This is how your avatar will look</p>
              </div>
            </div>

            {/* Color Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(70px, 1fr))',
              gap: '15px'
            }}>
              {profileColors.map(color => (
                <div
                  key={color}
                  onClick={() => handleChangeColor(color)}
                  style={{
                    width: '70px',
                    height: '70px',
                    borderRadius: '50%',
                    background: color,
                    cursor: 'pointer',
                    border: selectedColor === color ? '4px solid #fff' : '2px solid rgba(255, 255, 255, 0.2)',
                    transition: 'all 0.3s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '28px',
                    boxShadow: selectedColor === color ? '0 0 25px rgba(255, 200, 50, 0.6)' : '0 4px 10px rgba(0, 0, 0, 0.3)',
                    transform: selectedColor === color ? 'scale(1.1)' : 'scale(1)'
                  }}
                  onMouseEnter={(e) => {
                    if (selectedColor !== color) {
                      e.currentTarget.style.transform = 'scale(1.05)';
                      e.currentTarget.style.boxShadow = '0 6px 15px rgba(0, 0, 0, 0.4)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedColor !== color) {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.3)';
                    }
                  }}
                >
                  {selectedColor === color && '✓'}
                </div>
              ))}
            </div>
          </div>

          {/* Account Info Section */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 200, 50, 0.2)',
            borderRadius: '15px',
            padding: '30px',
            marginTop: '25px'
          }}>
            <h3 style={{ fontSize: '22px', marginBottom: '20px', color: '#ffc832' }}>
              👤 Account Information
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div>
                <p style={{ fontSize: '12px', color: '#aaa', textTransform: 'uppercase', marginBottom: '5px' }}>Email</p>
                <p style={{ fontSize: '16px', fontWeight: 'bold' }}>{user.email}</p>
              </div>
              <div>
                <p style={{ fontSize: '12px', color: '#aaa', textTransform: 'uppercase', marginBottom: '5px' }}>Member Since</p>
                <p style={{ fontSize: '16px', fontWeight: 'bold' }}>
                  {new Date(user.createdAt || Date.now()).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}