// src/components/TrackList.js
import React from 'react';

const TrackList = ({ tracks }) => {
  return (
    <div className="tracks">
      <h3>Tracks:</h3>
      <ul>
        {tracks.map((track, index) => (
          <li key={index}>
            {track.track.name} by {track.track.artists.map((artist) => artist.name).join(', ')}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrackList;
