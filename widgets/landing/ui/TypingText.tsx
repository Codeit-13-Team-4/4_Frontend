"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/shared/utils";

interface TypingTextProps {
  text: string;
  speed?: number;
  className?: string;
  cursorClassName?: string;
}

export function TypingText({
  text,
  speed = 120,
  className = "",
  cursorClassName = "",
}: TypingTextProps) {
  const textRef = useRef<HTMLParagraphElement | null>(null);

  const [playKey, setPlayKey] = useState(0);
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (!textRef.current) return;

    let wasIntersecting = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !wasIntersecting) {
          wasIntersecting = true;
          setVisibleCount(0);
          setPlayKey((prev) => prev + 1);
        }

        if (!entry.isIntersecting) {
          wasIntersecting = false;
        }
      },
      {
        threshold: 0.5,
      },
    );

    observer.observe(textRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (playKey === 0) return;

    let index = 0;

    const interval = window.setInterval(() => {
      index += 1;
      setVisibleCount(index);

      if (index >= text.length) {
        window.clearInterval(interval);
      }
    }, speed);

    return () => window.clearInterval(interval);
  }, [playKey, text, speed]);

  return (
    <p ref={textRef} className={className}>
      {text.slice(0, visibleCount)}
      <span
        className={cn(
          "animate-blink ml-1 inline-block h-[1em] w-0.5 align-middle",
          cursorClassName,
        )}
      />
    </p>
  );
}
