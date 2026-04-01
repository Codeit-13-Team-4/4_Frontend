"use client";
import { useState } from "react";
import { POSITION_LABELS, PositionType } from "../../model";
import { Dropdown } from "@/shared/ui";
import Image from "next/image";

export function ProjectCreatePositionDropdown({
  items,
  setItems,
}: {
  items: PositionType[];
  setItems: (items: PositionType[]) => void;
}) {
  const [open, setOpen] = useState(false);
  const handleSelect = (value: PositionType) => {
    if (items.includes(value)) {
      setItems(items.filter((v) => v !== value));
    } else {
      setItems([...items, value]);
    }
  };
  return (
    <Dropdown open={open} onOpenChange={setOpen}>
      <Dropdown.Trigger>
        <button className="group flex w-full items-center justify-between gap-1 rounded-lg bg-gray-900 px-4 py-2.5 text-gray-50">
          포지션
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
      <Dropdown.Content
        sideOffset={0}
        className="z-99 w-(--radix-dropdown-menu-trigger-width) border border-gray-700 bg-gray-900"
      >
        {Object.entries(POSITION_LABELS).map(([value, label]) => {
          return (
            <Dropdown.Item
              className="px-3 py-1.5 text-sm text-[#E2EBF0] hover:bg-gray-700"
              key={value}
              onSelect={() => handleSelect(value as PositionType)}
            >
              {label}
            </Dropdown.Item>
          );
        })}
      </Dropdown.Content>
    </Dropdown>
  );
}
