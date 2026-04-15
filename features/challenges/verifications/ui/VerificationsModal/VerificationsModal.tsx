"use client";
import { ImageIcon, XIcon } from "@/shared/icons";
import { useOpenAlertModal } from "@/shared/store/AlertModal";
import {
  Button,
  Field,
  FieldError,
  FieldLabel,
  Modal,
  TextArea,
} from "@/shared/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { verificationsSchema } from "../../model/verifications.schema";
import { useUploadImage } from "@/shared/hooks/useUploadImage";
import { useCreateVerifications } from "../../hook/useCreateVerifications";

type FormValues = {
  content: string;
  imageUrls: FileList;
};

type VerificationsModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  challengeId: number;
};

export function VerificationsModal({
  setIsOpen,
  challengeId,
  ...props
}: VerificationsModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(verificationsSchema),
  });

  const { mutateAsync } = useUploadImage();
  const { mutate } = useCreateVerifications(challengeId);
  const [preview, setPreview] = useState<string | null>(null);

  const openAlertModal = useOpenAlertModal();
  const router = useRouter();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreview((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return URL.createObjectURL(file);
    });
  };

  const onSubmit = async (data: FormValues) => {
    const file = data.imageUrls?.[0];
    if (!file) return;
    const imageUrl = await mutateAsync(file);

    mutate(
      {
        content: data.content,
        imageUrls: [imageUrl],
      },
      {
        onSuccess: () => {
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

          reset();
          setPreview(null);
        },

        onError: () => {
          setIsOpen(false);
          reset();
          setPreview(null);
        },
      },
    );
  };

  const handleCancelClick = () => {
    reset();
    setPreview(null);
    setIsOpen(false);
  };

  const resetImage = () => {
    reset();
    setPreview(null);
  };

  return (
    <Modal {...props} onOpenChange={handleCancelClick}>
      <Modal.Overlay />
      <Modal.Content className="z-50 gap-12 p-10">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Header className="mb-12 flex-row items-center justify-between">
            <Modal.Title>인증하기</Modal.Title>
            <Modal.CloseIcon />
          </Modal.Header>
          <Modal.Body>
            <Field>
              <FieldLabel required>이미지</FieldLabel>

              <label
                htmlFor="verifications_image"
                className="relative flex h-36 w-36 cursor-pointer items-center justify-center overflow-hidden rounded-xl border border-gray-700"
              >
                {preview ? (
                  <div className="relative h-full w-full">
                    <Image
                      src={preview}
                      alt="인증 미리보기"
                      fill
                      className="object-cover"
                    />
                    <button onClick={resetImage} type="button">
                      <XIcon
                        className="absolute top-2 right-1 cursor-pointer rounded-full bg-gray-800 p-1 text-gray-300"
                        width={20}
                        height={20}
                      />
                    </button>
                  </div>
                ) : (
                  <span className="flex flex-col items-center justify-center gap-2 text-gray-200">
                    <ImageIcon />
                    <span>파일 첨부</span>
                  </span>
                )}
              </label>
              {errors.imageUrls && (
                <FieldError>{errors.imageUrls.message}</FieldError>
              )}

              <input
                type="file"
                id="verifications_image"
                accept="image/*"
                className="hidden"
                {...register("imageUrls", {
                  required: "이미지를 첨부해주세요.",
                  onChange: handleFileChange,
                })}
              />
            </Field>

            <Field>
              <FieldLabel required>설명</FieldLabel>
              <TextArea
                wrapperClassName="w-full bg-gray-800 border border-gray-700"
                className="placeholder:text-gray-400"
                placeholder="간단한 설명글을 작성해주세요."
                {...register("content", { required: "설명을 입력해주세요." })}
              />

              {errors.content && (
                <FieldError>{errors.content.message}</FieldError>
              )}
            </Field>
          </Modal.Body>
          <Modal.Footer className="mt-12">
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
              type="submit"
            >
              제출하기
            </Button>
          </Modal.Footer>
        </form>
      </Modal.Content>
    </Modal>
  );
}
