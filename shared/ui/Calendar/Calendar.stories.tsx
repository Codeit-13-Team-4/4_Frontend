import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { type DateRange } from "react-day-picker";

import { Calendar } from "./Calendar";

const meta: Meta<typeof Calendar> = {
  title: "shared/ui/Calendar",
  component: Calendar,
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <div className="flex min-h-screen items-center justify-center bg-gray-900">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Calendar>;

export const Single: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>();
    return <Calendar mode="single" selected={date} onSelect={setDate} />;
  },
};

export const Range: Story = {
  render: () => {
    const [range, setRange] = useState<DateRange | undefined>();
    return <Calendar mode="range" selected={range} onSelect={setRange} />;
  },
};
