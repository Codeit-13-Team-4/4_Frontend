import { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as Icons from "@/shared/icons";

const meta: Meta = {
  title: "shared/icons",
  parameters: {
    layout: "fullscreen",
  },
};
export default meta;
type Story = StoryObj<typeof IconGallery>;

function IconGallery() {
  const iconList = Object.entries(Icons);

  return (
    <div className="min-h-screen bg-gray-50 p-10 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl">
        <header className="mb-12 border-b border-gray-200 pb-6 dark:border-gray-800">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Icon Components Gallery
          </h1>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            총
            <span className="font-semibold text-blue-600">
              {iconList.length}개
            </span>
            의 아이콘이
            <code className="mx-1 rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm dark:bg-gray-800">
              shared/icons
            </code>
            에 정의되어 있습니다.
          </p>
        </header>

        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
          {iconList.map(([name, IconComponent]) => (
            <div
              key={name}
              className="group flex flex-col items-center justify-center rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 hover:border-emerald-400 hover:shadow-md dark:border-gray-800 dark:bg-gray-900 dark:hover:border-emerald-500"
            >
              <div className="flex h-12 w-12 items-center justify-center transition-transform duration-200 group-hover:scale-110 dark:text-gray-200">
                <IconComponent className="h-full max-h-full w-full max-w-full text-gray-600" />
              </div>

              <p className="mt-4 text-center font-mono text-[11px] font-medium break-all text-gray-400 select-all group-hover:text-gray-600 dark:group-hover:text-gray-300">
                {name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export const Default: Story = {
  render: IconGallery,
};
