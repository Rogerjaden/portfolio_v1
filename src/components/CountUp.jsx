import { useEffect, useRef, useState } from 'react';

export default function CountUp({ to }) {
  const ref = useRef(null);
  const [value, setValue] = useState(0);
  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    let frame;
    let started = false;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || started) return;
      started = true;
      const start = performance.now();
      const duration = 1100;
      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 4);
        setValue(Math.round(to * eased * 100) / 100);
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
      observer.disconnect();
    }, { threshold: 0.5 });
    observer.observe(node);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, [to]);
  return <span ref={ref}>{Number.isInteger(to) ? Math.round(value) : value.toFixed(2)}</span>;
}
