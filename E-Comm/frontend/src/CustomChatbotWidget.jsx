import React, { useState, useEffect } from 'react';
import { chilliChatbotConfig } from './chatbotConfig';

function ChatMessage({ message, isBot }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'flex-start',
      gap: 8,
      animation: 'slideInUp 0.3s ease',
      justifyContent: isBot ? 'flex-start' : 'flex-end'
    }}>
      {isBot && (
        <div 
          style={{
            width: 28,
            height: 28,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 16,
            flexShrink: 0
          }}
        >
          🤖
        </div>
      )}
      <div style={{
        background: isBot ? '#dc2626' : '#f3f3f3',
        color: isBot ? 'white' : '#222',
        borderRadius: 16,
        padding: '10px 16px',
        maxWidth: window.innerWidth <= 768 ? 'calc(100% - 40px)' : 380,
        fontSize: 15,
        boxShadow: isBot ? '0 2px 8px 0 rgba(220,38,38,0.10)' : '0 1px 4px 0 rgba(0,0,0,0.06)',
        borderBottomLeftRadius: isBot ? 4 : 16,
        borderBottomRightRadius: isBot ? 16 : 4,
        whiteSpace: 'pre-line'
      }}>
        {message}
      </div>
      {!isBot && (
        <div 
          style={{
            width: 28,
            height: 28,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 16,
            flexShrink: 0
          }}
        >
          👤
        </div>
      )}
    </div>
  );
}

export default function CustomChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{
        text: 'Hi! How can I help you with KadiPore Chilli Farms today?',
        isBot: true
      }]);
    }
  }, [isOpen, messages.length]);

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages((msgs) => [
      ...msgs,
      { text: input, isBot: false }
    ]);

    setTimeout(() => {
      setMessages((msgs) => [
        ...msgs,
        { text: getBotReply(input), isBot: true }
      ]);
    }, 600);
    setInput('');
  };

  function getBotReply(userMsg) {
    // Apply text correction to handle common typos and misspellings
    const correctedMsg = correctText(userMsg);
    const text = correctedMsg.toLowerCase().trim();
    
    // Use the chilli chatbot config to find appropriate responses
    return chilliChatbotConfig.getBotReply(text) || chilliChatbotConfig.replies.fallback;
  }

  // Text correction for common typos
  function correctText(text) {
    return text
      .replace(/chili/gi, 'chilli')
      .replace(/spicy/gi, 'hot')
      .replace(/price/gi, 'cost')
      .replace(/buy/gi, 'order');
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: window.innerWidth <= 768 ? 0 : 20,
      right: window.innerWidth <= 768 ? 0 : 20,
      left: window.innerWidth <= 768 ? 0 : 'auto',
      zIndex: 1000,
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {isOpen && (
        <div style={{
          width: window.innerWidth <= 768 ? 'calc(100vw - 30px)' : 380,
          height: window.innerWidth <= 768 ? 'calc(100vh - 160px)' : 480,
          maxWidth: window.innerWidth <= 768 ? 350 : 380,
          maxHeight: window.innerWidth <= 768 ? 400 : 480,
          backgroundColor: 'white',
          borderRadius: 16,
          boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
          display: 'flex',
          flexDirection: 'column',
          marginBottom: 20,
          overflow: 'hidden',
          border: '1px solid #e5e7eb',
          position: window.innerWidth <= 768 ? 'fixed' : 'relative',
          top: window.innerWidth <= 768 ? '80px' : 'auto',
          left: window.innerWidth <= 768 ? '15px' : 'auto',
          right: window.innerWidth <= 768 ? '15px' : 'auto'
        }}>
          {/* Header */}
          <div style={{
            background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
            color: 'white',
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div 
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 18
                }}
              >
                🤖
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: 16 }}>ChilliBot</div>
                <div style={{ fontSize: 12, opacity: 0.9 }}>KadiPore Assistant</div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'rgba(255,255,255,0.2)',
                border: 'none',
                color: 'white',
                width: 28,
                height: 28,
                borderRadius: '50%',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 18
              }}
            >
              ×
            </button>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: 16,
            display: 'flex',
            flexDirection: 'column',
            gap: 12
          }}>
            {messages.map((msg, i) => (
              <ChatMessage key={i} message={msg.text} isBot={msg.isBot} />
            ))}
          </div>

          {/* Input */}
          <div style={{
            padding: 16,
            borderTop: '1px solid #e5e7eb',
            backgroundColor: '#f9fafb'
          }}>
            <div style={{ display: 'flex', gap: 8 }}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about our chillis..."
                style={{
                  flex: 1,
                  padding: '10px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: 8,
                  fontSize: 14,
                  outline: 'none'
                }}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                style={{
                  background: input.trim() ? '#dc2626' : '#9ca3af',
                  color: 'white',
                  border: 'none',
                  borderRadius: 8,
                  padding: '10px 16px',
                  cursor: input.trim() ? 'pointer' : 'not-allowed',
                  fontSize: 14,
                  fontWeight: 500
                }}
              >
                Send
              </button>
            </div>
            <div style={{
              fontSize: 11,
              color: '#6b7280',
              marginTop: 8,
              textAlign: 'center'
            }}>
              ChilliBot is helpful but not perfect - for detailed orders, please contact us directly.
            </div>
          </div>
        </div>
      )}

      {/* Trigger Button - Only show when chat is closed */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            position: 'fixed',
            bottom: 20,
            right: 20,
            width: 60,
            height: 60,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
            border: 'none',
            boxShadow: '0 8px 24px rgba(220,38,38,0.3)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: 24,
            transition: 'transform 0.2s ease',
            zIndex: 1001
          }}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        >
          🤖
        </button>
      )}

      <style jsx>{`
        @keyframes slideInUp {
          0% {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          50% {
            opacity: 0.5;
            transform: translateY(4px) scale(0.98);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
}
