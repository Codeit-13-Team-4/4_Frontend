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
import { Dispatch, SetStateAction, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useUploadImage } from "@/shared/hooks/useUploadImage";
import { useEditVerifications } from "../../hook/useEditVerifications";
import { VerificationDetailData } from "../../model";

type FormValues = {
  content: string;
  imageUrls?: FileList;
  existingImageUrl?: string | null;
};

type VerificationsEditModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  challengeId: number;
  verificationId: number;
  data: VerificationDetailData;
};

export function VerificationsEditModal({
  challengeId,
  verificationId,
  data,
  onOpenChange,
  ...props
}: VerificationsEditModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      content: data?.content,
      imageUrls: undefined,
      existingImageUrl: data?.imageUrls?.[0] ?? null,
    },
  });

  const watchedImages = watch("imageUrls");
  const currentExistingUrl = watch("existingImageUrl");

  const { mutateAsync } = useUploadImage();
  const { mutate } = useEditVerifications({ challengeId, verificationId });
  const openAlertModal = useOpenAlertModal();
  const router = useRouter();

  const isChanged =
    watch("content") !== data?.content ||
    (watch("imageUrls") && watch("imageUrls")!.length > 0) ||
    watch("existingImageUrl") !== (data?.imageUrls?.[0] ?? null);

  useEffect(() => {
    if (data) {
      reset({
        content: data.content,
        existingImageUrl: data?.imageUrls?.[0] ?? null,
      });
    }
  }, [data, reset]);

  const previewSrc =
    watchedImages && watchedImages.length > 0
      ? URL.createObjectURL(watchedImages[0])
      : currentExistingUrl;

  useEffect(() => {
    return () => {
      if (previewSrc && previewSrc.startsWith("blob:")) {
        URL.revokeObjectURL(previewSrc);
      }
    };
  }, [previewSrc]);

  const onSubmit = async (formData: FormValues) => {
    let imageUrl = formData.existingImageUrl;
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
          onOpenChange(false);
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
          reset();
        },
        onError: () => {
          onOpenChange(false);
          reset();
        },
      },
    );
  };

  const resetImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setValue("imageUrls", undefined, { shouldDirty: true });
    setValue("existingImageUrl", null, { shouldDirty: true });
  };

  const handleCancelClick = () => {
    reset();
    onOpenChange(false);
  };

  return (
    <Modal {...props} onOpenChange={onOpenChange}>
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

              <div className="relative h-36 w-36">
                <label
                  htmlFor="verifications_image"
                  className="flex h-full w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl border border-gray-700"
                >
                  {previewSrc ? (
                    <Image
                      src={previewSrc}
                      alt="미리보기"
                      fill
                      className="rounded-xl object-cover"
                    />
                  ) : (
                    <span className="flex flex-col items-center justify-center gap-2 text-gray-200">
                      <ImageIcon />
                      <span>파일 첨부</span>
                    </span>
                  )}
                </label>

                {previewSrc && (
                  <button
                    onClick={resetImage}
                    type="button"
                    className="absolute top-2 right-2 z-10"
                  >
                    <XIcon className="cursor-pointer rounded-full bg-gray-800 p-1 text-gray-300" />
                  </button>
                )}
              </div>

              <input
                type="file"
                id="verifications_image"
                accept="image/*"
                className="hidden"
                {...register("imageUrls", {
                  required: "이미지를 등록해주세요.",
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
          <Modal.Footer className="mt-14">
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
              disabled={!isChanged}
            >
              수정하기
            </Button>
          </Modal.Footer>
        </form>
      </Modal.Content>
    </Modal>
  );
}
