import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";

import { LikeButton } from "./LikeButton";

const meta: Meta<typeof LikeButton> = {
  title: "shared/ui/LikeButton",
  component: LikeButton,
  decorators: [
    (Story) => (
      <div className="flex min-h-screen items-center justify-center bg-gray-900">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [liked, setLiked] = useState(false);
    return (
      <LikeButton liked={liked} onToggle={() => setLiked((prev) => !prev)} />
    );
  },
};

export const Liked: Story = {
  render: () => {
    const [liked, setLiked] = useState(true);
    return (
      <LikeButton liked={liked} onToggle={() => setLiked((prev) => !prev)} />
    );
  },
};
