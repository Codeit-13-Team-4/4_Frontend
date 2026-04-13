"use client";
import { Dropdown } from "@/shared/ui";
import { useState } from "react";
import { CONTACT_METHOD, ContactMethod } from "@/features/projects/model";
import { ChevronDownIcon, ChevronUpIcon } from "@/shared/icons";

export function ProjectContactLinkDropdown({
  value,
  setValue,
}: {
  value: ContactMethod | undefined;
  setValue: (value: ContactMethod) => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <Dropdown open={open} onOpenChange={setOpen}>
      <Dropdown.Trigger>
        <button className="group border-border-default flex items-center justify-between gap-1 rounded-lg border px-4 py-2.5 text-gray-50">
          {value ? CONTACT_METHOD[value] : "연락 방법"}
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
          value={value}
          onValueChange={(value) => setValue(value as ContactMethod)}
          className="flex flex-col gap-1"
        >
          {Object.entries(CONTACT_METHOD).map(([key, value]) => {
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
