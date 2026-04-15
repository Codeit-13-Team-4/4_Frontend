import { getMeServer } from "@/features/auth/api/getMeServer";
import ProfileEditForm from "@/features/mypage/edit/ui/ProfileEditForm";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "마이페이지 - 프로필 수정",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function ProfileEditPage() {
  const userData = await getMeServer();
  if (!userData) redirect("/login");

  return (
    <section className="rounded-2xl border border-gray-700 bg-gray-800 p-6 md:p-10">
      <h1 className="mb-6 text-xl font-bold text-gray-50">프로필 수정</h1>
      <ProfileEditForm userData={userData} />
    </section>
  );
}
