"use client";

import { useState, useRef, useEffect } from "react";
import { POSITION_LABELS } from "@/features/projectsDetail/model/projects.constants";
import type { PositionType } from "@/features/projectsDetail/types/projectsDetail";

const POSITION_ENTRIES = Object.entries(POSITION_LABELS) as [
  PositionType,
  string,
][];

interface PositionSelectProps {
  value: PositionType[];
  onChange: (value: PositionType[]) => void;
}

export function PositionSelect({ value, onChange }: PositionSelectProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSelect = (key: PositionType) => {
    if (!value.includes(key)) {
      onChange([...value, key]);
    }
  };

  const handleRemove = (key: PositionType) => {
    onChange(value.filter((v) => v !== key));
  };

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
      <div ref={containerRef} className="relative">
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="border-border-default flex h-12 w-full cursor-pointer items-center justify-between rounded-lg border bg-gray-900 px-3 transition-colors"
        >
          <span className="text-base text-gray-400">모집 포지션</span>
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
            className="text-gray-400 transition-transform duration-200"
            style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>

        {open && (
          <ul className="absolute top-full left-0 z-10 mt-1 max-h-48 w-full overflow-y-auto rounded-xl border border-gray-700 bg-gray-900 p-1 shadow-lg">
            {POSITION_ENTRIES.map(([key, label]) => (
              <li key={key}>
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    handleSelect(key);
                    setOpen(false);
                  }}
                  className={`w-full rounded-lg bg-gray-900 px-3 py-2.5 text-left text-base hover:bg-gray-700 ${
                    value.includes(key) ? "text-mint-500" : "text-gray-50"
                  }`}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 선택된 태그 */}
      {value.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {value.map((key) => {
            const label = POSITION_LABELS[key];
            return (
              <span
                key={key}
                className="border-mint-500 text-mint-500 flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium"
              >
                {label}
                <button
                  type="button"
                  onClick={() => handleRemove(key)}
                  className="hover:text-mint-300 cursor-pointer"
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
