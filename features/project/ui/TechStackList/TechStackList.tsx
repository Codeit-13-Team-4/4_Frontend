import { TECH_STACK } from "../../model/project";
import { TechBadge } from "../TechBadge/TechBadge";

export function TechStackList({
  techs,
}: {
  techs: readonly (keyof typeof TECH_STACK)[];
}) {
  const maxVisible = 6;
  const visibleTechs = techs.slice(0, maxVisible);
  const remaining = techs.length - maxVisible;
  return (
    <div className="flex flex-wrap items-center gap-2">
      {visibleTechs.map((tech, index) => (
        <TechBadge key={`${tech}-${index}`} tech={tech} />
      ))}
      {remaining > 0 && <span className="text-gray-50">+{remaining}</span>}
    </div>
  );
}
