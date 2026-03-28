import { ProjectFilterOptions } from "../../model/project";

type ProjectFilterRadioProps = {
  item: ProjectFilterOptions;
  name: "status" | "purpose" | "position";
  selectedValue: string;
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
        className="peer-checked:bg-mint-500 inline-block cursor-pointer rounded-full border border-gray-700 bg-gray-900 px-2 py-1 text-gray-400 peer-checked:text-gray-50"
      >
        {item.label}
      </label>
    </li>
  );
}
