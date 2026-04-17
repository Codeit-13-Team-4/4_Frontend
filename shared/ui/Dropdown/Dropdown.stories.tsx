import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { Dropdown } from "@/shared/ui";
import { ChevronDownIcon, ChevronUpIcon } from "@/shared/icons";

const meta = {
  title: "shared/ui/Dropdown",
  component: Dropdown,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Dropdown>;

export default meta;

type Story = StoryObj<typeof meta>;

const SORT_LABEL = {
  latest: "최신순",
  popular: "인기순",
  closingSoon: "마감 임박순",
  oldest: "오래된 순",
} as const;

type SortType = keyof typeof SORT_LABEL;

export const DropdownExample: Story = {
  render: () => {
    const [sort, setSort] = useState<SortType>("latest");
    return (
      <Dropdown>
        <Dropdown.Trigger>
          <button className="group flex items-center gap-1 text-[#94A3B8]">
            {SORT_LABEL[sort]}
            <ChevronDownIcon className="group-data-open:hidden" />
            <ChevronUpIcon className="hidden group-data-open:block" />
          </button>
        </Dropdown.Trigger>
        <Dropdown.Content className="bg-900 border border-gray-700">
          <Dropdown.RadioGroup
            value={sort}
            onValueChange={(value) => setSort(value as SortType)}
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
              value="closingSoon"
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
  },
};
