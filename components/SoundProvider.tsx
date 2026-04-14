"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function SoundProvider() {
  const audioContextReady = useRef(false);
  const pathname = usePathname();

  useEffect(() => {
    // We attach an event listener to the whole document
    // Any time a link or button is hovered, we play the sound.
    
    // Using a quick clone allows overlaps for rapid hovering
    const playSound = () => {
      const audio = new Audio("/click-sound.mp3");
      audio.volume = 0.25; // Subtle background click
      audio.play().catch((err) => {
        // usually DOMException: play() failed because the user didn't interact with the document first
        console.log("Audio play prevented before user interaction.", err);
      });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // We only fire for anchors, buttons, or custom interactive rows
      const clickableNode = target.closest("a, button, .project-card, .project-row, .cta-btn");
      
      // Prevent multiple triggers from child node bubbles by only firing on the root parent trigger
      if (clickableNode) {
        // Because mouseover bubbles, we only want to play the sound if our relatedTarget wasn't ALSO inside this clickable node
        const relatedTarget = e.relatedTarget as Node | null;
        if (!relatedTarget || !clickableNode.contains(relatedTarget)) {
           playSound();
        }
      }
    };

    document.addEventListener("mouseover", handleMouseOver);
    return () => {
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, [pathname]);

  return null;
}
