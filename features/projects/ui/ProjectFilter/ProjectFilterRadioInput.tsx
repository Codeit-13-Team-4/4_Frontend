import { ProjectFilterOptions } from "@/features/projects/model";
import { cn } from "@/shared/utils";

type ProjectFilterRadioProps = {
  item: ProjectFilterOptions;
  name: "status" | "projectType" | "position";
  selectedValue: string | undefined;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  className?: string;
};

export function ProjectFilterRadioInput({
  name,
  item,
  selectedValue,
  onChange,
  className,
}: ProjectFilterRadioProps) {
  return (
    <li>
      <input
        type="radio"
        id={`${name}_${item.value}`}
        name={name}
        className="peer hidden"
        value={item.value}
        checked={selectedValue === item.value}
        onChange={onChange}
      />
      <label
        htmlFor={`${name}_${item.value}`}
        className={cn(
          "peer-checked:bg-mint-500 inline-block cursor-pointer rounded-full border border-gray-700 bg-gray-900 px-2 py-1 text-gray-400 peer-checked:text-gray-50",
          className,
        )}
      >
        {item.label}
      </label>
    </li>
  );
}
