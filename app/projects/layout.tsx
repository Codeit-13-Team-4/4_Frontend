export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto min-h-screen w-full max-w-7xl flex-1">
      <main className="h-full px-2 md:px-17 lg:px-0">{children}</main>
    </div>
  );
}
