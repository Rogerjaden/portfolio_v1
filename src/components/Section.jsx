export default function Section({ id, title, eyebrow, children, className = '' }) {
  return (
    <section id={id} className={`section reveal ${className}`}>
      {eyebrow && <div className="eyebrow">{eyebrow}</div>}
      <h2>{title}</h2>
      {children}
    </section>
  );
}
