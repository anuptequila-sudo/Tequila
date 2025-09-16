"use client";

import { useEffect, useRef } from "react";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";

type Props = {
  children: React.ReactNode;
};

export default function SmoothScroll({ children }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scroll = new LocomotiveScroll({
      el: containerRef.current,
      smooth: true,
      lerp: 0.1, // smoothness (0.1 is default)
      multiplier: 1.2, // scroll speed
    });

    // Update on resize
    setTimeout(() => {
      scroll.update();
    }, 1000);

    return () => {
      scroll.destroy();
    };
  }, []);

  return (
    <div id="scroll-container" data-scroll-container ref={containerRef}>
      {children}
    </div>
  );
}
