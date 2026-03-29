import { cva } from "class-variance-authority";
import { POSITION_LABELS, PositionType } from "../../model";

const positionBadgeVariants = cva(
  "font-medium rounded-3xl bg-[#0F172A] inline-flex items-center px-3 py-1 gap-1 border text-[14px]",
  {
    variants: {
      variant: {
        fe: "bg-[#2D1B4E]/60 border-[#a78bfa] text-[#a78bfa]",
        be: "bg-[#431407]/60 border-[#fb923c] text-[#fb923c]",
        designer: "bg-[#083344]/60 border-[#22d3ee] text-[#22d3ee]",
        marketer: "bg-[#3D1429]/60 border-[#f472b6] text-[#f472b6]",
        android: "bg-[#062D1F]/60 border-[#a7f3d0] text-[#a7f3d0]",
        ios: "bg-[#1E1B4B]/60 border-[#818cf8] text-[#818cf8]",
        devops: "bg-[#1E293B] border-[#94a3b8] text-[#94a3b8]",
        pm: " bg-[#332B00]/60 border-[#fde68a] text-[#fde68a]",
      },
    },
  },
);

export function PositionBadge({ position }: { position: PositionType }) {
  return (
    <div className={positionBadgeVariants({ variant: position })}>
      {POSITION_LABELS[position]}
    </div>
  );
}

export default PositionBadge;
