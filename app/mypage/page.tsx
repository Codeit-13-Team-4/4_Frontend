import { getMeServer } from "@/features/auth/api/getMeServer";
import { buildLoginPath } from "@/features/auth/lib/authRedirect";
import MyProfileSection from "@/widgets/mypage/ui/MyProfileSection";
import { redirect } from "next/navigation";

export default async function MyPage() {
  const userData = await getMeServer();

  if (!userData) redirect(buildLoginPath("/mypage"));

  return (
    <div>
      <MyProfileSection userData={userData} />
    </div>
  );
}
