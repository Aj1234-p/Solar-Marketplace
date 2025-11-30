import React, { useState, useEffect } from 'react';
import './HomePage.css'; 

// ✅ MAIN COMPONENT - ALL STATE + LOGIC HERE
function HomePage() {
  // Sign In Modal State
  const [showSignIn, setShowSignIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Calculator State  
  const [billAmount, setBillAmount] = useState('');
  const [location, setLocation] = useState('');
  const [roofSpace, setRoofSpace] = useState('');
  const [results, setResults] = useState({
    systemSize: '-', panelCount: '-', totalCost: '-', subsidy: '-', 
    netCost: '-', savings: '-', payback: '-', roi: '-'
  });
  const [showResults, setShowResults] = useState(false);

  // Sign In Functions
  const handleSignInClick = () => setShowSignIn(true);

  const handleSignIn = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', { // ✅ Fixed endpoint
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      const data = await response.json();
      if (data.success && data.token) {
        localStorage.setItem('token', data.token);
        alert('✅ Login Successful!');
        setShowSignIn(false);
        setEmail(""); setPassword("");
      } else {
        alert('❌ ' + (data.message || 'Login failed'));
      }
    } catch (error) {
      alert('❌ Server error - Check backend running on port 5000');
    }
  };

  // Stars Animation
  useEffect(() => {
    const starsContainer = document.getElementById('stars');
    if (starsContainer) {
      for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 3}s`;
        starsContainer.appendChild(star);
      }
    }
  }, []);

  // Calculator Logic
  const calculateSolar = () => {
    const bill = parseFloat(billAmount);
    const roof = parseFloat(roofSpace);

    if (!bill || !location || !roof || bill<=0 || roof<=0) {
      alert('⚠️ Please enter valid Monthly Bill (>₹100) & Roof Space (>50 sq ft)');
      return;
    }

     const unitsPerMonth = bill / 6.5;           // ₹6.5/unit avg
  const systemSize = Math.min((unitsPerMonth * 12) / 1300, roof / 110); // 110sqft/kW
  const panelCount = Math.ceil(systemSize * 1000 / 550); // 550W panels
  const costPerKW = 55000;                     // India 2025 price
  const totalCost = systemSize * costPerKW;
  const subsidyPercent = systemSize <= 3 ? 0.4 : systemSize <= 10 ? 0.2 : 0.1;
  const subsidy = totalCost * subsidyPercent;
  const netCost = totalCost - subsidy;
  const annualSavings = bill * 12 * 0.95;      // 95% savings
  const savings25Years = annualSavings * 25;
  const paybackYears = (netCost / annualSavings).toFixed(1);
  const roi = ((savings25Years / netCost) * 100).toFixed(0);

 setResults({
    systemSize: `${systemSize.toFixed(1)} kW`,
    panelCount: `${panelCount} panels`,
    totalCost: `₹${Math.round(totalCost).toLocaleString('en-IN')}`,
    subsidy: `₹${Math.round(subsidy).toLocaleString('en-IN')}`,
    netCost: `₹${Math.round(netCost).toLocaleString('en-IN')}`,
    savings: `₹${Math.round(savings25Years).toLocaleString('en-IN')}`,
    payback: `${paybackYears} years`,
    roi: `${roi}%`,
    monthlyEMI: `₹${Math.round(netCost / 60)}/month` // 5yr EMI
  });
  
  setShowResults(true); // 
};

  return (
    <>
      {/* Sign In Modal */}
      {showSignIn && (
        <div className="modal-overlay" onClick={() => setShowSignIn(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>🔐 Sign In</h3>
            <input 
              type="email" 
              placeholder="Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="modal-input"
            />
            <input 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="modal-input"
            />
            <div style={{display: 'flex', gap: '10px', marginTop: '20px'}}></div>
            <button className="btn btn-primary" onClick={handleSignIn}>SIGN IN</button>
            <button className="btn btn-secondary" onClick={() => setShowSignIn(false)}>CANCEL</button>
          </div>
        </div>
      )}

      <div className="solar-marketplace">
        {/* Animated Background */}
        <div className="bg-animation"></div>
        <div className="stars" id="stars"></div>

        <div className="container">
          {/* Navbar */}
          <nav className="navbar">
            <div className="logo">
              <span className="logo-icon">☀️</span>
              <span>SOLAR MARKETPLACE</span>
            </div>
            <ul className="nav-links">
              <li><a href="#home">Home</a></li>
              <li><a href="#calculator">Calculator</a></li>
              <li><a href="#products">Products</a></li>
              <li><a href="#dashboard">Dashboard</a></li>
            </ul>
            <div className="nav-buttons">
              <button className="btn btn-secondary" onClick={handleSignInClick}>SIGN IN</button>
              <button className="btn btn-primary">GET STARTED</button>
            </div>
          </nav>
          {/* HERO SECTION */}
          <section className="hero" id="home">
            <div className="hero-content">
              <h1>FUTURE OF SOLAR ENERGY</h1>
              <p className="tagline">India's First AI-Powered Solar Marketplace. Revolutionary. Innovative. Sustainable.</p>
              <div>
                <button className="btn btn-primary" style={{ marginRight: '15px' }}>CALCULATE NOW ⚡</button>
                <button className="btn btn-secondary">EXPLORE MORE</button>
              </div>
              <div className="hero-stats">
                <div className="stat-card"><span className="stat-number">50+</span><span className="stat-label">Verified Vendors</span></div>
                <div className="stat-card"><span className="stat-number">1K+</span><span className="stat-label">Happy Customers</span></div>
                <div className="stat-card"><span className="stat-number">₹2Cr+</span><span className="stat-label">Money Saved</span></div>
              </div>
            </div>
          </section>

          {/* CALCULATOR SECTION */}
  <section className="calculator-section" id="calculator">
  <h2 className="section-title">🤖 AI SOLAR CALCULATOR</h2>
  <p className="section-subtitle">Enter details → Get instant solar blueprint in 3 seconds</p>
  
<div className="input-group">
  <label htmlFor="bill-amount">⚡ Monthly Electricity Bill (₹)</label>
  <input 
    id="bill-amount"
    name="billAmount"
    type="number" 
    value={billAmount}
    onChange={(e) => setBillAmount(e.target.value)}
    placeholder="5000" 
    min="100"
    aria-describedby="bill-help"
  />
  <small id="bill-help" className="form-help">Your monthly electricity bill amount</small>
<div className="input-group">
  <label htmlFor="location">📍 City (India)</label>
  <input 
    id="location"
    name="location"
    type="text" 
    value={location}
    onChange={(e) => setLocation(e.target.value)}
    placeholder="Mumbai / Delhi / Bangalore"
    aria-describedby="location-help"
  />
  <small id="location-help" className="form-help">Enter your city name</small>
</div>
  <div className="input-group">
  <label htmlFor="roof-space">🏠 Roof Space (sq ft)</label>
  <input 
    id="roof-space"
    name="roofSpace"
    type="number" 
    value={roofSpace}
    onChange={(e) => setRoofSpace(e.target.value)}
    placeholder="1000" 
    min="50"
    aria-describedby="roof-help"
  />
  <small id="roof-help" className="form-help">Available roof area in square feet</small>
</div>
      <button type="button" className="calculate-btn" onClick={calculateSolar}>
      ⚡ CALCULATE MY SOLAR PLAN
    </button>
    
              {showResults && (
                <div className="result-box">
                  <h3 className="result-title">📊 YOUR SOLAR BLUEPRINT</h3>
                  <div className="result-grid">
                    <div className="result-item"><div className="result-label">System Size</div><div className="result-value">{results.systemSize}</div></div>
                    <div className="result-item"><div className="result-label">Panels Needed</div><div className="result-value">{results.panelCount}</div></div>
                    <div className="result-item"><div className="result-label">Total Cost</div><div className="result-value">{results.totalCost}</div></div>
                    <div className="result-item"><div className="result-label">Subsidy</div><div className="result-value">{results.subsidy}</div></div>
                    <div className="result-item"><div className="result-label">Net Payable</div><div className="result-value">{results.netCost}</div></div>
                    <div className="result-item"><div className="result-label">25Y Savings</div><div className="result-value">{results.savings}</div></div>
                    <div className="result-item"><div className="result-label">Payback Period</div><div className="result-value">{results.payback}</div></div>
                    <div className="result-item"><div className="result-label">ROI</div><div className="result-value">{results.roi}</div></div>
                  </div>
                   <button className="save-btn" onClick={() => alert('✅ Saved to your profile!')} style={{marginTop: '20px'}}>
                       💾 SAVE TO PROFILE
                       </button>
                </div>
              )}
            </div>
          </section>

          {/* Features, Products, Dashboard, Footer - ADD YOUR EXISTING SECTIONS HERE */}

          {/*Features Section*/}
             <section className="features-section">
               <h2 className="section-title">⚡ WHAT MAKES US UNIQUE</h2>
         <p className="section-subtitle">Revolutionary features that set us apart from everyone</p>
          
          <div className="features-grid">
              {[
              {
                icon: '🤖',
                title: 'AI Calculator',
                desc: 'Instant recommendations in 30 seconds. First in India with AI-powered analysis!'
              },
              {
                icon: '💰',
                title: 'Price Comparison',
                desc: 'Compare 10+ vendors instantly. Guaranteed best prices. Save 20-30%!'
              },
              {
                icon: '🔋',
                title: 'Charging Ecosystem',
                desc: 'Complete solar charging solution. Power banks, wireless chargers, smart hubs!'
              },
              {
                icon: '📍',
                title: 'Live Tracking',
                desc: 'Track installation in real-time. GPS tracking like Uber!'
              },
              {
                icon: '💳',
                title: 'Easy EMI',
                desc: 'Flexible payment from ₹10,500/month. Instant approval in 5 minutes!'
              },
              {
                icon: '✅',
                title: 'Quality Guaranteed',
                desc: '100% verified vendors. Money-back guarantee. Premium quality assured!'
              }
            ].map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-desc">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>


        {/* Products Section*/}
              <section className="products-section" id="products">
             <h2 className="section-title">🛒 OUR PRODUCTS</h2>
             <p className="section-subtitle">Premium solar solutions for your complete energy needs</p>
          
            <div className="product-grid">
             {[
              {
                icon: '☀️',
                badge: 'BESTSELLER',
                name: '3kW Solar System',
                price: '₹1,80,000',
                rating: '⭐⭐⭐⭐⭐ (4.8)',
                desc: 'Perfect for 2-3 BHK homes. Includes 9 panels, inverter, and 25-year warranty. Save up to ₹8.5L in 25 years!',
                buttonText: 'VIEW DETAILS'
              },
              {
                icon: '🔋',
                badge: 'HOT DEAL',
                name: 'Solar Power Bank',
                price: '₹2,499',
                rating: '⭐⭐⭐⭐⭐ (4.7)',
                desc: '20,000mAh capacity with built-in solar panels. Charge anywhere using sunlight. Waterproof design!',
                buttonText: 'ADD TO CART'
              },
              {
                icon: '📱',
                badge: 'NEW',
                name: 'Wireless Solar Charger',
                price: '₹3,999',
                rating: '⭐⭐⭐⭐⭐ (4.9)',
                desc: 'No cables needed! Qi-compatible wireless charging. Fast 15W charging. Solar powered!',
                buttonText: 'ADD TO CART'
              },
              {
                icon: '🏠',
                badge: 'PREMIUM',
                name: 'Smart Charging Hub',
                price: '₹12,999',
                rating: '⭐⭐⭐⭐⭐ (5.0)',
                desc: 'Charge 5+ devices simultaneously. AI auto-scheduling. Real-time energy tracking dashboard!',
                buttonText: 'ADD TO CART'
              },
              {
                icon: '♻️',
                badge: 'ECO',
                name: 'Solar Battery Kit',
                price: '₹1,499',
                rating: '⭐⭐⭐⭐⭐ (4.6)',
                desc: '8 rechargeable AA/AAA batteries with solar charging dock. Stop buying disposables forever!',
                buttonText: 'ADD TO CART'
              },
              {
                icon: '⚡',
                badge: 'POPULAR',
                name: '5kW Solar System',
                price: '₹2,75,000',
                rating: '⭐⭐⭐⭐⭐ (4.9)',
                desc: 'Ideal for 3-4 BHK homes. Complete setup with 15 panels. Government subsidy eligible!',
                buttonText: 'VIEW DETAILS'
              }
            ].map((product, index) => (
              <div key={index} className="product-card">
                <div className="product-image">
                  {product.icon}
                  <span className="product-badge">{product.badge}</span>
                </div>
                <div className="product-info">
                  <div className="product-name">{product.name}</div>
                  <div className="product-price">{product.price}</div>
                  <div className="product-rating">{product.rating}</div>
                  <p className="product-desc">{product.desc}</p>
                  <button className="btn btn-primary" style={{ width: '100%' }}>
                    {product.buttonText}
                  </button>
                </div>
              </div>
            ))}
          </div>
          </section>

        {/* Dashboard Section */}
             <section className="dashboard-section" id="dashboard">
           <h2 className="section-title">📊 YOUR SOLAR DASHBOARD</h2>
            <p className="section-subtitle">Real-time monitoring of your solar energy production & savings</p>
          
            <div className="dashboard-grid">
             {[
              { title: "TODAY'S GENERATION", value: '12.5 kWh', label: '☀️ Peak solar hours' },
              { title: 'MONEY SAVED TODAY', value: '₹95', label: '💰 vs Grid electricity' },
              { title: 'CO2 OFFSET', value: '8.2 kg', label: '🌍 Carbon saved today' },
              { title: 'DEVICES CHARGED', value: '6', label: '🔋 Using solar energy' }
            ].map((card, index) => (
              <div key={index} className="dashboard-card">
                <h3>{card.title}</h3>
                <div className="dashboard-value">{card.value}</div>
                <div className="dashboard-label">{card.label}</div>
              </div>
            ))}
          </div>

          <div className="energy-visualization">
            <h3 className="chart-title">⚡ WEEKLY ENERGY PRODUCTION</h3>
            <div className="chart-container">
              {[
                { height: '60%', value: '7.2 kWh', label: 'MON' },
                { height: '75%', value: '9.0 kWh', label: 'TUE' },
                { height: '90%', value: '10.8 kWh', label: 'WED' },
                { height: '85%', value: '10.2 kWh', label: 'THU' },
                { height: '95%', value: '11.4 kWh', label: 'FRI' },
                { height: '80%', value: '9.6 kWh', label: 'SAT' },
                { height: '70%', value: '8.4 kWh', label: 'SUN' }
              ].map((bar, index) => (
                <div key={index} className="chart-bar" style={{ height: bar.height }}>
                  <span className="bar-value">{bar.value}</span>
                  <span className="bar-label">{bar.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: '40px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '25px' }}>
            {[
              { title: 'This Month', value: '350 kWh', label: 'Energy Generated' },
              { title: 'Savings', value: '₹2,650', label: 'This Month' },
              { title: 'Total Impact', value: '245 kg', label: 'CO2 Offset This Month' }
            ].map((stat, index) => (
              <div 
                key={index} 
                style={{ 
                  background: 'rgba(255, 255, 255, 0.05)', 
                  border: '1px solid rgba(255, 200, 50, 0.2)', 
                  borderRadius: '15px', 
                  padding: '25px', 
                  textAlign: 'center' 
                }}
              >
                <div style={{ fontSize: '14px', color: '#aaa', marginBottom: '10px', textTransform: 'uppercase' }}>
                  {stat.title}
                </div>
                <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '32px', fontWeight: '900', color: '#ffc832', marginBottom: '5px' }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: '12px', color: '#888' }}>{stat.label}</div>
              </div>
            ))}
          </div>
          </section>

          {/* Copy from your original code - they work perfectly */}

          <footer className="footer">
            <p><strong>SOLAR MARKETPLACE</strong> - Revolutionizing Solar Energy for India</p>
            <p>Powered by MERN Stack • AI-Driven • Eco-Friendly</p>
            <p style={{ marginTop: '20px', color: '#666' }}>© 2025 Solar Marketplace. All Rights Reserved.</p>
          </footer>
        </div>
      </div>
    </>
  );
}

export default HomePage;  // ✅ SINGLE EXPORT
