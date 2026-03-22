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
    size: "default",
    type: "button",
  },
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "primary",
        "secondary",
        "approve",
        "reject",
        "outline",
      ],
    },
    size: {
      control: "select",
      options: ["default", "xs", "sm", "lg"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Login: Story = {
  args: {
    children: "로그인",
    type: "submit",
    variant: "default",
    size: "default",
  },
};

export const Disabled: Story = {
  args: {
    children: "로그인",
    type: "submit",
    disabled: true,
    variant: "secondary",
    size: "default",
  },
};

export const CheckBtn: Story = {
  args: {
    children: "중복확인",
    variant: "primary",
    size: "sm",
  },
};

export const GithubBtn: Story = {
  args: {
    children: (
      <div className="flex items-center gap-3">
        <span>로고</span>
        <span>Github로 계속하기</span>
      </div>
    ),
    variant: "outline",
    size: "default",
  },
};
