"use client";

import { XIcon } from "@/shared/icons";
import { Button, Input } from "@/shared/ui";
import { useState } from "react";
import { toast } from "sonner";

interface ChallengesTagInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
}

export function ChallengesTagInput({
  value: tags,
  onChange,
}: ChallengesTagInputProps) {
  const [input, setInput] = useState("");

  const handleAddTag = (tag: string) => {
    if (!tag.trim()) {
      return toast.error("키워드를 입력해주세요.");
    }
    if (tag.length > 6) {
      return toast.error("태그는 6글자 이하로 입력해주세요.");
    }
    if (tags.length >= 3) {
      return toast.error("태그는 최대 3개까지 입력할 수 있습니다.");
    }
    if (!tags.includes(tag)) {
      onChange([...tags, tag]);
    }
    setInput("");
  };

  const handleTagDelete = (key: string) => {
    onChange(tags.filter((item) => item !== key));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag(input);
    }
  };

  return (
    <div>
      <div className="relative mb-4">
        <Input
          placeholder="태그 키워드 입력"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
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
