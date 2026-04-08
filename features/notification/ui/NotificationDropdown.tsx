"use client";

import { Dropdown, ScrollArea } from "@/shared/ui";
import { cn } from "@/shared/utils";
import { useInView } from "react-intersection-observer";
import { useNotifications } from "@/features/notification/hooks/useNotifications";
import { useReadAllNotification } from "@/features/notification/hooks/useReadAllNotification";
import { Bell, BellActive } from "@/shared/icons";

export default function NotificationDropdown() {
  const { data, refetch, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useNotifications();

  const { mutate: readAll } = useReadAllNotification();

  const notifications = data?.pages.flatMap((page) => page.data) ?? [];
  const hasUnread = notifications.some((n) => !n.isRead);

  const { ref: sentinelRef } = useInView({
    threshold: 0.1,
    onChange: (inView) => {
      if (inView && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
  });

  const handleOnOpenChange = (open: boolean) => {
    if (open) refetch();
  };

  return (
    <Dropdown onOpenChange={handleOnOpenChange}>
      <Dropdown.Trigger asChild>
        <button aria-label="알림">
          {hasUnread ? (
            <Bell width={24} height={24} className="text-gray-400" />
          ) : (
            <BellActive width={24} height={24} className="text-gray-400" />
          )}
        </button>
      </Dropdown.Trigger>
      <Dropdown.Content
        className="w-80 overflow-hidden rounded-3xl border-gray-700 bg-gray-900 p-0 shadow"
        sideOffset={12}
        align="end"
      >
        <div className="flex items-center justify-end px-6 py-7">
          <button
            className="text-xs font-semibold text-slate-400 transition-colors hover:cursor-pointer hover:text-gray-200"
            onClick={() => readAll()}
          >
            모두 읽기
          </button>
        </div>

        {notifications.length === 0 ? (
          <div className="flex min-h-30 items-center justify-center pt-7.5 pb-14 text-sm font-medium text-slate-500">
            아직 알림이 없어요
          </div>
        ) : (
          <ScrollArea className="h-87.5 min-h-51">
            <ul className="divide-y divide-gray-700">
              {notifications.map((notification) => (
                <li
                  key={notification.id}
                  className={cn(
                    "flex gap-4 pt-3 pr-7 pb-4 pl-5",
                    !notification.isRead && "bg-gray-800",
                  )}
                >
                  <div className="flex size-8 h-6 w-6 shrink-0 items-center justify-center rounded-full border border-gray-700 bg-gray-800">
                    <Bell width={13} height={13} />
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
      </Dropdown.Content>
    </Dropdown>
  );
}
