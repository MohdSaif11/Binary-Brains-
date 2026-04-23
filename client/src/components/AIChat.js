import React, { useState, useRef, useEffect } from "react";

function AIChat() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi  Ask me anything about customers!" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ CHANGE 1: Use a ref pointing directly at the messages container,
  //    NOT document.querySelector — ref is the React-correct approach.
  const chatBoxRef = useRef(null);

  // ✅ CHANGE 2: scrollIntoView on a bottom-anchor div is the most
  //    reliable auto-scroll pattern. scrollTop = scrollHeight can
  //    mis-fire before the DOM has fully painted the new message.
  const bottomAnchorRef = useRef(null);

  useEffect(() => {
    if (bottomAnchorRef.current) {
      bottomAnchorRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: input })
      });

      const data = await res.json();
      setMessages(prev => [...prev, { role: "assistant", content: data.reply }]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        { role: "assistant", content: "Error connecting to AI " }
      ]);
    }

    setLoading(false);
  };

  return (
    // ✅ CHANGE 3: ai-container is now a fixed-height flex column.
    //    overflow:hidden stops it from leaking into the page scroll.
    <div className="ai-container">

      <h2 className="chat-title"> AI Assistant</h2>

      {/* ✅ CHANGE 4: chat-box fills remaining height and scrolls internally.
           The input is OUTSIDE chat-box so it is never inside the scroll area. */}
      <div className="chat-box" ref={chatBoxRef}>
        <div className="messages-area">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={msg.role === "user" ? "msg user" : "msg bot"}
            >
              {msg.content}
            </div>
          ))}

          {loading && (
            <div className="msg bot typing">
              <span></span>
              <span></span>
              <span></span>
            </div>
          )}

          {/* ✅ CHANGE 5: invisible anchor — scrollIntoView targets this */}
          <div ref={bottomAnchorRef} />
        </div>
      </div>

      {/* ✅ CHANGE 6: input is OUTSIDE .chat-box and INSIDE .ai-container
           so it naturally sits at the bottom, never inside the scroll region
           and never overflowing outside the container. */}
      <div className="chat-input">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>

      <style>{`

        /* ✅ CHANGE 7: prevent the page body from scrolling due to chat growth */
        body {
          overflow-x: hidden;
          overflow-y: hidden;
        }

        /* ✅ CHANGE 8: ai-container has a fixed height and is a flex column.
           overflow:hidden is critical — clips children, stops page scroll. */
        .ai-container {
          display: flex;
          flex-direction: column;
          height: 520px;
          max-height: 520px;
          overflow: hidden;
          border-radius: 14px;
          border: 1px solid rgba(255,255,255,0.08);
          background: #0d0d12;
        }

        .chat-title {
          margin: 0;
          padding: 14px 16px;
          font-size: 15px;
          font-weight: 600;
          color: #e2e8f0;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          background: #0d0d12;
          flex-shrink: 0;
        }

        /* ✅ CHANGE 9: chat-box takes ALL remaining vertical space (flex:1)
           and scrolls ONLY internally. min-height:0 is the critical flexbox
           fix that allows it to shrink below its content size. */
        .chat-box {
          flex: 1;
          overflow-y: auto;
          overflow-x: hidden;
          min-height: 0;
        }

        .chat-box::-webkit-scrollbar { width: 4px; }
        .chat-box::-webkit-scrollbar-track { background: transparent; }
        .chat-box::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.12);
          border-radius: 4px;
        }

        .messages-area {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding: 14px 12px;
        }

        .msg {
          padding: 10px 14px;
          border-radius: 12px;
          max-width: 75%;
          font-size: 14px;
          line-height: 1.5;
          color: #f0f0f0;
          word-break: break-word;
        }

        .user {
          background: #3b82f6;
          align-self: flex-end;
          border-bottom-right-radius: 4px;
        }

        .bot {
          background: rgba(255,255,255,0.08);
          align-self: flex-start;
          border-bottom-left-radius: 4px;
        }

        .typing {
          display: flex;
          align-items: center;
          gap: 2px;
          padding: 10px 14px;
        }

        .typing span {
          display: inline-block;
          width: 6px;
          height: 6px;
          background: rgba(255,255,255,0.5);
          border-radius: 50%;
          animation: blink 1.4s infinite;
        }
        .typing span:nth-child(2) { animation-delay: 0.2s; }
        .typing span:nth-child(3) { animation-delay: 0.4s; }

        @keyframes blink {
          0%   { opacity: 0.2; transform: translateY(0); }
          20%  { opacity: 1;   transform: translateY(-3px); }
          100% { opacity: 0.2; transform: translateY(0); }
        }

        /* ✅ CHANGE 10: input row is flex-shrink:0 — it never moves,
           never overflows, no "sticky" hack required. */
        .chat-input {
          flex-shrink: 0;
          display: flex;
          gap: 8px;
          padding: 10px 12px;
          background: #0d0d12;
          border-top: 1px solid rgba(255,255,255,0.08);
        }

        .chat-input input {
          flex: 1;
          padding: 10px 14px;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.06);
          color: #f0f0f0;
          font-size: 14px;
          outline: none;
          transition: border-color 0.2s;
        }

        .chat-input input:focus {
          border-color: rgba(147,51,234,0.6);
        }

        .chat-input input::placeholder {
          color: rgba(255,255,255,0.3);
        }

        .chat-input button {
          padding: 10px 18px;
          border-radius: 10px;
          border: none;
          background: #9333ea;
          color: white;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.2s, transform 0.1s;
          white-space: nowrap;
        }

        .chat-input button:hover  { background: #a855f7; }
        .chat-input button:active { transform: scale(0.97); }

      `}</style>

    </div>
  );
}

export default AIChat;