export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-7xl flex-1">
      <main className="px-4">{children}</main>
    </div>
  );
}
