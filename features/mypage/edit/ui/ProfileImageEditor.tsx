"use client";

import { useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui";
import { useUploadImage } from "@/shared/hooks/useUploadImage";
import { resizeImageFile } from "@/shared/utils";
import { AvatarIcon, Pencil } from "@/shared/icons";

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

    const { file: resized } = await resizeImageFile(file, 200, 200);
    const path = await mutateAsync(resized);
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
          <Pencil className="size-4 text-gray-50 md:size-6" />
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
