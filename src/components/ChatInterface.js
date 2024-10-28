// ChatInterface.js
import React, { useState, useEffect, useRef } from 'react';
import './ChatInterface.css';
import { Player } from '@lottiefiles/react-lottie-player';

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showTitle, setShowTitle] = useState(true);
  const messagesEndRef = useRef(null);

  const customPrompt = `You are an arrogant and cute female cat, and you always respond in short, one-liner sarcastic comments.`;

  const redirectToSpotify = () => {
    const clientId = 'YOUR_CLIENT_ID';
    const redirectUri = 'http://localhost:3000/callback';
    const scopes = 'playlist-read-private playlist-read-collaborative';
    const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes)}`;
    window.location.href = authUrl;
  };

  return (
    <div>
      <button onClick={redirectToSpotify}>Login to Spotify</button>
      {/* Your existing chat UI */}
    </div>
  );

  

  const fetchPlaylists = async () => {
    const token = localStorage.getItem('access_token'); // Retrieve the token from local storage
  
    try {
      const response = await fetch('https://api.spotify.com/v1/me/playlists', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch playlists');
      }
  
      const data = await response.json();
      const playlists = data.items.map(playlist => playlist.name);
      console.log('Playlists:', playlists);
    } catch (error) {
      console.error('Error fetching playlists:', error);
    }
  };

  
  
  const sendMessage = async () => {
    if (input.trim() === '') return;
    const userMessage = { role: 'user', content: input };
    setMessages([...messages, userMessage]);
    setInput('');
  
    if (input.toLowerCase() === 'hello') {
      await fetchPlaylists(); // Fetch playlists if the user says "hello"
    }
  
    // Existing logic to handle messages...
  };
  

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="chat-container">
      <header className="chat-header">
        <div className="header-content">
          <img src="https://cdn.prod.website-files.com/65783e649367bc55fecaea2d/671e4889b582f739c16b328a_Screenshot%202024-10-27%20at%207.33.00%E2%80%AFPM-min.png" alt="Kawaii" className="chat-header-image" />
          <span className="title-kawaii">Kawaii</span><span className="title-talk">Talk</span>
        </div>
      </header>

      {showTitle && (
        <div className="custom-title">
          <Player
            autoplay
            loop
            speed={1}
            src="https://lottie.host/b7455cf6-0e91-4200-a612-d15ced50466d/6UeGs7aza0.json"
            style={{ height: '200px', width: '200px' }}
          />
          <div className="custom-content">
            <h2>Kawaii’s Sassy Corner</h2>
            <p>Cute, sassy, and maybe not listening. <br />Think you can keep up?</p>
          </div>
        </div>
      )}

      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.role}`}>
            <img
              src={msg.role === 'user'
                ? 'https://cdn.prod.website-files.com/65783e649367bc55fecaea2d/671e53197ceef04e6c66e59f_Frame%207.png'
                : 'https://cdn.prod.website-files.com/65783e649367bc55fecaea2d/671e531940368968636fdc08_Frame%206.png'
              }
              alt={msg.role}
              className="message-icon"
            />
            <span className="message-content">{msg.content}</span>
          </div>
        ))}
        {isLoading && (
          <div className="loading-indicator">
            <Player
              autoplay
              loop
              src="https://lottie.host/b7455cf6-0e91-4200-a612-d15ced50466d/6UeGs7aza0.json"
              style={{ height: '100px', width: '100px' }}
            />
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' ? sendMessage() : null}
          placeholder="Type at your own risk..."
        />
        <button onClick={sendMessage} className="meow-button"></button>
      </div>
    </div>
  );
};

export default ChatInterface;
