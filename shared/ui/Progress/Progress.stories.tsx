import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Progress } from "./Progress";

const meta: Meta<typeof Progress> = {
  title: "shared/ui/Progress",
  component: Progress,
  decorators: [
    (Story) => (
      <div className="flex min-h-screen items-center justify-center bg-white text-black">
        <div className="w-80">
          <Story />
        </div>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Progress>;

export const Default: Story = {
  args: {
    value: 50,
  },
};
