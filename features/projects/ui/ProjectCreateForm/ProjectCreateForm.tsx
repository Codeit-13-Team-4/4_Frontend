"use client";
import {
  ContactMethod,
  POSITION_LABELS,
  PositionType,
  PROJECT_TYPE_LABEL,
  ProjectType,
  TechStackType,
} from "@/features/projects/model";
import {
  CreateAlertModal,
  CreateCancelAlertModal,
  ProjectContactLinkDropdown,
  ProjectCreatePositionDropdown,
  ProjectCreateRangeBar,
  ProjectCreateTagInput,
  ProjectFilterRadioInput,
} from "@/features/projects/ui";
import {
  Button,
  DatePicker,
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  Input,
  TextArea,
} from "@/shared/ui";
import Image from "next/image";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { formatDate } from "@/shared/utils";
import { useRouter } from "next/navigation";
import { useCreateProject } from "../../hooks/useCreateProject";

type CreateFormErrors = {
  title?: string;
  projectType?: string;
  description?: string;
  positions?: string;
  techStacks?: string;
  recruitEndDate?: string;
  projectRange?: string;
  contactLink?: string;
  contactMethod?: string;
  maxMembers?: string;
};

interface CreateFormState {
  title: string;
  projectType: ProjectType | undefined;
  description: string;
  positions: PositionType[];
  techStacks: TechStackType[];
  recruitEndDate: Date | undefined;
  maxMembers: number;
  projectRange: DateRange | undefined;
  contactMethod: ContactMethod | undefined;
  contactLink: string;
}

