import Image from "next/image";

type ProjectFilterButtonProps =
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    label: string;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
  };

export function ProjectFilterButton({
  label,
  onClick,
  ...props
}: ProjectFilterButtonProps) {
  return (
    <button
      onClick={onClick}
      {...props}
      className="flex cursor-pointer items-center gap-2 rounded-lg bg-gray-700 p-2 text-gray-200"
    >
      {label}

      <Image
        src="/icons/common/chevron_down-icon.svg"
        width={20}
        height={20}
        alt=""
        aria-hidden="true"
        className="h-5 w-5"
      />
    </button>
  );
}
