import { PositionType } from "../../model/project";
import PositionBadge from "../PositionBadge/PositionBadge";

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
