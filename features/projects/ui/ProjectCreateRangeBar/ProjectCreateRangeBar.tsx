interface ProjectCreateRangeBarProps {
  count: number;
  setCount: (count: number) => void;
}

export function ProjectCreateRangeBar({
  count,
  setCount,
}: ProjectCreateRangeBarProps) {
  const min = 0;
  const max = 30;
  const percent = (count / max) * 100;

  return (
    <div className="relative w-full">
      <div className="absolute top-1/2 left-0 h-2 w-full rounded-full bg-gray-900" />

      <div
        className="absolute top-1/2 left-0 h-2 rounded-full"
        style={{
          width: `${percent}%`,
          background: "var(--color-gradient-devup)",
        }}
      />
      <div className="flex items-center justify-center text-gray-50">
        {count}명
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={count}
        onChange={(e) => setCount(Number(e.target.value))}
        className="range-devup relative cursor-pointer"
      />
      <div className="flex justify-between">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}
