import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Input } from "@/shared/ui/Input/Input";
import { Field, FieldError, FieldGroup, FieldLabel, FieldTitle } from "./Field";

const meta: Meta = {
  title: "shared/ui/Field",
  decorators: [
    (Story) => (
      <div className="flex min-h-screen items-center justify-center">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Field className="w-114">
      <FieldLabel htmlFor="default">이름</FieldLabel>
      <Input id="default" placeholder="이름을 입력하세요" />
    </Field>
  ),
};

export const WithRequired: Story = {
  render: () => (
    <Field className="w-114">
      <FieldLabel htmlFor="required" required>
        닉네임
      </FieldLabel>
      <Input id="required" placeholder="닉네임을 입력하세요" />
    </Field>
  ),
};

export const WithError: Story = {
  render: () => (
    <Field className="w-114">
      <FieldLabel htmlFor="error" required>
        닉네임
      </FieldLabel>
      <Input id="error" placeholder="닉네임을 입력하세요" />
      <FieldError>닉네임을 입력해주세요.</FieldError>
    </Field>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <Field orientation="horizontal" className="w-114">
      <FieldLabel htmlFor="horizontal">약관 동의</FieldLabel>
      <Input id="horizontal" type="checkbox" className="w-4" />
    </Field>
  ),
};

export const Group: Story = {
  render: () => (
    <FieldGroup className="w-114">
      <FieldTitle>기본 정보</FieldTitle>
      <Field>
        <FieldLabel htmlFor="group-name" required>
          이름
        </FieldLabel>
        <Input id="group-name" placeholder="이름을 입력하세요" />
        <FieldError>이름을 입력해주세요.</FieldError>
      </Field>
      <Field>
        <FieldLabel htmlFor="group-email">이메일</FieldLabel>
        <Input id="group-email" placeholder="이메일을 입력하세요" />
      </Field>
    </FieldGroup>
  ),
};
