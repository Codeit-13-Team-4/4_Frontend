"use client";

import { useEffect, useState } from "react";

interface TypingTextProps {
  text: string;
  speed?: number;
  className?: string;
}

export default function TypingText({
  text,
  speed = 120,
  className = "",
}: TypingTextProps) {
  const [TypingText, setTypingText] = useState("");

  useEffect(() => {
    let index = 0;

    const interval = window.setInterval(() => {
      index += 1;
      setTypingText(text.slice(0, index));

      if (index >= text.length) {
        window.clearInterval(interval);
      }
    }, speed);

    return () => window.clearInterval(interval);
  }, [text, speed]);

  return (
    <p className={className}>
      {TypingText}
      <span className="animate-blink bg-mint-700 ml-1 inline-block h-[1em] w-0.5 align-middle" />
    </p>
  );
}
