import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Label } from "./Label";

const meta: Meta<typeof Label> = {
  title: "shared/ui/Label",
  component: Label,
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

export const Default: Story = {
  args: {
    children: "닉네임",
  },
};

export const Required: Story = {
  args: {
    children: "닉네임",
    required: true,
  },
};
