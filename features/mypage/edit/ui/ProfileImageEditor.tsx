"use client";

import { useRef, useState } from "react";
import { PencilIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui";
import { useUploadImage } from "@/shared/hooks/useUploadImage";
import { AvatarIcon } from "@/shared/icons";

interface Props {
  value: string | null;
  onChange: (path: string | null) => void;
}

export default function ProfileImageEditor({ value, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const { mutateAsync, isPending } = useUploadImage();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    const path = await mutateAsync(file);
    onChange(path);

    URL.revokeObjectURL(objectUrl);
  };

  return (
    <div className="relative w-fit">
      <button
        type="button"
        disabled={isPending}
        onClick={() => inputRef.current?.click()}
        className="group relative cursor-pointer disabled:cursor-not-allowed"
      >
        <Avatar size="lg" className="size-20 md:size-28">
          <AvatarImage src={preview ?? value ?? ""} alt="프로필 이미지" />
          <AvatarFallback>
            <AvatarIcon width={120} height={120} className="text-gray-800" />
          </AvatarFallback>
        </Avatar>

        <div className="absolute right-0 bottom-0 flex size-6 items-center justify-center rounded-full border border-gray-600 bg-gray-700 transition-colors group-hover:bg-gray-600 group-disabled:opacity-50 md:size-8">
          <PencilIcon className="size-3 text-gray-200 md:size-4" />
        </div>
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}
