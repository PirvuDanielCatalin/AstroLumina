import React, { useEffect, useRef } from 'react';

const LoadingAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const setCanvasSize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const scale = window.devicePixelRatio || 1;

      canvas.width = width * scale;
      canvas.height = height * scale;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';

      ctx.scale(scale, scale);
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, width, height);
    };

    const resizeHandler = () => {
      window.requestAnimationFrame(() => {
        setCanvasSize();
      });
    };

    setCanvasSize();
    window.addEventListener('resize', resizeHandler, { passive: true });

    const points: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
    }> = [];

    const numPoints = Math.min(50, Math.floor((window.innerWidth * window.innerHeight) / 20000));
    const connectionDistance = 150;
    const pointSize = 2;

    for (let i = 0; i < numPoints; i++) {
      points.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
      });
    }

    let isAnimating = true;
    let lastTime = 0;

    const animate = (timestamp: number) => {
      if (!isAnimating) return;

      const deltaTime = timestamp - lastTime;
      lastTime = timestamp;

      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

      points.forEach((point) => {
        if (deltaTime) {
          point.x += point.vx * (deltaTime / 16);
          point.y += point.vy * (deltaTime / 16);
        }

        if (point.x < 0 || point.x > window.innerWidth) point.vx *= -1;
        if (point.y < 0 || point.y > window.innerHeight) point.vy *= -1;

        ctx.beginPath();
        ctx.arc(point.x, point.y, pointSize, 0, Math.PI * 2);
        ctx.fillStyle = '#fef08a';
        ctx.fill();
      });

      points.forEach((point, i) => {
        points.slice(i + 1).forEach((otherPoint) => {
          const dx = point.x - otherPoint.x;
          const dy = point.y - otherPoint.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            const opacity = 1 - distance / connectionDistance;
            ctx.strokeStyle = `rgba(254, 240, 138, ${opacity * 0.5})`;
            ctx.beginPath();
            ctx.moveTo(point.x, point.y);
            ctx.lineTo(otherPoint.x, otherPoint.y);
            ctx.stroke();
          }
        });
      });

      window.requestAnimationFrame(animate);
    };

    window.requestAnimationFrame(animate);

    return () => {
      isAnimating = false;
      window.removeEventListener('resize', resizeHandler);
    };
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      WebkitTransform: 'translate3d(0,0,0)',
      transform: 'translate3d(0,0,0)',
      WebkitBackfaceVisibility: 'hidden',
      backfaceVisibility: 'hidden',
      WebkitPerspective: 1000
    }}>
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          touchAction: 'none',
          WebkitTapHighlightColor: 'transparent',
          WebkitTransform: 'translate3d(0,0,0)',
          transform: 'translate3d(0,0,0)'
        }}
      />
    </div>
  );
};

export default LoadingAnimation;
