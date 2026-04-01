"use client";

import { useEffect } from "react";
import Image from "next/image";
import { cn } from "@/shared/utils";
import { ScrollArea, SidebarOverlay } from "@/shared/ui";
import { useInView } from "react-intersection-observer";
import { useNotifications } from "@/features/notification/hooks/useNotifications";
import { useReadAllNotification } from "@/features/notification/hooks/useReadAllNotification";

interface NotificationSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NotificationSidebar({
  isOpen,
  onClose,
}: NotificationSidebarProps) {
  const { data, refetch, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useNotifications();

  const { mutate: readAll } = useReadAllNotification();

  const notifications = data?.pages.flatMap((page) => page.data) ?? [];

  const { ref: sentinelRef } = useInView({
    threshold: 0.1,
    onChange: (inView) => {
      if (inView && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
  });

  useEffect(() => {
    if (isOpen) refetch();
  }, [isOpen, refetch]);

  return (
    <>
      <SidebarOverlay isOpen={isOpen} onClose={onClose} />

      <div
        className={cn(
          "fixed top-0 right-0 z-50 flex h-full w-64 flex-col overflow-hidden rounded-tl-4xl rounded-bl-4xl bg-gray-900 transition-transform duration-300 md:hidden",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b border-gray-700 px-4 py-4">
          <button
            onClick={onClose}
            aria-label="알림 닫기"
            className="cursor-pointer"
          >
            <Image
              src="/common/icons/close-md.svg"
              alt="닫기"
              width={20}
              height={20}
            />
          </button>
          <button
            className="text-base font-semibold text-slate-400 transition-colors hover:cursor-pointer hover:text-gray-200"
            onClick={() => readAll()}
          >
            모두 읽기
          </button>
        </div>

        {notifications.length === 0 ? (
          <div className="flex flex-1 items-center justify-center text-sm font-medium text-slate-500">
            아직 알림이 없어요
          </div>
        ) : (
          <ScrollArea className="min-h-0 flex-1">
            <ul className="divide-y divide-gray-700">
              {notifications.map((notification) => (
                <li
                  key={notification.id}
                  className={cn(
                    "flex gap-4 pt-3 pr-7 pb-4 pl-5",
                    !notification.isRead && "bg-gray-800",
                  )}
                >
                  <div className="border-color-default flex size-6 shrink-0 items-center justify-center rounded-full border bg-gray-800">
                    <Image
                      src="/header/large-bell.svg"
                      alt="알림 아이콘"
                      width={13}
                      height={13}
                    />
                  </div>
                  <div className="flex w-full min-w-0 flex-col gap-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="truncate text-xs font-semibold text-gray-600">
                        {notification.title}
                      </span>
                      <span className="flex shrink-0 items-center gap-1.5 text-xs text-gray-400">
                        {!notification.isRead && (
                          <span className="bg-mint-500 size-1 rounded-full" />
                        )}
                        {notification.displayTime}
                      </span>
                    </div>
                    <p className="line-clamp-2 text-sm leading-relaxed text-gray-400">
                      {notification.content}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <div ref={sentinelRef} className="h-2" />
          </ScrollArea>
        )}
      </div>
    </>
  );
}
