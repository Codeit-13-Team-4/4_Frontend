import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { type DateRange } from "react-day-picker";

import { DatePicker } from "./DatePicker";

const meta: Meta = {
  title: "shared/ui/DatePicker",
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <div className="flex min-h-screen items-center justify-center bg-gray-900 p-6">
        <div className="w-80">
          <Story />
        </div>
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Single: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>();
    return <DatePicker mode="single" value={date} onChange={setDate} />;
  },
};

export const Range: Story = {
  render: () => {
    const [range, setRange] = useState<DateRange | undefined>();
    return <DatePicker mode="range" value={range} onChange={setRange} />;
  },
};
