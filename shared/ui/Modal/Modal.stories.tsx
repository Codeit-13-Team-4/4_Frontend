import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { ComponentProps } from "react";
import { useState } from "react";

import Modal from "./Modal";

const meta: Meta<typeof Modal> = {
  title: "shared/ui/Modal",
  component: Modal,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-slate-100 p-10 dark:bg-zinc-950">
        <Story />
      </div>
    ),
  ],
  args: {
    isOpen: true,
    onClose: () => {},
    showCloseButton: true,
    title: "모달 제목",
    description: "모달 설명입니다.",
    className: "max-w-md",
  },
  argTypes: {
    title: {
      control: "text",
    },
    description: {
      control: "text",
    },
    className: {
      control: "text",
    },
    showCloseButton: {
      control: "boolean",
    },
    isOpen: {
      control: false,
    },
    onClose: {
      control: false,
    },
    children: {
      control: false,
    },
  },
};

export default meta;

type Story = StoryObj<typeof Modal>;

function DefaultModalExample(args: ComponentProps<typeof Modal>) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="rounded-xl bg-black px-4 py-2 text-sm font-semibold text-white transition dark:bg-white dark:text-black"
      >
        기본 모달 열기
      </button>

      <Modal
        {...args}
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          args.onClose?.();
        }}
      >
        <div className="space-y-6">
          <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-300">
            공용으로 사용하는 기본 모달 예시입니다. 필요에 따라 내용과 액션
            버튼을 자유롭게 조합해 사용할 수 있습니다.
          </p>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="h-11 rounded-xl border border-gray-300 px-4 text-sm font-medium text-black transition hover:bg-gray-50 dark:border-gray-700 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800"
            >
              취소
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="h-11 rounded-xl bg-black px-4 text-sm font-semibold text-white transition dark:bg-white dark:text-black"
            >
              확인
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

function DeleteFormModalExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="rounded-xl bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600"
      >
        탈퇴 폼 모달 열기
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        showCloseButton={true}
        title="정말 탈퇴하시겠습니까?"
        description="탈퇴 사유를 입력한 뒤 탈퇴를 진행할 수 있습니다."
        className="max-w-lg"
      >
        <form className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="withdraw-reason"
              className="text-sm font-medium text-black dark:text-white"
            >
              탈퇴 사유
            </label>
            <textarea
              id="withdraw-reason"
              placeholder="탈퇴 사유를 입력해주세요."
              className="min-h-36 w-full resize-none rounded-xl border border-gray-300 px-4 py-3 text-sm text-black transition outline-none placeholder:text-gray-400 focus:border-black dark:border-gray-700 dark:bg-zinc-900 dark:text-white dark:focus:border-white"
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="h-11 rounded-xl border border-gray-300 px-4 text-sm font-medium text-black transition hover:bg-gray-50 dark:border-gray-700 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800"
            >
              취소
            </button>
            <button
              type="submit"
              className="h-11 rounded-xl bg-red-500 px-4 text-sm font-semibold text-white transition hover:bg-red-600"
            >
              탈퇴하기
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export const Default: Story = {
  render: (args) => <DefaultModalExample {...args} />,
};

export const DeleteForm: Story = {
  parameters: {
    controls: {
      disable: true,
    },
  },
  render: () => <DeleteFormModalExample />,
};
