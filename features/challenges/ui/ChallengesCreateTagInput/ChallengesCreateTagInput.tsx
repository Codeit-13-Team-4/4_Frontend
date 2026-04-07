"use client";

import { XIcon } from "@/shared/icons";
import { Button, Input } from "@/shared/ui";

interface ProjectCreateTagInputProps {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  tags: string[];
  setTags: (tags: string[]) => void;
}

export function ChallengesCreateTagInput({
  input,
  setInput,
  tags,
  setTags,
}: ProjectCreateTagInputProps) {
  const handleAddTag = (value: string) => {
    if (!value.trim()) {
      return alert("키워드를 입력해주세요.");
    }
    if (!tags.includes(value)) {
      setTags([...tags, value]);
    }
    setInput("");
  };
  const handleTagDelete = (key: string) => {
    setTags(tags.filter((item) => item !== key));
  };
  return (
    <div>
      <div className="relative mb-4">
        <Input
          placeholder="태그 키워드 입력"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button
          variant="primary"
          onClick={() => handleAddTag(input)}
          className="absolute top-1 right-2 cursor-pointer"
          size="sm"
        >
          추가
        </Button>
      </div>
      <ul className="flex gap-1">
        {tags?.map((item) => {
          return (
            <li
              key={item}
              className="inline-flex items-center gap-2 rounded-sm bg-gray-700 px-2 py-1"
            >
              <span className="text-[#E2E8F0]">#{item}</span>
              <button
                onClick={() => handleTagDelete(item)}
                className="cursor-pointer"
              >
                <XIcon width={8} height={8} />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
