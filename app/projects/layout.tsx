import { ToastContainer } from "@/shared/ui/Toast/Toast";

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-7xl flex-1">
      <ToastContainer />
      <main className="px-4 pt-12">{children}</main>
    </div>
  );
}
