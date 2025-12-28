import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

// ✅ MAIN COMPONENT - ALL STATE + LOGIC HERE
function HomePage() {
  const navigate = useNavigate();

  // Sign In Modal State
  const [showSignIn, setShowSignIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  // Feature Modal State
  const [showFeatureModal, setShowFeatureModal] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState(null);

// Product Model State
    const [showProductModal, setShowProductModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

// Auth state

  const [showUserMenu, setShowUserMenu] = useState(false);
 const [cartCount, setCartCount] = useState(0);

  // Calculator State
  const [billAmount, setBillAmount] = useState("");
  const [location, setLocation] = useState("");
  const [roofSpace, setRoofSpace] = useState("");
  const [results, setResults] = useState({
    systemSize: "-",
    panelCount: "-",
    totalCost: "-",
    subsidy: "-",
    netCost: "-",
    savings: "-",
    payback: "-",
    roi: "-",
  });
  const [showResults, setShowResults] = useState(false);

  // Features Details Data
  const featureDetails = {
    "AI Calculator": {
      icon: "🤖",
      title: "AI Calculator",
      description:
        "Our revolutionary AI-powered solar calculator provides instant, accurate recommendations tailored to your specific needs and location.",
      features: [
        "✅ Instant calculations in under 3 seconds",
        "✅ AI-powered system size recommendations",
        "✅ Real-time subsidy calculations based on state",
        "✅ ROI and payback period analysis",
        "✅ Monthly EMI options with flexible tenures",
        "✅ Save calculations to your profile",
      ],
      stats: {
        accuracy: "99.8%",
        users: "10,000+",
        calculations: "50,000+",
      },
    },
    "Price Comparison": {
      icon: "💰",
      title: "Price Comparison",
      description:
        "Compare prices from 10+ verified vendors instantly and get the best deals guaranteed. We ensure transparency and save you thousands!",
      features: [
        "✅ Compare 10+ verified vendors in real-time",
        "✅ Live price updates every hour",
        "✅ Transparent pricing breakdown with no hidden costs",
        "✅ Save 20-30% on average compared to direct buying",
        "✅ Best price guarantee - or we refund the difference",
        "✅ Detailed vendor ratings and reviews",
      ],
      stats: {
        vendors: "50+",
        avgSavings: "₹45,000",
        comparisons: "100,000+",
      },
    },
    "Charging Ecosystem": {
      icon: "🔋",
      title: "Charging Ecosystem",
      description:
        "Complete solar charging solutions for all your devices - from smartphones to electric vehicles. Power everything with the sun!",
      features: [
        "✅ Solar power banks (20,000mAh capacity)",
        "✅ Wireless charging pads (Qi-compatible)",
        "✅ Smart charging hubs (charge 5+ devices simultaneously)",
        "✅ EV charging stations (AC & DC fast charging)",
        "✅ Battery storage solutions (5kWh to 100kWh)",
        "✅ IoT-enabled monitoring and auto-scheduling",
      ],
      stats: {
        products: "25+",
        satisfaction: "4.9/5",
        installations: "5,000+",
      },
    },
    "Live Tracking": {
      icon: "📍",
      title: "Live Tracking System",
      description:
        "Track your solar panel installation in real-time with GPS tracking, just like ordering food delivery! Know exactly when your system will be ready.",
      features: [
        "✅ Real-time GPS tracking of installation team",
        "✅ Live installation progress updates every 30 minutes",
        "✅ Technician details, photo & direct contact",
        "✅ Estimated completion time with live updates",
        "✅ Photo uploads at each installation stage",
        "✅ SMS, email & app notifications for every milestone",
      ],
      stats: {
        installations: "2,000+",
        avgTime: "4-6 hours",
        satisfaction: "4.8/5",
      },
    },
    "Easy EMI": {
      icon: "💳",
      title: "Easy EMI Options",
      description:
        "Flexible payment plans with instant approval. Start going solar with payments as low as ₹10,500/month. No credit checks, no paperwork hassles!",
      features: [
        "✅ 0% interest on first 6 months",
        "✅ Flexible tenure from 6 to 60 months",
        "✅ Instant approval in just 5 minutes",
        "✅ No hidden charges or processing fees",
        "✅ Pre-payment options available without penalty",
        "✅ Partnered with 15+ top banks and NBFCs",
      ],
      stats: {
        minEMI: "₹10,500/mo",
        approvalTime: "5 mins",
        bankPartners: "15+",
      },
    },
    "Quality Guaranteed": {
      icon: "✅",
      title: "Quality Guaranteed",
      description:
        "100% verified vendors, premium quality products, and comprehensive warranty coverage. We guarantee the highest standards in solar installations.",
      features: [
        "✅ 100% verified and certified vendors",
        "✅ Only Tier-1 premium quality products",
        "✅ 25-year comprehensive panel warranty",
        "✅ 10-year inverter warranty with replacement",
        "✅ 30-day money-back guarantee if not satisfied",
        "✅ Free maintenance and cleaning for 1 year",
      ],
      stats: {
        vendors: "50+ verified",
        warranty: "25 years",
        satisfaction: "4.9/5",
      },
    },
  };

  // Product Details Data
const productDetailsData = {
  "3kW Solar System": {
    name: "3kW Solar System",
    price: "₹1,80,000",
    icon: "☀️",
    rating: "4.8",
    reviews: "2,450",
    description: "Complete solar solution perfect for 2-3 BHK homes. This premium system includes everything you need to start generating clean, renewable energy and significantly reduce your electricity bills.",
    specifications: [
      { label: "System Size", value: "3 kW" },
      { label: "Panel Count", value: "9 Panels (335W each)" },
      { label: "Inverter", value: "3kW Hybrid Inverter" },
      { label: "Panel Type", value: "Monocrystalline PERC" },
      { label: "Efficiency", value: "19.5%" },
      { label: "Installation", value: "Rooftop Mount" }
    ],
    features: [
      "✅ 25-year panel warranty",
      "✅ 10-year inverter warranty",
      "✅ Free installation included",
      "✅ Government subsidy eligible (40%)",
      "✅ Net metering support",
      "✅ Mobile app monitoring"
    ],
    benefits: [
      "💰 Save ₹8.5 Lakhs over 25 years",
      "⚡ Generate 12-15 units daily",
      "🌍 Offset 48 tons of CO2",
      "📉 Payback period: 4-5 years",
      "🔋 Battery backup compatible"
    ],
    whatsIncluded: [
      "9x 335W Monocrystalline Solar Panels",
      "1x 3kW Hybrid Inverter",
      "Complete mounting structure",
      "All cables & connectors",
      "Installation & commissioning",
      "1 year free maintenance"
    ],
    emi: {
      tenure: "60 months",
      monthly: "₹10,500",
      downPayment: "₹20,000"
    }
  },
  "Solar Power Bank": {
    name: "Solar Power Bank",
    price: "₹2,499",
    icon: "🔋",
    rating: "4.7",
    reviews: "8,920",
    description: "Portable solar charging solution with massive 20,000mAh capacity. Charge your devices anywhere using sunlight. Perfect for outdoor adventures, travel, and emergency backup.",
    specifications: [
      { label: "Capacity", value: "20,000 mAh" },
      { label: "Solar Panel", value: "6W Monocrystalline" },
      { label: "USB Ports", value: "3x USB-A, 1x USB-C" },
      { label: "Fast Charging", value: "18W PD & QC 3.0" },
      { label: "Weight", value: "450g" },
      { label: "Waterproof", value: "IP67 Rated" }
    ],
    features: [
      "✅ Built-in solar panels",
      "✅ Wireless charging pad",
      "✅ LED flashlight with SOS mode",
      "✅ Waterproof & dustproof",
      "✅ Charges 4 devices simultaneously",
      "✅ Smart IC protection"
    ],
    benefits: [
      "☀️ Charges in 8-10 hours of sunlight",
      "📱 Charge iPhone 4-5 times",
      "⚡ Fast charge compatible",
      "🏕️ Perfect for camping & travel",
      "💪 Rugged & durable design"
    ],
    whatsIncluded: [
      "1x Solar Power Bank (20,000mAh)",
      "1x USB-C charging cable",
      "1x Carabiner clip",
      "1x User manual",
      "18-month warranty card"
    ],
    emi: null
  },
  "5kW Solar System": {
    name: "5kW Solar System",
    price: "₹2,75,000",
    icon: "⚡",
    rating: "4.9",
    reviews: "1,680",
    description: "Premium solar installation for 3-4 BHK homes and small businesses. Higher capacity system that can power AC, refrigerator, and all appliances simultaneously with excess energy for net metering.",
    specifications: [
      { label: "System Size", value: "5 kW" },
      { label: "Panel Count", value: "15 Panels (335W each)" },
      { label: "Inverter", value: "5kW Hybrid Inverter" },
      { label: "Panel Type", value: "Bifacial Monocrystalline" },
      { label: "Efficiency", value: "21.5%" },
      { label: "Installation", value: "Ground/Rooftop" }
    ],
    features: [
      "✅ 25-year panel warranty",
      "✅ 10-year inverter warranty",
      "✅ Professional installation",
      "✅ Government subsidy up to 20%",
      "✅ Advanced monitoring system",
      "✅ Battery storage ready"
    ],
    benefits: [
      "💰 Save ₹14 Lakhs over 25 years",
      "⚡ Generate 20-25 units daily",
      "🌍 Offset 80 tons of CO2",
      "📉 Payback period: 5-6 years",
      "🏭 Ideal for small businesses"
    ],
    whatsIncluded: [
      "15x 335W Bifacial Solar Panels",
      "1x 5kW Premium Hybrid Inverter",
      "Heavy-duty mounting structure",
      "All cables, connectors & earthing",
      "Professional installation",
      "1 year AMC included"
    ],
    emi: {
      tenure: "60 months",
      monthly: "₹16,500",
      downPayment: "₹30,000"
    }
  },

  "Wireless Solar Charger": {
    name: "Wireless Solar Charger",
    price: "₹3,999",
    icon: "📱",
    rating: "4.9",
    reviews: "5,240",
    description: "Revolutionary wireless charging pad powered by solar energy. No cables needed! Qi-compatible with all modern smartphones. Fast 15W charging with intelligent heat management.",
    specifications: [
      { label: "Charging Power", value: "15W Fast Charge" },
      { label: "Solar Panel", value: "10W Polycrystalline" },
      { label: "Compatibility", value: "All Qi Devices" },
      { label: "Input", value: "USB-C 18W" },
      { label: "Efficiency", value: "85%" },
      { label: "Certification", value: "Qi Certified" }
    ],
    features: [
      "✅ Wireless Qi charging",
      "✅ Solar powered operation",
      "✅ Fast 15W charging",
      "✅ Foreign object detection",
      "✅ Temperature control",
      "✅ LED charging indicator"
    ],
    benefits: [
      "📱 Compatible with all Qi phones",
      "☀️ Charges from sunlight",
      "⚡ 15W fast wireless charging",
      "🔒 Safe & certified",
      "🌿 Eco-friendly design"
    ],
    whatsIncluded: [
      "1x Wireless Solar Charger",
      "1x USB-C cable",
      "1x Wall adapter",
      "1x User manual",
      "2-year warranty"
    ],
    emi: null
  },
  
  "Smart Charging Hub": {
    name: "Smart Charging Hub",
    price: "₹12,999",
    icon: "🏠",
    rating: "5.0",
    reviews: "890",
    description: "Ultimate charging station for your home. Charge 5+ devices simultaneously with AI-powered auto-scheduling. Real-time energy tracking dashboard with mobile app control.",
    specifications: [
      { label: "Ports", value: "3x USB-C, 2x USB-A, 1x Wireless" },
      { label: "Total Power", value: "100W" },
      { label: "Wireless Charging", value: "15W Qi Fast Charge" },
      { label: "USB-C Output", value: "Up to 65W PD" },
      { label: "Connectivity", value: "Wi-Fi & Bluetooth" },
      { label: "App", value: "iOS & Android" }
    ],
    features: [
      "✅ Charge 5+ devices simultaneously",
      "✅ AI auto-scheduling",
      "✅ Mobile app control",
      "✅ Real-time monitoring",
      "✅ Solar panel compatible",
      "✅ Smart power distribution"
    ],
    benefits: [
      "🏠 Central charging station",
      "📊 Track energy usage",
      "⚡ Fast charging all ports",
      "🤖 AI optimized charging",
      "🔌 Reduce cable clutter"
    ],
    whatsIncluded: [
      "1x Smart Charging Hub",
      "1x Power cable",
      "3x USB-C cables",
      "1x Setup guide",
      "3-year warranty"
    ],
    emi: {
      tenure: "12 months",
      monthly: "₹1,200",
      downPayment: "₹2,000"
    }
  },
  
  "Solar Battery Kit": {
    name: "Solar Battery Kit",
    price: "₹1,499",
    icon: "♻️",
    rating: "4.6",
    reviews: "12,450",
    description: "Stop buying disposable batteries forever! Complete rechargeable battery solution with solar charging dock. Includes 8 AA/AAA batteries with 2000+ recharge cycles.",
    specifications: [
      { label: "Batteries", value: "4x AA, 4x AAA" },
      { label: "Capacity", value: "AA: 2800mAh, AAA: 1100mAh" },
      { label: "Recharge Cycles", value: "2000+ times" },
      { label: "Solar Panel", value: "5W Integrated" },
      { label: "Charging Time", value: "6-8 hours (solar)" },
      { label: "Type", value: "NiMH Low Self-Discharge" }
    ],
    features: [
      "✅ 8 rechargeable batteries",
      "✅ Solar charging dock",
      "✅ 2000+ recharge cycles",
      "✅ Low self-discharge",
      "✅ Pre-charged & ready",
      "✅ Individual LED indicators"
    ],
    benefits: [
      "💰 Save ₹50,000 over lifetime",
      "♻️ Reduce battery waste",
      "☀️ Solar charging included",
      "🔋 Always have charged batteries",
      "🌍 Eco-friendly solution"
    ],
    whatsIncluded: [
      "4x AA Rechargeable Batteries",
      "4x AAA Rechargeable Batteries",
      "1x Solar Charging Dock",
      "1x USB charging cable",
      "5-year battery warranty"
    ],
    emi: null
  },
  
};

// ============ EFFECTS ============

 useEffect(() => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  if (token && user) {
    try {
      const userData = JSON.parse(user);
      setIsLoggedIn(true);
      setUserName(userData.name);
      setEmail(userData.email);  // Add this
      
      // Load cart count
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      setCartCount(cart.length);
      
      console.log("✅ User logged in:", userData.name);
    } catch (error) {
      console.error("Error parsing user data:", error);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  }
}, []);

// Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showUserMenu && !e.target.closest('.user-menu-container')) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showUserMenu]);


  
  // Stars Animation
  useEffect(() => {
    const starsContainer = document.getElementById("stars");
    if (starsContainer) {
      starsContainer.innerHTML = "";
      for (let i = 0; i < 100; i++) {
        const star = document.createElement("div");
        star.className = "star";
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.width = "2px";
        star.style.height = "2px";
        star.style.animationDelay = `${Math.random() * 3}s`;
        starsContainer.appendChild(star);
      }
    }
  }, []);

useEffect(() => {
  const loadUserData = async () => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token && user) {
      try {
        const userData = JSON.parse(user);
        setIsLoggedIn(true);
        setUserName(userData.name);
        setEmail(userData.email);
        
        // ✅ Load cart count from backend
        const response = await fetch('http://localhost:5000/api/cart', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setCartCount(data.cart.totalItems || 0);
        }
 }
   catch (error) {
        console.error("Error loading user data:", error);
      }
    }
  };

  loadUserData();
}, []);
  
  // ============ EVENT HANDLERS ============
  
  // Handle Feature Click
  const handleFeatureClick = (title) => {
    console.log("🎯 Feature clicked:", title);
    setSelectedFeature(featureDetails[title]);
    setShowFeatureModal(true);
  };
  
  // Handle Sign In
  const handleSignIn = async () => {
    if (!email || !password) {
      alert("⚠️ Please enter email and password");
      return;
    }
    
    try {
      console.log("🔐 Attempting login for:", email);
      
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      
      console.log("📡 Response status:", response.status);
      const data = await response.json();
      console.log("📦 Response data:", data);
      
      if (response.ok && data.success && data.token) {
        console.log("✅ Login successful!");
        // Save to localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        
        // Update state
        setIsLoggedIn(true);
        setUserName(data.user.name);
        setShowSignIn(false);
        setEmail("");
        setPassword("");
        
        alert(`✅ Welcome back, ${data.user.name}!`);
        
        // Navigate to profile after 1 second
        setTimeout(() => {
          window.location.href = "/profile";
        }, 1000);
      } else {
        console.error("❌ Login failed:", data.message);
        alert("❌ " + (data.message || `Login failed (${response.status})`));
      }
    } catch (error) {
      console.error("❌ Login error:", error);
      alert(
        "❌ Cannot connect to server. Make sure backend is running on port 5000"
      );
    }
  };
  
// Handle Product Click
const handleProductClick = (productName) => {
  console.log("=== PRODUCT CLICK DEBUG ===");
  console.log("1. Clicked product:", productName);
  console.log("2. Available products:", Object.keys(productDetailsData));
  
  const details = productDetailsData[productName];
  
  console.log("3. Found details:", details ? "YES" : "NO");
  
  if (details) {
    console.log("4. Setting state with:", details.name);
    setSelectedProduct(details);
    setShowProductModal(true);
    console.log("5. Modal should open now!");
  } else {
    console.error("❌ Product not found!");
    console.log("Available products are:", Object.keys(productDetailsData));
    alert(`Product "${productName}" not found in database. Check console for details.`);
  }
};
  
  // // Add to Cart Function
// In HomePage.jsx

const handleAddToCart = async (product) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    alert('⚠️ Please login first to add items to cart');
    navigate('/login');
    return;
  }

  console.log('=== FRONTEND DEBUG ===');
  console.log('1. Token exists:', !!token);
  console.log('2. Product ID:', product._id || product.name);

  try {
    const response = await fetch('http://localhost:5000/api/cart', {  // ✅ FIXED endpoint
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        productId: product._id || product.name,  // ✅ FIXED: productId only
        quantity: 1
      })
    });

    console.log('3. Response status:', response.status);
    const data = await response.json();
    console.log('4. Response data:', data);

    if (response.ok && data.success) {
      setCartCount(data.cart?.length || 1);
      localStorage.setItem('cartCount', data.cart?.length || 1);
      alert(`✅ ${product.name} added to cart! (${data.cart?.length || 1} items)`);
    } else {
      alert('❌ ' + (data.message || 'Failed to add to cart'));
    }
  } catch (error) {
    console.error('❌ Add to cart error:', error);
    alert('❌ Cannot connect to server.');
  }
};



