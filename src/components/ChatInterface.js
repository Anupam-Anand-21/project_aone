// src/components/ChatInterface.js
import React, { useEffect, useState } from 'react';
import PlaylistList from './PlaylistList';
import TrackList from './TrackList';
import {
  fetchUserId,
  fetchPlaylists,
  fetchTracks,
  addTrackToPlaylist,
} from '../utils/spotifyApi';

const ChatInterface = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [playlists, setPlaylists] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [playlistName, setPlaylistName] = useState('');
  const [playlistDescription, setPlaylistDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('spotify_access_token');
    if (token) {
      setAccessToken(token);
      getUserInfo(token);
    } else {
      console.error('No token found');
    }
  }, []);

  const getUserInfo = async (token) => {
    try {
      const id = await fetchUserId(token);
      setUserId(id);
    } catch (error) {
      alert('Failed to fetch user ID.');
    }
  };

  const handleFetchPlaylists = async () => {
    if (!accessToken) return;

    setIsLoading(true);
    try {
      const fetchedPlaylists = await fetchPlaylists(accessToken);
      setPlaylists(fetchedPlaylists);
    } catch (error) {
      alert('Failed to fetch playlists.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFetchTracks = async (playlistId) => {
    if (!accessToken) return;

    setIsLoading(true);
    try {
      const fetchedTracks = await fetchTracks(accessToken, playlistId);
      setTracks(fetchedTracks);
    } catch (error) {
      alert('Failed to fetch tracks.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddTrack = async (playlistId) => {
    if (!accessToken) return;

    const trackUri = 'spotify:track:3KkXRkHbMCARz0aVfEt68P'; // URI for "Sunflower"
    try {
      await addTrackToPlaylist(accessToken, playlistId, trackUri);
      alert('Track "Sunflower" has been added to the playlist.');
    } catch (error) {
      alert('Failed to add track.');
    }
  };

  return (
    <div className="chat-container">
      {isLoading && <div className="loading-indicator">Loading...</div>}
      <div className="fetch-playlist">
        <button onClick={handleFetchPlaylists}>Fetch Playlist</button>
      </div>
      <PlaylistList playlists={playlists} onFetchTracks={handleFetchTracks} onAddTrack={handleAddTrack} />
      <TrackList tracks={tracks} />
    </div>
  );
};

export default ChatInterface;
