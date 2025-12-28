import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

function DashboardPage() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

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
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (!token || !user) {
      alert("⚠️ Please sign in to view dashboard");
      navigate('/');
      return;
    }

    try {
      const userData = JSON.parse(user);
      setIsLoggedIn(true);
      setUserName(userData.name);
    } catch (error) {
      console.error("Error:", error);
      navigate('/');
    }
  }, [navigate]);

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
          <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            {isLoggedIn && (
              <span style={{ color: "#ffc832" }}>
                Hi, {userName}
              </span>
            )}
            <button 
              className="btn btn-secondary"
              onClick={() => navigate('/')}
            >
              ← BACK TO HOME
            </button>
          </div>
        </nav>

     {/* Dashboard Section */}
        <section className="dashboard-section" id="dashboard" style={{ marginTop: '40px' }}>
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

          {/* Additional Dashboard Stats */}
          <div style={{ marginTop: "40px" }}>
            <h3 className="chart-title" style={{ marginBottom: "30px" }}>
              📈 SYSTEM PERFORMANCE
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "20px",
              }}
            >
              {[
                {
                  icon: "⚡",
                  title: "Total Generated",
                  value: "4,250 kWh",
                  label: "Lifetime",
                },
                {
                  icon: "💰",
                  title: "Total Savings",
                  value: "₹32,150",
                  label: "Since Installation",
                },
                {
                  icon: "🌳",
                  title: "Trees Planted",
                  value: "52",
                  label: "Equivalent",
                },
                {
                  icon: "🎯",
                  title: "Efficiency",
                  value: "94.2%",
                  label: "System Health",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  style={{
                    background: "rgba(255, 200, 50, 0.1)",
                    border: "2px solid rgba(255, 200, 50, 0.3)",
                    borderRadius: "15px",
                    padding: "20px",
                    textAlign: "center",
                    transition: "all 0.3s",
                  }}
                  className="dashboard-card"
                >
                  <div style={{ fontSize: "40px", marginBottom: "10px" }}>
                    {item.icon}
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#aaa",
                      textTransform: "uppercase",
                      marginBottom: "8px",
                    }}
                  >
                    {item.title}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Orbitron', sans-serif",
                      fontSize: "28px",
                      fontWeight: "900",
                      color: "#ffc832",
                      marginBottom: "5px",
                    }}
                  >
                    {item.value}
                  </div>
                  <div style={{ fontSize: "11px", color: "#888" }}>
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div style={{ marginTop: "40px" }}>
            <h3 className="chart-title" style={{ marginBottom: "20px" }}>
              📋 RECENT ACTIVITY
            </h3>
            <div
              style={{
                background: "rgba(0, 0, 0, 0.3)",
                border: "1px solid rgba(255, 200, 50, 0.2)",
                borderRadius: "20px",
                padding: "25px",
              }}
            >
              {[
                {
                  date: "Dec 12, 2025",
                  activity: "Peak Generation",
                  value: "12.5 kWh",
                  icon: "🌟",
                },
                {
                  date: "Dec 11, 2025",
                  activity: "System Maintenance",
                  value: "Completed",
                  icon: "🔧",
                },
                {
                  date: "Dec 10, 2025",
                  activity: "Monthly Report",
                  value: "Generated",
                  icon: "📊",
                },
                {
                  date: "Dec 09, 2025",
                  activity: "Bill Savings",
                  value: "₹2,650",
                  icon: "💰",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "15px",
                    background: "rgba(255, 255, 255, 0.03)",
                    borderRadius: "10px",
                    marginBottom: index < 3 ? "10px" : "0",
                    transition: "all 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background =
                      "rgba(255, 200, 50, 0.1)";
                    e.currentTarget.style.transform = "translateX(5px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background =
                      "rgba(255, 255, 255, 0.03)";
                    e.currentTarget.style.transform = "translateX(0)";
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                    <div style={{ fontSize: "24px" }}>{item.icon}</div>
                    <div>
                      <div
                        style={{
                          color: "#fff",
                          fontWeight: "600",
                          marginBottom: "3px",
                        }}
                      >
                        {item.activity}
                      </div>
                      <div style={{ fontSize: "12px", color: "#aaa" }}>
                        {item.date}
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      color: "#ffc832",
                      fontWeight: "700",
                      fontSize: "16px",
                    }}
                  >
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default DashboardPage;