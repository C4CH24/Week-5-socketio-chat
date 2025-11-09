import React, { useState, useEffect } from 'react';
import { socket } from './socket/socket';
import './App.css';

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [usersOnline, setUsersOnline] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onReceiveMessage(newMessage) {
      setMessages(prev => [...prev, newMessage]);
    }

    function onUserJoined(user) {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        username: 'System',
        message: `${user} joined the chat`,
        timestamp: new Date().toISOString(),
        isSystem: true
      }]);
    }

    function onUserLeft(user) {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        username: 'System',
        message: `${user} left the chat`,
        timestamp: new Date().toISOString(),
        isSystem: true
      }]);
    }

    function onUsersOnline(users) {
      setUsersOnline(users);
    }

    function onTypingUpdate(users) {
      setTypingUsers(users);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('receive_message', onReceiveMessage);
    socket.on('user_joined', onUserJoined);
    socket.on('user_left', onUserLeft);
    socket.on('users_online', onUsersOnline);
    socket.on('typing_update', onTypingUpdate);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('receive_message', onReceiveMessage);
      socket.off('user_joined', onUserJoined);
      socket.off('user_left', onUserLeft);
      socket.off('users_online', onUsersOnline);
      socket.off('typing_update', onTypingUpdate);
    };
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username.trim()) {
      setIsLoggedIn(true);
      socket.emit('user_join', username.trim());
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      socket.emit('send_message', { message: message.trim() });
      setMessage('');
      socket.emit('typing_stop');
      setIsTyping(false);
    }
  };

  const handleTyping = () => {
    if (!isTyping) {
      setIsTyping(true);
      socket.emit('typing_start');
    }

    // Clear previous timeout
    if (window.typingTimeout) {
      clearTimeout(window.typingTimeout);
    }

    // Set new timeout to stop typing indicator
    window.typingTimeout = setTimeout(() => {
      setIsTyping(false);
      socket.emit('typing_stop');
    }, 1000);
  };

  if (!isLoggedIn) {
    return (
      <div className="login-container">
        <div className="login-form">
          <h1>Join Chat</h1>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <button type="submit">Join</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h1>Socket.io Chat</h1>
        <div className="status">
          <span className={`connection-status ${isConnected ? 'connected' : 'disconnected'}`}>
            ● {isConnected ? 'Connected' : 'Disconnected'}
          </span>
          <span className="online-count">{usersOnline.length} online</span>
        </div>
      </div>

      <div className="chat-layout">
        <div className="messages-container">
          <div className="messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`message ${msg.isSystem ? 'system' : ''}`}>
                {!msg.isSystem && (
                  <div className="message-header">
                    <strong>{msg.username}</strong>
                    <span className="timestamp">
                      {new Date(msg.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                )}
                <div className="message-content">{msg.message}</div>
              </div>
            ))}
          </div>

          {typingUsers.length > 0 && (
            <div className="typing-indicator">
              {typingUsers.join(', ')} {typingUsers.length === 1 ? 'is' : 'are'} typing...
            </div>
          )}

          <form onSubmit={handleSendMessage} className="message-form">
            <input
              type="text"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                handleTyping();
              }}
              placeholder="Type a message..."
              disabled={!isConnected}
            />
            <button type="submit" disabled={!isConnected || !message.trim()}>
              Send
            </button>
          </form>
        </div>

        <div className="online-users">
          <h3>Online Users ({usersOnline.length})</h3>
          <div className="users-list">
            {usersOnline.map(user => (
              <div key={user.id} className="user-item">
                ● {user.username}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;