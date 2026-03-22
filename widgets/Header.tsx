"use client";

import Link from "next/link";

const MENUS = [
  { name: "챌린지", href: "/challensge" },
  { name: "프로젝트", href: "/project" },
  { name: "찜한 모임", href: "/goods" },
];

export default function Header() {
  //Todo: 로그인 기능 구현되면 전역 상태관리에서 가져오기
  const isLoggedIn = false;

  return (
    <header className="h-20 w-full border-b">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6">
        <div className="flex w-40 justify-start">
          <Link href="/">로고</Link>
        </div>

        <nav className="flex flex-1 items-center gap-8">
          {MENUS.map((menu) => (
            <Link key={menu.name} href={menu.href}>
              {menu.name}
            </Link>
          ))}
        </nav>

        <div className="flex w-40 items-center justify-end gap-4">
          {isLoggedIn ? (
            <>
              <button type="button">알림</button>
              <Link href="/mypage">프로필</Link>
            </>
          ) : (
            <Link href="/login">로그인</Link>
          )}
        </div>
      </div>
    </header>
  );
}
