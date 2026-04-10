"use client";

import { EditorContent, useEditor } from "@tiptap/react";

import { cn } from "@/shared/utils";

import { tiptapExtensions } from "./tiptapExtensions";

interface TiptapViewerProps {
  content: string;
  className?: string;
}

function TiptapViewer({ content, className }: TiptapViewerProps) {
  const editor = useEditor({
    extensions: tiptapExtensions,
    content,
    editable: false,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: cn(
          "prose prose-invert max-w-none",
          "prose-headings:font-bold prose-a:text-mint-500",
          "prose-p:my-0 prose-headings:my-0 prose-ul:my-0 prose-ol:my-0",
          className,
        ),
      },
    },
  });

  return <EditorContent editor={editor} />;
}

export { TiptapViewer };
