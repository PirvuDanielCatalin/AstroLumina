import React, { useEffect, useRef } from 'react';

const LoadingAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to match window size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Star/point properties
    const points: { x: number; y: number; vx: number; vy: number }[] = [];
    const numPoints = 100;
    const connectionDistance = 150;
    const pointSize = 2;

    // Initialize points with random positions and velocities
    for (let i = 0; i < numPoints; i++) {
      points.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
      });
    }

    // Animation function
    const animate = () => {
      // Clear canvas
      ctx.fillStyle = '#0f172a'; // Matches the slate-900 background
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw points
      points.forEach(point => {
        // Update position
        point.x += point.vx;
        point.y += point.vy;

        // Bounce off edges
        if (point.x < 0 || point.x > canvas.width) point.vx *= -1;
        if (point.y < 0 || point.y > canvas.height) point.vy *= -1;

        // Draw point
        ctx.beginPath();
        ctx.arc(point.x, point.y, pointSize, 0, Math.PI * 2);
        ctx.fillStyle = '#fef08a'; // yellow-200
        ctx.fill();
      });

      // Draw connections
      ctx.beginPath();
      points.forEach((point, i) => {
        points.slice(i + 1).forEach(otherPoint => {
          const dx = point.x - otherPoint.x;
          const dy = point.y - otherPoint.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            const opacity = 1 - (distance / connectionDistance);
            ctx.strokeStyle = `rgba(254, 240, 138, ${opacity * 0.5})`; // yellow-200 with opacity
            ctx.beginPath();
            ctx.moveTo(point.x, point.y);
            ctx.lineTo(otherPoint.x, otherPoint.y);
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    };

    // Start animation
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900">
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
      />
      <div className="relative z-10 text-center">
        <div className="flex space-x-2 justify-center">
          <div className="w-3 h-3 bg-yellow-200 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-3 h-3 bg-yellow-200 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-3 h-3 bg-yellow-200 rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingAnimation;
