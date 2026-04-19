import React, { useState } from "react";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";

function Login({ onLogin }) {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleLogin = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (data.success) onLogin(true);
      else alert("Invalid credentials");
    } catch {
      alert("Backend not running");
    }
  };

  const handleSignup = async () => {
    await fetch("http://127.0.0.1:5000/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    alert("Account created!");
    setIsSignup(false);
  };

  const inputBox = (Icon, value, setValue, placeholder, type = "text") => (
    <div className="inputBox">
      <Icon className="icon" />
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );

  return (
    <div className="container">

      {/* ✨ PARTICLE DOTS */}
      <div className="particles"></div>

      {/* 🔥 GLOW BLOBS */}
      <div className="blob blob1"></div>
      <div className="blob blob2"></div>

      {/* 🟣 LOGIN CARD */}
      <div className="card">
        <h2>{isSignup ? "Create Account" : "Login to Your Account"}</h2>

        {isSignup && inputBox(FaUser, name, setName, "Full Name")}
        {inputBox(FaEnvelope, email, setEmail, "Email Address")}
        {inputBox(FaLock, password, setPassword, "Password", "password")}

        <button onClick={isSignup ? handleSignup : handleLogin}>
          {isSignup ? "Sign Up" : "Login"}
        </button>

        <p onClick={() => setIsSignup(!isSignup)}>
          {isSignup
            ? "Already have an account? Login"
            : "New user? Sign up"}
        </p>
      </div>

      {/* 🔥 CSS */}
      <style>{`
        .container {
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: radial-gradient(circle at top left, #0f172a, #020617);
          position: relative;
          overflow: hidden;
          color: white;
        }

        /* ✨ PARTICLES */
        .particles {
          position: absolute;
          width: 100%;
          height: 100%;
          background-image: radial-gradient(rgba(255,255,255,0.2) 1px, transparent 1px);
          background-size: 40px 40px;
          opacity: 0.2;
        }

        /* 🔥 BLOBS */
        .blob {
          position: absolute;
          width: 400px;
          height: 400px;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.6;
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

        /* 🟣 CARD */
        .card {
          position: relative;
          padding: 40px;
          border-radius: 20px;
          width: 360px;
          backdrop-filter: blur(20px);
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.2);
          text-align: center;
          z-index: 1;
          transition: 0.3s;
        }

        /* ✨ NEON BORDER HOVER */
        .card:hover {
          box-shadow:
            0 0 20px #3b82f6,
            0 0 40px #9333ea;
        }

        h2 {
          margin-bottom: 20px;
        }

        /* INPUT */
        .inputBox {
          display: flex;
          align-items: center;
          background: rgba(255,255,255,0.1);
          padding: 12px;
          border-radius: 12px;
          margin-bottom: 15px;
          border: 1px solid rgba(255,255,255,0.2);
        }

        .inputBox input {
          background: transparent;
          border: none;
          outline: none;
          color: white;
          flex: 1;
        }

        .icon {
          margin-right: 10px;
          color: #93c5fd;
        }

        /* BUTTON */
        button {
          width: 100%;
          padding: 12px;
          border-radius: 12px;
          border: none;
          background: linear-gradient(90deg, #3b82f6, #9333ea);
          color: white;
          font-weight: bold;
          cursor: pointer;
          transition: 0.3s;
        }

        button:hover {
          box-shadow:
            0 0 15px #3b82f6,
            0 0 30px #9333ea;
          transform: scale(1.05);
        }

        p {
          margin-top: 15px;
          cursor: pointer;
          opacity: 0.8;
        }
      `}</style>
    </div>
  );
}

export default Login;