import { Badge } from "@/shared/ui";
import { PROJECT_TYPE_LABEL, ProjectType } from "@/features/projects/model";

export function ProjectBadge({ type }: { type: ProjectType }) {
  const label = PROJECT_TYPE_LABEL[type];
  return <Badge className="text-mint-500 bg-gray-800">{label}</Badge>;
}
