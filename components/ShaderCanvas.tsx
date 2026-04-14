"use client";

import { useEffect, useRef, useState } from "react";
import { MeshGradient } from "@paper-design/shaders-react";

// Matching the Figma blue → gold → red palette
const COLORS = ["#0057ff", "#1a35c8", "#f2c55b", "#ff4400", "#ff0000"];

export default function ShaderCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Map mouse to -0.35 → 0.35 range for subtle shift
      const nx = (e.clientX / window.innerWidth - 0.5) * 0.7;
      const ny = (e.clientY / window.innerHeight - 0.5) * 0.7;
      targetRef.current = { x: nx, y: ny };
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Smooth lerp loop
    function lerp() {
      const cur = currentRef.current;
      const tgt = targetRef.current;
      const nx = cur.x + (tgt.x - cur.x) * 0.05;
      const ny = cur.y + (tgt.y - cur.y) * 0.05;
      currentRef.current = { x: nx, y: ny };
      setOffset({ x: nx, y: ny });
      rafRef.current = requestAnimationFrame(lerp);
    }
    rafRef.current = requestAnimationFrame(lerp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full">
      <MeshGradient
        colors={COLORS}
        distortion={0.55}
        swirl={0.45}
        grainMixer={0.08}
        speed={0.35}
        offsetX={offset.x}
        offsetY={offset.y}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
