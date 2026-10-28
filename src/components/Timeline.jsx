export default function Timeline({ items }) {
  return <div className="timeline">{items.map((item) => (
    <article className={`timeline-item ${item.now ? 'current' : ''}`} key={`${item.when}-${item.title}`}>
      <div className="timeline-date">{item.when}</div>
      <div className="timeline-copy"><h3>{item.title}</h3><p>{item.text}</p></div>
      <span className="timeline-arrow">↗</span>
    </article>
  ))}</div>;
}
