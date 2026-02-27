import React, { useState, useRef, useEffect } from 'react';

export default function PokemonProfessorOak() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hello there! Welcome to the world of Pokémon! My name is Oak. People call me the Pokémon Professor! What would you like to know about Pokémon today?"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const conversationHistory = [
        ...messages.map(m => ({ role: m.role, content: m.content })),
        { role: 'user', content: userMessage }
      ];

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: conversationHistory })
      });

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      setMessages(prev => [...prev, { role: 'assistant', content: data.content }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "Oh dear! It seems there's a problem with the PC storage system. Please try again in a moment!" 
      }]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const quickQuestions = [
    "What beats Fire type?",
    "How does Eevee evolve?",
    "Best starter Pokémon?",
    "Tips for beginners?"
  ];

  return (
    <div style={styles.container}>
      {/* Scanlines overlay */}
      <div style={styles.scanlines} />
      
      {/* Main Game Boy frame */}
      <div style={styles.gameboyFrame}>
        {/* Screen bezel */}
        <div style={styles.screenBezel}>
          <div style={styles.screenLabel}>
            <span style={styles.dot} />
            <span style={styles.labelText}>PROFESSOR OAK AI</span>
          </div>
          
          {/* Main screen */}
          <div style={styles.screen}>
            {/* Header */}
            <div style={styles.header}>
              <div style={styles.pokeball}>
                <div style={styles.pokeballTop} />
                <div style={styles.pokeballLine} />
                <div style={styles.pokeballCenter} />
              </div>
              <div style={styles.headerText}>
                <h1 style={styles.title}>PROF. OAK</h1>
                <p style={styles.subtitle}>Pokémon Research Lab</p>
              </div>
            </div>

            {/* Chat area */}
            <div style={styles.chatContainer}>
              <div style={styles.messagesArea}>
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    style={{
                      ...styles.messageBubble,
                      ...(msg.role === 'user' ? styles.userMessage : styles.oakMessage)
                    }}
                  >
                    {msg.role === 'assistant' && (
                      <div style={styles.oakAvatar}>🧑‍🔬</div>
                    )}
                    <div style={styles.messageContent}>
                      <span style={styles.messageRole}>
                        {msg.role === 'user' ? 'TRAINER' : 'OAK'}
                      </span>
                      <p style={styles.messageText}>{msg.content}</p>
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div style={{...styles.messageBubble, ...styles.oakMessage}}>
                    <div style={styles.oakAvatar}>🧑‍🔬</div>
                    <div style={styles.messageContent}>
                      <span style={styles.messageRole}>OAK</span>
                      <div style={styles.typingIndicator}>
                        <span style={{...styles.typingDot, animationDelay: '0ms'}} />
                        <span style={{...styles.typingDot, animationDelay: '150ms'}} />
                        <span style={{...styles.typingDot, animationDelay: '300ms'}} />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Quick questions */}
            <div style={styles.quickQuestions}>
              {quickQuestions.map((q, idx) => (
                <button
                  key={idx}
                  style={styles.quickBtn}
                  onClick={() => {
                    setInput(q);
                    inputRef.current?.focus();
                  }}
                  disabled={isLoading}
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input area */}
            <div style={styles.inputArea}>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask Professor Oak..."
                style={styles.input}
                disabled={isLoading}
              />
              <button
                onClick={sendMessage}
                disabled={isLoading || !input.trim()}
                style={{
                  ...styles.sendBtn,
                  opacity: isLoading || !input.trim() ? 0.5 : 1
                }}
              >
                ▶
              </button>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div style={styles.bottomDecor}>
          <div style={styles.dpad}>
            <div style={styles.dpadVertical} />
            <div style={styles.dpadHorizontal} />
          </div>
          <div style={styles.actionButtons}>
            <div style={styles.aButton}>A</div>
            <div style={styles.bButton}>B</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <p style={styles.footer}>
        Powered by OpenRouter
      </p>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&display=swap');
        
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        
        @keyframes typing {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 5px #4ade80; }
          50% { box-shadow: 0 0 15px #4ade80, 0 0 25px #22c55e; }
        }

        * {
          box-sizing: border-box;
        }

        input::placeholder {
          color: #4a5568;
          font-family: 'VT323', monospace;
        }

        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #1a1a2e;
        }
        ::-webkit-scrollbar-thumb {
          background: #4a5568;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #1a1a2e 100%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    fontFamily: '"VT323", monospace',
    position: 'relative',
    overflow: 'hidden'
  },
  scanlines: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)',
    pointerEvents: 'none',
    zIndex: 100
  },
  gameboyFrame: {
    background: 'linear-gradient(145deg, #8b8b8b 0%, #c4c4c4 50%, #8b8b8b 100%)',
    borderRadius: '20px',
    padding: '25px',
    boxShadow: '0 20px 60px rgba(0,0,0,0.5), inset 0 2px 4px rgba(255,255,255,0.3)',
    maxWidth: '420px',
    width: '100%'
  },
  screenBezel: {
    background: 'linear-gradient(145deg, #4a4a6a 0%, #3a3a5a 100%)',
    borderRadius: '12px',
    padding: '15px',
    boxShadow: 'inset 0 4px 8px rgba(0,0,0,0.4)'
  },
  screenLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '10px'
  },
  dot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: '#4ade80',
    boxShadow: '0 0 10px #4ade80',
    animation: 'pulse 2s infinite'
  },
  labelText: {
    color: '#6b7280',
    fontSize: '10px',
    fontFamily: '"Press Start 2P", cursive',
    letterSpacing: '1px'
  },
  screen: {
    background: '#9bbc0f',
    borderRadius: '8px',
    padding: '15px',
    boxShadow: 'inset 0 4px 12px rgba(0,0,0,0.3)',
    border: '4px solid #5a5a7a'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '12px',
    paddingBottom: '10px',
    borderBottom: '3px solid #8bac0f'
  },
  pokeball: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    background: '#fff',
    position: 'relative',
    overflow: 'hidden',
    border: '3px solid #0f380f',
    flexShrink: 0
  },
  pokeballTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '50%',
    background: '#dc2626',
    borderBottom: '3px solid #0f380f'
  },
  pokeballLine: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    height: '3px',
    background: '#0f380f',
    transform: 'translateY(-50%)'
  },
  pokeballCenter: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    background: '#fff',
    border: '3px solid #0f380f'
  },
  headerText: {
    flex: 1
  },
  title: {
    margin: 0,
    fontSize: '16px',
    fontFamily: '"Press Start 2P", cursive',
    color: '#0f380f',
    textShadow: '2px 2px 0 #8bac0f'
  },
  subtitle: {
    margin: '4px 0 0',
    fontSize: '14px',
    color: '#306230'
  },
  chatContainer: {
    background: '#8bac0f',
    borderRadius: '6px',
    marginBottom: '10px',
    border: '2px solid #0f380f'
  },
  messagesArea: {
    height: '280px',
    overflowY: 'auto',
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  messageBubble: {
    display: 'flex',
    gap: '8px',
    alignItems: 'flex-start'
  },
  userMessage: {
    flexDirection: 'row-reverse'
  },
  oakMessage: {
    flexDirection: 'row'
  },
  oakAvatar: {
    width: '32px',
    height: '32px',
    background: '#0f380f',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px',
    flexShrink: 0
  },
  messageContent: {
    maxWidth: '75%',
    background: '#9bbc0f',
    padding: '8px 10px',
    borderRadius: '6px',
    border: '2px solid #0f380f'
  },
  messageRole: {
    display: 'block',
    fontSize: '10px',
    fontFamily: '"Press Start 2P", cursive',
    color: '#306230',
    marginBottom: '4px'
  },
  messageText: {
    margin: 0,
    fontSize: '18px',
    color: '#0f380f',
    lineHeight: 1.4,
    wordBreak: 'break-word'
  },
  typingIndicator: {
    display: 'flex',
    gap: '4px',
    padding: '4px 0'
  },
  typingDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: '#0f380f',
    animation: 'typing 0.6s infinite'
  },
  quickQuestions: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '6px',
    marginBottom: '10px'
  },
  quickBtn: {
    background: '#306230',
    color: '#9bbc0f',
    border: '2px solid #0f380f',
    borderRadius: '4px',
    padding: '6px 8px',
    fontSize: '12px',
    fontFamily: '"VT323", monospace',
    cursor: 'pointer',
    transition: 'all 0.1s',
    textAlign: 'left'
  },
  inputArea: {
    display: 'flex',
    gap: '8px'
  },
  input: {
    flex: 1,
    background: '#9bbc0f',
    border: '3px solid #0f380f',
    borderRadius: '6px',
    padding: '10px 12px',
    fontSize: '18px',
    fontFamily: '"VT323", monospace',
    color: '#0f380f',
    outline: 'none'
  },
  sendBtn: {
    background: '#dc2626',
    color: '#fff',
    border: '3px solid #0f380f',
    borderRadius: '6px',
    padding: '10px 16px',
    fontSize: '18px',
    fontFamily: '"Press Start 2P", cursive',
    cursor: 'pointer',
    transition: 'all 0.1s',
    boxShadow: '2px 2px 0 #0f380f'
  },
  bottomDecor: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '20px',
    padding: '0 20px'
  },
  dpad: {
    width: '60px',
    height: '60px',
    position: 'relative'
  },
  dpadVertical: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '20px',
    height: '60px',
    background: '#2a2a2a',
    borderRadius: '4px'
  },
  dpadHorizontal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60px',
    height: '20px',
    background: '#2a2a2a',
    borderRadius: '4px'
  },
  actionButtons: {
    display: 'flex',
    gap: '10px'
  },
  aButton: {
    width: '35px',
    height: '35px',
    borderRadius: '50%',
    background: '#7c3aed',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: '"Press Start 2P", cursive',
    fontSize: '10px',
    boxShadow: '2px 2px 0 #4a4a4a'
  },
  bButton: {
    width: '35px',
    height: '35px',
    borderRadius: '50%',
    background: '#7c3aed',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: '"Press Start 2P", cursive',
    fontSize: '10px',
    boxShadow: '2px 2px 0 #4a4a4a'
  },
  footer: {
    marginTop: '20px',
    color: '#6b7280',
    fontSize: '12px',
    textAlign: 'center'
  }
};
