"use client";

import { useEffect, useState } from "react";
import { cn } from "@/shared/utils";

interface TypingTextProps {
  text: string;
  speed?: number;
  className?: string;
  cursorClassName?: string;
}

export default function TypingText({
  text,
  speed = 120,
  className = "",
  cursorClassName = "",
}: TypingTextProps) {
  const [typingText, setTypingText] = useState("");

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
      {typingText}
      <span
        className={cn(
          "animate-blink ml-1 inline-block h-[1em] w-0.5 align-middle",
          cursorClassName,
        )}
      />
    </p>
  );
}
