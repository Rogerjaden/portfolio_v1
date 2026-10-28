
import { useRef, useState } from 'react';
import './MusicPlayer.css';

export default function MusicPlayer() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState(false);

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!audio.paused) {
      audio.pause();
      return;
    }

    try {
      setError(false);
      await audio.play();
    } catch (err) {
      console.error('Unable to play music:', err);
      setError(true);
      setIsPlaying(false);
    }
  };

  return (
    <div className="vinyl-player">
      <audio
        ref={audioRef}
        src="/music/portfolio-track.mp3"
        loop
        preload="none"
        onPlay={() => {
          setIsPlaying(true);
          setError(false);
        }}
        onPause={() => setIsPlaying(false)}
        onError={() => {
          setError(true);
          setIsPlaying(false);
        }}
      />

      <span className="vinyl-label">
        {error ? 'AUDIO UNAVAILABLE' : 'NOW PLAYING'}
      </span>

      <button
        type="button"
        className={`vinyl-button ${isPlaying ? 'is-playing' : ''}`}
        onClick={toggleMusic}
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
        aria-pressed={isPlaying}
        title={isPlaying ? 'Pause music' : 'Play music'}
      >
        <span className="vinyl-disc" aria-hidden="true">
          <span className="vinyl-grooves" />
          <span className="vinyl-label-center">
            <span className="vinyl-hole" />
          </span>
        </span>

        <span className="vinyl-action-icon" aria-hidden="true">
          {isPlaying ? 'Ⅱ' : '▶'}
        </span>
      </button>
    </div>
  );
}
