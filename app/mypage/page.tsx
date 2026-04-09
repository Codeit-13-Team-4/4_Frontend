import { getMeServer } from "@/features/auth/api/getMeServer";
import MyListSection from "@/widgets/mypage/ui/MyListSection";
import MyProfileSection from "@/widgets/mypage/ui/MyProfileSection";
import { redirect } from "next/navigation";

export default async function MyPage() {
  const userData = await getMeServer();

  if (!userData) redirect("/login");

  return (
    <div className="flex flex-col gap-10 lg:gap-15">
      <MyProfileSection userData={userData} />
      <MyListSection />
    </div>
  );
}
