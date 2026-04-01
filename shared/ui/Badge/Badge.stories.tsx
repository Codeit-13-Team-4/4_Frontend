import type { Meta, StoryObj } from "@storybook/react-vite";

import { Badge } from "./Badge";
import { Lock, Zap } from "lucide-react";
import { StatusBadge } from "../StatusBadge/StatusBadge";
import { DeadlineBadge } from "../DeadlineBadge/DeadlineBadge";

const meta = {
  title: "shared/ui/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
  args: {},
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;
const endDate = "2026-10-30";
const endDateToday = new Date().toISOString().split("T")[0];

export const AllVariants: Story = {
  render: () => {
    return (
      <div className="flex gap-2">
        <Badge>Default</Badge>
        <StatusBadge status="recruiting" />
        <StatusBadge status="recruitment_closed" />
        <Badge variant="auto">
          <Lock />
          즉시 참여 가능
        </Badge>
        <Badge variant="approve">
          <Zap />
          승인 후 참여 가능
        </Badge>

        <DeadlineBadge endDate={endDate} />
        <DeadlineBadge endDate={endDateToday} />
      </div>
    );
  },
};
