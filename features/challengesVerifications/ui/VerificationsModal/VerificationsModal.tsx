"use client";
import { ImageIcon } from "@/shared/icons";
import { useOpenAlertModal } from "@/shared/store/AlertModal";
import { Button, Field, FieldLabel, Modal, TextArea } from "@/shared/ui";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

import { useForm } from "react-hook-form";

type FormValues = {
  content: string;
  imageUrls: FileList;
};

type VerificationsModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export function VerificationsModal({
  setIsOpen,
  ...props
}: VerificationsModalProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  const content = watch("content");
  const imageUrls = watch("imageUrls");

  const isDisabled = !content?.trim() || !(imageUrls && imageUrls.length > 0);

  const openAlertModal = useOpenAlertModal();
  const router = useRouter();

  const onSubmit = (data: FormValues) => {
    console.log("data", data);
    setIsOpen(false);
    openAlertModal({
      title: "챌린지 인증 글이 등록되었습니다! 🎉",
      description: "호스트가 확인하는 대로 알림을 드릴게요.",
      showCompleteAnimation: true,
      positive: {
        text: "마이 페이지",
        button: { type: "default", variant: "primary" },
      },
      negative: { text: "확인" },
      onPositive: () => router.push("/mypage"),
    });

    console.log("인증 하기 모달 제출 버튼");
    return;
  };

  const onError = () => {
    console.log("validation errors:", errors);
  };
  const handleCancelClick = () => {
    console.log("인증 하기 모달 취소 버튼");
  };
  return (
    <Modal {...props}>
      <Modal.Overlay />
      <Modal.Content className="z-50 gap-12 p-10">
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <Modal.Header className="flex-row items-center justify-between">
            <Modal.Title>인증하기</Modal.Title>
            <Modal.CloseIcon />
          </Modal.Header>
          <Modal.Body>
            <Field>
              <FieldLabel required>이미지</FieldLabel>
              <label
                htmlFor="verifications_image"
                className="flex h-36 w-36 items-center justify-center rounded-xl border border-gray-700"
              >
                <span className="flex flex-col items-center justify-center gap-2 text-gray-200">
                  <ImageIcon />
                  <span>파일 첨부</span>
                </span>

                <input
                  type="file"
                  id="verifications_image"
                  accept="image/*"
                  className="hidden"
                  {...register("imageUrls", {
                    required: "이미지를 첨부해주세요.",
                  })}
                />
              </label>
            </Field>

            <Field>
              <FieldLabel required>설명</FieldLabel>
              <TextArea
                wrapperClassName="w-full bg-gray-800 border border-gray-700 mb-14"
                className="placeholder:text-gray-400"
                placeholder="간단한 설명글을 작성해주세요."
                {...register("content", { required: "설명을 입력해주세요." })}
              />
            </Field>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="default"
              className="flex-1 text-[20px]"
              size="lg"
              onClick={handleCancelClick}
            >
              취소
            </Button>

            <Button
              variant="primary"
              className="flex-1 text-[20px]"
              size="lg"
              disabled={isDisabled}
              type="submit"
            >
              지원하기
            </Button>
          </Modal.Footer>
        </form>
      </Modal.Content>
    </Modal>
  );
}
