// src/components/Callback.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');

    if (code) {
      const fetchAccessToken = async () => {
        const clientId = '54c473f82f2d458881321e19390d7966'; // Use this client ID for testing
        const clientSecret = '5623eff84a6b4b9096a33ac3464fee63'; // Use this client secret for testing
        const redirectUri = 'https://project-aone.vercel.app/callback'; // Make sure this matches the Spotify app settings

        const encodedCredentials = btoa(`${clientId}:${clientSecret}`); // Base64 encode clientId and clientSecret

        try {
          const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': `Basic ${encodedCredentials}`,
            },
            body: new URLSearchParams({
              grant_type: 'authorization_code',
              code: code,
              redirect_uri: redirectUri,
            }),
          });

          const data = await response.json();

          if (response.ok) {
            console.log('Access Token Data:', data);
            localStorage.setItem('spotify_access_token', data.access_token);
            navigate('/chat'); // Navigate to chat interface
          } else {
            console.error('Error fetching access token:', data);
            alert(`Failed to fetch access token: ${data.error_description || 'Unknown error'}`);
          }
        } catch (error) {
          console.error('Error:', error);
          alert('An error occurred while fetching the access token.');
        }
      };

      fetchAccessToken();
    } else {
      console.error('Authorization code is not available');
      alert('Failed to retrieve authorization code.');
    }
  }, [navigate]);

  return <div>Loading...</div>;
};

export default Callback;
