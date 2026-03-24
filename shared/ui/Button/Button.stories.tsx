import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "shared/ui/Button",
  component: Button,
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
      options: ["default", "primary", "dark", "destructive", "disabled"],
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
    children: "로그인",
    type: "submit",
    variant: "default",
    size: "md",
  },
};

export const Primary: Story = {
  args: {
    children: "확인",
    variant: "primary",
    size: "md",
  },
};

export const Dark: Story = {
  args: {
    children: "취소",
    variant: "dark",
    size: "md",
  },
};

export const Destructive: Story = {
  args: {
    children: "삭제",
    variant: "destructive",
    size: "md",
  },
};

export const Disabled: Story = {
  args: {
    children: "로그인",
    type: "submit",
    disabled: true,
    variant: "disabled",
    size: "md",
  },
};
