import { PROFILE } from '../data/portfolio';

export default function Footer() {
  return <footer className="footer"><a className="footer-mark" href="#hero">RJ<span>_</span></a><span>DESIGNED, BUILT & ITERATED WITH INTENTION.</span><span>© {new Date().getFullYear()} {PROFILE.first} {PROFILE.last}</span><a href="#hero">BACK TO TOP ↑</a></footer>;
}
