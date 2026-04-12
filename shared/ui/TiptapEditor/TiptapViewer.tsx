import { cn } from "@/shared/utils";

interface TiptapViewerProps {
  content: string;
  className?: string;
}

function TiptapViewer({ content, className }: TiptapViewerProps) {
  return (
    <div
      className={cn(
        "prose prose-invert max-w-none",
        "prose-headings:font-bold prose-a:text-mint-500",
        "prose-p:my-0 prose-headings:my-0 prose-ul:my-0 prose-ol:my-0",
        className,
      )}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}

export { TiptapViewer };
