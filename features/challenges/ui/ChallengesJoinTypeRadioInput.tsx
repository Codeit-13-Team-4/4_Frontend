import { Lightning, Lock } from "@/shared/icons";

type ChallengesJoinTypeRadioInputProps = {
  value: string;
  title: string;
  description: string;
  selectedValue: string | undefined;
  onChange: (value: string) => void;
};

export function ChallengesJoinTypeRadioInput({
  value,
  title,
  description,
  selectedValue,
  onChange,
}: ChallengesJoinTypeRadioInputProps) {
  return (
    <li
      className={`flex cursor-pointer items-center gap-3 rounded-[20px] border px-5 py-3 ${selectedValue === value ? "border-mint-500" : "border-[#334155]"}`}
      onClick={() => onChange(value)}
    >
      <div>
        {value === "INSTANT" ? (
          <Lightning
            width={24}
            height={24}
            className={
              selectedValue === value ? "text-amber-strong" : "text-gray-400"
            }
          />
        ) : (
          <Lock
            width={24}
            height={24}
            className={
              selectedValue === value ? "text-mint-500" : "text-gray-400"
            }
          />
        )}
      </div>

      <div className="flex flex-col">
        <span className="text-gray-50">{title}</span>
        <span className="text-[14px] text-gray-400">{description}</span>
      </div>
    </li>
  );
}
