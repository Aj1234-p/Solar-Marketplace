// components/CartPage.jsx

import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

function CartPage() {
 const navigate = useNavigate();
  const [cart, setCart] = useState({ items: [], totalItems: 0 });
  const [loading, setLoading] = useState(true);

  // ✅ Wrap loadCart with useCallback
  const loadCart = useCallback(async () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      alert('⚠️ Please login first');
      navigate('/login');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/cart', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

 const data = await response.json();
      
      if (response.ok) {
        setCart(data.cart);
      }
    } catch (error) {
      console.error('Load cart error:', error);
    } finally {
      setLoading(false);
    }
  }, [navigate]);  // ✅ Add navigate as dependency

  // ✅ Now include loadCart in dependency array
  useEffect(() => {
    loadCart();
  }, [loadCart]);  // ✅ Include loadCart

  const removeFromCart = async (itemId) => {
  const token = localStorage.getItem('token');


    try {
      const response = await fetch(`http://localhost:5000/api/cart/remove/${itemId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (response.ok) {
        setCart(data.cart);
        alert('✅ Item removed from cart');
      }
    } catch (error) {
      console.error('Remove error:', error);
      alert('❌ Error removing item');
    }
  };
const calculateTotal = () => {
    return cart.items.reduce((total, item) => {
      const price = parseFloat(item.product.price.replace(/[₹,]/g, ''));
      return total + (price * item.quantity);
    }, 0);
  };

  if (loading) {
    return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0e27', color: '#fff' }}>
      <div className="loading-spinner"></div>
      <p style={{ marginLeft: '20px' }}>Loading cart...</p>
    </div>;
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0a0e27', color: '#fff', padding: '20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{
          background: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(20px)',
          borderRadius: '25px',
          padding: '20px 30px',
          marginBottom: '30px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          border: '2px solid rgba(255,200,50,0.3)'
        }}>
          <h1 style={{
            fontSize: '32px',
            background: 'linear-gradient(135deg, #ffc832, #ff6b35)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            🛒 My Cart ({cart.totalItems} items)
          </h1>
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
        </div>

        {/* Cart Items */}
        {cart.items.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '25px',
            border: '2px solid rgba(255,200,50,0.3)'
          }}>
            <div style={{ fontSize: '64px', marginBottom: '20px' }}>🛒</div>
            <h3 style={{ fontSize: '24px', marginBottom: '10px' }}>Your cart is empty</h3>
            <p style={{ color: '#aaa', marginBottom: '30px' }}>Add some products to get started!</p>
            <button
              onClick={() => navigate('/products')}
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
              BROWSE PRODUCTS
            </button>
          </div>
        ) : (
          <>
            <div style={{ display: 'grid', gap: '20px', marginBottom: '30px' }}>
              {cart.items.map((item) => (
                <div key={item._id} style={{
                  background: 'rgba(255,255,255,0.05)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '20px',
                  padding: '20px',
                  border: '2px solid rgba(255,200,50,0.3)',
                  display: 'grid',
                  gridTemplateColumns: 'auto 1fr auto',
                  gap: '20px',
                  alignItems: 'center'
                }}>
                  <div style={{ fontSize: '48px' }}>{item.product.icon}</div>
                  <div>
                    <h3 style={{ fontSize: '20px', marginBottom: '5px' }}>{item.product.name}</h3>
                    <p style={{ color: '#aaa', fontSize: '14px', marginBottom: '10px' }}>
                      {item.product.description?.substring(0, 100)}...
                    </p>
                    <div style={{
                      display: 'flex',
                      gap: '20px',
                      alignItems: 'center'
                    }}>
                      <span style={{ color: '#ffc832', fontSize: '24px', fontWeight: 'bold' }}>
                        {item.product.price}
                      </span>
                      <span style={{ color: '#aaa' }}>Quantity: {item.quantity}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    style={{
                      padding: '10px 20px',
                      background: 'transparent',
                      border: '2px solid #ff6b35',
                      borderRadius: '10px',
                      color: '#ff6b35',
                      cursor: 'pointer',
                      fontWeight: 'bold'
                    }}
                  >
                    🗑️ REMOVE
                  </button>
                </div>
              ))}
            </div>

            {/* Total */}
            <div style={{
              background: 'rgba(255,200,50,0.1)',
              border: '2px solid #ffc832',
              borderRadius: '20px',
              padding: '30px',
              textAlign: 'right'
            }}>
              <h3 style={{ fontSize: '24px', marginBottom: '15px' }}>
                Total: ₹{calculateTotal().toLocaleString('en-IN')}
              </h3>
              <button
                onClick={() => alert('Checkout coming soon!')}
                style={{
                  padding: '15px 40px',
                  background: 'linear-gradient(135deg, #ffc832, #ff6b35)',
                  border: 'none',
                  borderRadius: '25px',
                  color: '#0a0e27',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '18px'
                }}
              >
                PROCEED TO CHECKOUT
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CartPage;