// Handle Log out 
const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setIsLoggedIn(false);
      setUserName("");
      setEmail("");
      setShowUserMenu(false);
      alert("✅ Logged out successfully!");
      navigate("/");
    }
  };


  // Calculator Logic
  const calculateSolar = () => {
    const bill = parseFloat(billAmount);
    const roof = parseFloat(roofSpace);

    if (!bill || !location || !roof || bill <= 0 || roof <= 0) {
      alert(
        "⚠️ Please enter valid Monthly Bill (>₹100) & Roof Space (>50 sq ft)"
      );
      return;
    }

    const unitsPerMonth = bill / 6.5; // ₹6.5/unit avg
    const systemSize = Math.min((unitsPerMonth * 12) / 1300, roof / 110); // 110sqft/kW
    const panelCount = Math.ceil((systemSize * 1000) / 550); // 550W panels
    const costPerKW = 55000; // India 2025 price
    const totalCost = systemSize * costPerKW;
    const subsidyPercent = systemSize <= 3 ? 0.4 : systemSize <= 10 ? 0.2 : 0.1;
    const subsidy = totalCost * subsidyPercent;
    const netCost = totalCost - subsidy;
    const annualSavings = bill * 12 * 0.95; // 95% savings
    const savings25Years = annualSavings * 25;
    const paybackYears = (netCost / annualSavings).toFixed(1);
    const roi = ((savings25Years / netCost) * 100).toFixed(0);

    setResults({
      systemSize: `${systemSize.toFixed(1)} kW`,
      panelCount: `${panelCount} panels`,
      totalCost: `₹${Math.round(totalCost).toLocaleString("en-IN")}`,
      subsidy: `₹${Math.round(subsidy).toLocaleString("en-IN")}`,
      netCost: `₹${Math.round(netCost).toLocaleString("en-IN")}`,
      savings: `₹${Math.round(savings25Years).toLocaleString("en-IN")}`,
      payback: `${paybackYears} years`,
      roi: `${roi}%`,
      monthlyEMI: `₹${Math.round(netCost / 60)}/month`, // 5yr EMI
    });

    setShowResults(true);
    console.log("✅ Solar calculation completed");
  };

  // const navigate = useNavigate();   // ✅ inside component

  // Add this function with other handlers
