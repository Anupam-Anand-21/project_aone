// src/utils/spotifyApi.js

export const fetchUserId = async (accessToken) => {
  try {
    const response = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();
    if (response.ok) {
      return data.id;
    } else {
      throw new Error(data.error || 'Failed to fetch user ID');
    }
  } catch (error) {
    console.error('Error fetching user ID:', error);
    throw error;
  }
};

export const fetchPlaylists = async (accessToken) => {
  try {
    const response = await fetch('https://api.spotify.com/v1/me/playlists', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();
    if (response.ok) {
      return data.items;
    } else {
      throw new Error(data.error || 'Failed to fetch playlists');
    }
  } catch (error) {
    console.error('Error fetching playlists:', error);
    throw error;
  }
};

export const fetchTracks = async (accessToken, playlistId) => {
  try {
    const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();
    if (response.ok) {
      return data.items;
    } else {
      throw new Error(data.error || 'Failed to fetch tracks');
    }
  } catch (error) {
    console.error('Error fetching tracks:', error);
    throw error;
  }
};

export const addTrackToPlaylist = async (accessToken, playlistId, trackUri) => {
  try {
    const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        uris: [trackUri],
      }),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || 'Failed to add track');
    }
  } catch (error) {
    console.error('Error adding track:', error);
    throw error;
  }
};

export const createPlaylist = async (accessToken, userId, playlistName, playlistDescription) => {
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
      return data; // Return the created playlist data
    } else {
      throw new Error(data.error || 'Failed to create playlist');
    }
  } catch (error) {
    console.error('Error creating playlist:', error);
    throw error;
  }
};
