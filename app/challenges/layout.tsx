import { ToastContainer } from "@/shared/ui/Toast/Toast";

export default function ChallengesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto min-h-screen w-full max-w-7xl flex-1">
      <ToastContainer />
      <main className="h-full px-4 pt-12 md:px-6 lg:px-0">{children}</main>
    </div>
  );
}
