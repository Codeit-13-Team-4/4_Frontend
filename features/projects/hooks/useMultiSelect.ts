import { useState } from "react";

export const useMultiSelect = (options: { value: string }[]) => {
  const [selected, setSelected] = useState(["all"]);
  const optionCount = options.filter((i) => i.value !== "all").length;

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value;
    if (value === "all") return setSelected(["all"]);

    setSelected((prev) => {
      const newFilter = prev.includes(value)
        ? prev.filter((v) => v !== value)
        : prev.filter((v) => v !== "all").concat(value);

      return newFilter.length === 0 || newFilter.length === optionCount
        ? ["all"]
        : newFilter;
    });
  };
  const reset = () => setSelected(["all"]);
  return [selected, handleChange, reset] as const;
};
