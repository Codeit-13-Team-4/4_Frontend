"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { TECH_STACK } from "@/features/projectsDetail/model/projects.constants";
import type { TechStackType } from "@/features/projectsDetail/types/projectsDetail";

const TECH_STACK_ENTRIES = Object.entries(TECH_STACK) as [
  TechStackType,
  { label: string; icon: string },
][];

interface TechStackSelectProps {
  value: TechStackType[];
  onChange: (value: TechStackType[]) => void;
}

export function TechStackSelect({ value, onChange }: TechStackSelectProps) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const filtered = TECH_STACK_ENTRIES.filter(
    ([key, { label }]) =>
      !value.includes(key) && label.toLowerCase().includes(query.toLowerCase()),
  );

  const handleSelect = (key: TechStackType) => {
    onChange([...value, key]);
    setQuery("");
  };

  const handleRemove = (key: TechStackType) => {
    onChange(value.filter((v) => v !== key));
  };

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col gap-3">
      {/* 검색 인풋 + 드롭다운 */}
      <div ref={containerRef} className="relative">
        <div className="border-border-default flex h-12 w-full items-center justify-between rounded-xl border bg-gray-900 px-3">
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            placeholder="기술 입력"
            className="min-w-0 flex-1 bg-transparent text-base text-gray-50 outline-none placeholder:text-gray-400"
          />
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            className="text-gray-400 transition-transform duration-200"
            style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
        </div>

        {open && filtered.length > 0 && (
          <ul className="absolute top-full left-0 z-10 mt-1 max-h-48 w-full overflow-y-auto rounded-xl border border-gray-600 bg-gray-800 shadow-lg">
            {filtered.map(([key, { label, icon }]) => (
              <li key={key}>
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    handleSelect(key);
                    setOpen(false);
                  }}
                  className="flex w-full items-center gap-2.5 px-3 py-2.5 text-sm text-gray-200 hover:bg-gray-700"
                >
                  <Image src={icon} alt={label} width={18} height={18} />
                  {label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 선택된 태그 */}
      {value.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {value.map((key) => {
            const { label } = TECH_STACK[key];
            return (
              <span
                key={key}
                className="flex items-center gap-1.5 rounded-lg bg-gray-700 px-2 py-1 text-sm font-medium text-gray-50"
              >
                {label}
                <button
                  type="button"
                  onClick={() => handleRemove(key)}
                  className="cursor-pointer text-gray-400"
                >
                  ✕
                </button>
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}