export function ProjectCreateForm() {
  const [techTagInput, setTechTagInput] = useState("");
  const [confirmAlertOpen, setConfirmAlertOpen] = useState(false);
  const [createAlertOpen, setCreateAlertOpen] = useState(false);
  const [errors, setErrors] = useState<CreateFormErrors>({});

  const [createForm, setCreateForm] = useState<CreateFormState>({
    title: "",
    projectType: undefined,
    description: "",
    positions: [],
    techStacks: [],
    recruitEndDate: undefined,
    maxMembers: 0,
    projectRange: undefined,
    contactMethod: undefined,
    contactLink: "",
  });

  const updateForm = <K extends keyof CreateFormState>(
    key: K,
    value: CreateFormState[K],
  ) => {
    setCreateForm((prev) => ({ ...prev, [key]: value }));
  };

  const router = useRouter();
  const { mutate, isPending } = useCreateProject(() =>
    setCreateAlertOpen(true),
  );

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  const handleSubmit = () => {
    const newErrors: typeof errors = {};

    if (!createForm.title.trim()) {
      newErrors.title = "프로젝트 모임명을 입력해주세요.";
    }
    if (!createForm.projectType) {
      newErrors.projectType = "프로젝트 목적을 선택해주세요.";
    }
    if (!createForm.description.trim()) {
      newErrors.description = "프로젝트 소개글을 입력해주세요.";
    }
    if (createForm.positions.length === 0) {
      newErrors.positions = "모집 포지션을 선택해주세요.";
    }
    if (createForm.techStacks.length === 0) {
      newErrors.techStacks = "기술 스택을 선택해주세요.";
    }
    if (!createForm.recruitEndDate) {
      newErrors.recruitEndDate = "모집 마감일을 설정해주세요.";
    }
    if (createForm.maxMembers === 0) {
      newErrors.maxMembers = "모집 정원을 설정해주세요.";
    }
    if (!createForm.projectRange?.from || !createForm.projectRange?.to) {
      newErrors.projectRange = "진행 기간을 설정해주세요.";
    }
    if (!createForm.contactMethod) {
      newErrors.contactMethod = "연락 방법을 선택해주세요.";
    }
    if (!createForm.contactLink.trim()) {
      newErrors.contactLink = "연락 링크를 입력해주세요.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const data = {
        title: createForm.title,
        description: createForm.description,
        projectType: createForm.projectType!,
        techStacks: createForm.techStacks,
        positions: createForm.positions,
        maxMembers: createForm.maxMembers,
        recruitEndDate: formatDate(createForm.recruitEndDate!) as string,
        projectStartDate: formatDate(createForm.projectRange!.from!) as string,
        projectEndDate: formatDate(createForm.projectRange!.to!) as string,
        contactMethod: createForm.contactMethod!,
        contactLink: createForm.contactLink,
      };

      mutate(data);
    }
  };

  const handlePositionDelete = (key: PositionType) => {
    updateForm(
      "positions",
      createForm.positions.filter((item) => item !== key),
    );
  };

  return (
    <div className="pt-12 text-gray-400">
      <button onClick={handleBack} className="cursor-pointer">
        <Image
          src="/icons/common/chevron_left-icon.svg"
          alt=""
          width={16}
          height={16}
        />
      </button>
      <section>
        <h2 className="mt-10 mb-5 text-[20px] text-gray-50">기본정보</h2>
        <FieldGroup className="flex flex-col gap-7 rounded-[40px] bg-gray-800 px-10 py-5">
          <Field>
            <FieldLabel required>프로젝트명</FieldLabel>
            <Input
              id="required"
              placeholder="프로젝트 모임명을 입력해주세요."
              value={createForm.title}
              onChange={(e) => updateForm("title", e.target.value)}
            />
            {errors.title && <FieldError>{errors.title}</FieldError>}
          </Field>

          <Field>
            <FieldLabel required>프로젝트 목적</FieldLabel>
            <ul className="flex gap-2">
              {Object.entries(PROJECT_TYPE_LABEL).map(([value, label]) => (
                <ProjectFilterRadioInput
                  key={value}
                  item={{ value, label }}
                  name="projectType"
                  selectedValue={createForm.projectType}
                  onChange={(e) =>
                    updateForm("projectType", e.target.value as ProjectType)
                  }
                />
              ))}
            </ul>
            {errors.projectType && (
              <FieldError>{errors.projectType}</FieldError>
            )}
          </Field>

          <Field>
            <FieldLabel required>소개</FieldLabel>
            <TextArea
              maxLength={200}
              value={createForm.description}
              placeholder="어떤 프로젝트 모임인지 간단하게 입력해주세요."
              onChange={(e) => updateForm("description", e.target.value)}
              wrapperClassName="w-full bg-gray-800 border border-gray-700 "
            />
            {errors.description && (
              <FieldError>{errors.description}</FieldError>
            )}
          </Field>

          <Field>
            <FieldLabel required>모집 포지션</FieldLabel>
            <ProjectCreatePositionDropdown
              items={createForm.positions}
              setItems={(positions) => updateForm("positions", positions)}
            />
            <ul className="flex gap-2">
              {createForm.positions?.map((item) => (
                <li
                  key={item}
                  className="border-mint-500 text-mint-500 flex items-center gap-1 rounded-3xl border bg-gray-900 px-3 py-1"
                >
                  <span>{POSITION_LABELS[item]}</span>
                  <button
                    onClick={() => handlePositionDelete(item)}
                    className="cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="#00d7a0"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 6 6 18" />
                      <path d="m6 6 12 12" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
            {errors.positions && <FieldError>{errors.positions}</FieldError>}
          </Field>

          <Field>
            <FieldLabel required>기술 스택</FieldLabel>
            <ProjectCreateTagInput
              input={techTagInput}
              setInput={setTechTagInput}
              tags={createForm.techStacks}
              setTags={(tags) => updateForm("techStacks", tags)}
            />
            {errors.techStacks && <FieldError>{errors.techStacks}</FieldError>}
          </Field>
        </FieldGroup>
      </section>
      <section>
        <h2 className="mt-10 mb-5 text-[20px] text-gray-50">
          진행 방식 및 기간
        </h2>

        <FieldGroup className="rounded-[40px] bg-gray-800 px-10 py-5">
          <Field>
            <FieldLabel required>모집 마감 날짜</FieldLabel>
            <DatePicker
              mode="single"
              value={createForm.recruitEndDate}
              onChange={(date) => updateForm("recruitEndDate", date)}
            />
            {errors.recruitEndDate && (
              <FieldError>{errors.recruitEndDate}</FieldError>
            )}
          </Field>
          <Field>
            <FieldLabel required>진행기간</FieldLabel>
            <DatePicker
              mode="range"
              value={createForm.projectRange}
              onChange={(range) => updateForm("projectRange", range)}
              showLabel={false}
            />
            {errors.projectRange && (
              <FieldError>{errors.projectRange}</FieldError>
            )}
          </Field>
        </FieldGroup>
      </section>
      <section>
        <h2 className="mt-10 mb-5 text-[20px] text-gray-50">
          모집 및 연락 방법
        </h2>
        <FieldGroup className="rounded-[40px] bg-gray-800 px-10 py-5">
          <Field>
            <FieldLabel required>모집 정원</FieldLabel>
            <ProjectCreateRangeBar
              count={createForm.maxMembers}
              setCount={(count) => updateForm("maxMembers", count)}
            />
            {errors.maxMembers && <FieldError>{errors.maxMembers}</FieldError>}
          </Field>

          <Field>
            <FieldLabel required>연락 방법</FieldLabel>
            <ProjectContactLinkDropdown
              value={createForm.contactMethod}
              setValue={(value) => updateForm("contactMethod", value)}
            />
            {errors.contactMethod && (
              <FieldError>{errors.contactMethod}</FieldError>
            )}
            <Input
              type="text"
              value={createForm.contactLink}
              onChange={(e) => updateForm("contactLink", e.target.value)}
            />
            {errors.contactLink && (
              <FieldError>{errors.contactLink}</FieldError>
            )}
          </Field>
        </FieldGroup>
      </section>
      <div className="my-12 flex justify-end gap-4">
        <Button
          size="lg"
          className="w-50"
          onClick={() => setConfirmAlertOpen(true)}
        >
          취소
        </Button>
        <Button
          size="lg"
          variant="primary"
          className="w-50"
          onClick={handleSubmit}
          disabled={isPending}
        >
          개설하기
        </Button>
      </div>
      <CreateCancelAlertModal
        open={confirmAlertOpen}
        onOpenChange={setConfirmAlertOpen}
      />
      <CreateAlertModal
        open={createAlertOpen}
        onOpenChange={setCreateAlertOpen}
      />
    </div>
  );
}
