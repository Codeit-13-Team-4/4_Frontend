export default function Badge({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-block rounded-full bg-gray-200 px-3 py-2 text-base text-gray-800">
      {children}
    </div>
  );
}
