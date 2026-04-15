"use client";

import type { Editor } from "@tiptap/react";
import { DropdownMenu, Popover } from "radix-ui";
import { useRef, useState } from "react";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  ChevronDownIcon,
  Italic,
  LineMdLink,
  List,
  MediaImage,
  NumberedListLeft,
  Strikethrough,
  Underline,
} from "@/shared/icons";
import { cn } from "@/shared/utils";

interface TiptapEditorToolbarProps {
  editor: Editor | null;
  disabled?: boolean;
  onImageUpload?: (file: File) => Promise<string>;
}

interface ToolbarButtonProps {
  onClick: () => void;
  isActive?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  title?: string;
}

function ToolbarButton({
  onClick,
  isActive,
  disabled,
  children,
  title,
}: ToolbarButtonProps) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "rounded-md p-1.5 transition-colors",
        "text-gray-400 hover:bg-gray-700 hover:text-white",
        isActive && "bg-gray-700 text-white",
        disabled && "cursor-not-allowed opacity-40",
      )}
    >
      {children}
    </button>
  );
}

function Divider() {
  return <div className="mx-1 h-5 w-px bg-gray-700" />;
}

const HEADING_OPTIONS = [
  { label: "본문", value: 0 },
  { label: "제목 1", value: 1 },
  { label: "제목 2", value: 2 },
  { label: "제목 3", value: 3 },
  { label: "제목 4", value: 4 },
] as const;

