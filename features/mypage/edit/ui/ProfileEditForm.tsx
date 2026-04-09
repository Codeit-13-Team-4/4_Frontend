"use client";

import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import {
  Button,
  Input,
  TextArea,
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
} from "@/shared/ui";
import { User } from "@/shared/types/user";
import { UpdateProfileRequest } from "../model/edit.type";
import { useOpenAlertModal } from "@/shared/store/AlertModal";
import { useUpdateProfile } from "../hooks/useUpdateProfile";
import ProfileImageEditor from "./ProfileImageEditor";
import JobLabelSelector from "./JobLabelSelector";
import SkillTagInput from "./SkillTagInput";
import ProfileLinkFields from "./ProfileLinkFields";

interface Props {
  userData: User;
}

export default function ProfileEditForm({ userData }: Props) {
  const router = useRouter();
  const { mutate, isPending } = useUpdateProfile();
  const openAlertModal = useOpenAlertModal();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty },
  } = useForm<UpdateProfileRequest>({
    defaultValues: {
      nickname: userData.nickname,
      bio: userData.bio ?? "",
      jobLabel: userData.jobLabel,
      skills: userData.skills,
      profileImageUrl: userData.profileImageUrl,
      githubLink: userData.githubLink ?? "",
      blogLink: userData.blogLink ?? "",
      portfolioLink: userData.portfolioLink ?? "",
    },
  });

  const onSubmit = (data: UpdateProfileRequest) => {
    mutate(data);
  };

  const handleCancel = () => {
    if (!isDirty) {
      router.push("/mypage");
      return;
    }

    openAlertModal({
      title: "수정을 중단하시겠어요?",
      description: "지금 나가면 수정 내용이 저장되지 않고 사라져요.",
      negative: {
        text: "나가기",
        button: { type: "default", variant: "default" },
      },
      positive: { text: "이어서 수정" },
      onNegative: () => router.push("/mypage"),
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      {/* 프로필 이미지 */}
      <div className="flex justify-center">
        <Controller
          name="profileImageUrl"
          control={control}
          render={({ field }) => (
            <ProfileImageEditor
              value={field.value ?? null}
              onChange={field.onChange}
            />
          )}
        />
      </div>

      <FieldGroup className="gap-7 md:gap-9">
        {/* 닉네임 */}
        <Field>
          <FieldLabel className="text-gray-400">닉네임</FieldLabel>
          <Input
            {...register("nickname", { required: "닉네임을 입력해주세요." })}
            placeholder="닉네임을 입력해주세요"
          />
          {errors.nickname && (
            <FieldError>{errors.nickname.message}</FieldError>
          )}
        </Field>

        {/* 이메일 (읽기 전용) */}
        <Field>
          <FieldLabel className="text-gray-600">이메일</FieldLabel>
          <Input
            value={userData.email}
            disabled
            className="bg-[#243043] text-gray-600"
          />
        </Field>

        {/* 소개 */}
        <Field>
          <FieldLabel className="text-gray-400">소개</FieldLabel>
          <TextArea
            {...register("bio")}
            placeholder="자신을 소개해주세요"
            maxLength={200}
            wrapperClassName="w-full"
          />
        </Field>

        {/* 직군 선택 */}
        <Field className="gap-4">
          <FieldLabel className="text-gray-400">희망 포지션</FieldLabel>
          <Controller
            name="jobLabel"
            control={control}
            render={({ field }) => (
              <JobLabelSelector value={field.value} onChange={field.onChange} />
            )}
          />
        </Field>

        {/* 기술스택 */}
        <Field>
          <FieldLabel className="text-gray-400">기술 스택</FieldLabel>
          <Controller
            name="skills"
            control={control}
            render={({ field }) => (
              <SkillTagInput value={field.value} onChange={field.onChange} />
            )}
          />
        </Field>

        {/* 링크 */}
        <Field>
          <FieldLabel className="text-gray-400">링크</FieldLabel>
          <ProfileLinkFields register={register} errors={errors} />
        </Field>
      </FieldGroup>

      {/* 버튼 */}
      <div className="flex gap-3 md:flex-row md:justify-end">
        <Button
          type="button"
          variant="default"
          onClick={handleCancel}
          disabled={isPending}
          className="w-full md:w-auto md:px-12"
        >
          취소
        </Button>
        <Button
          type="submit"
          variant="primary"
          disabled={isPending}
          className="w-full md:w-auto md:px-12"
        >
          {isPending ? "저장 중..." : "수정 완료"}
        </Button>
      </div>
    </form>
  );
}
