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

  const handleLogin = (status) => {
    setLoggedIn(status);
    localStorage.setItem("loggedIn", "true");
  };

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem("loggedIn");
  };

  if (!loggedIn) return <Login onLogin={handleLogin} />;

  return (
    <div style={{ background: "#0f172a", minHeight: "100vh", color: "white", padding: "20px" }}>
      <div style={{ textAlign: "right" }}>
        <button onClick={handleLogout}>Logout</button>
      </div>

      <h1 style={{ textAlign: "center" }}>🚀 Customer Success AI</h1>

      <Dashboard />
      <Chatbot />
    </div>
  );
}

export default App;