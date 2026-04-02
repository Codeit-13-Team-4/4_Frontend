"use client";

import { PROJECT_TYPE_LABEL } from "@/features/projectsDetail/model/projects.constants";
import type { ProjectType } from "@/features/projectsDetail/types/projectsDetail";

const PROJECT_TYPE_ENTRIES = Object.entries(PROJECT_TYPE_LABEL) as [
  ProjectType,
  string,
][];

interface ProjectTypeRadioProps {
  value: ProjectType;
  onChange: (value: ProjectType) => void;
}

export function ProjectTypeRadio({ value, onChange }: ProjectTypeRadioProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {PROJECT_TYPE_ENTRIES.map(([key, label]) => (
        <button
          key={key}
          type="button"
          onClick={() => onChange(key)}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
            value === key
              ? "bg-mint-500 text-gray-50"
              : "cursor-pointer border border-gray-700 bg-gray-900 text-gray-400"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
