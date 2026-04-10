"use client";

import { useState } from "react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { Button, Dropdown } from "@/shared/ui";
import { Meetballs, ArrowRight } from "@/shared/icons";
import { useOpenAlertModal } from "@/shared/store/AlertModal";
import { useUpdateMyComment } from "@/features/mypage/hooks/useUpdateMyComment";
import { useDeleteMyComment } from "@/features/mypage/hooks/useDeleteMyComment";
import type { MyComment } from "@/features/mypage/model/mypage.types";

interface MyCommentItemProps {
  comment: MyComment;
}

export default function MyCommentItem({ comment }: MyCommentItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(comment.content);
  const router = useRouter();
  const openAlertModal = useOpenAlertModal();

  const { mutate: updateComment, isPending: isUpdating } = useUpdateMyComment();
  const { mutate: deleteComment, isPending: isDeleting } = useDeleteMyComment();

  const handleNavigate = () => {
    const path =
      comment.type === "project"
        ? `/projects/${comment.targetId}`
        : `/challenges/${comment.targetId}`;
    router.push(path);
  };

  const handleDelete = () => {
    openAlertModal({
      title: "댓글을 삭제하시겠어요?",
      description: "삭제된 댓글은 복구할 수 없습니다.",
      positive: {
        text: "삭제",
        button: { type: "default", variant: "destructive" },
      },
      negative: { text: "취소" },
      onPositive: () =>
        deleteComment({
          commentId: comment.id,
          type: comment.type,
          targetId: comment.targetId,
        }),
    });
  };

  const handleUpdate = () => {
    const trimmed = editValue.trim();
    if (!trimmed || isUpdating) return;
    updateComment(
      {
        commentId: comment.id,
        content: trimmed,
        type: comment.type,
        targetId: comment.targetId,
      },
      { onSuccess: () => setIsEditing(false) },
    );
  };

  const handleCancelEdit = () => {
    setEditValue(comment.content);
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col gap-3 border-b border-gray-700 py-5">
      <button
        type="button"
        onClick={handleNavigate}
        className="flex w-fit cursor-pointer items-center gap-1 text-sm text-gray-400 hover:text-gray-200"
      >
        <span>{comment.type === "project" ? "프로젝트" : "챌린지"}</span>
        <ArrowRight className="h-4 w-4 shrink-0" />
        <span className="truncate text-gray-300">{comment.title}</span>
      </button>

      {/* 내용 + 메뉴 */}
      <div className="flex items-start justify-between gap-2">
        {isEditing ? (
          <div className="flex flex-1 flex-col gap-2">
            <textarea
              className="w-full resize-none rounded-xl bg-gray-800 px-4 py-3 text-sm text-gray-50 outline-none placeholder:text-gray-400"
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
          <p className="flex-1 text-sm whitespace-pre-wrap text-gray-50">
            {comment.content}
          </p>
        )}

        {!isEditing && (
          <Dropdown>
            <Dropdown.Trigger>
              <button
                type="button"
                aria-label="댓글 메뉴"
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded"
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

      {/* 날짜 */}
      <span className="text-xs text-gray-600">
        {format(new Date(comment.createdAt), "yyyy.MM.dd HH:mm:ss")}
      </span>
    </div>
  );
}
