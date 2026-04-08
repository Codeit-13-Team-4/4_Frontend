"use client";
import { useState } from "react";
import { TECH_STACK, TechStackType } from "../../model";
import { Input } from "@/shared/ui";
import Image from "next/image";
import { XIcon } from "@/shared/icons";

interface ProjectCreateTagInputProps {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  tags: TechStackType[];
  setTags: (tags: TechStackType[]) => void;
}

export function ProjectCreateTagInput({
  input,
  setInput,
  tags,
  setTags,
}: ProjectCreateTagInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const recommendList = Object.keys(TECH_STACK).filter(
    (key) =>
      key.includes(input?.toLowerCase()) &&
      !tags.includes(key as TechStackType),
  );

  const handleAddTag = (key: TechStackType) => {
    if (!tags.includes(key)) {
      setTags([...tags, key]);
    }
    setInput("");
    setIsFocused(false);
  };
  const handleTagDelete = (key: TechStackType) => {
    setTags(tags.filter((item) => item !== key));
  };
  return (
    <div>
      <div className="relative mb-4">
        <Input
          placeholder="태그 키워드 입력"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onClick={() => setIsFocused((prev) => !prev)}
          onBlur={() => setTimeout(() => setIsFocused(false), 100)}
        />
        {isFocused && recommendList.length > 0 && (
          <ul className="scrollbar-hide absolute top-full z-50 mt-1 max-h-40 w-full overflow-y-auto rounded-md border border-gray-700 bg-gray-800">
            {recommendList.map((key) => (
              <li
                key={key}
                className="flex cursor-pointer items-center gap-2 px-3 py-1 hover:bg-gray-700"
                onClick={() => handleAddTag(key as TechStackType)}
              >
                <Image
                  src={TECH_STACK[key as TechStackType].icon}
                  alt={TECH_STACK[key as TechStackType].label}
                  width={16}
                  height={16}
                />
                <span>{TECH_STACK[key as TechStackType].label}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
      <ul className="flex gap-1">
        {tags?.map((item) => {
          const { label } = TECH_STACK[item];

          return (
            <li
              key={item}
              className="inline-flex items-center gap-2 rounded-sm bg-gray-700 px-2 py-1"
            >
              <span>{label}</span>
              <button
                onClick={() => handleTagDelete(item)}
                className="cursor-pointer"
              >
                <XIcon width={8} height={8} />
              </button>
            </li>
          );
        })}
      </ul>{" "}
    </div>
  );
}
