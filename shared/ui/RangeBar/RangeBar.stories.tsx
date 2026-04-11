import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";

import { RangeBar } from "./RangeBar";

const meta: Meta<typeof RangeBar> = {
  title: "shared/ui/RangeBar",
  component: RangeBar,
  decorators: [
    (Story) => (
      <div className="flex min-h-screen items-center justify-center bg-gray-900">
        <div className="w-80">
          <Story />
        </div>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState(0);
    return <RangeBar min={0} max={30} value={value} onChange={setValue} />;
  },
};

export const WithMinimum: Story = {
  render: () => {
    const [value, setValue] = useState(3);
    return <RangeBar min={3} max={30} value={value} onChange={setValue} />;
  },
};

export const HalfFilled: Story = {
  render: () => {
    const [value, setValue] = useState(15);
    return <RangeBar min={0} max={30} value={value} onChange={setValue} />;
  },
};

export const Full: Story = {
  render: () => {
    const [value, setValue] = useState(30);
    return <RangeBar min={0} max={30} value={value} onChange={setValue} />;
  },
};
