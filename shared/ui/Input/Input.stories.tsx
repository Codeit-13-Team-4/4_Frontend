import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Input } from "./Input";

const meta: Meta<typeof Input> = {
  title: "shared/ui/Input",
  component: Input,
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

export const Email: Story = {
  args: {
    type: "email",
    placeholder: "이메일을 입력해주세요",
  },
};

export const Password: Story = {
  args: {
    type: "password",
    placeholder: "비밀번호를 입력해주세요",
  },
};
export const Nickname: Story = {
  args: {
    type: "text",
    placeholder: "닉네임을 입력해주세요",
    className: "w-[350px]",
  },
};
export const Disabled: Story = {
  args: {
    type: "text",
    placeholder: "비활성화된 입력창입니다",
    disabled: true,
  },
}; // ex) 로딩 중, 서버 처리 중일 때 사용
