import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui";
import Link from "next/link";
import HeaderBell from "./HeaderBell";

// TODO: 병합 후 User 타입 import로 교체
interface User {
  nickname: string;
  profileImageUrl: string | null;
}

export default function UserArea() {
  const userData: User | null = {
    nickname: "test123",
    profileImageUrl: "",
  };

  return (
    <div className="font-medium">
      {userData ? (
        <div className="flex items-center gap-6">
          <HeaderBell />
          <button aria-label="프로필">
            <Avatar>
              <AvatarImage
                src={userData.profileImageUrl ?? ""}
                alt={userData.nickname}
              />
              <AvatarFallback>{userData.nickname[0]}</AvatarFallback>
            </Avatar>
          </button>
        </div>
      ) : (
        <Link
          href={"/login"}
          className="px-7.25 py-4 transition-colors duration-100 hover:text-gray-50"
        >
          로그인
        </Link>
      )}
    </div>
  );
}
