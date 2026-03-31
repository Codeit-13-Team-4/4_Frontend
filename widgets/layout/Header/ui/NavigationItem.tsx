import { cn } from "@/shared/utils";
import Link from "next/link";

export default function NavigationItem({
  href,
  label,
  isActive,
}: {
  href: string;
  label: string;
  isActive: boolean;
}) {
  return (
    <li>
      <Link
        href={href}
        className={cn(
          "hover:text-mint-500 p-4 font-semibold transition-colors duration-100",
          isActive ? "text-mint-500" : "text-gray-600",
        )}
      >
        {label}
      </Link>
    </li>
  );
}
