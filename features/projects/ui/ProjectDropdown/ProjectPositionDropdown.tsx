"use client";
import { POSITION_LABELS, PositionType } from "@/features/projects/model";
import { ChevronDownIcon, ChevronUpIcon } from "@/shared/icons";
import { Dropdown } from "@/shared/ui";
import { useState } from "react";

export function ProjectPositionDropdown({
  position,
  setPosition,
}: {
  position: PositionType | undefined;
  setPosition: React.Dispatch<React.SetStateAction<PositionType | undefined>>;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Dropdown open={open} onOpenChange={setOpen}>
      <Dropdown.Trigger>
        <button className="group flex items-center justify-between gap-1 rounded-lg bg-gray-900 px-4 py-2.5 text-gray-50">
          {position ? POSITION_LABELS[position] : "희망 포지션"}
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
      <Dropdown.Content className="z-99 w-(--radix-dropdown-menu-trigger-width) border border-gray-700 bg-gray-900">
        <Dropdown.RadioGroup
          value={position}
          onValueChange={(value) => setPosition(value as PositionType)}
          className="flex flex-col gap-1"
        >
          {Object.entries(POSITION_LABELS).map(([key, value]) => {
            return (
              <Dropdown.RadioItem
                key={key}
                value={key}
                className="px-3 py-1.5 text-sm text-[#E2EBF0] hover:bg-gray-700"
              >
                {value}
              </Dropdown.RadioItem>
            );
          })}
        </Dropdown.RadioGroup>
      </Dropdown.Content>
    </Dropdown>
  );
}
