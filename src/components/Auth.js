// src/components/Auth.js
import React from 'react';

const Auth = () => {
  const handleLogin = () => {
    // Spotify login logic
    const clientId = '54c473f82f2d458881321e19390d7966';
    const redirectUri = 'http://localhost:3003';
    const scope = 'user-read-private user-read-email';
    window.location.href = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
  };

  return (
    <div>
      <h1>Welcome to Kawaii's Chat!</h1>
      <button onClick={handleLogin}>Login to Spotify</button>
    </div>
  );
};

export default Auth;
