import React, { useState, useEffect } from "react";
import Dashboard from "./pages/Dashboard";
import Chatbot from "./components/Chatbot";
import Login from "./pages/Login";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("loggedIn");
    if (saved === "true") setLoggedIn(true);
  }, []);

  const handleLogin = () => {
    setLoggedIn(true);
    localStorage.setItem("loggedIn", "true");
  };

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem("loggedIn");
  };

  if (!loggedIn) return <Login onLogin={handleLogin} />;

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      
      {/* 📊 MAIN DASHBOARD (LEFT) */}
      <div
        style={{
          flex: 1,
          background: "#0f172a",
          color: "white",
          padding: "20px",
          overflowY: "auto",
        }}
      >
        {/* Logout */}
        <div style={{ textAlign: "right" }}>
          <button
            onClick={handleLogout}
            style={{
              padding: "8px 15px",
              borderRadius: "8px",
              border: "none",
              background: "#ef4444",
              color: "white",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>

        <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
          🚀 Customer Success AI
        </h1>

        <Dashboard />
      </div>

      {/* 🤖 CHATBOT (RIGHT SIDE) */}
      <div
        style={{
          width: "300px",
          background: "#0f172a",
          color: "white",
          padding: "20px",
          borderLeft: "1px solid #1e293b", // 👈 changed side
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>🤖 AI Assistant</h2>
        <Chatbot />
      </div>

    </div>
  );
}

export default App;