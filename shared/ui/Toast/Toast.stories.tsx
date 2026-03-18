import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ToastContainer } from "./Toast";
import { toast } from "@/shared/utils";

const meta = {
  title: "shared/ui/Toast",
  component: ToastContainer,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof ToastContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <>
      <ToastContainer />
      <button
        onClick={() => toast("Default Toast Message")}
        className="rounded-lg border border-gray-400 px-2 py-1"
      >
        기본 토스트
      </button>
    </>
  ),
};

export const Success: Story = {
  render: () => (
    <>
      <ToastContainer />
      <button
        onClick={() => toast("Success Toast Message", { variant: "success" })}
        className="rounded-lg border border-gray-400 px-2 py-1"
      >
        성공 토스트
      </button>
    </>
  ),
};
export const Error: Story = {
  render: () => (
    <>
      <ToastContainer />
      <button
        onClick={() => toast("Error Toast Message", { variant: "error" })}
        className="rounded-lg border border-gray-400 px-2 py-1"
      >
        에러 토스트
      </button>
    </>
  ),
};

export const Icon: Story = {
  render: () => (
    <>
      <ToastContainer />
      <button
        onClick={() =>
          toast("Error Toast Message", {
            icon: <span>⚠️</span>,
          })
        }
        className="rounded-lg border border-gray-400 px-2 py-1"
      >
        아이콘 토스트
      </button>
    </>
  ),
};
