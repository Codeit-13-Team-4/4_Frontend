import { Skeleton } from "@/shared/ui";

export default function ChallengeDetailCardSkeleton() {
  return (
    <>
      <div className="mt-6 mb-5 lg:mt-12 lg:mb-10">
        <Skeleton className="h-6 w-16" />
      </div>
      <div className="w-full rounded-[20px] border border-gray-700 bg-gray-800 px-4 pt-8 pb-6 md:px-8 md:pt-12 md:pb-8 lg:px-10 lg:pt-15 lg:pb-10">
        {/* Header */}
        <div className="mb-5 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-16 rounded-full" />
              <Skeleton className="h-7 w-20 rounded-full" />
            </div>
            <Skeleton className="size-10 rounded-full" />
          </div>
          <Skeleton className="h-8 w-2/3 lg:h-9" />
        </div>

        {/* Panels */}
        <div className="flex flex-col gap-6 lg:flex-row lg:gap-10">
          {/* Left */}
          <div className="flex flex-1 flex-col gap-6">
            <div className="flex flex-col gap-2">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-43 w-full rounded-xl" />
            </div>
            <div className="flex flex-col gap-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton className="h-5 w-20" />
                  <Skeleton className="h-5 w-32" />
                </div>
              ))}
            </div>
          </div>

          {/* Right */}
          <div className="flex flex-1 flex-col gap-5">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-5 w-10" />
              </div>
              <Skeleton className="h-2 w-full rounded-full" />
            </div>
            <div className="flex items-center gap-3">
              <Skeleton className="h-5 w-12" />
              <div className="flex gap-2">
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col gap-4 pt-6 lg:flex-row lg:items-center lg:justify-between">
          <Skeleton className="h-5 w-10" />
          <Skeleton className="h-13 w-full rounded-2xl lg:h-15 lg:max-w-80" />
        </div>
      </div>
    </>
  );
}
