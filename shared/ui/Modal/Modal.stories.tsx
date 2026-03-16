import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import Modal from "./Modal";
import useModal from "../../hooks/useModal";

const meta: Meta<typeof Modal> = {
  title: "shared/ui/Modal",
  component: Modal,
  decorators: [
    (Story) => (
      <div className="min-h-screen">
        <Story />
      </div>
    ),
  ],
  args: {
    isOpen: true,
    onClose: () => {},
    closeOnOverlayClick: true,
    closeOnEsc: true,
    showCloseButton: true,
  },
};

export default meta;

type Story = StoryObj<typeof Modal>;

function DefaultModalExample() {
  const isOpen = useModal((state) => state.isOpen);
  const open = useModal((state) => state.open);
  const close = useModal((state) => state.close);

  const handleConfirmClick = () => {
    close();
  };

  return (
    <>
      <button
        type="button"
        onClick={open}
        className="rounded-md bg-zinc-900 px-4 py-2 text-white dark:bg-zinc-100 dark:text-zinc-900"
      >
        Open
      </button>

      <Modal isOpen={isOpen} onClose={close}>
        <Modal.Header>
          <Modal.Title>Title</Modal.Title>
        </Modal.Header>

        <Modal.Body>Body</Modal.Body>

        <Modal.Footer>
          <button
            type="button"
            onClick={close}
            className="rounded-lg border border-zinc-300 px-4 py-2 text-zinc-900 dark:border-zinc-700 dark:text-zinc-100"
          >
            취소
          </button>
          <button
            type="button"
            onClick={handleConfirmClick}
            className="rounded-lg bg-zinc-900 px-4 py-2 text-white dark:bg-zinc-100 dark:text-zinc-900"
          >
            확인
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export const Default: Story = {
  render: () => <DefaultModalExample />,
};
