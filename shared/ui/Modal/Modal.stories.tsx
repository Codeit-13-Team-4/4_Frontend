import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Button } from "@/shared/ui";
import { Modal } from "./Modal";

const meta: Meta<typeof Modal> = {
  title: "shared/ui/Modal",
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div className="flex min-h-screen items-center justify-center bg-gray-900">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Modal>;

export const WithScrollableBody: Story = {
  render: () => (
    <Modal>
      <Modal.Trigger asChild>
        <Button>스크롤 모달 열기</Button>
      </Modal.Trigger>
      <Modal.Content>
        <Modal.Header>
          <Modal.CloseIcon />
          <Modal.Title>스크롤 모달</Modal.Title>
        </Modal.Header>
        <Modal.Description>내용이 길면 Body만 스크롤됩니다.</Modal.Description>
        <Modal.Body>
          {Array.from({ length: 10 }).map((_, i) => (
            <p key={i} className="text-sm leading-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Modal.Close asChild>
            <Button variant="dark" className="flex-1">
              취소
            </Button>
          </Modal.Close>
          <Button className="flex-1">확인</Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  ),
};

export const WithFilter: Story = {
  render: () => (
    <Modal>
      <Modal.Trigger asChild>
        <Button>필터 모달 열기</Button>
      </Modal.Trigger>
      <Modal.Content>
        <Modal.Header className="flex-row items-center justify-between">
          <Modal.Title>필터</Modal.Title>
          <Modal.CloseIcon />
        </Modal.Header>
        <Modal.Body className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-gray-300">모집 상태</p>
            <div className="flex gap-2">
              {["전체", "모집중", "모집완료"].map((label) => (
                <button
                  key={label}
                  className="rounded-full border border-gray-600 px-4 py-1.5 text-sm text-gray-300"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-gray-300">포지션</p>
            <div className="flex flex-wrap gap-2">
              {["전체", "FE", "BE", "PM", "Designer"].map((label) => (
                <button
                  key={label}
                  className="rounded-full border border-gray-600 px-4 py-1.5 text-sm text-gray-300"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Modal.Close asChild>
            <Button variant="dark" className="flex-1">
              초기화
            </Button>
          </Modal.Close>
          <Button className="flex-1">적용</Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  ),
};

export const WithForm: Story = {
  render: () => (
    <Modal>
      <Modal.Trigger asChild>
        <Button>프로젝트 참여 신청하기</Button>
      </Modal.Trigger>
      <Modal.Content>
        <Modal.Header className="flex-row items-center justify-between">
          <Modal.Title>프로젝트 참여 신청하기</Modal.Title>
          <Modal.CloseIcon />
        </Modal.Header>
        <Modal.Description>
          작성하신 내용은 주최자에게 전달됩니다.
        </Modal.Description>
        <Modal.Body className="flex flex-col gap-4">
          <select className="w-full rounded-xl border border-gray-600 bg-gray-700 px-4 py-3 text-sm text-white outline-none">
            <option>희망 포지션</option>
          </select>
          <textarea
            placeholder="프로젝트에 참여하고 싶은 이유와 본인의 강점을 적어주세요."
            className="min-h-36 w-full resize-none rounded-xl border border-gray-600 bg-gray-700 px-4 py-3 text-sm text-white outline-none placeholder:text-gray-500"
          />
        </Modal.Body>
        <Modal.Footer>
          <Modal.Close asChild>
            <Button variant="dark" className="flex-1">
              취소
            </Button>
          </Modal.Close>
          <Button className="flex-1">지원하기</Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  ),
};
