"use client";

import { useState } from "react";
import Image from "next/image";
import { format } from "date-fns";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  Button,
  Dropdown,
} from "@/shared/ui";
import { useUserData } from "@/features/auth/hooks/queries/useUserData";
import { useOpenAlertModal } from "@/shared/store/AlertModal";
import type { Comment } from "@/features/challengesDetail/types/comment";
import { useUpdateChallengesDetailComment } from "../../hooks/useUpdateChallengesDetailComment";
import { useDeleteChallengesDetailComment } from "../../hooks/useDeleteChallengesDetailComment";

interface CommentItemProps {
  comment: Comment;
  challengeId: number;
}

export default function CommentItem({
  comment,
  challengeId,
}: CommentItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(comment.content);
  const { data: userData } = useUserData();
  const { mutate: updateComment, isPending: isUpdating } =
    useUpdateChallengesDetailComment(challengeId);
  const { mutate: deleteComment, isPending: isDeleting } =
    useDeleteChallengesDetailComment(challengeId);

  const isOwner = userData?.id === comment.author.id;
  const openAlertModal = useOpenAlertModal();

  const handleDelete = () => {
    openAlertModal({
      title: "댓글을 삭제하시겠어요?",
      description: "삭제된 댓글은 복구할 수 없습니다.",
      positive: {
        text: "삭제",
        button: { type: "default", variant: "destructive" },
      },
      negative: { text: "취소" },
      onPositive: () => deleteComment(comment.id),
    });
  };

  const handleUpdate = () => {
    const trimmed = editValue.trim();
    if (!trimmed || isUpdating) return;
    updateComment(
      { commentId: comment.id, content: trimmed },
      { onSuccess: () => setIsEditing(false) },
    );
  };

  const handleCancelEdit = () => {
    setEditValue(comment.content);
    setIsEditing(false);
  };

  return (
    <div className="flex gap-3 pt-4 pb-6">
      <Avatar className="size-6 shrink-0">
        <AvatarImage
          src={comment.author.profileImageUrl ?? ""}
          alt={comment.author.nickname}
        />
        <AvatarFallback delayMs={0}>
          <Image
            src="/common/avatar/default-avatar-sm.svg"
            alt="기본 아바타"
            width={24}
            height={24}
          />
        </AvatarFallback>
      </Avatar>

      <div className="flex flex-1 flex-col">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-normal text-gray-300 lg:text-base">
              {comment.author.nickname}
            </span>
            <span className="text-xs text-gray-600 lg:text-sm">
              {format(new Date(comment.createdAt), "yyyy.MM.dd")}
            </span>
          </div>
          {isOwner && (
            <Dropdown>
              <Dropdown.Trigger>
                <button
                  type="button"
                  aria-label="댓글 메뉴"
                  className="flex h-6 w-6 items-center justify-center rounded"
                >
                  <Image
                    src="/projectDetail/meetballs.svg"
                    alt="댓글 메뉴"
                    width={24}
                    height={24}
                  />
                </button>
              </Dropdown.Trigger>
              <Dropdown.Content
                align="end"
                className="min-w-24 border-gray-700 bg-gray-900 text-sm text-gray-200"
              >
                <Dropdown.Item
                  className="px-3 py-2 hover:bg-gray-800"
                  onSelect={() => setIsEditing(true)}
                >
                  수정
                </Dropdown.Item>
                <Dropdown.Item
                  className="px-3 py-2 text-red-400 hover:bg-gray-800"
                  onSelect={handleDelete}
                  disabled={isDeleting}
                >
                  삭제
                </Dropdown.Item>
              </Dropdown.Content>
            </Dropdown>
          )}
        </div>

        {isEditing ? (
          <div className="mt-6 flex flex-col gap-2">
            <textarea
              className="w-full resize-none rounded-xl bg-gray-800 px-4 py-3 text-sm text-gray-50 outline-none placeholder:text-gray-400 lg:text-base"
              rows={3}
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              disabled={isUpdating}
            />
            <div className="flex justify-end gap-2">
              <Button
                variant="dark"
                size="sm"
                onClick={handleCancelEdit}
                disabled={isUpdating}
                className="px-6"
              >
                취소
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleUpdate}
                disabled={!editValue.trim() || isUpdating}
                className="px-6"
              >
                저장
              </Button>
            </div>
          </div>
        ) : (
          <p className="mt-6 text-sm whitespace-pre-wrap text-gray-50 lg:text-base">
            {comment.content}
          </p>
        )}
      </div>
    </div>
  );
}
