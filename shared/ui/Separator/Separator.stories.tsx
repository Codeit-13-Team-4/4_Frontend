import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Separator } from "./Separator";

const meta: Meta<typeof Separator> = {
  title: "shared/ui/Separator",
  component: Separator,
  decorators: [
    (Story) => (
      <div className="flex min-h-screen items-center justify-center bg-white text-black">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Separator>;

export const Horizontal: Story = {
  args: {
    orientation: "horizontal",
    className: "w-64",
  },
};

export const Vertical: Story = {
  args: {
    orientation: "vertical",
    className: "h-6",
  },
};

export const BetweenText: Story = {
  render: () => (
    <div className="flex w-64 flex-col gap-4">
      <p className="text-sm">상단 섹션</p>
      <Separator />
      <p className="text-sm">하단 섹션</p>
    </div>
  ),
};

export const InlineWithVertical: Story = {
  render: () => (
    <div className="flex items-center gap-3 text-sm">
      <span>홈</span>
      <Separator orientation="vertical" className="h-4" />
      <span>소개</span>
      <Separator orientation="vertical" className="h-4" />
      <span>문의</span>
    </div>
  ),
};
