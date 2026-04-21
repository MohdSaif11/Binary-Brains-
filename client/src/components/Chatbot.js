import React, { useState } from "react";

function Chatbot() {
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const send = async () => {
    if (!msg.trim()) return;

    const userMessage = { type: "user", text: msg };

    // ✅ Add user message first
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:5000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: msg })
      });

      const data = await res.json();

      const botMessage = {
        type: "bot",
        text: data.reply || "No response from AI 🤖"
      };

      // ✅ Append bot reply safely
      setMessages((prev) => [...prev, botMessage]);

    } catch (err) {
      console.error(err);

      setMessages((prev) => [
        ...prev,
        { type: "bot", text: "Error connecting to server ❌" }
      ]);
    }

    setMsg("");
    setLoading(false);
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      height: "100%"
    }}>

      {/* 💬 CHAT MESSAGES */}
      <div style={{
        flex: 1,
        overflowY: "auto",
        marginBottom: "10px",
        paddingRight: "5px"
      }}>
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent:
                m.type === "user" ? "flex-end" : "flex-start",
              marginBottom: "10px"
            }}
          >
            <div
              style={{
                maxWidth: "80%",
                padding: "10px 14px",
                borderRadius: "15px",
                background:
                  m.type === "user"
                    ? "linear-gradient(135deg, #3b82f6, #6366f1)"
                    : "#1e293b",
                color: "white",
                fontSize: "14px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.3)"
              }}
            >
              {m.text}
            </div>
          </div>
        ))}

        {/* ⏳ LOADING MESSAGE */}
        {loading && (
          <div style={{ color: "#aaa", fontSize: "12px" }}>
            AI is typing...
          </div>
        )}
      </div>

      {/* ✍️ INPUT AREA */}
      <div style={{ display: "flex", gap: "5px" }}>
        <input
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          placeholder="Ask something..."
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "10px",
            border: "none",
            outline: "none"
          }}
        />

        <button
          onClick={send}
          disabled={loading}
          style={{
            padding: "10px 15px",
            borderRadius: "10px",
            border: "none",
            background: loading ? "#64748b" : "#3b82f6",
            color: "white",
            cursor: "pointer"
          }}
        >
          ➤
        </button>
      </div>
    </div>
  );
}

export default Chatbot;