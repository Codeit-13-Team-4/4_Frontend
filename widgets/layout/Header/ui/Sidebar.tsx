"use client";

import { cn } from "@/shared/utils";
import { User } from "@/shared/types/user";
import { NAV_ITEMS } from "../constants/constants";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getIsActive } from "../utils/getIsActive";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  SidebarOverlay,
} from "@/shared/ui";
import { useLogout } from "@/features/auth/hooks/queries/useLogout";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  userData: User | undefined;
}

export default function Sidebar({ isOpen, onClose, userData }: SidebarProps) {
  const pathname = usePathname();

  const { mutate: logoutMutate } = useLogout({
    onSuccess: () => {
      onClose();
    },
  });

  const handleLogout = () => {
    logoutMutate();
  };

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
            aria-label="메뉴 닫기"
            className="cursor-pointer"
          >
            <Image
              src="/common/icons/close-md.svg"
              alt="닫기"
              width={20}
              height={20}
            />
          </button>
          {!userData && (
            <Link
              href="/login"
              onClick={onClose}
              className="text-base font-medium text-gray-400 transition-colors hover:text-gray-50"
            >
              로그인
            </Link>
          )}
        </div>

        {userData && (
          <>
            <div className="flex items-center gap-3 p-6 px-4">
              <Avatar className="size-10">
                <AvatarImage
                  src={userData.profileImageUrl ?? ""}
                  alt={`${userData.nickname} 프로필 이미지`}
                />
                <AvatarFallback delayMs={0}>
                  <Image
                    src="/common/avatar/default-avatar-md.svg"
                    alt="기본 아바타"
                    width={40}
                    height={40}
                  />
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <span className="block truncate text-sm font-medium text-gray-50">
                  {userData.nickname}
                </span>
                <span className="block truncate text-xs text-gray-400">
                  {userData.email}
                </span>
              </div>
            </div>
            <div className="border-t border-gray-700" />
          </>
        )}

        <nav className="flex-1 px-4 pt-4">
          <ul className="flex flex-col">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    "hover:text-mint-500 block py-4 font-semibold transition-colors duration-100",
                    getIsActive(pathname, item.href)
                      ? "text-mint-500"
                      : "text-gray-600",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {userData && (
          <div className="flex flex-col border-t border-gray-700 py-4">
            <Link
              href="/my"
              onClick={onClose}
              className="px-4 py-2.5 text-base font-medium text-gray-50 transition-colors"
            >
              마이페이지
            </Link>
            <button
              onClick={handleLogout}
              className="text-error px-4 py-2.5 text-left text-base font-medium transition-colors hover:cursor-pointer"
            >
              로그아웃
            </button>
          </div>
        )}
      </div>
    </>
  );
}
