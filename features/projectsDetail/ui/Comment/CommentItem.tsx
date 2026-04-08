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
import { useUpdateProjectsDetailComment } from "@/features/projectsDetail/hooks/useUpdateProjectsDetailComment";
import { useDeleteProjectsDetailComment } from "@/features/projectsDetail/hooks/useDeleteProjectsDetailComment";
import { useOpenAlertModal } from "@/shared/store/AlertModal";
import type { Comment } from "@/features/projectsDetail/types/comment";
import { AvatarIcon, Meetballs } from "@/shared/icons";

interface CommentItemProps {
  comment: Comment;
  projectId: number;
}

export default function CommentItem({ comment, projectId }: CommentItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(comment.content);
  const { data: userData } = useUserData();
  const { mutate: updateComment, isPending: isUpdating } =
    useUpdateProjectsDetailComment(projectId);
  const { mutate: deleteComment, isPending: isDeleting } =
    useDeleteProjectsDetailComment(projectId);

  const isOwner = userData?.id === comment.userId;
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
          src={comment.user.profileImageUrl ?? ""}
          alt={comment.user.nickname}
        />
        <AvatarFallback delayMs={0}>
          <AvatarIcon width={24} height={24} className="text-gray-800" />
        </AvatarFallback>
      </Avatar>

      <div className="flex flex-1 flex-col">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-normal text-gray-300 lg:text-base">
              {comment.user.nickname}
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
                  <Meetballs width={24} height={24} className="text-gray-400" />
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
