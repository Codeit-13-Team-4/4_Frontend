import { TechBadge } from "@/features/projects/ui";
import { TechStackType } from "@/features/projects/model";

export function TechStackList({ techs }: { techs: TechStackType[] }) {
  const maxVisible = 3;
  const visibleTechs = techs.slice(0, maxVisible);
  const remaining = techs.length - maxVisible;
  return (
    <div className="flex flex-wrap items-center gap-2 lg:flex">
      {visibleTechs.map((tech, index) => (
        <TechBadge key={`${tech}-${index}`} tech={tech} />
      ))}
      {remaining > 0 && <span className="text-gray-400">+{remaining}</span>}
    </div>
  );
}
