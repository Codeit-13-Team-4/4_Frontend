export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-7xl flex-1 bg-gray-900">
      <main className="h-full">{children}</main>
    </div>
  );
}
