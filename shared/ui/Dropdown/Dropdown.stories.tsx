import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { Dropdown, Separator } from "@/shared/ui";
import { ChevronDown, ChevronUp } from "lucide-react";

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
    const [open, setOpen] = useState<boolean>(false);
    return (
      <Dropdown open={open} onOpenChange={setOpen}>
        <Dropdown.Trigger>
          <button className="flex items-center gap-1 text-[#94A3B8]">
            {SORT_LABEL[sort]}
            <span>{open ? <ChevronUp /> : <ChevronDown />}</span>
          </button>
        </Dropdown.Trigger>
        <Dropdown.Content className="border border-[#334155] bg-[#0f172a]">
          <Dropdown.RadioGroup
            value={sort}
            onValueChange={(value) => setSort(value as SortType)}
            className="flex flex-col gap-1 text-center"
          >
            <Dropdown.RadioItem
              value="latest"
              className="w-full cursor-pointer rounded px-2 py-1 text-sm text-[#E2EBF0] hover:bg-[#383e49] data-[state=checked]:bg-[#1e293b] data-[state=checked]:text-[#e2e8f0]"
            >
              최신순
            </Dropdown.RadioItem>
            <Separator className="bg-[#334155]" />
            <Dropdown.RadioItem
              value="popular"
              className="w-full cursor-pointer rounded px-2 py-1 text-sm text-[#E2EBF0] hover:bg-[#383e49] data-[state=checked]:bg-[#1e293b] data-[state=checked]:text-[#e2e8f0]"
            >
              인기순
            </Dropdown.RadioItem>
            <Separator className="bg-[#334155]" />
            <Dropdown.RadioItem
              value="closingSoon"
              className="w-full cursor-pointer rounded px-2 py-1 text-sm text-[#E2EBF0] hover:bg-[#383e49] data-[state=checked]:bg-[#1e293b] data-[state=checked]:text-[#e2e8f0]"
            >
              마감 임박순
            </Dropdown.RadioItem>
            <Separator className="bg-[#334155]" />
            <Dropdown.RadioItem
              value="oldest"
              className="w-full cursor-pointer rounded px-2 py-1 text-sm text-[#E2EBF0] hover:bg-[#383e49] data-[state=checked]:bg-[#1e293b] data-[state=checked]:text-[#e2e8f0]"
            >
              오래된 순
            </Dropdown.RadioItem>
          </Dropdown.RadioGroup>
        </Dropdown.Content>
      </Dropdown>
    );
  },
};
