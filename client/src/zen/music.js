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
      const response = await fetch('#');
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

  const changeTrack = (trackIndex) => {
    setCurrentTrack(trackIndex);
    setIsPlaying(true);
  };

  return (
    <div id='music'>
      <audio src={tracks[currentTrack]?.url} controls autoPlay={isPlaying} />
      <div >
        <button onClick={playPreviousTrack} id='previous'>&lt;</button>
        <button onClick={playPause} id='now'>{isPlaying ? '||' : 'Play'}</button>
        <button onClick={playNextTrack} id='next'>&gt;</button>
      </div>
      <div className='buttons'>
        
        <button onClick={() => changeTrack(0)} id='button-1'>Track 1</button>
        <button onClick={() => changeTrack(1)} id='button-2'>Track 2</button>
        <button onClick={() => changeTrack(2)} id='button-3'>Track 3</button>
        <button onClick={() => changeTrack(3)} id='button-4'>Track 4</button>
        <button onClick={() => changeTrack(4)} id='button-5'>Track 5</button>
        <button onClick={() => changeTrack(5)} id='button-6'>Track 6</button>
      </div>
    </div>
  );
};

export default MusicPlayer;
