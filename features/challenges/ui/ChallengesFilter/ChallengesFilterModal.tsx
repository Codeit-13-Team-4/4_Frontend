"use client";
import { Button, Modal } from "@/shared/ui";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChallengesFilterRadioInput } from "@/features/challenges/ui";

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

type ChallengesFilterModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function ChallengesFilterModal({
  isOpen,
  onClose,
}: ChallengesFilterModalProps) {
  const [status, setStatus] = useState<string>("all");
  const [participationType, setParticipationType] = useState("all");

  const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStatus(e.target.value);
  };
  const handleParticipationChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setParticipationType(e.target.value);
  };

  const router = useRouter();
  const searchParams = useSearchParams();

  const handleReset = () => {
    setStatus("all");
    setParticipationType("all");
  };

  const handleSubmit = () => {
    const params = new URLSearchParams(searchParams.toString());

    params.delete("search");

    if (status !== "all") {
      params.set("status", status);
    } else {
      params.delete("status");
    }

    if (participationType !== "all") {
      params.set("participationType", participationType);
    } else {
      params.delete("participationType");
    }

    router.push(`/challenges?${params.toString()}`);
    onClose();
  };

  return (
    <Modal open={isOpen} onOpenChange={onClose}>
      <Modal.Overlay />
      <Modal.Content className="bg-gray-800 p-6 md:p-12">
        <Modal.Header className="flex-row items-center justify-between">
          <Modal.Title className="text-[24px] text-gray-200">필터</Modal.Title>
          <Modal.CloseIcon className="static text-gray-200" />
        </Modal.Header>

        <Modal.Body>
          <div className="">
            <section className="mb-14 flex flex-col gap-6">
              <fieldset>
                <legend className="mb-4 text-gray-400">모집 상태</legend>
                <ul className="flex gap-2">
                  {statusOptions.map((item) => {
                    return (
                      <ChallengesFilterRadioInput
                        key={item.value}
                        name="status"
                        item={item}
                        selectedValue={status}
                        onChange={handleStatusChange}
                      />
                    );
                  })}
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
                      onChange={handleParticipationChange}
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
