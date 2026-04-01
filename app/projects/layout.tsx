import { ToastContainer } from "@/shared/ui/Toast/Toast";

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto min-h-screen w-full max-w-7xl flex-1">
      <ToastContainer />
      <main className="h-full px-2 pt-12 md:px-17 lg:px-0">{children}</main>
    </div>
  );
}
