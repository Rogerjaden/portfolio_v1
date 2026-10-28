import { SIDE_QUESTS } from '../data/portfolio';

export default function SideQuests() {
  return <div className="sidequest-grid">{SIDE_QUESTS.map(([title, description], index) => <article key={title}><span>0{index + 1} / EXTRA</span><h3>{title}</h3><p>{description}</p></article>)}</div>;
}
