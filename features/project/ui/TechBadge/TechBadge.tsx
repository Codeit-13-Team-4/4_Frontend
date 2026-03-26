import Image from "next/image";
import { TECH_STACK } from "../../model/project";

export function TechBadge({ tech }: { tech: keyof typeof TECH_STACK }) {
  const { icon, label } = TECH_STACK[tech];
  return (
    <div className="inline-flex items-center gap-2 rounded-sm bg-gray-700 px-2 py-1">
      <Image src={icon} alt={label} width={16} height={16} />
      <span className="text-gray-200">{label}</span>
    </div>
  );
}
