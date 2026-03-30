"use client";

import { cn } from "@/shared/utils";

interface SidebarOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SidebarOverlay({ isOpen, onClose }: SidebarOverlayProps) {
  return (
    <div
      className={cn(
        "fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 md:hidden",
        isOpen ? "opacity-100" : "pointer-events-none opacity-0",
      )}
      onClick={onClose}
    />
  );
}
