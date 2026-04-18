import React, { useState } from "react";

function Chatbot() {
  const [msg, setMsg] = useState("");
  const [reply, setReply] = useState("");

  const send = async () => {
    const res = await fetch("http://127.0.0.1:5000/chat", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ message: msg })
    });

    const data = await res.json();
    setReply(data.reply);
  };

  return (
    <div style={{ marginTop: "30px" }}>
      <h2>🤖 AI Assistant</h2>

      <input value={msg} onChange={e=>setMsg(e.target.value)} />
      <button onClick={send}>Send</button>

      <p>{reply}</p>
    </div>
  );
}

export default Chatbot;