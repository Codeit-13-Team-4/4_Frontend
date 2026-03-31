"use client";

import { useState } from "react";
import { cn } from "@/shared/utils";
import Link from "next/link";
import Image from "next/image";
import NotificationDropdown from "@/features/notification/ui/NotificationDropdown";
import NotificationSidebar from "@/features/notification/ui/NotificationSidebar";
import { useNotifications } from "@/features/notification/hooks/useNotifications";
import UserProfileMenu from "./UserProfileMenu";
import Sidebar from "./Sidebar";
import { useUserData } from "@/features/auth/hooks/queries/useUserData";

export default function UserArea() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const { data: userData } = useUserData();
  const { data: notificationsData } = useNotifications();
  const notifications =
    notificationsData?.pages.flatMap((page) => page.data) ?? [];
  const hasUnread = notifications.some((n) => !n.isRead);

  return (
    <>
      {/* 데스크탑 */}
      <div className={cn("hidden font-medium md:flex")}>
        {userData ? (
          <div className="flex items-center gap-6">
            <NotificationDropdown />
            <UserProfileMenu userData={userData} />
          </div>
        ) : (
          <Link
            href="/login"
            className="px-7.25 py-4 transition-colors duration-100 hover:text-gray-50"
          >
            로그인
          </Link>
        )}
      </div>

      {/* 모바일 */}
      <div className="flex items-center gap-6 md:hidden">
        {userData && (
          <button
            aria-label="알림"
            className="hover:cursor-pointer"
            onClick={() => setIsNotificationOpen(true)}
          >
            <Image
              src={
                hasUnread
                  ? "/header/large-bell-active.svg"
                  : "/header/large-bell.svg"
              }
              alt="알림"
              width={24}
              height={24}
            />
          </button>
        )}
        <button
          aria-label="메뉴 열기"
          className="hover:cursor-pointer"
          onClick={() => setIsSidebarOpen(true)}
        >
          <Image src="/header/menu.svg" alt="메뉴" width={32} height={32} />
        </button>
      </div>

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        userData={userData}
      />
      <NotificationSidebar
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
      />
    </>
  );
}
