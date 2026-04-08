import { PositionType } from "@/features/projects/model";
import { POSITION_LABELS } from "@/features/projectsDetail/model/projects.constants";

export function PositionBadgeList({
  positions,
}: {
  positions: PositionType[];
}) {
  const maxVisible = 6;
  const visiblePositions = positions.slice(0, maxVisible);
  const remaining = positions.length - maxVisible;
  return (
    <ul className="flex flex-wrap items-center gap-3">
      {visiblePositions.map((position, index) => {
        return <li key={index}>{POSITION_LABELS[position]}</li>;
      })}
      {remaining > 0 && <span className="text-gray-400">+{remaining}</span>}
    </ul>
  );
}
