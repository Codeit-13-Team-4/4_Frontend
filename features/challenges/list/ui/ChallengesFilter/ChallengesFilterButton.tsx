import { ChevronDownIcon } from "@/shared/icons";

type ChallengesFilterButtonProps =
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    label: string;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
  };

export function ChallengesFilterButton({
  label,
  onClick,
  ...props
}: ChallengesFilterButtonProps) {
  return (
    <button
      onClick={onClick}
      {...props}
      className="flex cursor-pointer items-center gap-2 rounded-lg bg-gray-700 p-2 text-gray-200"
    >
      {label}

      <ChevronDownIcon width={20} height={20} className="text-gray-200" />
    </button>
  );
}