function HeadingDropdown({
  editor,
  disabled,
}: {
  editor: Editor;
  disabled?: boolean;
}) {
  const activeHeading = HEADING_OPTIONS.find(({ value }) =>
    value === 0
      ? !editor.isActive("heading")
      : editor.isActive("heading", { level: value }),
  );

  const handleSelect = (value: string) => {
    const level = Number(value);
    if (level === 0) {
      editor.chain().focus().setParagraph().run();
    } else {
      editor
        .chain()
        .focus()
        .toggleHeading({ level: level as 1 | 2 | 3 | 4 })
        .run();
    }
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger
        disabled={disabled}
        className={cn(
          "flex items-center gap-1 rounded-md px-2 py-1.5 text-sm transition-colors",
          "text-gray-400 hover:bg-gray-700 hover:text-white",
          disabled && "cursor-not-allowed opacity-40",
        )}
      >
        <span className="w-14">{activeHeading?.label ?? "본문"}</span>
        <ChevronDownIcon width={16} height={16} />
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="z-50 min-w-25 rounded-lg border border-gray-700 bg-gray-800 p-1 shadow-lg"
          sideOffset={5}
        >
          {HEADING_OPTIONS.map(({ label, value }) => (
            <DropdownMenu.Item
              key={value}
              onSelect={() => handleSelect(String(value))}
              className={cn(
                "cursor-pointer rounded-md px-3 py-1.5 text-sm transition-colors outline-none",
                "text-gray-300 hover:bg-gray-700 hover:text-white",
                (value === 0
                  ? !editor.isActive("heading")
                  : editor.isActive("heading", { level: value })) &&
                  "bg-gray-700 text-white",
              )}
            >
              {label}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

function LinkPopover({
  editor,
  disabled,
}: {
  editor: Editor;
  disabled?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");

  const handleOpenChange = (next: boolean) => {
    if (next) {
      setUrl(editor.getAttributes("link").href ?? "");
    }
    setOpen(next);
  };

  const handleApply = () => {
    if (url === "") {
      editor.chain().focus().unsetLink().run();
    } else {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    }
    setOpen(false);
  };

  const handleRemove = () => {
    editor.chain().focus().unsetLink().run();
    setOpen(false);
  };

  return (
    <Popover.Root open={open} onOpenChange={handleOpenChange}>
      <Popover.Trigger asChild>
        <button
          type="button"
          title="링크"
          disabled={disabled}
          className={cn(
            "rounded-md p-1.5 transition-colors",
            "text-gray-400 hover:bg-gray-700 hover:text-white",
            editor.isActive("link") && "bg-gray-700 text-white",
            disabled && "cursor-not-allowed opacity-40",
          )}
        >
          <LineMdLink width={20} height={20} />
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          sideOffset={6}
          align="center"
          className="z-50 flex flex-col gap-2 rounded-lg border border-gray-700 bg-gray-800 p-3 shadow-lg"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleApply();
              if (e.key === "Escape") setOpen(false);
            }}
            placeholder="https://..."
            className="h-9 rounded-md border border-gray-600 bg-gray-900 px-3 text-sm text-white outline-none placeholder:text-gray-500 focus:border-gray-400"
          />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleApply}
              className="flex-1 rounded-md bg-gray-50 px-3 py-1.5 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-300"
            >
              적용
            </button>
            {editor.isActive("link") && (
              <button
                type="button"
                onClick={handleRemove}
                className="rounded-md border border-gray-600 px-3 py-1.5 text-sm text-gray-400 transition-colors hover:border-gray-400 hover:text-white"
              >
                제거
              </button>
            )}
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

function TiptapEditorToolbar({
  editor,
  disabled,
  onImageUpload,
}: TiptapEditorToolbarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!editor) return null;

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !onImageUpload) return;

    const url = await onImageUpload(file);
    editor.chain().focus().setImage({ src: url, alt: file.name }).run();

    e.target.value = "";
  };

  return (
    <div className="flex flex-wrap items-center gap-0.5 border-b border-gray-700 p-2">
      {/* Heading Dropdown */}
      <HeadingDropdown editor={editor} disabled={disabled} />

      <Divider />

      {/* Text Format */}
      <ToolbarButton
        title="굵게"
        onClick={() => editor.chain().focus().toggleBold().run()}
        isActive={editor.isActive("bold")}
        disabled={disabled}
      >
        <Bold width={20} height={20} />
      </ToolbarButton>
      <ToolbarButton
        title="기울임"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        isActive={editor.isActive("italic")}
        disabled={disabled}
      >
        <Italic width={20} height={20} />
      </ToolbarButton>
      <ToolbarButton
        title="밑줄"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        isActive={editor.isActive("underline")}
        disabled={disabled}
      >
        <Underline width={20} height={20} />
      </ToolbarButton>
      <ToolbarButton
        title="취소선"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        isActive={editor.isActive("strike")}
        disabled={disabled}
      >
        <Strikethrough width={20} height={20} />
      </ToolbarButton>

      <Divider />

      {/* Align */}
      <ToolbarButton
        title="왼쪽 정렬"
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        isActive={editor.isActive({ textAlign: "left" })}
        disabled={disabled}
      >
        <AlignLeft width={20} height={20} />
      </ToolbarButton>
      <ToolbarButton
        title="가운데 정렬"
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        isActive={editor.isActive({ textAlign: "center" })}
        disabled={disabled}
      >
        <AlignCenter width={20} height={20} />
      </ToolbarButton>
      <ToolbarButton
        title="오른쪽 정렬"
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        isActive={editor.isActive({ textAlign: "right" })}
        disabled={disabled}
      >
        <AlignRight width={20} height={20} />
      </ToolbarButton>
      <ToolbarButton
        title="양쪽 정렬"
        onClick={() => editor.chain().focus().setTextAlign("justify").run()}
        isActive={editor.isActive({ textAlign: "justify" })}
        disabled={disabled}
      >
        <AlignJustify width={20} height={20} />
      </ToolbarButton>

      <Divider />

      {/* List */}
      <ToolbarButton
        title="순서 없는 목록"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        isActive={editor.isActive("bulletList")}
        disabled={disabled}
      >
        <List width={20} height={20} />
      </ToolbarButton>
      <ToolbarButton
        title="순서 있는 목록"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        isActive={editor.isActive("orderedList")}
        disabled={disabled}
      >
        <NumberedListLeft width={20} height={20} />
      </ToolbarButton>

      <Divider />

      {/* Link & Image */}
      <LinkPopover editor={editor} disabled={disabled} />
      {onImageUpload && (
        <>
          <ToolbarButton
            title="이미지"
            onClick={handleImageClick}
            disabled={disabled}
          >
            <MediaImage width={20} height={20} />
          </ToolbarButton>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </>
      )}
    </div>
  );
}

export { TiptapEditorToolbar };
