import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './App.css';

const socket = io(process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000');

function App() {
  const [username, setUsername] = useState('');
  const [roomId, setRoomId] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isInRoom, setIsInRoom] = useState(false);
  const [typingUsers, setTypingUsers] = useState([]);

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
      console.log('Connected to server');
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
      console.log('Disconnected from server');
    });

    socket.on('receive-message', (data) => {
      setMessages(prev => [...prev, data]);
    });

    socket.on('user-joined', (userId) => {
      console.log('User joined:', userId);
    });

    socket.on('user-typing', (data) => {
      if (data.isTyping) {
        setTypingUsers(prev => [...prev.filter(user => user.userId !== data.userId), data]);
      } else {
        setTypingUsers(prev => prev.filter(user => user.userId !== data.userId));
      }
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('receive-message');
      socket.off('user-joined');
      socket.off('user-typing');
    };
  }, []);

  const joinRoom = () => {
    if (username && roomId) {
      socket.emit('join-room', roomId);
      setIsInRoom(true);
    }
  };

  const sendMessage = () => {
    if (message.trim() && username && roomId) {
      socket.emit('send-message', {
        roomId,
        message: message.trim(),
        username
      });
      setMessage('');
    }
  };

  const handleTyping = (isTyping) => {
    socket.emit('typing', {
      roomId,
      username,
      isTyping
    });
  };

  if (!isInRoom) {
    return (
      <div className="App">
        <div className="join-container">
          <h1>Real-time Chat App</h1>
          <div className="join-form">
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && joinRoom()}
            />
            <input
              type="text"
              placeholder="Enter room ID"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && joinRoom()}
            />
            <button onClick={joinRoom} disabled={!username || !roomId}>
              Join Room
            </button>
          </div>
          <div className={`connection-status ${isConnected ? 'connected' : 'disconnected'}`}>
            {isConnected ? '🟢 Connected' : '🔴 Disconnected'}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <div className="chat-container">
        <div className="chat-header">
          <h2>Room: {roomId}</h2>
          <div className={`connection-status ${isConnected ? 'connected' : 'disconnected'}`}>
            {isConnected ? '🟢 Connected' : '🔴 Disconnected'}
          </div>
        </div>
        
        <div className="messages-container">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.username === username ? 'own-message' : 'other-message'}`}>
              <div className="message-header">
                <span className="username">{msg.username}</span>
                <span className="timestamp">{new Date(msg.timestamp).toLocaleTimeString()}</span>
              </div>
              <div className="message-content">{msg.message}</div>
            </div>
          ))}
          
          {typingUsers.length > 0 && (
            <div className="typing-indicator">
              {typingUsers.map((user, index) => (
                <span key={index}>{user.username} is typing...</span>
              ))}
            </div>
          )}
        </div>
        
        <div className="message-input">
          <input
            type="text"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              handleTyping(true);
            }}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                sendMessage();
                handleTyping(false);
              }
            }}
            onBlur={() => handleTyping(false)}
          />
          <button onClick={sendMessage} disabled={!message.trim()}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
