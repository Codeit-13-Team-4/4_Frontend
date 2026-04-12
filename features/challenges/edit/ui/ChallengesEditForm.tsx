"use client";

import { useRouter } from "next/navigation";
import { ChallengesForm } from "@/features/challenges/ui";
import { useChallengesDetail } from "@/features/challenges/detail/hooks/useChallengesDetail";
import { useUpdateChallengesDetail } from "@/features/challenges/edit/hooks/useUpdateChallengesDetail";
import { mapDetailToFormValues } from "@/features/challenges/edit/model/mapDetailToFormValues";
import { formatDate } from "@/shared/utils";
import type { ChallengesCreateFormValues } from "@/features/challenges/create/model/challenges.schema";

export function ChallengesEditForm({ challengeId }: { challengeId: number }) {
  const router = useRouter();
  const { data } = useChallengesDetail(challengeId);
  const { mutate, isPending } = useUpdateChallengesDetail(challengeId);

  const handleSubmit = (values: ChallengesCreateFormValues) => {
    mutate(
      {
        title: values.title,
        description: values.content,
        tags: values.tags,
        startDate: formatDate(values.challengeStart) as string,
        endDate: formatDate(values.challengeEnd) as string,
        recruitDeadline: formatDate(values.recruitDeadline) as string,
        verificationFrequency: values.verificationFrequency,
        maxParticipants: values.maxParticipants,
        joinType: values.joinType,
        verificationMethod: values.verificationMethod,
      },
      { onSuccess: () => router.replace(`/challenges/${challengeId}`) },
    );
  };

  return (
    <ChallengesForm
      defaultValues={mapDetailToFormValues(data)}
      onSubmit={handleSubmit}
      submitLabel="수정하기"
      isPendingExternal={isPending}
      cancelHref={`/challenges/${challengeId}`}
    />
  );
}
