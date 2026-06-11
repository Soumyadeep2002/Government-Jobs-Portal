import React, { useState, useEffect } from "react";

interface AmbientGlowProps {
  darkMode: boolean;
}

export default function AmbientGlow({ darkMode }: AmbientGlowProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div 
      id="ambient-glow"
      className="pointer-events-none fixed inset-0 z-45 transition-all duration-300 opacity-100"
      style={{
        background: darkMode
          ? `radial-gradient(650px circle at ${mousePos.x}px ${mousePos.y}px, rgba(99, 102, 241, 0.16), rgba(168, 85, 247, 0.1), transparent 70%)`
          : `radial-gradient(650px circle at ${mousePos.x}px ${mousePos.y}px, rgba(99, 102, 241, 0.12), rgba(245, 158, 11, 0.06), transparent 70%)`
      }}
    />
  );
}
