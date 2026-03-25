import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { TextArea } from "./TextArea";

const meta: Meta<typeof TextArea> = {
  title: "shared/ui/TextArea",
  component: TextArea,
  decorators: [
    (Story) => (
      <div className="flex min-h-screen items-center justify-center bg-white text-black">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "내용을 입력해주세요",
    maxLength: 200,
  },
};

export const Small: Story = {
  args: {
    size: "sm",
    placeholder: "내용을 입력해주세요",
    maxLength: 200,
  },
};

export const Disabled: Story = {
  args: {
    placeholder: "비활성화된 입력창입니다",
    maxLength: 200,
    disabled: true,
  },
};
