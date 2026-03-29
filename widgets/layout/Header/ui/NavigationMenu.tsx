"use client";

import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "../constants/constants";
import NavigationItem from "./NavigationItem";

function getIsActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

export default function NavigationMenu() {
  const pathname = usePathname();

  return (
    <ul className="flex">
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
