import React, { useEffect, useRef } from 'react';

const CustomCursor = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, lastX: 0, lastY: 0, speed: 0 });
  const particlesRef = useRef([]);
  const isHovering = useRef(false);

  useEffect(() => {
    // Disable on touch screens
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Resize handler
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // institution themed neon accents
    const colors = ['#8B5CF6', '#06B6D4', '#EC4899', '#F59E0B', '#10B981'];

    class Particle {
      constructor(x, y, type = 'trail') {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3 + 1.5; // size between 1.5 and 4.5
        
        if (type === 'explosion') {
          // click shockwave - random vectors
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 5 + 2;
          this.vx = Math.cos(angle) * speed;
          this.vy = Math.sin(angle) * speed;
          this.decay = Math.random() * 0.02 + 0.015;
        } else if (type === 'hover-spark') {
          // floaty bubbles rising up
          this.vx = (Math.random() - 0.5) * 1.5;
          this.vy = -Math.random() * 2 - 0.5;
          this.decay = Math.random() * 0.03 + 0.02;
        } else {
          // default trail - slight downward drift
          this.vx = (Math.random() - 0.5) * 0.8;
          this.vy = (Math.random() - 0.2) * 0.8 + 0.4;
          this.decay = Math.random() * 0.025 + 0.02;
        }

        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.alpha = 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.alpha -= this.decay;
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        // Apply glow filter
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.restore();
      }
    }

    const spawnParticles = (x, y, count, type) => {
      for (let i = 0; i < count; i++) {
        particlesRef.current.push(new Particle(x, y, type));
      }
    };

    const handleMouseMove = (e) => {
      const { clientX: x, clientY: y } = e;
      
      const dx = x - mouseRef.current.x;
      const dy = y - mouseRef.current.y;
      const speed = Math.sqrt(dx * dx + dy * dy);
      
      mouseRef.current.x = x;
      mouseRef.current.y = y;
      
      // Spawn trail particles based on movement velocity
      if (speed > 1) {
        const count = Math.min(Math.floor(speed / 4) + 1, 5);
        spawnParticles(x, y, count, 'trail');
      }
    };

    const handleMouseDown = () => {
      const { x, y } = mouseRef.current;
      spawnParticles(x, y, 22, 'explosion');
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);

    // Track cursor hover state
    const addHoverClass = () => {
      isHovering.current = true;
    };
    const removeHoverClass = () => {
      isHovering.current = false;
    };

    const attachHoverListeners = () => {
      const elements = document.querySelectorAll(
        'a, button, input, select, textarea, .glass-panel-hover, [role="button"]'
      );
      elements.forEach((el) => {
        el.removeEventListener('mouseenter', addHoverClass);
        el.removeEventListener('mouseleave', removeHoverClass);
        el.addEventListener('mouseenter', addHoverClass);
        el.addEventListener('mouseleave', removeHoverClass);
      });
    };

    attachHoverListeners();
    const observer = new MutationObserver(attachHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    // Canvas animation loop
    let animationFrameId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Emit sparks if mouse is hovering over interactive elements
      if (isHovering.current && Math.random() < 0.5) {
        spawnParticles(mouseRef.current.x, mouseRef.current.y, 1, 'hover-spark');
      }

      const { x, y } = mouseRef.current;

      // Draw custom cursor outer target ring
      ctx.save();
      ctx.beginPath();
      const ringSize = isHovering.current ? 16 : 10;
      ctx.arc(x, y, ringSize, 0, Math.PI * 2);
      ctx.strokeStyle = isHovering.current ? '#EC4899' : '#06B6D4';
      ctx.lineWidth = 2;
      ctx.shadowBlur = 12;
      ctx.shadowColor = isHovering.current ? '#EC4899' : '#06B6D4';
      ctx.stroke();
      ctx.restore();

      // Draw inner target dot
      ctx.save();
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fillStyle = isHovering.current ? '#8B5CF6' : '#ffffff';
      ctx.shadowBlur = 8;
      ctx.shadowColor = isHovering.current ? '#8B5CF6' : '#ffffff';
      ctx.fill();
      ctx.restore();

      // Update & render particles
      particlesRef.current = particlesRef.current.filter((p) => {
        p.update();
        p.draw();
        return p.alpha > 0;
      });

      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);

      const elements = document.querySelectorAll(
        'a, button, input, select, textarea, .glass-panel-hover, [role="button"]'
      );
      elements.forEach((el) => {
        el.removeEventListener('mouseenter', addHoverClass);
        el.removeEventListener('mouseleave', removeHoverClass);
      });
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 999999
      }}
    />
  );
};

export default CustomCursor;
