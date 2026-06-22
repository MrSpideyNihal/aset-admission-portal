import React, { useEffect, useRef } from 'react';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    // Only enable custom cursor on mouse-supported devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const handleMouseMove = (e) => {
      const { clientX: x, clientY: y } = e;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Hover styles toggles
    const addHoverClass = () => {
      if (cursorRef.current) cursorRef.current.classList.add('cursor-hover');
      if (dotRef.current) dotRef.current.classList.add('dot-hover');
    };
    
    const removeHoverClass = () => {
      if (cursorRef.current) cursorRef.current.classList.remove('cursor-hover');
      if (dotRef.current) dotRef.current.classList.remove('dot-hover');
    };

    // Find and attach event listeners to interactive elements
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

    // Re-attach listeners when DOM modifications occur (useful for SPA state changes)
    const observer = new MutationObserver(attachHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
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
    <>
      <div
        ref={cursorRef}
        className="custom-cursor-trail"
        style={{
          position: 'fixed',
          top: -20,
          left: -20,
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          border: '2px solid rgba(6, 182, 212, 0.4)',
          boxShadow: '0 0 15px rgba(6, 182, 212, 0.25)',
          pointerEvents: 'none',
          zIndex: 99999,
          transform: 'translate3d(0, 0, 0)',
          transition: 'transform 0.12s cubic-bezier(0.16, 1, 0.3, 1), width 0.3s, height 0.3s, background-color 0.3s, border-color 0.3s',
          mixBlendMode: 'difference'
        }}
      />
      <div
        ref={dotRef}
        className="custom-cursor-dot"
        style={{
          position: 'fixed',
          top: -4,
          left: -4,
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: '#06B6D4',
          boxShadow: '0 0 8px #06B6D4',
          pointerEvents: 'none',
          zIndex: 99999,
          transform: 'translate3d(0, 0, 0)',
          transition: 'transform 0.02s linear, background-color 0.3s, transform-origin 0.3s'
        }}
      />
    </>
  );
};

export default CustomCursor;
