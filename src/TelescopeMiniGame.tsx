import { useState, useEffect } from 'react';

export const TelescopeMiniGame =  () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Update position when the mouse moves
    const handleMouseMove = (event: { clientX: any; clientY: any; }) => {
      setPosition({
        x: event.clientX,
        y: event.clientY,
      });
    };

    // Add mousemove event listener
    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="relative w-screen h-screen bg-black overflow-hidden">
      <div
        className="w-[100px] h-[100px] bg-white rounded-full absolute"
        style={{
          top: position.y - 50,  // Offset by half the circle's height to center
          left: position.x - 50, // Offset by half the circle's width to center
          transform: 'translate(-50%, -50%)', // Optional for smoother centering
        }}
      />
    </div>
  );
}