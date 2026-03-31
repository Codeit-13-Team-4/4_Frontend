"use client";
import {
  POSITION_LABELS,
  PositionType,
  PROJECT_TYPE_LABEL,
  TECH_STACK,
  TechStackType,
} from "@/features/projects/model";
import { ProjectFilterRadioInput, TechBadge } from "@/features/projects/ui";
import {
  DatePicker,
  Dropdown,
  Field,
  FieldLabel,
  Input,
  Label,
  TextArea,
} from "@/shared/ui";
import Image from "next/image";
import { useState } from "react";

const purposeOptions = [
  ...Object.entries(PROJECT_TYPE_LABEL).map(([value, label]) => ({
    value,
    label,
  })),
];

export default function ProjectCreatePage() {
  const [purpose, setPurpose] = useState<string>("");
  const [textValue, setTextValue] = useState<string>("");
  const [recruitPositions, setRecruitPositions] = useState<PositionType[]>([]);

  const [techTagInput, setTechTagInput] = useState("");
  const [techTags, setTechTags] = useState<TechStackType[]>([]);

  const [recruitEndDate, setRecruitEndDate] = useState<Date | undefined>();

  const [count, setCount] = useState(3);
  const min = 1;
  const max = 10;

  const percent = ((count - min) / (max - min)) * 100;

  const handlePurposeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPurpose(e.target.value);
  };

  const handleAddTag = (key: TechStackType) => {
    if (!techTags.includes(key)) {
      setTechTags((prev) => [...prev, key]);
    }
    setTechTagInput("");
  };

  const handleTagDelete = (key: TechStackType) => {
    setTechTags((prev) => prev.filter((item) => item !== key));
  };

  const recommendList = Object.keys(TECH_STACK).filter(
    (key) =>
      key.includes(techTagInput.toLowerCase()) &&
      !techTags.includes(key as TechStackType),
  );

  return (
    <div className="pt-12 text-gray-400">
      <Image
        src="/icons/common/chevron_left-icon.svg"
        alt=""
        width={16}
        height={16}
      />

      <section>
        <h4 className="mt-10 mb-5 text-[20px] text-gray-50">기본정보</h4>
        <div className="rounded-[40px] bg-gray-800 px-10 py-5">
          <div>
            <Field>
              <FieldLabel required>프로젝트명</FieldLabel>
              <Input
                id="required"
                placeholder="프로젝트 모임명을 입력해주세요."
              />
            </Field>
          </div>
          <div>
            <Label required>프로젝트 목적</Label>
            <ul className="flex gap-2">
              {purposeOptions.map((item) => (
                <ProjectFilterRadioInput
                  key={item.value}
                  item={item}
                  name="projectType"
                  selectedValue={purpose}
                  onChange={handlePurposeChange}
                  className="peer-checked:border-mint-500 peer-checked:text-mint-500 peer-checked:bg-gray-900"
                />
              ))}
            </ul>
          </div>
          <div>
            <Label required>소개</Label>
            <TextArea
              maxLength={200}
              value={textValue}
              placeholder="어떤 프로젝트 모임인지 간단하게 입력해주세요."
              onChange={(e) => setTextValue(e.target.value)}
              wrapperClassName="w-full bg-gray-800 border border-gray-700 mb-14"
            />
          </div>
          <div>
            <Label required>모집 포지션</Label>
            <ProjectCreateDropdown setItem={setRecruitPositions} />
            <ul className="flex">
              {recruitPositions?.map((item) => (
                <li key={item}>{POSITION_LABELS[item]}</li>
              ))}
            </ul>
          </div>
          <div>
            <Label>기술 스택</Label>
            <div className="relative">
              <Input
                placeholder="태그 키워드 입력"
                value={techTagInput}
                onChange={(e) => setTechTagInput(e.target.value)}
              />
              {techTagInput && recommendList.length > 0 && (
                <ul className="scrollbar-hide absolute top-full z-50 mt-1 max-h-40 w-full overflow-y-auto rounded-md border border-gray-700 bg-gray-800">
                  {recommendList.map((key) => (
                    <li
                      key={key}
                      className="flex cursor-pointer items-center gap-2 px-3 py-1 hover:bg-gray-700"
                      onClick={() => handleAddTag(key as TechStackType)}
                    >
                      <Image
                        src={TECH_STACK[key as TechStackType].icon}
                        alt={TECH_STACK[key as TechStackType].label}
                        width={16}
                        height={16}
                      />
                      <span>{TECH_STACK[key as TechStackType].label}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <ul>
              {techTags?.map((item) => {
                const { label } = TECH_STACK[item];

                return (
                  <li
                    key={item}
                    className="inline-flex items-center gap-2 rounded-sm bg-gray-700 px-2 py-1"
                  >
                    <span>{label}</span>
                    <button
                      onClick={() => handleTagDelete(item)}
                      className="cursor-pointer"
                    >
                      <Image
                        src="/icons/common/x-icon.svg"
                        width={8}
                        height={8}
                        alt=""
                      />
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>
      <section>
        <h4 className="mt-10 mb-5 text-[20px] text-gray-50">
          진행 방식 및 기간
        </h4>
        <div className="rounded-[40px] bg-gray-800 px-10 py-5">
          <Label required>모집 마감 날짜</Label>
          <DatePicker
            mode="single"
            value={recruitEndDate}
            onChange={setRecruitEndDate}
          />
        </div>
      </section>
      <section>
        <h4 className="mt-10 mb-5 text-[20px] text-gray-50">
          모집 및 연락 방법
        </h4>
        <div className="rounded-[40px] bg-gray-800 px-10 py-5">
          <Label required>모집 정원</Label>
          <div className="relative w-full">
            <div className="absolute top-1/2 left-0 h-2 w-full rounded-full bg-gray-900" />

            <div
              className="absolute top-1/2 left-0 h-2 rounded-full"
              style={{
                width: `${percent}%`,
                background: "var(--color-gradient-devup)",
              }}
            />

            <input
              type="range"
              min={min}
              max={max}
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              className="range-devup relative"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function ProjectCreateDropdown({
  setItem,
}: {
  setItem: React.Dispatch<React.SetStateAction<PositionType[]>>;
}) {
  const [open, setOpen] = useState(false);
  const handleSelect = (value: PositionType) => {
    setItem((prev: PositionType[]) => {
      if (prev.includes(value)) {
        return prev.filter((v) => v !== value);
      } else {
        return [...prev, value];
      }
    });
  };
  return (
    <Dropdown open={open} onOpenChange={setOpen}>
      <Dropdown.Trigger>
        <button className="group flex w-full items-center justify-between gap-1 rounded-lg bg-gray-900 px-4 py-2.5 text-gray-50">
          포지션
          <Image
            src="/icons/common/chevron_down_sm-icon.svg"
            width={17}
            height={17}
            alt=""
            aria-hidden="true"
            className="group-data-open:hidden"
          />
          <Image
            src="/icons/common/chevron_up_sm-icon.svg"
            width={17}
            height={17}
            alt=""
            aria-hidden="true"
            className="hidden group-data-open:block"
          />
        </button>
      </Dropdown.Trigger>
      <Dropdown.Content className="z-99 w-(--radix-dropdown-menu-trigger-width) border border-gray-700 bg-gray-900">
        {Object.entries(POSITION_LABELS).map(([value, label]) => {
          return (
            <Dropdown.Item
              className="px-3 py-1.5 text-sm text-[#E2EBF0] hover:bg-gray-700"
              key={value}
              onSelect={() => handleSelect(value as PositionType)}
            >
              {label}
            </Dropdown.Item>
          );
        })}
      </Dropdown.Content>
    </Dropdown>
  );
}
