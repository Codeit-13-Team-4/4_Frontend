"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import { useEffect } from "react";
import { cn } from "@/shared/utils";
import { tiptapExtensions } from "./tiptapExtensions";
import { TiptapEditorToolbar } from "./TiptapEditorToolbar";

interface TiptapEditorProps {
  value?: string;
  onChange?: (html: string) => void;
  onImageUpload?: (file: File) => Promise<string>;
  className?: string;
  disabled?: boolean;
}

function TiptapEditor({
  value,
  onChange,
  onImageUpload,
  className,
  disabled,
}: TiptapEditorProps) {
  const editor = useEditor({
    extensions: tiptapExtensions,
    content: value ?? "",
    immediatelyRender: false,
    editable: !disabled,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: cn(
          "min-h-[300px] w-full bg-transparent px-3 py-3 outline-none",
          "prose prose-invert max-w-none",
          "prose-headings:font-bold prose-a:text-mint-500",
          "prose-p:my-0 prose-headings:my-0 prose-ul:my-0 prose-ol:my-0",
        ),
      },
    },
  });

  useEffect(() => {
    if (editor && value !== undefined && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  return (
    <div
      className={cn(
        "flex flex-col overflow-hidden rounded-xl border border-gray-700 bg-gray-900",
        disabled && "cursor-not-allowed",
        className,
      )}
    >
      <TiptapEditorToolbar
        editor={editor}
        disabled={disabled}
        onImageUpload={onImageUpload}
      />
      <div className="overflow-y-auto">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

export { TiptapEditor };
