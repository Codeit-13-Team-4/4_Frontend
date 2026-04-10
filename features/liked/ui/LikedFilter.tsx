"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ChallengesFilterButton,
  ChallengesFilterRadioInput,
} from "@/features/challenges/ui";
import { POSITION_LABELS, STATUS_LABEL } from "@/features/projects/model";
import {
  ProjectFilterButton,
  ProjectFilterRadioInput,
  ProjectFilterCheckBoxInput,
} from "@/features/projects/ui";
import { Button, Modal } from "@/shared/ui";

const FILTER_STATUS_LABEL: Record<string, string> = {
  RECRUITING: "모집중",
  RECRUITMENT_CLOSED: "모집 완료",
};

const FILTER_PARTICIPATION_LABELS: Record<string, string> = {
  INSTANT: "즉시 참여",
  APPROVAL: "승인제",
};

const statusOptions = [
  { value: "all", label: "전체" },
  { value: "RECRUITING", label: "모집중" },
  { value: "RECRUITMENT_CLOSED", label: "모집완료" },
];

const participationTypeOptions = [
  { value: "all", label: "전체" },
  { value: "INSTANT", label: "즉시 참여" },
  { value: "APPROVAL", label: "승인제" },
];

const projectStatusOptions = [
  { value: "all", label: "전체" },
  { value: "recruiting", label: "모집중" },
  { value: "recruitment_closed", label: "모집완료" },
  { value: "in_progress", label: "진행중" },
  { value: "completed", label: "완료" },
];

const positionOptions = Object.entries(POSITION_LABELS).map(
  ([value, label]) => ({
    value,
    label,
  }),
);

function formatFilterLabel(
  values: string[],
  labelMap: Record<string, string>,
  defaultLabel: string,
) {
  if (!values.length) {
    return defaultLabel;
  }

  if (values.length === 1) {
    return labelMap[values[0]] ?? defaultLabel;
  }

  return `${labelMap[values[0]]} 외 ${values.length - 1}`;
}

export function LikedFilter() {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState("all");
  const [participationType, setParticipationType] = useState("all");
  const [positions, setPositions] = useState<string[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const isProjectTab = searchParams.get("tab") === "project";

  const currentStatus = searchParams.get("status");
  const currentParticipationType = searchParams.get("participationType");
  const currentPositions = searchParams.getAll("positions");

  const filterLabel = isProjectTab
    ? {
        status: currentStatus
          ? STATUS_LABEL[currentStatus as keyof typeof STATUS_LABEL]
          : "모집 상태",
        positions: formatFilterLabel(
          currentPositions,
          POSITION_LABELS,
          "포지션",
        ),
      }
    : {
        status: currentStatus
          ? FILTER_STATUS_LABEL[currentStatus]
          : "모집 상태",
        participationType: currentParticipationType
          ? FILTER_PARTICIPATION_LABELS[currentParticipationType]
          : "모집 방식",
      };

  const handleReset = () => {
    setStatus("all");
    setParticipationType("all");
    setPositions([]);
  };

  const handleOpen = () => {
    setStatus(searchParams.get("status") ?? "all");
    setParticipationType(searchParams.get("participationType") ?? "all");
    setPositions(searchParams.getAll("positions"));
    setIsOpen(true);
  };

  const handleCheckboxChange =
    (setter: React.Dispatch<React.SetStateAction<string[]>>) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value, checked } = event.target;

      setter((prev) =>
        checked ? [...prev, value] : prev.filter((item) => item !== value),
      );
    };

  const handleSubmit = () => {
    const params = new URLSearchParams();
    const currentSort = searchParams.get("sort");

    if (isProjectTab) {
      params.set("tab", "project");
    }

    if (currentSort) {
      params.set("sort", currentSort);
    }

    if (status !== "all") {
      params.set("status", status);
    }

    if (isProjectTab) {
      positions.forEach((position) => {
        params.append("positions", position);
      });
    } else {
      if (participationType !== "all") {
        params.set("participationType", participationType);
      }
    }

    const queryString = params.toString();

    router.push(queryString ? `/liked?${queryString}` : "/liked");
    setIsOpen(false);
  };

  return (
    <>
      <div className="mb-6 flex items-center justify-between text-[14px] md:mb-0">
        <div className="flex gap-3">
          {Object.values(filterLabel).map((item) =>
            isProjectTab ? (
              <ProjectFilterButton
                key={item}
                label={item}
                onClick={handleOpen}
              />
            ) : (
              <ChallengesFilterButton
                key={item}
                label={item}
                onClick={handleOpen}
              />
            ),
          )}
        </div>
      </div>

      <Modal open={isOpen} onOpenChange={setIsOpen}>
        <Modal.Overlay />
        <Modal.Content className="bg-gray-800 p-6 md:p-12">
          <Modal.Header className="flex-row items-center justify-between">
            <Modal.Title className="text-[24px] text-gray-200">
              필터
            </Modal.Title>
            <Modal.CloseIcon className="static text-gray-200" />
          </Modal.Header>

          <Modal.Body>
            {isProjectTab ? (
              <section className="mb-14 flex flex-col gap-6">
                <fieldset>
                  <legend className="mb-4 text-gray-400">모집 상태</legend>
                  <ul className="flex flex-wrap gap-2">
                    {projectStatusOptions.map((item) => (
                      <ProjectFilterRadioInput
                        key={item.value}
                        name="status"
                        item={item}
                        selectedValue={status}
                        onChange={(event) => setStatus(event.target.value)}
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
                        name="positions"
                        item={item}
                        selectedValues={positions}
                        onChange={handleCheckboxChange(setPositions)}
                      />
                    ))}
                  </ul>
                </fieldset>
              </section>
            ) : (
              <section className="mb-14 flex flex-col gap-6">
                <fieldset>
                  <legend className="mb-4 text-gray-400">모집 상태</legend>
                  <ul className="flex gap-2">
                    {statusOptions.map((item) => (
                      <ChallengesFilterRadioInput
                        key={item.value}
                        name="status"
                        item={item}
                        selectedValue={status}
                        onChange={(event) => setStatus(event.target.value)}
                      />
                    ))}
                  </ul>
                </fieldset>

                <fieldset>
                  <legend className="mb-5 text-gray-400">모집 방식</legend>
                  <ul className="flex gap-2">
                    {participationTypeOptions.map((item) => (
                      <ChallengesFilterRadioInput
                        key={item.value}
                        name="participationType"
                        item={item}
                        selectedValue={participationType}
                        onChange={(event) =>
                          setParticipationType(event.target.value)
                        }
                      />
                    ))}
                  </ul>
                </fieldset>
              </section>
            )}
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
    </>
  );
}
