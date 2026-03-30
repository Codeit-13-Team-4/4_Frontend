"use client";
import { Button, Modal } from "@/shared/ui";
import { ProjectFilterRadioInput } from "./ProjectFilterRadioInput";
import { useMultiSelect } from "../../hooks/useMultiSelect";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ProjectFilterCheckBoxInput } from "./ProjectFilterCheckBoxInput";

const statusOptions = [
  { value: "all", label: "전체" },
  { value: "recruiting", label: "모집중" },
  { value: "recruitment_closed", label: "모집완료" },
];

const purposeOptions = [
  { value: "all", label: "전체" },
  { value: "portfolio", label: "포트폴리오" },
  { value: "contest", label: "공모전" },
  { value: "hackathon", label: "해커톤" },
  { value: "startup", label: "창업" },
  { value: "other", label: "기타" },
];

const positionOptions = [
  { value: "all", label: "전체" },
  { value: "fe", label: "FE" },
  { value: "be", label: "BE" },
  { value: "pm", label: "PM" },
  { value: "marketer", label: "Marketer" },
  { value: "designer", label: "Designer" },
  { value: "android", label: "Android" },
  { value: "ios", label: "iOS" },
  { value: "devops", label: "DevOPS" },
];

type ProjectFilterModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function ProjectFilterModal({
  isOpen,
  onClose,
}: ProjectFilterModalProps) {
  const [status, setStatus] = useState<string>("all");
  const [projectType, handleProjectTypeChange, resetProjectType] =
    useMultiSelect(purposeOptions);
  const [positions, handlePositionChange, resetPositions] =
    useMultiSelect(positionOptions);
  const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStatus(e.target.value);
  };
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleReset = () => {
    const params = new URLSearchParams(searchParams.toString());

    setStatus("all");
    resetProjectType();
    resetPositions();
  };

  const handleSubmit = () => {
    const params = new URLSearchParams(searchParams.toString());

    params.delete("search");

    if (status !== "all") {
      params.set("status", status);
    } else {
      params.delete("status");
    }

    if (projectType.length > 0 && !projectType.includes("all")) {
      params.delete("projectType");
      projectType.forEach((p) => params.append("projectType", p));
    } else {
      params.delete("projectType");
    }

    if (positions.length > 0 && !positions.includes("all")) {
      params.delete("positions");
      positions.forEach((p) => params.append("positions", p));
    } else {
      params.delete("positions");
    }

    router.push(`/projects?${params.toString()}`);
    onClose();
  };

  return (
    <Modal open={isOpen} onOpenChange={onClose}>
      <Modal.Overlay />
      <Modal.Content className="bg-gray-800 p-12">
        <Modal.Header className="flex-row items-center justify-between">
          <Modal.Title className="text-gray-200">필터</Modal.Title>
          <Modal.CloseIcon className="static text-gray-200" />
        </Modal.Header>

        <Modal.Body>
          <div className="">
            <section className="mb-14 flex flex-col gap-6">
              <fieldset>
                <legend className="mb-4 text-gray-400">모집 상태</legend>
                <ul className="flex gap-2">
                  {statusOptions.map((item) => (
                    <ProjectFilterRadioInput
                      key={item.value}
                      name="status"
                      item={item}
                      selectedValue={status}
                      onChange={handleStatusChange}
                    />
                  ))}
                </ul>
              </fieldset>

              <fieldset>
                <legend className="mb-5 text-gray-400">참여 목적</legend>
                <ul className="flex flex-wrap gap-2">
                  {purposeOptions.map((item) => (
                    <ProjectFilterCheckBoxInput
                      key={item.value}
                      item={item}
                      selectedValues={projectType}
                      onChange={handleProjectTypeChange}
                      name="purpose"
                    />
                  ))}
                </ul>
              </fieldset>
              <fieldset>
                <legend className="mb-5 text-gray-400">포지션</legend>
                <ul className="flex flex-wrap gap-2">
                  {positionOptions.map((item) => (
                    <ProjectFilterCheckBoxInput
                      key={item.value}
                      item={item}
                      selectedValues={positions}
                      onChange={handlePositionChange}
                      name="position"
                    />
                  ))}
                </ul>
              </fieldset>
            </section>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="h-15 w-full text-[20px] font-semibold"
            onClick={handleReset}
          >
            초기화
          </Button>
          <Button
            className="h-15 w-full text-[20px] font-semibold"
            variant="primary"
            onClick={handleSubmit}
          >
            적용
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}
