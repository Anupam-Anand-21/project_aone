// src/components/Auth.js
import React from 'react';

const Auth = () => {
  const handleLogin = () => {
    const clientId = '54c473f82f2d458881321e19390d7966';
    const redirectUri = 'https://project-aone.vercel.app/callback';
    const scopes = 'user-read-private user-read-email playlist-modify-public playlist-modify-private';

    // Use response_type=code for Authorization Code Flow
    window.location.href = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes)}`;
  };

  const handleLogout = () => {
    localStorage.removeItem('spotify_access_token');
    alert('Logged out successfully.');
    window.location.href = '/';
  };

  return (
    <div>
      <h1>Welcome to Kawaii's Chat!</h1>
      <button onClick={handleLogin}>Login to Spotify</button>
      <button onClick={handleLogout} style={{ marginLeft: '10px' }}>Logout</button>
    </div>
  );
};

export default Auth;
