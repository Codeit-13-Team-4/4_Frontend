import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Popover, PopoverContent, PopoverTrigger } from "./Popover";

const meta: Meta = {
  title: "shared/ui/Popover",
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <div className="flex min-h-screen items-center justify-center bg-gray-900">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <button className="rounded-xl border border-gray-600 bg-gray-800 px-4 py-2 text-sm text-gray-200">
          팝오버 열기
        </button>
      </PopoverTrigger>
      <PopoverContent className="rounded-xl bg-gray-800 p-4 text-sm text-gray-200 shadow-lg">
        팝오버 내용입니다.
      </PopoverContent>
    </Popover>
  ),
};
