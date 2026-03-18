import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ToastContainer } from "./Toast";
import { toast } from "@/shared/utils";

interface ToastStoryArgs {
  variant: "default" | "success" | "error";
  icon: string;
}

const meta = {
  title: "shared/ui/Toast",
  component: ToastContainer,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "success", "error"],
    },
  },
} satisfies Meta<ToastStoryArgs>;

export default meta;
type Story = StoryObj<ToastStoryArgs>;

export const Toast: Story = {
  args: { variant: "default" },
  render: ({ variant }) => (
    <>
      <ToastContainer />
      <button
        onClick={() => toast("Toast Message", { variant })}
        className="rounded-lg border border-gray-400 px-2 py-1"
      >
        {variant} Toast
      </button>
    </>
  ),
};
