"use client";

import { Dropdown, ScrollArea } from "@/shared/ui";
import { cn } from "@/shared/utils";
import Image from "next/image";

type NotificationType =
  | "applicationSent"
  | "applicationReceived"
  | "applicationReapplied"
  | "applicationAccepted"
  | "applicationRejected"
  | "unreadChat"
  | "proposalSent"
  | "proposalReceived"
  | "proposalReproposed"
  | "proposalAccepted"
  | "proposalRejected"
  | "registeredIssueCoupon"
  | "initialOrderIssueCoupon"
  | "openedIssueCoupon"
  | "other";

type TargetType =
  | "chat"
  | "application"
  | "proposal"
  | "coupon"
  | "project"
  | "other";

interface Notification {
  id: number;
  type: NotificationType;
  title: string;
  content: string;
  targetInfo: {
    type: TargetType;
    id: number;
  };
  isRead: boolean;
  displayTime: string;
  createdAt: string;
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 1,
    type: "registeredIssueCoupon",
    title: "DevUp에 오신 걸 환영해요!🚀",
    content:
      "이제 코딩 스킬을 레벨업할 준비가 되셨나요? 프로필을 완성하고, 나에게 맞는 활동을 시작해보세요.",
    targetInfo: { type: "other", id: 0 },
    isRead: false,
    displayTime: "1분 전",
    createdAt: "2026-03-29T09:00:00.000Z",
  },
  {
    id: 2,
    type: "applicationReceived",
    title: "새로운 지원",
    content: "'딸기'님이 클라이밍 모임에 지원했어요.",
    targetInfo: { type: "application", id: 101 },
    isRead: false,
    displayTime: "5시간 전",
    createdAt: "2026-03-29T04:00:00.000Z",
  },
  {
    id: 3,
    type: "applicationAccepted",
    title: "지원 수락",
    content: "클라이밍 모임 지원이 수락됐어요.",
    targetInfo: { type: "application", id: 102 },
    isRead: true,
    displayTime: "5시간 전",
    createdAt: "2026-03-29T04:00:00.000Z",
  },
  {
    id: 4,
    type: "proposalReceived",
    title: "새로운 제안",
    content: "'망고'님이 프로젝트 참여를 제안했어요.",
    targetInfo: { type: "proposal", id: 201 },
    isRead: true,
    displayTime: "1일 전",
    createdAt: "2026-03-28T09:00:00.000Z",
  },
  {
    id: 5,
    type: "unreadChat",
    title: "미확인 메시지",
    content: "확인하지 않은 채팅 메시지가 있어요.",
    targetInfo: { type: "chat", id: 301 },
    isRead: false,
    displayTime: "1일 전",
    createdAt: "2026-03-28T09:00:00.000Z",
  },
  {
    id: 6,
    type: "applicationRejected",
    title: "지원 거절",
    content: "'레몬'팀 프로젝트 지원이 거절됐어요.",
    targetInfo: { type: "application", id: 103 },
    isRead: true,
    displayTime: "2일 전",
    createdAt: "2026-03-27T09:00:00.000Z",
  },
  {
    id: 7,
    type: "proposalAccepted",
    title: "제안 수락",
    content: "30일 코딩 챌린지 제안이 수락됐어요.",
    targetInfo: { type: "project", id: 401 },
    isRead: true,
    displayTime: "3일 전",
    createdAt: "2026-03-26T09:00:00.000Z",
  },
  {
    id: 8,
    type: "other",
    title: "공지사항",
    content: "서비스 이용에 감사드립니다. 새로운 기능이 업데이트됐어요.",
    targetInfo: { type: "other", id: 0 },
    isRead: true,
    displayTime: "4일 전",
    createdAt: "2026-03-25T09:00:00.000Z",
  },
];

export default function HeaderBell() {
  return (
    <Dropdown>
      <Dropdown.Trigger>
        <button aria-label="알림">
          <Image
            src="/header/large-bell.svg"
            alt="알림"
            width={20}
            height={22}
          />
        </button>
      </Dropdown.Trigger>
      <Dropdown.Content
        className="w-80 overflow-hidden rounded-3xl border-gray-700 bg-gray-900 p-0 shadow"
        sideOffset={12}
        align="end"
      >
        <div className="flex items-center justify-end px-6 py-7">
          <button className="text-xs font-semibold text-slate-400 transition-colors hover:cursor-pointer hover:text-gray-200">
            모두 읽기
          </button>
        </div>

        {MOCK_NOTIFICATIONS.length === 0 ? (
          <div className="flex min-h-30 items-center justify-center pt-7.5 pb-14 text-sm font-medium text-slate-500">
            아직 알림이 없어요
          </div>
        ) : (
          <ScrollArea className="h-87.5 min-h-51">
            <ul className="divide-y divide-gray-700">
              {MOCK_NOTIFICATIONS.map((notification) => (
                <li
                  key={notification.id}
                  className={cn(
                    "flex gap-4 pt-3 pr-7 pb-4 pl-5",
                    !notification.isRead && "bg-gray-800",
                  )}
                >
                  <div className="border-color-default flex size-8 h-6 w-6 shrink-0 items-center justify-center rounded-full border bg-gray-800">
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
          </ScrollArea>
        )}
      </Dropdown.Content>
    </Dropdown>
  );
}
