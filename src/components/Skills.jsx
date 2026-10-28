import { SKILLS } from '../data/portfolio';
import CodingActivity from './CodingActivity';

export default function Skills() {
  return <>
    <div className="skills-grid">{SKILLS.map(([title, description], index) => <article className="skill-row" key={title}><span className="skill-index">0{index + 1}</span><div><h3>{title}</h3><p>{description}</p></div><span className="skill-plus">+</span></article>)}</div>
    <CodingActivity />
  </>;
}
