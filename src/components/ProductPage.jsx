import React, { useState, useEffect } from "react";
// import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css"; // Reuse existing styles

function ProductsPage() {
  const navigate = useNavigate();
  const [showProductModal, setShowProductModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);


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
  const handleAddToCart =  async (product) => {
 try {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login to add items to cart');
      return;
    }

    const res = await fetch('http://localhost:5000/api/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
     body: JSON.stringify({
  product: {
    name: product.name,
    price: product.price,
    icon: product.icon || '',
    rating: product.rating || 0,
    description: product.description || ''
  },
  quantity: 1
}),
    });


    const data = await res.json();
    if (res.ok && data.success) {
      // setCartCount(data.cart.length);
      alert(`${product.name} added to cart!`);
    } else {
      alert(data.message || 'Failed to add to cart');
    }
  } catch (err) {
    console.error('Add to cart error:', err);
    alert('Server error while adding to cart');
  }
  };
  

  return (
    <div className="solar-marketplace">
      <div className="bg-animation"></div>
      <div className="stars" id="stars"></div>

      <div className="container">
        {/* Navbar */}
        <nav className="navbar">
          <div className="logo">
            <span className="logo-icon">☀️</span>
            <span>SOLAR MARKETPLACE</span>
          </div>
          <button 
            className="btn btn-secondary"
            onClick={() => navigate('/')}
          >
            ← BACK TO HOME
          </button>
        </nav>

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
    </div>
    </div>
  );
}

export default ProductsPage;