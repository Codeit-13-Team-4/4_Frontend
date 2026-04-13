"use client";
import { Dropdown } from "@/shared/ui";
import { useState } from "react";
import { ProjectSortType, SORT_LABEL } from "@/features/projects/model";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronDownIcon, ChevronUpIcon } from "@/shared/icons";

export function ProjectSortDropdown() {
  const [open, setOpen] = useState(false);
  const [sort, setSort] = useState<ProjectSortType>("createdAt");

  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "createdAt") {
      if (value === "recruitEndDate") {
        params.set("status", "recruiting");
        params.set("order", "ASC");
      }
      params.set("sort", value);
    } else {
      params.delete("sort");
    }
    router.push(`?${params.toString()}`);
  };
  return (
    <Dropdown open={open} onOpenChange={setOpen}>
      <Dropdown.Trigger>
        <button className="group flex items-center gap-1 text-[#94A3B8]">
          {SORT_LABEL[sort]}
          <ChevronDownIcon
            width={17}
            height={17}
            className="group-data-open:hidden"
          />
          <ChevronUpIcon
            width={17}
            height={17}
            className="hidden group-data-open:block"
          />
        </button>
      </Dropdown.Trigger>
      <Dropdown.Content className="border border-gray-700 bg-gray-900">
        <Dropdown.RadioGroup
          value={sort}
          onValueChange={(value) => {
            setSort(value as ProjectSortType);
            handleChange(value);
          }}
          className="flex flex-col gap-1 text-center"
        >
          <Dropdown.RadioItem
            value="createdAt"
            className="text-sm text-[#E2EBF0] hover:bg-[#494c53]"
          >
            최신순
          </Dropdown.RadioItem>
          <Dropdown.Separator />
          <Dropdown.RadioItem
            value="viewCount"
            className="text-sm text-[#E2EBF0] hover:bg-[#494c53]"
          >
            조회수 순
          </Dropdown.RadioItem>
          <Dropdown.Separator />
          <Dropdown.RadioItem
            value="recruitEndDate"
            className="text-sm text-[#E2EBF0] hover:bg-[#494c53]"
          >
            마감 임박순
          </Dropdown.RadioItem>
        </Dropdown.RadioGroup>
      </Dropdown.Content>
    </Dropdown>
  );
}
