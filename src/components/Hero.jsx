import { PROFILE, SNIPPETS } from '../data/portfolio';
import { useRotating } from '../hooks';

export default function Hero() {
  const tagline = useRotating(PROFILE.taglines);
  return (
    <section id="hero" className="hero">
      <div className="hero-topline"><span>INDEPENDENT DEVELOPER · PORTFOLIO</span><span className="hero-status"><i /> AVAILABLE FOR OPPORTUNITIES</span></div>
      <div className="ticker" aria-hidden="true">
        {SNIPPETS.map((snippet, index) => <span key={snippet} style={{ top: `${15 + index * 16}%`, left: `${index % 2 ? 58 : 3}%` }}>{snippet}</span>)}
      </div>
      <div className="hero-content">
        <div className="hero-kicker">JAVA BACKEND / FULL-STACK / AI</div>
        <h1 className="name"><span>{PROFILE.first}</span><small>{PROFILE.last}</small></h1>
        <div className="roles">{PROFILE.roles.map((role) => <span key={role}>{role}</span>)}</div>
        <p className="tagline"><span className="tagline-mark">↳</span><b key={tagline}>{tagline}</b></p>
        <div className="hero-bottom">
          <div className="cta"><a href="#projects">explore projects <span>↘</span></a><a href="#contact">get in touch <span>↗</span></a><a href={PROFILE.resume}>resume <span>↓</span></a></div>
          <span className="scroll-hint">SCROLL TO EXPLORE ↓</span>
        </div>
      </div>
      <div className="hero-index">01 <span>/ 08</span></div>
    </section>
  );
}
