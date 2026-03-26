import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Input } from "./Input";

const meta: Meta<typeof Input> = {
  title: "shared/ui/Input",
  component: Input,
  args: {
    size: "lg",
  },
  argTypes: {
    size: {
      control: "radio",
      options: ["lg", "sm"],
    },
  },
  decorators: [
    (Story) => (
      <div className="flex min-h-screen items-center justify-center">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Large: Story = {
  args: {
    size: "lg",
    placeholder: "lg 사이즈 입력창입니다",
    className: "w-[456px]",
  },
};

export const Small: Story = {
  args: {
    size: "sm",
    placeholder: "sm 사이즈 입력창입니다",
    className: "w-[311px]",
  },
};
