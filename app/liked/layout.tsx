export default function LikedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-1">
      <main className="w-full px-4">{children}</main>
    </div>
  );
}
