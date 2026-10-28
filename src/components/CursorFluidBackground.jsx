import { useEffect, useRef } from 'react';

/**
 * Cursor-reactive liquid backdrop.
 * The ribbons drift continuously and bend toward the pointer with a soft spring.
 * Canvas stays decorative so it never blocks links or controls.
 */
export default function CursorFluidBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d', { alpha: true });
    if (!canvas || !ctx) return undefined;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let raf = 0;
    let last = 0;
    const pointer = { x: 0.52, y: 0.48, tx: 0.52, ty: 0.48, active: false };
    const ribbons = [
      { x: 0.12, y: 0.22, sx: 0.34, sy: 0.12, phase: 0.2, speed: 0.38, twist: 1.1 },
      { x: 0.76, y: 0.20, sx: 0.26, sy: 0.16, phase: 2.4, speed: -0.31, twist: 1.8 },
      { x: 0.73, y: 0.76, sx: 0.40, sy: 0.13, phase: 4.1, speed: 0.25, twist: 1.4 },
      { x: 0.22, y: 0.83, sx: 0.25, sy: 0.11, phase: 5.7, speed: -0.28, twist: 2.0 },
    ];

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.65);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onPointer = (event) => {
      pointer.tx = event.clientX / Math.max(width, 1);
      pointer.ty = event.clientY / Math.max(height, 1);
      pointer.active = true;
    };
    const onLeave = () => {
      pointer.tx = 0.52;
      pointer.ty = 0.48;
      pointer.active = false;
    };

    const drawRibbon = (r, t, index) => {
      const px = pointer.x;
      const py = pointer.y;
      const driftX = Math.sin(t * r.speed + r.phase) * 0.055;
      const driftY = Math.cos(t * r.speed * 0.8 + r.phase) * 0.065;
      const cx = (r.x + driftX + (px - 0.5) * (0.30 + index * 0.035)) * width;
      const cy = (r.y + driftY + (py - 0.5) * (0.25 + index * 0.025)) * height;
      const rx = r.sx * width * (0.88 + Math.sin(t * 0.3 + r.phase) * 0.12);
      const ry = r.sy * height * (0.84 + Math.cos(t * 0.26 + r.phase) * 0.16);
      const wobble = Math.sin(t * 0.65 + r.phase) * 0.7;
      const angle = Math.sin(t * 0.22 + r.phase) * 0.36 + (px - 0.5) * 0.42 - (py - 0.5) * 0.16;

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle);

      // Soft purple bloom behind the polished edge.
      ctx.save();
      ctx.filter = 'blur(18px)';
      ctx.globalAlpha = 0.32;
      ctx.beginPath();
      ctx.ellipse(0, 0, rx * 0.88, ry * 0.95, 0, 0, Math.PI * 2);
      const glow = ctx.createRadialGradient(0, 0, ry * 0.1, 0, 0, rx);
      glow.addColorStop(0, 'rgba(167, 73, 255, 0.04)');
      glow.addColorStop(0.45, 'rgba(141, 44, 230, 0.46)');
      glow.addColorStop(0.78, 'rgba(82, 22, 139, 0.2)');
      glow.addColorStop(1, 'rgba(50, 10, 80, 0)');
      ctx.fillStyle = glow;
      ctx.fill();
      ctx.restore();

      // Organic, closed liquid loop. The pointer bends the loop's lobes.
      const bend = (px - 0.5) * 0.8 + Math.sin(t * 0.45 + r.phase) * 0.24;
      const bendY = (py - 0.5) * 0.45 + Math.cos(t * 0.37 + r.phase) * 0.18;
      ctx.beginPath();
      ctx.moveTo(-rx, -ry * 0.08);
      ctx.bezierCurveTo(-rx * 0.78, -ry * (1.7 + wobble * 0.15), -rx * 0.08, -ry * (1.45 + bendY), rx * 0.16, -ry * 0.42);
      ctx.bezierCurveTo(rx * (0.3 + bend * 0.2), -ry * 0.02, rx * (1.1 + bend * 0.12), -ry * 0.85, rx * 0.97, -ry * 0.12);
      ctx.bezierCurveTo(rx * 0.83, ry * 0.48, rx * 0.18, ry * (1.5 + wobble * 0.16), -rx * 0.25, ry * 0.62);
      ctx.bezierCurveTo(-rx * (0.78 + bend * 0.15), ry * 0.32, -rx * 0.68, -ry * 0.28, -rx, -ry * 0.08);
      ctx.closePath();

      const liquid = ctx.createLinearGradient(-rx, -ry, rx, ry);
      liquid.addColorStop(0, 'rgba(31, 8, 47, 0.04)');
      liquid.addColorStop(0.24, 'rgba(95, 28, 142, 0.28)');
      liquid.addColorStop(0.43, 'rgba(194, 124, 255, 0.82)');
      liquid.addColorStop(0.49, 'rgba(250, 229, 255, 0.96)');
      liquid.addColorStop(0.55, 'rgba(142, 59, 210, 0.88)');
      liquid.addColorStop(0.72, 'rgba(60, 17, 91, 0.58)');
      liquid.addColorStop(1, 'rgba(26, 5, 39, 0.02)');
      ctx.fillStyle = liquid;
      ctx.globalAlpha = index === 1 ? 0.72 : 0.88;
      ctx.fill();

      // Highlight and shadow strokes give the ribbon a glassy, liquid-metal edge.
      ctx.globalAlpha = 0.8;
      ctx.lineWidth = Math.max(0.8, Math.min(width, height) * 0.0012);
      ctx.strokeStyle = 'rgba(233, 190, 255, 0.72)';
      ctx.shadowColor = 'rgba(177, 70, 255, 0.95)';
      ctx.shadowBlur = 17;
      ctx.stroke();
      ctx.shadowBlur = 0;
      ctx.globalAlpha = 0.45;
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(255, 248, 255, 0.82)';
      ctx.stroke();
      ctx.restore();
    };

    const render = (now) => {
      if (document.hidden) {
        raf = requestAnimationFrame(render);
        return;
      }
      const delta = last ? Math.min((now - last) / 1000, 0.04) : 0.016;
      last = now;
      const time = reduceMotion ? 0.4 : now / 1000;
      pointer.x += (pointer.tx - pointer.x) * Math.min(1, delta * 2.8);
      pointer.y += (pointer.ty - pointer.y) * Math.min(1, delta * 2.8);

      ctx.clearRect(0, 0, width, height);
      // A very subtle vignette keeps the centre readable for the hero copy.
      const vignette = ctx.createRadialGradient(width * 0.48, height * 0.48, 0, width * 0.48, height * 0.48, Math.max(width, height) * 0.76);
      vignette.addColorStop(0, 'rgba(7, 4, 12, 0)');
      vignette.addColorStop(1, 'rgba(3, 2, 6, 0.54)');
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);

      ribbons.forEach((r, index) => drawRibbon(r, time, index));
      if (!reduceMotion) raf = requestAnimationFrame(render);
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onPointer, { passive: true });
    window.addEventListener('blur', onLeave);
    if (reduceMotion) render(0);
    else raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointer);
      window.removeEventListener('blur', onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="cursor-fluid-background" aria-hidden="true" />;
}
