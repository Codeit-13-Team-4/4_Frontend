"use client";

import { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback, Button } from "@/shared/ui";
import { useUserData } from "@/features/auth/hooks/queries/useUserData";
import { useCreateChallengesDetailComment } from "../../hooks/useCreateChallengesDetailComment";
import CommentInputSkeleton from "./CommentInputSkeleton";
import { AvatarIcon } from "@/shared/icons";

export default function CommentInput({ challengeId }: { challengeId: number }) {
  const [value, setValue] = useState("");
  const { data: userData, isLoading } = useUserData();
  const { mutate: createComment, isPending } =
    useCreateChallengesDetailComment(challengeId);

  const handleSubmit = () => {
    const trimmed = value.trim();
    if (!trimmed || isPending) return;
    createComment(trimmed, {
      onSuccess: () => setValue(""),
    });
  };

  if (isLoading) return <CommentInputSkeleton />;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-3">
        <Avatar size="lg" className="hidden md:flex">
          <AvatarImage
            src={userData?.profileImageUrl ?? ""}
            alt={userData?.nickname ?? ""}
          />
          <AvatarFallback delayMs={0}>
            <AvatarIcon width={56} height={56} className="text-[#1E293B]" />
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 rounded-2xl bg-gray-800">
          <textarea
            className="min-h-25 w-full resize-none bg-transparent px-4 pt-4 pb-6 text-sm text-gray-50 outline-none placeholder:text-gray-400 lg:text-base"
            placeholder={
              userData
                ? "여기에 댓글을 남겨보세요"
                : "로그인 후 댓글을 작성할 수 있어요"
            }
            value={value}
            onChange={(e) => setValue(e.target.value)}
            disabled={!userData || isPending}
          />
        </div>
      </div>
      <div className="flex justify-end">
        <Button
          variant="primary"
          size="sm"
          className="px-6 py-2"
          onClick={handleSubmit}
          disabled={!userData || !value.trim() || isPending}
        >
          댓글 작성
        </Button>
      </div>
    </div>
  );
}
