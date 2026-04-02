"use client";
import { Dropdown } from "@/shared/ui";
import { useState } from "react";
import Image from "next/image";
import {
  ChallengesSortType,
  CHALLENGES_SORT_LABEL,
} from "@/features/challenges/model";
import { useRouter, useSearchParams } from "next/navigation";

export function ChallengesSortDropdown() {
  const [open, setOpen] = useState(false);
  const [sort, setSort] = useState<ChallengesSortType>("latest");

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
          {CHALLENGES_SORT_LABEL[sort]}
          <Image
            src="/icons/common/chevron_down_sm-icon.svg"
            width={17}
            height={17}
            alt=""
            aria-hidden="true"
            className="group-data-open:hidden"
          />
          <Image
            src="/icons/common/chevron_up_sm-icon.svg"
            width={17}
            height={17}
            alt=""
            aria-hidden="true"
            className="hidden group-data-open:block"
          />
        </button>
      </Dropdown.Trigger>
      <Dropdown.Content className="border border-gray-700 bg-gray-900">
        <Dropdown.RadioGroup
          value={sort}
          onValueChange={(value) => {
            setSort(value as ChallengesSortType);
            handleChange(value);
          }}
          className="flex flex-col gap-1 text-center"
        >
          <Dropdown.RadioItem
            value="latest"
            className="text-sm text-[#E2EBF0] hover:bg-[#494c53]"
          >
            최신순
          </Dropdown.RadioItem>
          <Dropdown.Separator />
          <Dropdown.RadioItem
            value="popular"
            className="text-sm text-[#E2EBF0] hover:bg-[#494c53]"
          >
            인기순
          </Dropdown.RadioItem>
          <Dropdown.Separator />
          <Dropdown.RadioItem
            value="deadline"
            className="text-sm text-[#E2EBF0] hover:bg-[#494c53]"
          >
            마감 임박순
          </Dropdown.RadioItem>
          <Dropdown.Separator />
          <Dropdown.RadioItem
            value="oldest"
            className="text-sm text-[#E2EBF0] hover:bg-[#494c53]"
          >
            오래된 순
          </Dropdown.RadioItem>
        </Dropdown.RadioGroup>
      </Dropdown.Content>
    </Dropdown>
  );
}
