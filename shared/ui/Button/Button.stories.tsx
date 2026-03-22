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
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Login: Story = {
  args: {
    children: "로그인",
    type: "submit",
    className: "bg-slate-500 ",
  },
};

export const Disabled: Story = {
  args: {
    children: "로그인",
    type: "submit",
    disabled: true,
    className: "bg-slate-100 text-slate-600 ",
  },
};

export const CheckBtn: Story = {
  args: {
    children: "중복확인",
    className: "h-12 w-20 bg-slate-500 px-2 font-medium",
  },
};
export const GithubBtn: Story = {
  args: {
    children: (
      <div className="flex gap-[12px]">
        <span>로고</span>
        <span>Github로 계속하기</span>
      </div>
    ),
    className: "border border-slate-200 text-black",
  },
};
