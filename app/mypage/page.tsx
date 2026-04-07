import { getMeServer } from "@/features/auth/api/getMeServer";
import MyProfileSection from "@/widgets/mypage/ui/MyProfileSection";
import { redirect } from "next/navigation";

export default async function MyPage() {
  const userData = await getMeServer();

  if (!userData) redirect("/login");

  return (
    <div>
      <MyProfileSection userData={userData} />
    </div>
  );
}
