import React, { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

function Dashboard() {
  const [customers, setCustomers] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/customers")
      .then(res => res.json())
      .then(data => setCustomers(data));
  }, []);

  return (
    <div className="dashboard">

      {/* ✨ BACKGROUND */}
      <div className="particles"></div>
      <div className="blob blob1"></div>
      <div className="blob blob2"></div>

      <h1 className="title">🚀 Customer Dashboard</h1>

      {/* 🧾 CUSTOMER CARDS */}
      <div className="grid">
        {customers.map(c => (
          <div
            key={c.id}
            className="card"
            onClick={() => setSelected(c)}
          >
            <h3>{c.name}</h3>
            <p>🌍 {c.region}</p>
            <p>📊 Usage: {c.usage}</p>
            <p>🎫 Tickets: {c.tickets}</p>
          </div>
        ))}
      </div>

      {/* 📊 CHARTS AT BOTTOM */}
      <div className="chart-section">
        
        <div className="chart-card">
          <h3>📊 Usage Overview</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={customers}>
              <XAxis dataKey="name" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Bar dataKey="usage" fill="#3b82f6" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>🎫 Tickets Overview</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={customers}>
              <XAxis dataKey="name" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Bar dataKey="tickets" fill="#9333ea" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* 📌 POPUP */}
      {selected && (
        <div className="popup">
          <div className="popup-box">
            <h2>{selected.name}</h2>
            <p>Region: {selected.region}</p>
            <p>Usage: {selected.usage}</p>
            <p>Tickets: {selected.tickets}</p>

            <button onClick={() => setSelected(null)}>Close</button>
          </div>
        </div>
      )}

      {/* 🎨 STYLES */}
      <style>{`
        .dashboard {
          min-height: 100vh;
          padding: 20px;
          background: radial-gradient(circle at top left, #0f172a, #020617);
          color: white;
          position: relative;
          overflow: hidden;
        }

        .particles {
          position: absolute;
          width: 100%;
          height: 100%;
          background-image: radial-gradient(rgba(255,255,255,0.2) 1px, transparent 1px);
          background-size: 40px 40px;
          opacity: 0.2;
        }

        .blob {
          position: absolute;
          width: 400px;
          height: 400px;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.5;
        }

        .blob1 {
          background: #3b82f6;
          top: 0;
          left: 0;
          animation: move1 12s infinite alternate;
        }

        .blob2 {
          background: #9333ea;
          bottom: 0;
          right: 0;
          animation: move2 15s infinite alternate;
        }

        @keyframes move1 {
          0% { transform: translate(0,0); }
          100% { transform: translate(120px, 80px); }
        }

        @keyframes move2 {
          0% { transform: translate(0,0); }
          100% { transform: translate(-100px, -120px); }
        }

        .title {
          text-align: center;
          margin-bottom: 20px;
        }

        /* CARDS */
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }

        .card {
          padding: 20px;
          border-radius: 20px;
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(15px);
          border: 1px solid rgba(255,255,255,0.2);
          cursor: pointer;
          transition: 0.3s;
        }

        .card:hover {
          transform: translateY(-5px);
          box-shadow:
            0 0 20px #3b82f6,
            0 0 40px #9333ea;
        }

        /* 📊 CHART SECTION */
        .chart-section {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .chart-card {
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(15px);
          padding: 20px;
          border-radius: 20px;
          border: 1px solid rgba(255,255,255,0.2);
        }

        /* POPUP */
        .popup {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.7);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .popup-box {
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(20px);
          padding: 30px;
          border-radius: 20px;
          text-align: center;
        }

        .popup-box button {
          margin-top: 15px;
          padding: 10px 15px;
          border: none;
          border-radius: 10px;
          background: #3b82f6;
          color: white;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}

export default Dashboard;