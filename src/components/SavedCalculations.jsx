import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css'; // Use same styles

export default function SavedCalculations() {
  const navigate = useNavigate();
  const [calculations, setCalculations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Move loadCalculations before useEffect and wrap in useCallback
  const loadCalculations = React.useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login first!');
      navigate('/login');
      return;
    }

    try {
     const response = await fetch('http://localhost:5000/api/calculations/my', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setCalculations(data.calculations || []);
      }
    } catch (error) {
      console.error('Error loading calculations:', error);
    } finally {
      setLoading(false);
    }
  }, [navigate]); // Add navigate as dependency

  useEffect(() => {
    loadCalculations();
  }, [loadCalculations]); // Now include loadCalculations

  const deleteCalculation = async (calcId) => {
    if (!window.confirm('Are you sure you want to delete this calculation?')) {
      return;
    }

    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:5000/api/calculations/${calcId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setCalculations(calculations.filter(c => c._id !== calcId));
        alert('✅ Calculation deleted successfully!');
      }
    } catch (error) {
      console.error('Error deleting calculation:', error);
      alert('❌ Failed to delete calculation');
    }
  };

  return (
    <div style={{ fontFamily: "'Rajdhani', sans-serif", background: '#0a0e27', minHeight: '100vh', color: '#fff', padding: '20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Header */}
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
            💾 Saved Calculations
          </h1>
          <p style={{ color: '#aaa', marginBottom: '30px', fontSize: '16px' }}>
            View and manage all your saved solar calculations
          </p>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px', color: '#aaa' }}>
              <div style={{ fontSize: '48px', marginBottom: '20px' }}>⏳</div>
              <p>Loading your calculations...</p>
            </div>
          ) : calculations.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px' }}>
              <div style={{ fontSize: '64px', marginBottom: '20px' }}>📭</div>
              <h3 style={{ color: '#aaa', marginBottom: '15px' }}>No Saved Calculations Yet</h3>
              <p style={{ color: '#888', marginBottom: '25px' }}>
                Use the solar calculator on the home page and save your results!
              </p>
              <button
                onClick={() => navigate('/')}
                style={{
                  padding: '12px 30px',
                  background: 'linear-gradient(135deg, #ffc832 0%, #ff6b35 100%)',
                  border: 'none',
                  borderRadius: '12px',
                  color: '#0a0e27',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  fontSize: '16px'
                }}
              >
                Go to Calculator
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {calculations.map((calc, index) => (
                <div key={calc._id} style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 200, 50, 0.2)',
                  borderRadius: '15px',
                  padding: '25px'
                }}>
                  
                  {/* Header */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '20px',
                    paddingBottom: '15px',
                    borderBottom: '1px solid rgba(255, 200, 50, 0.2)'
                  }}>
                    <div>
                      <h3 style={{ fontSize: '20px', color: '#ffc832', marginBottom: '5px' }}>
                        📊 Calculation #{index + 1}
                      </h3>
                    <p style={{ fontSize: '14px', color: '#aaa' }}>
                      Saved on: {new Date(calc.createdAt || calc.savedAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>

                    </div>
                    <button
                      onClick={() => deleteCalculation(calc._id)}
                      style={{
                        padding: '8px 20px',
                        background: '#ff6b35',
                        border: 'none',
                        borderRadius: '10px',
                        color: '#fff',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: 'bold'
                      }}
                    >
                      🗑️ Delete
                    </button>
                  </div>

                  {/* Results Grid */}
                  {/* Results Grid - FIXED data paths */}
<div style={{
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: '15px'
}}>
  <CalcItem 
    label="Monthly Bill" 
    value={`₹${calc.input?.monthlyBill?.toLocaleString('en-IN') || 'N/A'}`} 
  />
  <CalcItem 
    label="Location" 
    value={calc.input?.location || 'N/A'} 
  />
  <CalcItem 
    label="Roof Space" 
    value={`${calc.input?.roofSpace || 'N/A'} sq ft`} 
  />
  <CalcItem 
    label="System Size" 
    value={`${calc.results?.systemSize || 'N/A'} kW`} 
  />
  <CalcItem 
    label="Panel Count" 
    value={calc.results?.panelCount || 'N/A'} 
  />
  <CalcItem 
    label="Total Cost" 
    value={`₹${calc.results?.totalCost || 'N/A'}`} 
  />
  <CalcItem 
    label="Subsidy" 
    value={`₹${calc.results?.subsidy || 'N/A'}`} 
  />
  <CalcItem 
    label="Net Cost" 
    value={`₹${calc.results?.netCost || 'N/A'}`} 
  />
  <CalcItem 
    label="Monthly Savings" 
    value={`₹${calc.results?.savings || 'N/A'}`} 
  />
  <CalcItem 
    label="Payback Period" 
    value={calc.results?.payback || 'N/A'} 
  />
  <CalcItem 
    label="ROI" 
    value={calc.results?.roi || 'N/A'} 
  />
</div>

                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CalcItem({ label, value }) {
  return (
    <div style={{
      background: 'rgba(255, 200, 50, 0.05)',
      padding: '15px',
      borderRadius: '10px',
      borderLeft: '3px solid #ffc832'
    }}>
      <div style={{ fontSize: '12px', color: '#aaa', marginBottom: '5px', textTransform: 'uppercase' }}>
        {label}
      </div>
      <div style={{
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#ffc832',
        fontFamily: "'Orbitron', sans-serif"
      }}>
        {value}
      </div>
    </div>
  );
}