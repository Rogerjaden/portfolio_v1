
import { NAV } from '../data/portfolio';
import { useClock } from '../hooks';
import MusicPlayer from './MusicPlayer';

export default function Navbar() {
  const clock = useClock();

  return (
    <nav className="nav" aria-label="Portfolio sections">
      <a className="nav-brand" href="#hero">
        RJ<span>_</span>
      </a>

      <div className="nav-links">
        {NAV.map(([id, label]) => (
          <a key={id} href={`#${id}`}>
            {label}
          </a>
        ))}
      </div>

      <div className="nav-right-controls">
        <span className="clock" aria-label="Current India time">
          {clock}
        </span>

        <MusicPlayer />
      </div>
    </nav>
  );
}
