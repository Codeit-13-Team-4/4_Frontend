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
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useUploadImage } from "@/shared/hooks/useUploadImage";
import { useEditVerifications } from "../../hook/useEditVerifications";
import { VerificationDetailData } from "../../model";

type FormValues = {
  content: string;
  imageUrls?: FileList;
};

type VerificationsEditModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  challengeId: number;
  verificationId: number;
  data: VerificationDetailData;
};

export function VerificationsEditModal({
  setIsOpen,
  challengeId,
  verificationId,
  data,
  ...props
}: VerificationsEditModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      content: data?.content,
    },
  });

  const { mutateAsync } = useUploadImage();
  const { mutate } = useEditVerifications(challengeId, verificationId);
  const [preview, setPreview] = useState<string | null>(
    data?.imageUrls?.[0] ?? null,
  );
  const openAlertModal = useOpenAlertModal();
  const router = useRouter();

  useEffect(() => {
    if (data) {
      reset({
        content: data.content,
      });
    }
  }, [data, reset]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreview((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return URL.createObjectURL(file);
    });
  };

  const onSubmit = async (formData: FormValues) => {
    let imageUrl = data.imageUrls?.[0];

    const file = formData.imageUrls?.[0];
    if (file) {
      imageUrl = await mutateAsync(file);
    }

    if (!imageUrl) return;

    mutate(
      {
        content: formData.content,
        imageUrls: [imageUrl],
      },
      {
        onSuccess: () => {
          setIsOpen(false);

          openAlertModal({
            title: "챌린지 인증 글이 수정되었습니다! 🎉",
            description: "수정 내역을 확인해보세요.",
            showCompleteAnimation: true,
            positive: {
              text: "마이 페이지",
              button: { type: "default", variant: "primary" },
            },
            negative: { text: "확인" },
            onPositive: () => router.push("/mypage"),
          });

          reset({ content: "" });
          setPreview(null);
        },
        onError: () => {
          setIsOpen(false);
        },
      },
    );
  };

  const handleCancelClick = () => {
    reset();
    setPreview(null);
    setIsOpen(false);
  };

  const resetImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setPreview((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
  };

  return (
    <Modal {...props}>
      <Modal.Overlay />
      <Modal.Content className="z-50 gap-12 p-10">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Header className="mb-12 flex-row items-center justify-between">
            <Modal.Title>인증 수정하기</Modal.Title>
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
                      alt="인증수정 미리보기"
                      fill
                      priority
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
                  onChange: handleFileChange,
                })}
              />
            </Field>

            <Field className="mb-14">
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
              type="submit"
            >
              수정하기
            </Button>
          </Modal.Footer>
        </form>
      </Modal.Content>
    </Modal>
  );
}
