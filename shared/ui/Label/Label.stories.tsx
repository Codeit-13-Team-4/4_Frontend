import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";

import { Label } from "./Label";

const meta = {
  title: "shared/ui/Label",
  component: Label,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    label: { control: "text" },
    type: { control: "text" },
    placeholder: { control: "text" },
    errorMessage: { control: "text" },
    onChange: { control: false },
  },
} satisfies Meta<typeof Label>;

export default meta;

type Story = StoryObj<typeof meta>;

function Template(args: React.ComponentProps<typeof Label>) {
  const [value, setValue] = useState("");

  return (
    <div className="w-[360px]">
      <Label
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}

export const Default: Story = {
  args: {
    label: "이메일",
    id: "email",
    type: "email",
    placeholder: "이메일을 입력해주세요.",
  },
  render: (args) => <Template {...args} />,
};

export const WithError: Story = {
  args: {
    label: "비밀번호",
    id: "password",
    type: "password",
    placeholder: "비밀번호를 입력해주세요.",
    errorMessage: "비밀번호는 8자 이상이어야 합니다.",
  },
  render: (args) => <Template {...args} />,
};
