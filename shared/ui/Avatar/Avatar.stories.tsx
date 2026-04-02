import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Avatar, AvatarFallback, AvatarImage } from "./Avatar";

const meta: Meta<typeof Avatar> = {
  title: "shared/ui/Avatar",
  component: Avatar,
  decorators: [
    (Story) => (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <Story />
      </div>
    ),
  ],
  args: {
    size: "default",
  },
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "default", "lg"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const WithImage: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage
        src="/common/avatar/default-avatar-md.svg"
        alt="프로필 이미지"
      />
      <AvatarFallback>Dev</AvatarFallback>
    </Avatar>
  ),
};

export const Fallback: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage src="" alt="프로필 이미지" />
      <AvatarFallback>Dev</AvatarFallback>
    </Avatar>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar size="sm">
        <AvatarImage
          src="/common/avatar/default-avatar-sm.svg"
          alt="프로필 이미지"
        />
        <AvatarFallback>SM</AvatarFallback>
      </Avatar>
      <Avatar size="default">
        <AvatarImage
          src="/common/avatar/default-avatar-md.svg"
          alt="프로필 이미지"
        />
        <AvatarFallback>MD</AvatarFallback>
      </Avatar>
      <Avatar size="lg">
        <AvatarImage
          src="/common/avatar/default-avatar-lg.svg"
          alt="프로필 이미지"
        />
        <AvatarFallback>LG</AvatarFallback>
      </Avatar>
    </div>
  ),
};
