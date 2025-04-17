// ✅ src/App.jsx
import React, { useState } from 'react';

// 1) Define all your possible welcome texts
const WELCOME_TEXTS = [
  "Hi! I'm LuddyBuddy, always happy to chat! 😊",
  "Hello there! LuddyBuddy at your service. How can I help today?",
  "Hey! LuddyBuddy here—ready to answer your questions!",
  "Greetings! I'm LuddyBuddy. What would you like to know?",
  "Hey there! LuddyBuddy reporting for duty! 🤖✨",
  "Hiya! LuddyBuddy here - what can I do for you today? 🌟",
  "Hello, friend! LuddyBuddy at your fingertips. 🖐️😊",
  "Yo! LuddyBuddy in the house—ask me anything! 🏠💬",
  "Hi, I’m LuddyBuddy—your pocket‑sized helper! 🎒🤗",
  "👋 Hey! LuddyBuddy’s on call—how can I assist?",
  "What’s up? LuddyBuddy ready to lend a hand! 🙋‍♂️👍",
  "Hello, hello! LuddyBuddy here—let’s chat!",
  "Hey, I’m LuddyBuddy—your friendly neighborhood helper! 🌟👋",
  "Hi! LuddyBuddy’s all ears—got questions? 👂❓",
  "Good day! LuddyBuddy at your service—shoot away! 🎯😊"
];

// 2) Utility to grab one at random
function getRandomWelcome() {
  const i = Math.floor(Math.random() * WELCOME_TEXTS.length);
  return WELCOME_TEXTS[i];
}

export default function App() {
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: getRandomWelcome()
    }
]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

// 4) (Optional) if you want a new greeting *every time* the user re-opens:
  const handleOpen = () => {
    setMessages([{
      sender: 'bot',
      text: getRandomWelcome()
    }]);
    setIsOpen(true);
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { sender: 'user', text: input }];
    setMessages(newMessages);
    setInput('');
    setTyping(true);
    try {
      const res = await fetch('https://your-backend-url.com/api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      });
      const data = await res.json();
      setMessages([...newMessages, { sender: 'bot', text: data.reply || 'No response' }]);
    } catch {
      setMessages([...newMessages, { sender: 'bot', text: '⚠️ Error reaching the server.' }]);
    } finally {
      setTyping(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={handleOpen}
        style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          width: 64,
          height: 64,
          borderRadius: '50%',
          backgroundColor: '#2563EB',
          color: '#FFF',
          border: 'none',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          cursor: 'pointer',
          zIndex: 9998
        }}
      >
        <span style={{ fontSize: 24 }}>🤖</span>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            width: 360,
            height: '85vh',
            backgroundColor: '#FFF',
            border: '2px solid #000',
            borderRadius: 16,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            boxShadow: '0 10px 15px rgba(0,0,0,0.1)',
            zIndex: 9999
          }}
        >
          {/* Header */}
          <div
            style={{
              backgroundColor: '#2563EB',
              color: '#FFF',
              padding: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderTopLeftRadius: 14,
              borderTopRightRadius: 14
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  backgroundColor: '#FFF',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                🤖
              </div>
              <span style={{ fontSize: 16, fontWeight: 600 }}>Kaybee</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                color: '#FFF',
                fontSize: 20,
                cursor: 'pointer'
              }}
            >
              ×
            </button>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              padding: '16px',
              overflowY: 'auto',
              backgroundColor: '#FFF'
            }}
          >
            {messages.map((msg, i) => {
              const isBot = msg.sender === 'bot';
              return (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    justifyContent: isBot ? 'flex-start' : 'flex-end',
                    marginBottom: 12,
                    gap: 8
                  }}
                >
                  {isBot && (
                    <div
                      style={{
                        width: 24,
                        height: 24,
                        backgroundColor: '#2563EB',
                        color: '#FFF',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 12
                      }}
                    >
                      🤖
                    </div>
                  )}
                  <div
                    style={{
                      backgroundColor: isBot ? '#F3F4F6' : '#2563EB',
                      color: isBot ? '#333' : '#FFF',
                      padding: '12px 16px',
                      borderRadius: 12,
                      maxWidth: '75%',
                      lineHeight: 1.4
                    }}
                  >
                    {msg.text}
                  </div>
                  {!isBot && (
                    <div style={{ width: 24, marginLeft: 8 }} />
                  )}
                </div>
              );
            })}

            {typing && (
              <div style={{ display: 'flex', gap: 4, marginLeft: 32 }}>
                <div
                  style={{
                    width: 6,
                    height: 6,
                    backgroundColor: '#AAA',
                    borderRadius: '50%',
                    animation: 'bounce 1s infinite'
                  }}
                />
                <div
                  style={{
                    width: 6,
                    height: 6,
                    backgroundColor: '#AAA',
                    borderRadius: '50%',
                    animation: 'bounce 1s infinite',
                    animationDelay: '0.2s'
                  }}
                />
                <div
                  style={{
                    width: 6,
                    height: 6,
                    backgroundColor: '#AAA',
                    borderRadius: '50%',
                    animation: 'bounce 1s infinite',
                    animationDelay: '0.4s'
                  }}
                />
              </div>
            )}
          </div>

          {/* Input (sticky bottom) */}
          <div
            style={{
              padding: '16px',
              borderTop: '1px solid #E5E7EB',
              backgroundColor: '#FFF',
              borderBottomLeftRadius: 14,
              borderBottomRightRadius: 14
            }}
          >
            <div style={{ display: 'flex', gap: 12 }}>
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder="Type a message…"
                style={{
                  flex: 1,
                  padding: '12px 16px',
                  borderRadius: 9999,
                  border: '1px solid #D1D5DB',
                  outline: 'none',
                  fontSize: 14
                }}
              />
              <button
                onClick={handleSend}
                style={{
                  width: 40,
                  height: 40,
                  backgroundColor: '#2563EB',
                  border: 'none',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  stroke="#FFF"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
      <style>
        {`
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-4px); }
          }
        `}
      </style>
    </>
  );
}
