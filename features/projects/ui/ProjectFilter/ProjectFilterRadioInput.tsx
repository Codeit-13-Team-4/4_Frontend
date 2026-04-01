import { ProjectFilterOptions } from "@/features/projects/model";

type ProjectFilterRadioProps = {
  item: ProjectFilterOptions;
  name: "status" | "projectType" | "position";
  selectedValue: string | undefined;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};

export function ProjectFilterRadioInput({
  name,
  item,
  selectedValue,
  onChange,
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
        className="peer-checked:bg-mint-500 inline-block cursor-pointer rounded-full border border-gray-700 bg-gray-900 p-2 text-gray-400 peer-checked:text-gray-50 md:px-2 md:py-1"
      >
        {item.label}
      </label>
    </li>
  );
}
