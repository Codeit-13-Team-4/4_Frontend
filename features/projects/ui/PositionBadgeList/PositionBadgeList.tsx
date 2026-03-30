import { PositionType } from "@/features/projects/model";
import PositionBadge from "./PositionBadge";

export function PositionBadgeList({
  positions,
}: {
  positions: PositionType[];
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {positions.map((position, index) => {
        return (
          <PositionBadge position={position} key={`${position}-${index}`} />
        );
      })}
    </div>
  );
}
