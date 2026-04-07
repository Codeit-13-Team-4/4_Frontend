"use client";

import { Avatar, AvatarFallback, AvatarImage, Dropdown } from "@/shared/ui";
import { User } from "@/shared/types/user";
import Image from "next/image";
import Link from "next/link";
import { useLogout } from "@/features/auth/hooks/queries/useLogout";

interface UserProfileMenuProps {
  userData: User;
}

export default function UserProfileMenu({ userData }: UserProfileMenuProps) {
  const { mutate: logoutMutate } = useLogout();
  const handleLogout = () => {
    logoutMutate();
  };

  return (
    <Dropdown>
      <Dropdown.Trigger>
        <Avatar>
          <AvatarImage
            src={userData.profileImageUrl ?? ""}
            alt={`${userData.nickname} 프로필 이미지`}
          />
          <AvatarFallback delayMs={0}>
            <Image
              src="/common/avatar/default-avatar-md.svg"
              alt="기본 아바타"
              width={44}
              height={44}
            />
          </AvatarFallback>
        </Avatar>
      </Dropdown.Trigger>

      <Dropdown.Content
        align="end"
        className="w-87 rounded-[20px] border-gray-700 bg-gray-900 p-5"
      >
        <div className="flex flex-col gap-6.75">
          <div className="flex w-full min-w-0 items-center gap-5 px-4">
            <Avatar className="size-14">
              <AvatarImage
                src={userData.profileImageUrl ?? ""}
                alt={`${userData.nickname} 프로필 이미지`}
              />
              <AvatarFallback delayMs={0}>
                <Image
                  src="/common/avatar/default-avatar-md.svg"
                  alt="기본 아바타"
                  width={56}
                  height={56}
                />
              </AvatarFallback>
            </Avatar>

            <div className="min-w-0 flex-1">
              <div className="flex items-center">
                <span className="truncate text-base font-medium text-gray-50">
                  {userData.nickname}
                </span>
              </div>
              <p className="truncate text-xs text-gray-400">{userData.email}</p>
            </div>
          </div>

          <Dropdown.Separator className="bg-border-default" />

          <div className="flex flex-col">
            <Dropdown.Item
              asChild
              className="w-full px-4 py-2.5 text-base font-medium text-gray-50 hover:bg-gray-800"
            >
              <Link href="/mypage">마이페이지</Link>
            </Dropdown.Item>

            <Dropdown.Item
              onSelect={handleLogout}
              className="text-error w-full px-4 py-2.5 text-base font-medium hover:bg-gray-800"
            >
              로그아웃
            </Dropdown.Item>
          </div>
        </div>
      </Dropdown.Content>
    </Dropdown>
  );
}
