import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { GradientButton } from "./GradientButton";

const meta: Meta<typeof GradientButton> = {
  title: "shared/ui/GradientButton",
  component: GradientButton,
  decorators: [
    (Story) => (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <Story />
      </div>
    ),
  ],
  args: {
    children: "버튼",
    variant: "default",
    size: "md",
    type: "button",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "dark"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "시작하기",
    variant: "default",
    size: "md",
  },
};

export const Dark: Story = {
  args: {
    children: "시작하기",
    variant: "dark",
    size: "md",
  },
};

export const Small: Story = {
  args: {
    children: "시작하기",
    variant: "default",
    size: "sm",
  },
};

export const Large: Story = {
  args: {
    children: "시작하기",
    variant: "default",
    size: "lg",
  },
};

export const Disabled: Story = {
  args: {
    children: "시작하기",
    variant: "default",
    size: "md",
    disabled: true,
  },
};
