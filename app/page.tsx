"use client";

import { LikeButton } from "@/shared/ui/LikeButton/LikeButton";
import { useState } from "react";

export default function Home() {
  const [liked, setLiked] = useState(false);

  return (
    <div className="flex h-screen items-center justify-center">
      <LikeButton liked={liked} onToggle={() => setLiked((prev) => !prev)} />
    </div>
  );
}
