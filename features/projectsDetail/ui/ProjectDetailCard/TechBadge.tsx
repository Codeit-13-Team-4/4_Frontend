import Image from "next/image";
import { TECH_STACK } from "@/features/projectsDetail/model/projects.constants";
import { TechStackType } from "@/features/projectsDetail/types/projectsDetail";

export function TechBadge({ tech }: { tech: TechStackType }) {
  const { icon, label } = TECH_STACK[tech];
  return (
    <div className="inline-flex items-center gap-2 rounded-sm bg-gray-700 px-2 py-1">
      <Image src={icon} alt={label} width={16} height={16} />
      <span className="text-gray-200">{label}</span>
    </div>
  );
}
