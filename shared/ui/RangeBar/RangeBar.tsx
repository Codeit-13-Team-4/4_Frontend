interface RangeBarProps {
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
}

export function RangeBar({ min, max, value, onChange }: RangeBarProps) {
  const percent = ((value - min) / (max - min)) * 100;

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
        {value}명
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="range-devup relative cursor-pointer"
      />
      <div className="flex justify-between text-sm text-gray-400">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}
