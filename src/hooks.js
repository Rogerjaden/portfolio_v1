import { useEffect, useState } from 'react';

export function useClock() {
  const [time, setTime] = useState(() => new Date().toLocaleTimeString('en-GB'));
  useEffect(() => {
    const id = window.setInterval(() => setTime(new Date().toLocaleTimeString('en-GB')), 1000);
    return () => window.clearInterval(id);
  }, []);
  return time;
}

export function useRotating(items, interval = 3600) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => setIndex((current) => (current + 1) % items.length), interval);
    return () => window.clearInterval(id);
  }, [items, interval]);
  return items[index];
}
