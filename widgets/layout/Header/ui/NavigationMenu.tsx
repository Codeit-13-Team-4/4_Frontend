"use client";

import { cn } from "@/shared/utils";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "../constants/constants";
import NavigationItem from "./NavigationItem";
import { getIsActive } from "../utils/getIsActive";

export default function NavigationMenu({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <ul className={cn("flex", className)}>
      {NAV_ITEMS.map((item) => (
        <NavigationItem
          key={item.href}
          href={item.href}
          label={item.label}
          isActive={getIsActive(pathname, item.href)}
        />
      ))}
    </ul>
  );
}
