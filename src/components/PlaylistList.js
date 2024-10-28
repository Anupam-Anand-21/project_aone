// src/components/PlaylistList.js
import React from 'react';

const PlaylistList = ({ playlists, onFetchTracks, onAddTrack, onDelete }) => {
  return (
    <div className="playlists">
      <h3>Your Playlists:</h3>
      <ul>
        {playlists.map((playlist) => (
          <li key={playlist.id} onClick={() => onFetchTracks(playlist.id)}>
            {playlist.name}
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering fetchTracks
                onAddTrack(playlist.id);
              }}
              style={{ marginLeft: '10px' }}
            >
              Add "Sunflower"
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering fetchTracks
                onDelete(playlist.id);
              }}
              style={{ marginLeft: '10px' }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlaylistList;
