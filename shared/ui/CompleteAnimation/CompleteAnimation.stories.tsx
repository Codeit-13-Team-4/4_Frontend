import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CompleteAnimation } from "./CompleteAnimation";

const meta = {
  title: "shared/ui/CompleteAnimation",
  component: CompleteAnimation,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof CompleteAnimation>;
export default meta;
type Story = StoryObj<typeof meta>;

export const CompleteAnimationExample: Story = {
  render: () => {
    return <CompleteAnimation />;
  },
};
