// src/components/ChatInterface.js
import React, { useEffect, useState } from 'react';

const ChatInterface = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [playlists, setPlaylists] = useState([]);
  const [tracks, setTracks] = useState([]); // State to store tracks
  const [input, setInput] = useState('');
  const [playlistName, setPlaylistName] = useState('');
  const [playlistDescription, setPlaylistDescription] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Retrieve the access token from local storage
  useEffect(() => {
    const token = localStorage.getItem('spotify_access_token');
    if (token) {
      setAccessToken(token);
      fetchUserId(token); // Fetch user ID when token is available
      console.log('Spotify Token:', token);
    } else {
      console.error('No token found');
    }
  }, []);

  // Fetch user's Spotify ID
  const fetchUserId = async (token) => {
    try {
      const response = await fetch('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        setUserId(data.id);
        console.log('User ID:', data.id);
      } else {
        console.error('Error fetching user ID:', data);
        alert('Failed to fetch user ID.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while fetching user ID.');
    }
  };

  // Function to create a new playlist
  const createPlaylist = async () => {
    if (!accessToken || !userId) {
      console.error('Access token or user ID is not available');
      return;
    }
  
    if (playlistName.trim() === '') {
      alert('Please enter a playlist name');
      return;
    }
  
    setIsLoading(true);
    try {
      const response = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          name: playlistName,
          description: playlistDescription,
          public: true, // Set this to true to make the playlist public
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log('Playlist Created:', data);
        alert(`Playlist "${data.name}" created successfully!`);
        fetchPlaylists(); // Refresh playlists after creating a new one
        setPlaylistName(''); // Clear input fields
        setPlaylistDescription('');
      } else {
        console.error('Error creating playlist:', data);
        alert('Failed to create playlist.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while creating the playlist.');
    } finally {
      setIsLoading(false);
    }
  };
  

  // Fetch user's playlists from Spotify
  const fetchPlaylists = async () => {
    if (!accessToken) {
      console.error('Access token is not available');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('https://api.spotify.com/v1/me/playlists', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        setPlaylists(data.items);
        console.log('Fetched Playlists:', data.items);
      } else {
        console.error('Error fetching playlists:', data);
        alert('Failed to fetch playlists.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while fetching playlists.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle sending a message
  const sendMessage = () => {
    if (input.trim() === '') return;

    const userMessage = { role: 'user', content: input };
    setMessages([...messages, userMessage]);
    setInput('');

    // Fetch playlists as a simulated "response" when "hello" is typed
    if (input.toLowerCase() === 'hello') {
      fetchPlaylists();
    }
  };

  return (
    <div className="chat-container">
      <header className="chat-header">
        <div className="header-content">
          <span className="title-kawaii">Kawaii</span>
          <span className="title-talk">Talk</span>
        </div>
      </header>
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.role}`}>
            <span className="message-content">{msg.content}</span>
          </div>
        ))}
        {isLoading && <div className="loading-indicator">Loading...</div>}
        {playlists.length > 0 && (
          <div className="playlists">
            <h3>Your Playlists:</h3>
            <ul>
              {playlists.map((playlist) => (
                <li key={playlist.id}>
                  {playlist.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="create-playlist">
        <h3>Create a New Playlist</h3>
        <input
          type="text"
          placeholder="Playlist Name"
          value={playlistName}
          onChange={(e) => setPlaylistName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Playlist Description"
          value={playlistDescription}
          onChange={(e) => setPlaylistDescription(e.target.value)}
        />
        <button onClick={createPlaylist}>Create Playlist</button>
      </div>
      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type at your own risk..."
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatInterface;
