"use client";

import Logo from "./Logo";
import NavigationMenu from "./NavigationMenu";
import UserArea from "./UserArea";
import { useUserData } from "@/features/auth/hooks/queries/useUserData";

export default function Header() {
  const { data: userData } = useUserData();

  return (
    <header className="h-22 w-full bg-gray-900 text-gray-600">
      <div className="mx-auto flex h-full w-full max-w-7xl items-center justify-between px-4">
        <Logo />
        <NavigationMenu className="hidden md:flex" />
        <UserArea userData={userData} />
      </div>
    </header>
  );
}
