import { ProjectFilterOptions } from "@/features/projects/model";

type ProjectFilterCheckboxProps = {
  item: ProjectFilterOptions;
  selectedValues: string[];
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  name: string;
};

export function ProjectFilterCheckBoxInput({
  item,
  selectedValues,
  onChange,
  name,
}: ProjectFilterCheckboxProps) {
  return (
    <li>
      <input
        type="checkbox"
        className="peer hidden"
        id={`${name}_${item.value}`}
        value={item.value}
        checked={selectedValues.includes(item.value)}
        onChange={onChange}
      />
      <label
        htmlFor={`${name}_${item.value}`}
        className="peer-checked:border-mint-500 peer-checked:text-mint-500 inline-block cursor-pointer rounded-full border border-gray-700 p-2 text-gray-400 peer-checked:bg-gray-900 md:px-2 md:py-1"
      >
        {item.label}
      </label>
    </li>
  );
}
