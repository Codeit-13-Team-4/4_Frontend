import { getMeServer } from "@/features/auth/api/getMeServer";
import { buildLoginPath } from "@/features/auth/lib/authRedirect";
import { redirect } from "next/navigation";
import MyListSection from "@/widgets/mypage/ui/MyListSection";
import MyProfileSection from "@/widgets/mypage/ui/MyProfileSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "마이페이지",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function MyPage() {
  const userData = await getMeServer();

  if (!userData) redirect(buildLoginPath("/mypage"));

  return (
    <div className="flex flex-col gap-10 lg:gap-15">
      <MyProfileSection userData={userData} />
      <MyListSection />
    </div>
  );
}
