import { Badge } from "@/shared/ui";
import { PROJECT_TYPE_LABEL } from "@/features/projectsDetail/model/projects.constants";
import { ProjectType } from "@/features/projectsDetail/types/projectsDetail";

export function ProjectBadge({ type }: { type: ProjectType }) {
  const label = PROJECT_TYPE_LABEL[type];
  return <Badge className="text-mint-500 bg-gray-900">{label}</Badge>;
}
