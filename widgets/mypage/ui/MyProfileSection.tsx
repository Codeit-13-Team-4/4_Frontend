import Image from "next/image";
import Link from "next/link";
import ProfileInfo from "@/features/mypage/ui/ProfileInfo";
import ProfileLinks from "@/features/mypage/ui/ProfileLinks";
import ProfileSkills from "@/features/mypage/ui/ProfileSkills";
import ProfileStats from "@/features/mypage/ui/ProfileStats";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Label,
} from "@/shared/ui";
import { User } from "@/shared/types/user";

const AVATAR = ({ userData }: { userData: User }) => (
  <Avatar size="lg" className="size-20 md:size-30">
    <AvatarImage src={userData.profileImageUrl ?? ""} alt={userData.nickname} />
    <AvatarFallback>
      <Image
        src="/common/avatar/default-avatar-xl.svg"
        alt="기본 아바타"
        width={120}
        height={120}
        priority
      />
    </AvatarFallback>
  </Avatar>
);

export default function MyProfileSection({ userData }: { userData: User }) {
  return (
    <section className="rounded-2xl border border-gray-700 bg-gray-800 p-6 md:p-10">
      {/* 모바일 */}
      <div className="flex flex-col items-center gap-4 md:hidden">
        <AVATAR userData={userData} />
        <ProfileInfo
          nickname={userData.nickname}
          jobLabel={userData.jobLabel}
          bio={userData.bio}
        />
        <div className="flex w-full flex-col gap-1.5">
          <Label className="text-sm font-medium text-gray-600">기술스택</Label>
          <ProfileSkills skills={userData.skills} />
        </div>
        <div className="flex w-full flex-col gap-1.5">
          <Label className="text-sm font-medium text-gray-600">링크</Label>
          <ProfileLinks
            githubLink={userData.githubLink}
            blogLink={userData.blogLink}
            portfolioLink={userData.portfolioLink}
          />
        </div>
        <div className="flex w-full flex-col gap-2">
          <Label className="text-sm font-medium text-gray-600">
            참여한 활동
          </Label>
          <ProfileStats stats={userData.stats} />
        </div>
        <Button asChild variant="primary" className="mt-8 w-full">
          <Link href="/mypage/edit">수정하기</Link>
        </Button>
      </div>

      {/* 데스크톱 */}
      <div className="hidden gap-6 md:flex md:items-start">
        <div className="flex w-32 shrink-0 flex-col items-center gap-4">
          <AVATAR userData={userData} />
          <div className="flex flex-col items-center gap-2">
            <Label className="text-base font-medium text-gray-600">
              참여한 활동
            </Label>
            <ProfileStats stats={userData.stats} />
          </div>
          <Button asChild variant="primary" className="h-10">
            <Link href="/mypage/edit">프로필 수정</Link>
          </Button>
        </div>

        <div className="flex flex-1 flex-col gap-5">
          <ProfileInfo
            nickname={userData.nickname}
            jobLabel={userData.jobLabel}
            bio={userData.bio}
          />
          <div className="flex flex-col gap-1.5">
            <Label className="text-base font-medium text-gray-600">
              기술스택
            </Label>
            <ProfileSkills skills={userData.skills} />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label className="text-base font-medium text-gray-600">링크</Label>
            <ProfileLinks
              githubLink={userData.githubLink}
              blogLink={userData.blogLink}
              portfolioLink={userData.portfolioLink}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