// This is a DIFFERENT function - don't mix them!
const saveCalculation = async () => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    alert('⚠️ Please login first to save calculations!');
    navigate('/login');
    return;
  }

  // Helper function to extract numbers from formatted strings
  const extractNumber = (str) => {
    if (!str) return 0;
    // Remove ₹, commas, letters, %, and extract just the number
    const num = str.toString().replace(/[₹,a-zA-Z%\s]/g, '');
    return parseFloat(num) || 0;
  };

  try {
    const response = await fetch('http://localhost:5000/api/calculations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        input: {
          monthlyBill: parseFloat(billAmount),
          location: location,
          roofSpace: parseFloat(roofSpace)
        },
        output: {
          systemSize: extractNumber(results.systemSize),        // "8.0 kW" → 8.0
          panelCount: extractNumber(results.panelCount),        // "15 panels" → 15
          totalCost: extractNumber(results.totalCost),          // "₹4,38,000" → 438000
          subsidy: extractNumber(results.subsidy),              // "₹87,600" → 87600
          afterSubsidy: extractNumber(results.netCost),         // "₹3,50,400" → 350400
          savings25Years: extractNumber(results.savings),       // "₹25,36,500" → 2536500
          paybackYears: extractNumber(results.payback),         // "5.5 years" → 5.5
          roi: extractNumber(results.roi),                      // "724%" → 724
          monthlyEMI: extractNumber(results.monthlyEMI)         // "₹5840/month" → 5840
        }
      })
    });

    console.log('Save calculation response:', response.status);

    if (response.ok) {
      alert('✅ Calculation saved successfully!');
      navigate('/saved-calculations');
    } else {
      const data = await response.json();
      console.error('Save error:', data);
      alert('❌ ' + (data.message || 'Failed to save calculation'));
    }
  } catch (error) {
    console.error('Error saving calculation:', error);
    alert('❌ Cannot connect to server');
  }
};
  return (
    <>
      {/* ========== SIGN IN MODAL ========== */}
      {showSignIn && (
        <div className="modal-overlay" onClick={() => setShowSignIn(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>🔐 Sign In to Your Account</h3>
            <p
              style={{ color: "#aaa", marginBottom: "20px", fontSize: "14px" }}
            >
              Enter your credentials to access your solar dashboard
            </p>

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="modal-input"
              autoFocus
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSignIn()}
              className="modal-input"
            />

            <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
              <button
                className="btn btn-primary"
                onClick={handleSignIn}
                style={{ flex: 1 }}
              >
                SIGN IN
              </button>

              <button
                className="btn btn-secondary"
                onClick={() => setShowSignIn(false)}
                style={{ flex: 1 }}
              >
                CANCEL
              </button>
            </div>

            <p
              style={{
                textAlign: "center",
                color: "#aaa",
                marginTop: "20px",
                fontSize: "14px",
              }}
            >
              Don't have an account?{" "}
              <span
                style={{
                  color: "#ffc832",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
                onClick={() => {
                  setShowSignIn(false);
                  navigate("/register");
                }}
              >
                Register Now
              </span>
            </p>
          </div>
        </div>
      )}

{/* Features Data Model */}
{showFeatureModal && selectedFeature && (
        <div
          className="modal-overlay"
          onClick={() => setShowFeatureModal(false)}
        >
          <div
            className="feature-modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: "700px", maxHeight: "90vh", overflowY: "auto" }}
          >
            {/* Feature Header */}
            <div style={{ textAlign: "center", marginBottom: "30px" }}>
              <div
                style={{
                  fontSize: "72px",
                  marginBottom: "15px",
                  animation: "bounce 2s ease-in-out infinite",
                }}
              >
                {selectedFeature.icon}
              </div>
              <h2
                style={{
                  fontSize: "36px",
                  marginBottom: "15px",
                  background: "linear-gradient(135deg, #ffc832, #ff6b35)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {selectedFeature.title}
              </h2>
              <p style={{ color: "#aaa", fontSize: "16px", lineHeight: "1.8" }}>
                {selectedFeature.description}
              </p>
            </div>

            {/* Statistics */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "15px",
                marginBottom: "30px",
              }}
            >
              {Object.entries(selectedFeature.stats).map(
                ([key, value], idx) => (
                  <div
                    key={idx}
                    style={{
                      background: "rgba(255,200,50,0.1)",
                      padding: "20px",
                      borderRadius: "15px",
                      textAlign: "center",
                      border: "2px solid rgba(255,200,50,0.3)",
                    }}
                  >
                    <div
                      style={{
                        color: "#ffc832",
                        fontSize: "28px",
                        fontWeight: "bold",
                        marginBottom: "8px",
                        fontFamily: "'Orbitron', sans-serif",
                      }}
                    >
                      {value}
                    </div>
                    <div
                      style={{
                        color: "#aaa",
                        fontSize: "11px",
                        textTransform: "uppercase",
                        letterSpacing: "1px",
                      }}
                    >
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </div>
                  </div>
                )
              )}
            </div>

            {/* Features List */}
            <div style={{ marginBottom: "30px" }}>
              <h3
                style={{
                  color: "#fff",
                  fontSize: "22px",
                  marginBottom: "20px",
                  borderBottom: "2px solid #ffc832",
                  paddingBottom: "10px",
                }}
              >
                🌟 Key Features
              </h3>
              {selectedFeature.features.map((feature, idx) => (
                <div
                  key={idx}
                  style={{
                    color: "#ddd",
                    fontSize: "15px",
                    marginBottom: "12px",
                    padding: "15px",
                    background: "rgba(255,255,255,0.03)",
                    borderRadius: "10px",
                    borderLeft: "4px solid #ffc832",
                    transition: "all 0.3s",
                  }}
                >
                  {feature}
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={() => {
                  setShowFeatureModal(false);
                  alert("🚀 Feature coming soon! Stay tuned for updates.");
                }}
                style={{
                  flex: 1,
                  padding: "15px",
                  background: "linear-gradient(135deg, #ffc832, #ff6b35)",
                  border: "none",
                  borderRadius: "10px",
                  color: "#0a0e27",
                  fontSize: "16px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                TRY IT NOW
              </button>

              <button
                onClick={() => setShowFeatureModal(false)}
                style={{
                  flex: 1,
                  padding: "15px",
                  background: "transparent",
                  border: "2px solid #ffc832",
                  borderRadius: "10px",
                  color: "#ffc832",
                  fontSize: "16px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}

{/* ========== PRODUCT DETAILS MODAL ========== */}
{showProductModal && selectedProduct && (
  <div className="modal-overlay" onClick={() => setShowProductModal(false)}>
    <div 
      className="product-detail-modal" 
      onClick={(e) => e.stopPropagation()}
    >
      {/* Close Button */}
      <button 
        className="modal-close-button"
        onClick={() => setShowProductModal(false)}
      >
        ✕
      </button>

      {/* Product Header */}
      <div className="product-detail-header">
        <div className="product-detail-icon">{selectedProduct.icon}</div>
        <div className="product-detail-title-section">
          <h2 className="product-detail-title">{selectedProduct.name}</h2>
          <div className="product-detail-rating">
            ⭐ {selectedProduct.rating} ({selectedProduct.reviews} reviews)
          </div>
        </div>
        <div className="product-detail-price-section">
          <div className="product-detail-price">{selectedProduct.price}</div>
          {selectedProduct.emi && (
            <div className="product-detail-emi">
              or {selectedProduct.emi.monthly}/month
            </div>
          )}
        </div>
      </div>

      {/* Product Description */}
      <div className="product-detail-description">
        {selectedProduct.description}
      </div>

      {/* Tabs Section */}
      <div className="product-detail-tabs">
        {/* Specifications */}
        <div className="product-detail-section">
          <h3 className="product-detail-section-title">📋 Specifications</h3>
          <div className="specs-grid">
            {selectedProduct.specifications.map((spec, idx) => (
              <div key={idx} className="spec-item">
                <div className="spec-label">{spec.label}</div>
                <div className="spec-value">{spec.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Features & Benefits */}
        <div className="product-detail-columns">
          <div className="product-detail-section">
            <h3 className="product-detail-section-title">✨ Key Features</h3>
            <div className="feature-list">
              {selectedProduct.features.map((feature, idx) => (
                <div key={idx} className="feature-list-item-product">
                  {feature}
                </div>
              ))}
            </div>
          </div>

          <div className="product-detail-section">
            <h3 className="product-detail-section-title">💡 Benefits</h3>
            <div className="feature-list">
              {selectedProduct.benefits.map((benefit, idx) => (
                <div key={idx} className="feature-list-item-product">
                  {benefit}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* What's Included */}
        <div className="product-detail-section">
          <h3 className="product-detail-section-title">📦 What's Included</h3>
          <div className="included-grid">
            {selectedProduct.whatsIncluded.map((item, idx) => (
              <div key={idx} className="included-item">
                <span className="included-icon">✓</span>
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* EMI Options (if available) */}
        {selectedProduct.emi && (
          <div className="product-detail-section">
            <h3 className="product-detail-section-title">💳 EMI Options</h3>
            <div className="emi-options">
              <div className="emi-option">
                <div className="emi-label">Monthly EMI</div>
                <div className="emi-value">{selectedProduct.emi.monthly}</div>
              </div>
              <div className="emi-option">
                <div className="emi-label">Tenure</div>
                <div className="emi-value">{selectedProduct.emi.tenure}</div>
              </div>
              <div className="emi-option">
                <div className="emi-label">Down Payment</div>
                <div className="emi-value">{selectedProduct.emi.downPayment}</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="product-detail-actions">
        <button 
          className="btn btn-primary product-action-btn"
          onClick={() => handleAddToCart(selectedProduct)}
        >
          🛒 ADD TO CART
        </button>
        <button 
          className="btn btn-secondary product-action-btn"
          onClick={() => alert("📞 Call us at: 1800-XXX-XXXX")}
        >
          📞 CALL NOW
        </button>
        <button 
          className="btn btn-secondary product-action-btn"
          onClick={() => alert("💬 Chat started!")}
        >
          💬 CHAT
        </button>
      </div>
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
            <li>
              <a 
                href="#products" 
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/products');
                }}
              >
                Products
              </a>
            </li>
            <li>
              <a 
                href="#dashboard" 
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/dashboard');
                }}
              >
                Dashboard
              </a>
            </li>
          </ul>

              <div className="nav-buttons">
            {isLoggedIn ? (
              // ✅ LOGGED IN - SHOW USERNAME WITH DROPDOWN
              <div className="user-menu-container" style={{ position: 'relative' }}>
                {/* Username Button (Clickable) */}
                <button
                  className="user-greeting-btn"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  style={{
                    background: 'transparent',
                    border: '2px solid #ffc832',
                    borderRadius: '25px',
                    padding: '10px 20px',
                    color: '#ffc832',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'all 0.3s',
                    fontFamily: "'Rajdhani', sans-serif"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 200, 50, 0.1)';
                    e.currentTarget.style.borderColor = '#ffc832';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  <span>Hi, {userName}</span>
                  <span style={{ 
                    fontSize: '10px', 
                    transform: showUserMenu ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s'
                  }}>
                    ▼
                  </span>
                </button>

            {/* Dropdown Menu */}
                {showUserMenu && (
                  <div className="user-dropdown-menu" style={{
                      position: 'fixed',  // ✅ Change from absolute to fixed
                      top: '80px',  // ✅ Fixed position from top
                      right: '20px',  // ✅ Fixed position from right
                      background: 'rgba(10, 14, 39, 0.95)',  // ✅ Semi-transparent
                      backdropFilter: 'blur(20px)',  // ✅ Glassmorphism blur
                      WebkitBackdropFilter: 'blur(20px)',  // ✅ Safari support
                      border: '2px solid #ffc832',
                      borderRadius: '20px',
                      minWidth: '280px',
                      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8)',  // ✅ Darker shadow
                      padding: '15px 0',
                      zIndex: 999999,// ✅ Very high z-index
                      animation: 'dropdownSlideIn 0.3s ease'
                  }}>
    
              {/* User Info Header */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '15px',
                      padding: '15px 20px',
                      background: 'rgba(255, 200, 50, 0.05)',
                      borderBottom: '1px solid rgba(255, 200, 50, 0.2)',
                      marginBottom: '10px'
                    }}>
                      <div style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #ffc832, #ff6b35)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '24px',
                        fontWeight: '900',
                        color: '#0a0e27',
                        fontFamily: "'Orbitron', sans-serif"
                      }}>
                        {userName.charAt(0).toUpperCase()}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{
                          fontSize: '18px',
                          fontWeight: '700',
                          color: '#fff',
                          marginBottom: '4px'
                        }}>
                          {userName}
                        </div>
                        <div style={{
                          fontSize: '13px',
                          color: '#aaa',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}>
                          {email}
                        </div>
                      </div>
                    </div>

              {/* Menu Items */}
                    <button
                      className="dropdown-menu-item"
                      onClick={() => {
                        setShowUserMenu(false);
                        navigate('/profile');
                      }}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '12px 20px',
                        background: 'none',
                        border: 'none',
                        color: '#fff',
                        fontSize: '15px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.3s',
                        textAlign: 'left',
                        fontFamily: "'Rajdhani', sans-serif"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 200, 50, 0.1)';
                        e.currentTarget.style.paddingLeft = '25px';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'none';
                        e.currentTarget.style.paddingLeft = '20px';
                      }}
                    >
                      <span style={{ fontSize: '20px', width: '24px', textAlign: 'center' }}>👤</span>
                      My Profile
                    </button>

                    <button
                      className="dropdown-menu-item"
                      onClick={() => {
                        setShowUserMenu(false);
                        navigate('/cart');
                      }}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '12px 20px',
                        background: 'none',
                        border: 'none',
                        color: '#fff',
                        fontSize: '15px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.3s',
                        textAlign: 'left',
                        fontFamily: "'Rajdhani', sans-serif",
                        position: 'relative'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 200, 50, 0.1)';
                        e.currentTarget.style.paddingLeft = '25px';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'none';
                        e.currentTarget.style.paddingLeft = '20px';
                      }}
                    >
                      <span style={{ fontSize: '20px', width: '24px', textAlign: 'center' }}>🛒</span>
                      Cart
                      {cartCount > 0 && (
                        <span style={{
                          position: 'absolute',
                          right: '20px',
                          background: '#ff6b35',
                          color: '#fff',
                          borderRadius: '12px',
                          padding: '2px 8px',
                          fontSize: '12px',
                          fontWeight: '700',
                          fontFamily: "'Orbitron', sans-serif"
                        }}>
                          {cartCount}
                        </span>
                      )}
                    </button>

                    <button
                      className="dropdown-menu-item"
                      onClick={() => {
                        setShowUserMenu(false);
                        navigate('/orders');
                      }}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '12px 20px',
                        background: 'none',
                        border: 'none',
                        color: '#fff',
                        fontSize: '15px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.3s',
                        textAlign: 'left',
                        fontFamily: "'Rajdhani', sans-serif"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 200, 50, 0.1)';
                        e.currentTarget.style.paddingLeft = '25px';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'none';
                        e.currentTarget.style.paddingLeft = '20px';
                      }}
                    >
                      <span style={{ fontSize: '20px', width: '24px', textAlign: 'center' }}>📦</span>
                      My Orders
                    </button>

                    <button
                      className="dropdown-menu-item"
                      onClick={() => {
                        setShowUserMenu(false);
                        navigate('/saved-calculations');
                      }}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '12px 20px',
                        background: 'none',
                        border: 'none',
                        color: '#fff',
                        fontSize: '15px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.3s',
                        textAlign: 'left',
                        fontFamily: "'Rajdhani', sans-serif"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 200, 50, 0.1)';
                        e.currentTarget.style.paddingLeft = '25px';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'none';
                        e.currentTarget.style.paddingLeft = '20px';
                      }}
                    >
                      <span style={{ fontSize: '20px', width: '24px', textAlign: 'center' }}>💾</span>
                      Saved Calculations
                    </button>

                    <button
                      className="dropdown-menu-item"
                      onClick={() => {
                        setShowUserMenu(false);
                        navigate('/settings');
                      }}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '12px 20px',
                        background: 'none',
                        border: 'none',
                        color: '#fff',
                        fontSize: '15px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.3s',
                        textAlign: 'left',
                        fontFamily: "'Rajdhani', sans-serif"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 200, 50, 0.1)';
                        e.currentTarget.style.paddingLeft = '25px';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'none';
                        e.currentTarget.style.paddingLeft = '20px';
                      }}
                    >
                      <span style={{ fontSize: '20px', width: '24px', textAlign: 'center' }}>⚙️</span>
                      Settings
                    </button>

                    <div style={{
                      height: '1px',
                      background: 'rgba(255, 200, 50, 0.2)',
                      margin: '10px 0'
                    }}></div>

                    <button
                      className="dropdown-menu-item"
                      onClick={handleLogout}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '12px 20px',
                        background: 'none',
                        border: 'none',
                        color: '#ff6b35',
                        fontSize: '15px',
                        fontWeight: '700',
                        cursor: 'pointer',
                        transition: 'all 0.3s',
                        textAlign: 'left',
                        fontFamily: "'Rajdhani', sans-serif"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 107, 53, 0.1)';
                        e.currentTarget.style.paddingLeft = '25px';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'none';
                        e.currentTarget.style.paddingLeft = '20px';
                      }}
                    >
                      <span style={{ fontSize: '20px', width: '24px', textAlign: 'center' }}>🚪</span>
                      Logout
                    </button>
                  </div>
                )}
              </div>
  ) : (
              // ✅ NOT LOGGED IN - SHOW SIGN IN / GET STARTED BUTTONS
              <>
                <button
                  className="btn btn-secondary"
                  onClick={() => navigate('/login')}
                >
                  SIGN IN
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => navigate('/register')}
                >
                  GET STARTED
                </button>
              </>
            )}
          </div>
        </nav>
          {/* HERO SECTION */}
          <section className="hero" id="home">
            <div className="hero-content">
              <h1>FUTURE OF SOLAR ENERGY</h1>
              <p className="tagline">
                India's First AI-Powered Solar Marketplace. Revolutionary.
                Innovative. Sustainable.
              </p>
              <div>
                <button
                  className="btn btn-primary"
                  style={{ marginRight: "15px" }}
                >
                  CALCULATE NOW ⚡
                </button>
                <button className="btn btn-secondary">EXPLORE MORE</button>
              </div>
              <div className="hero-stats">
                <div className="stat-card">
                  <span className="stat-number">50+</span>
                  <span className="stat-label">Verified Vendors</span>
                </div>
                <div className="stat-card">
                  <span className="stat-number">1K+</span>
                  <span className="stat-label">Happy Customers</span>
                </div>
                <div className="stat-card">
                  <span className="stat-number">₹2Cr+</span>
                  <span className="stat-label">Money Saved</span>
                </div>
              </div>
            </div>
          </section>

          {/* CALCULATOR SECTION */}
          <section className="calculator-section" id="calculator">
            <h2 className="section-title">🤖 AI SOLAR CALCULATOR</h2>
            <p className="section-subtitle">
              Enter details → Get instant solar blueprint in 3 seconds
            </p>

            <div className="input-group">
              <label htmlFor="bill-amount">
                ⚡ Monthly Electricity Bill (₹)
              </label>
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
              <small id="bill-help" className="form-help">
                Your monthly electricity bill amount
              </small>
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
                <small id="location-help" className="form-help">
                  Enter your city name
                </small>
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
                <small id="roof-help" className="form-help">
                  Available roof area in square feet
                </small>
              </div>
              <button
                type="button"
                className="calculate-btn"
                onClick={calculateSolar}
              >
                ⚡ CALCULATE MY SOLAR PLAN
              </button>

              {showResults && (
                <div className="result-box">
                  <h3 className="result-title">📊 YOUR SOLAR BLUEPRINT</h3>
                  <div className="result-grid">
                    <div className="result-item">
                      <div className="result-label">System Size</div>
                      <div className="result-value">{results.systemSize}</div>
                    </div>
                    <div className="result-item">
                      <div className="result-label">Panels Needed</div>
                      <div className="result-value">{results.panelCount}</div>
                    </div>
                    <div className="result-item">
                      <div className="result-label">Total Cost</div>
                      <div className="result-value">{results.totalCost}</div>
                    </div>
                    <div className="result-item">
                      <div className="result-label">Subsidy</div>
                      <div className="result-value">{results.subsidy}</div>
                    </div>
                    <div className="result-item">
                      <div className="result-label">Net Payable</div>
                      <div className="result-value">{results.netCost}</div>
                    </div>
                    <div className="result-item">
                      <div className="result-label">25Y Savings</div>
                      <div className="result-value">{results.savings}</div>
                    </div>
                    <div className="result-item">
                      <div className="result-label">Payback Period</div>
                      <div className="result-value">{results.payback}</div>
                    </div>
                    <div className="result-item">
                      <div className="result-label">ROI</div>
                      <div className="result-value">{results.roi}</div>
                    </div>
                  </div>
                  <button
      className="btn btn-primary"
      onClick={saveCalculation}
      style={{
       width: '100%',
      marginTop: '20px',
      padding: '15px',
      background: 'linear-gradient(135deg, #4ade80, #22c55e)',
      color: '#0a0e27',
      border: 'none',
      borderRadius: '12px',
      fontSize: '16px',
      fontWeight: 'bold',
      cursor: 'pointer'
        }}
    >
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
            <p className="section-subtitle">
              Revolutionary features that set us apart from everyone
            </p>

            <div className="features-grid">
              {[
                {
                  icon: "🤖",
                  title: "AI Calculator",
                  desc: "Instant recommendations in 30 seconds. First in India with AI-powered analysis!",
                },
                {
                  icon: "💰",
                  title: "Price Comparison",
                  desc: "Compare 10+ vendors instantly. Guaranteed best prices. Save 20-30%!",
                },
                {
                  icon: "🔋",
                  title: "Charging Ecosystem",
                  desc: "Complete solar charging solution. Power banks, wireless chargers, smart hubs!",
                },
                {
                  icon: "📍",
                  title: "Live Tracking",
                  desc: "Track installation in real-time. GPS tracking like Uber!",
                },
                {
                  icon: "💳",
                  title: "Easy EMI",
                  desc: "Flexible payment from ₹10,500/month. Instant approval in 5 minutes!",
                },
                {
                  icon: "✅",
                  title: "Quality Guaranteed",
                  desc: "100% verified vendors. Money-back guarantee. Premium quality assured!",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="feature-card feature-card-clickable"
                  onClick={() => handleFeatureClick(feature.title)}
                  style={{ cursor: "pointer", position: "relative" }}
                >
                  <div className="feature-icon">{feature.icon}</div>
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-desc">{feature.desc}</p>
                  <div
                    style={{
                      marginTop: "15px",
                      color: "#ffc832",
                      fontWeight: "bold",
                      fontSize: "14px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "5px",
                    }}
                  >
                    Click to learn more
                    <span style={{ fontSize: "18px" }}>→</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

{/* Products Section*/}
<section className="products-section" id="products">
  <h2 className="section-title">🛒 OUR PRODUCTS</h2>
  <p className="section-subtitle">
    Premium solar solutions for your complete energy needs
  </p>

  <div className="product-grid">
    {[
      {
        icon: "☀️",
        badge: "BESTSELLER",
        name: "3kW Solar System",  // ✅ This MUST match productDetailsData key
        price: "₹1,80,000",
        rating: "⭐⭐⭐⭐⭐ (4.8)",
        desc: "Perfect for 2-3 BHK homes. Includes 9 panels, inverter, and 25-year warranty. Save up to ₹8.5L in 25 years!",
      },
      {
        icon: "🔋",
        badge: "HOT DEAL",
        name: "Solar Power Bank",  // ✅ This MUST match productDetailsData key
        price: "₹2,499",
        rating: "⭐⭐⭐⭐⭐ (4.7)",
        desc: "20,000mAh capacity with built-in solar panels. Charge anywhere using sunlight. Waterproof design!",
      },
      {
        icon: "📱",
        badge: "NEW",
        name: "Wireless Solar Charger",  // ✅ Add this to productDetailsData if missing
        price: "₹3,999",
        rating: "⭐⭐⭐⭐⭐ (4.9)",
        desc: "No cables needed! Qi-compatible wireless charging. Fast 15W charging. Solar powered!",
      },
      {
        icon: "🏠",
        badge: "PREMIUM",
        name: "Smart Charging Hub",  // ✅ Add this to productDetailsData if missing
        price: "₹12,999",
        rating: "⭐⭐⭐⭐⭐ (5.0)",
        desc: "Charge 5+ devices simultaneously. AI auto-scheduling. Real-time energy tracking dashboard!",
      },
      {
        icon: "♻️",
        badge: "ECO",
        name: "Solar Battery Kit",  // ✅ Add this to productDetailsData if missing
        price: "₹1,499",
        rating: "⭐⭐⭐⭐⭐ (4.6)",
        desc: "8 rechargeable AA/AAA batteries with solar charging dock. Stop buying disposables forever!",
      },
      {
        icon: "⚡",
        badge: "POPULAR",
        name: "5kW Solar System",  // ✅ This MUST match productDetailsData key
        price: "₹2,75,000",
        rating: "⭐⭐⭐⭐⭐ (4.9)",
        desc: "Ideal for 3-4 BHK homes. Complete setup with 15 panels. Government subsidy eligible!",
      },
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
          
          {/* ✅ FIXED BUTTON */}
          <button
            type="button"
            className="btn btn-primary"
            style={{ width: "100%" }}
            onClick={(e) => {
              e.stopPropagation();
              console.log("Button clicked for:", product.name);
              handleProductClick(product.name);
            }}
          >
            VIEW DETAILS →
          </button>
        </div>
      </div>
    ))}
  </div>
</section>


      {/* Dashboard Section */}
          <section className="dashboard-section" id="dashboard">
            <h2 className="section-title">📊 YOUR SOLAR DASHBOARD</h2>
            <p className="section-subtitle">
              Real-time monitoring of your solar energy production & savings
            </p>

            <div className="dashboard-grid">
              {[
                {
                  title: "TODAY'S GENERATION",
                  value: "12.5 kWh",
                  label: "☀️ Peak solar hours",
                },
                {
                  title: "MONEY SAVED TODAY",
                  value: "₹95",
                  label: "💰 vs Grid electricity",
                },
                {
                  title: "CO2 OFFSET",
                  value: "8.2 kg",
                  label: "🌍 Carbon saved today",
                },
                {
                  title: "DEVICES CHARGED",
                  value: "6",
                  label: "🔋 Using solar energy",
                },
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
                  { height: "60%", value: "7.2 kWh", label: "MON" },
                  { height: "75%", value: "9.0 kWh", label: "TUE" },
                  { height: "90%", value: "10.8 kWh", label: "WED" },
                  { height: "85%", value: "10.2 kWh", label: "THU" },
                  { height: "95%", value: "11.4 kWh", label: "FRI" },
                  { height: "80%", value: "9.6 kWh", label: "SAT" },
                  { height: "70%", value: "8.4 kWh", label: "SUN" },
                ].map((bar, index) => (
                  <div
                    key={index}
                    className="chart-bar"
                    style={{ height: bar.height }}
                  >
                    <span className="bar-value">{bar.value}</span>
                    <span className="bar-label">{bar.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div
              style={{
                marginTop: "40px",
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "25px",
              }}
            >
              {[
                {
                  title: "This Month",
                  value: "350 kWh",
                  label: "Energy Generated",
                },
                { title: "Savings", value: "₹2,650", label: "This Month" },
                {
                  title: "Total Impact",
                  value: "245 kg",
                  label: "CO2 Offset This Month",
                },
              ].map((stat, index) => (
                <div
                  key={index}
                  style={{
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 200, 50, 0.2)",
                    borderRadius: "15px",
                    padding: "25px",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontSize: "14px",
                      color: "#aaa",
                      marginBottom: "10px",
                      textTransform: "uppercase",
                    }}
                  >
                    {stat.title}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Orbitron', sans-serif",
                      fontSize: "32px",
                      fontWeight: "900",
                      color: "#ffc832",
                      marginBottom: "5px",
                    }}
                  >
                    {stat.value}
                  </div>
                  <div style={{ fontSize: "12px", color: "#888" }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Copy from your original code - they work perfectly */}

          <footer className="footer">
            <p>
              <strong>SOLAR MARKETPLACE</strong> - Revolutionizing Solar Energy
              for India
            </p>
            <p>Powered by MERN Stack • AI-Driven • Eco-Friendly</p>
            <p style={{ marginTop: "20px", color: "#666" }}>
              © 2025 Solar Marketplace. All Rights Reserved.
            </p>
          </footer>
         <style>{`
        @keyframes dropdownSlideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
        </div>
      </div>
    </>
  );
}

export default HomePage; // ✅ SINGLE EXPORT
