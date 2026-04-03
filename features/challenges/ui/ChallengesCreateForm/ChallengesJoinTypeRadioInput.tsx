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
      className={`flex flex-1 cursor-pointer items-center gap-3 rounded-[20px] border px-5 py-3 ${selectedValue === value ? "border-mint-500" : "border-[#334155]"}`}
      onClick={() => onChange(value)}
    >
      <div>{value === "INSTANT" ? <InstantIcon /> : <ApprovalIcon />}</div>

      <div className="flex flex-col">
        <span className="text-gray-50">{title}</span>
        <span className="text-[14px] text-gray-400">{description}</span>
      </div>
    </li>
  );
}

function InstantIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M11 15H6L13 1V9H18L11 23V15Z" fill="#94A3B8" />
    </svg>
  );
}

function ApprovalIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 22H18C19.1 22 20 21.1 20 20V11C20 9.9 19.1 9 18 9H17V7C17 4.24 14.76 2 12 2C9.24 2 7 4.24 7 7V9H6C4.9 9 4 9.9 4 11V20C4 21.1 4.9 22 6 22ZM9 7C9 5.35 10.35 4 12 4C13.65 4 15 5.35 15 7V9H9V7Z"
        fill="#00D7A0"
      />
    </svg>
  );
}
