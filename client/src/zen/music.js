import React, { useState, useEffect } from 'react';

const MusicPlayer = () => {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    fetchTracks();
  }, []);

  const fetchTracks = async () => {
    try {
      const response = await fetch('http://your-backend-url.com/tracks');
      const data = await response.json();
      setTracks(data);
    } catch (error) {
      console.error('Error fetching tracks:', error);
    }
  };

  const playPause = () => {
    setIsPlaying(!isPlaying);
  };

  const playNextTrack = () => {
    setCurrentTrack((prevTrack) => (prevTrack === tracks.length - 1 ? 0 : prevTrack + 1));
    setIsPlaying(true);
  };

  const playPreviousTrack = () => {
    setCurrentTrack((prevTrack) => (prevTrack === 0 ? tracks.length - 1 : prevTrack - 1));
    setIsPlaying(true);
  };

  return (
    <div id='music'>
      <audio src={tracks[currentTrack]?.url} controls autoPlay={isPlaying} />
      <div>
        <button onClick={playPreviousTrack} id='previous'>&lt;</button>
        <button onClick={playPause} id='now'>{isPlaying ? '||' : 'Play'}</button>
        <button onClick={playNextTrack} id='next'>&gt;</button>
      </div>
    </div>
  );
};

export default MusicPlayer;
