import { STACK } from '../data/portfolio';

export default function Marquee() {
  const content = `${STACK} ${STACK}`;
  return <div className="marquee" aria-label="Technology stack"><div>{content}{content}</div></div>;
}
