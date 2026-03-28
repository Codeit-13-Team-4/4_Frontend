import { Dropdown } from "@/shared/ui";
import Image from "next/image";
import { useState } from "react";
import { POSITION_LABELS, PositionType } from "../../model/project";

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
