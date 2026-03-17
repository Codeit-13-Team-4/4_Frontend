"use client";

import * as Dialog from "@radix-ui/react-dialog";
import type { PropsWithChildren, ReactNode } from "react";

interface ModalProps extends PropsWithChildren {
  isOpen: boolean;
  onClose: () => void;
  showCloseButton?: boolean;
  className?: string;
  title?: ReactNode;
  description?: ReactNode;
}

export default function Modal({
  isOpen,
  onClose,
  children,
  showCloseButton = true,
  className,
  title,
  description,
}: ModalProps) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50" />

        <Dialog.Content
          className={`fixed top-1/2 left-1/2 z-50 w-[calc(100%-32px)] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white p-8 shadow-xl outline-none dark:bg-black ${className ?? ""}`}
        >
          {showCloseButton ? (
            <Dialog.Close asChild>
              <button
                type="button"
                aria-label="모달 닫기"
                className="absolute top-5 right-5 text-2xl text-gray-400 transition hover:text-gray-600 dark:hover:text-gray-200"
              >
                ×
              </button>
            </Dialog.Close>
          ) : null}

          {title ? (
            <Dialog.Title className="text-2xl font-semibold text-black dark:text-white">
              {title}
            </Dialog.Title>
          ) : null}

          {description ? (
            <Dialog.Description className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              {description}
            </Dialog.Description>
          ) : null}

          <div className={title || description ? "mt-6" : ""}>{children}</div>
          {/* 필요시 버튼, 인풋 등 컴포넌트 불러올 예정 */}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
