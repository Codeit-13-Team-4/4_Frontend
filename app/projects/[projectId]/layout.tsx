import { ToastContainer } from "@/shared/ui/Toast/Toast";

export default function ProjectDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 md:px-6 lg:px-8">
      <ToastContainer />
      {children}
    </main>
  );
}
