import { Badge } from "@/shared/ui";

export function ProjectBadge({ children }: { children: React.ReactNode }) {
  return <Badge className="text-mint-500 bg-gray-900">{children}</Badge>;
}
