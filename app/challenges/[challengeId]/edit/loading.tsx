import { Skeleton } from "@/shared/ui";

export default function ChallengesEditLoading() {
  return (
    <div className="pt-12">
      <Skeleton className="h-4 w-4" />

      <section>
        <Skeleton className="mt-10 mb-5 h-7 w-24" />
        <div className="flex flex-col gap-7 rounded-[40px] bg-gray-800 px-10 py-5">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-48 rounded-lg" />
          </div>
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-64 rounded-lg" />
          </div>
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-20" />
            <div className="flex gap-2">
              <Skeleton className="h-8 w-20 rounded-full" />
              <Skeleton className="h-8 w-20 rounded-full" />
              <Skeleton className="h-8 w-20 rounded-full" />
              <Skeleton className="h-8 w-20 rounded-full" />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-20" />
            <div className="flex gap-2">
              <Skeleton className="h-8 w-20 rounded-full" />
              <Skeleton className="h-8 w-20 rounded-full" />
              <Skeleton className="h-8 w-20 rounded-full" />
            </div>
          </div>
        </div>
      </section>

      <section>
        <Skeleton className="mt-10 mb-5 h-7 w-24" />
        <div className="flex flex-col gap-7 rounded-[40px] bg-gray-800 px-10 py-5">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-6 w-full rounded-full" />
          </div>
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-20" />
            <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
              <Skeleton className="h-24 rounded-2xl" />
              <Skeleton className="h-24 rounded-2xl" />
            </div>
          </div>
        </div>
      </section>

      <section>
        <Skeleton className="mt-10 mb-5 h-7 w-24" />
        <div className="flex flex-col gap-7 rounded-[40px] bg-gray-800 px-10 py-5">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-150 w-full rounded-lg" />
          </div>
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>
        </div>
      </section>

      <div className="my-12 flex justify-end gap-4">
        <Skeleton className="h-11 w-50 rounded-lg" />
        <Skeleton className="h-11 w-50 rounded-lg" />
      </div>
    </div>
  );
}
