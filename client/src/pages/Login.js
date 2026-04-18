import React, { useState } from "react";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";

function Login({ onLogin }) {
  const [isSignup, setIsSignup] = useState(false);
  const [forgot, setForgot] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const res = await fetch("http://127.0.0.1:5000/login", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    if (data.success) onLogin(true);
    else alert("Invalid credentials");
  };

  const handleSignup = async () => {
    await fetch("http://127.0.0.1:5000/signup", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ name, email, password })
    });

    alert("Account created!");
    setIsSignup(false);
  };

  const handleForgot = () => {
    alert("Reset link sent (demo)");
    setForgot(false);
  };

  const inputBox = (Icon, value, setValue, placeholder, type="text") => (
    <div style={{
      display: "flex",
      alignItems: "center",
      background: "#334155",
      borderRadius: "8px",
      padding: "10px",
      marginBottom: "10px"
    }}>
      <Icon style={{ marginRight: "8px" }} />
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e)=>setValue(e.target.value)}
        style={{
          border: "none",
          outline: "none",
          background: "transparent",
          color: "white",
          flex: 1
        }}
      />
    </div>
  );

  return (
    <div style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(135deg,#0f172a,#1e293b)",
      color: "white"
    }}>
      <div style={{
        padding: "30px",
        background: "#1e293b",
        borderRadius: "15px",
        width: "320px",
        boxShadow: "0 8px 25px rgba(0,0,0,0.4)"
      }}>
        <h2 style={{ textAlign: "center" }}>
          {forgot ? "Reset Password" : isSignup ? "Sign Up" : "Login"}
        </h2>

        {isSignup && inputBox(FaUser, name, setName, "Full Name")}
        {inputBox(FaEnvelope, email, setEmail, "Email")}
        {!forgot && inputBox(FaLock, password, setPassword, "Password", "password")}

        <button
          onClick={forgot ? handleForgot : isSignup ? handleSignup : handleLogin}
          style={{
            width: "100%",
            padding: "10px",
            background: "#3b82f6",
            border: "none",
            borderRadius: "8px",
            color: "white",
            marginTop: "10px",
            cursor: "pointer"
          }}
        >
          {forgot ? "Reset" : isSignup ? "Sign Up" : "Login"}
        </button>

        <div style={{ textAlign: "center", marginTop: "10px" }}>
          {!forgot && (
            <p onClick={()=>setForgot(true)} style={{cursor:"pointer"}}>
              Forgot Password?
            </p>
          )}

          {!forgot && (
            <p onClick={()=>setIsSignup(!isSignup)} style={{cursor:"pointer"}}>
              {isSignup ? "Already a user? Login" : "New user? Sign up"}
            </p>
          )}

          {forgot && (
            <p onClick={()=>setForgot(false)} style={{cursor:"pointer"}}>
              Back to Login
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;