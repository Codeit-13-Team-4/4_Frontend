import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AlertModal } from "./AlertModal";

const meta: Meta = {
  title: "shared/ui/AlertModal",
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen p-10">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj;

function DefaultExample() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <AlertModal>
        <AlertModal.Trigger className="rounded-xl bg-black px-4 py-2 text-sm font-semibold text-white hover:cursor-pointer">
          모달 열기
        </AlertModal.Trigger>
        <AlertModal.Content>
          <AlertModal.Header>
            <AlertModal.Title>정말 삭제하시겠습니까?</AlertModal.Title>
            <AlertModal.Description>
              이 작업은 되돌릴 수 없습니다.
            </AlertModal.Description>
          </AlertModal.Header>
          <AlertModal.Footer>
            <AlertModal.Cancel>취소</AlertModal.Cancel>
            <AlertModal.Action>삭제</AlertModal.Action>
          </AlertModal.Footer>
        </AlertModal.Content>
      </AlertModal>
    </div>
  );
}

export const Default: Story = {
  render: () => <DefaultExample />,
};
