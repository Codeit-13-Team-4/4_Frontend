interface ResizeResult {
  file: File;
  width: number;
  height: number;
}

export async function resizeImageFile(
  file: File,
  maxWidth: number,
  maxHeight: number,
): Promise<ResizeResult> {
  return new Promise((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const ratio = Math.min(maxWidth / img.width, maxHeight / img.height, 1);
      const width = Math.round(img.width * ratio);
      const height = Math.round(img.height * ratio);
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      canvas.getContext("2d")!.drawImage(img, 0, 0, width, height);
      URL.revokeObjectURL(url);
      canvas.toBlob(
        (blob) =>
          resolve({
            file: new File([blob!], file.name, { type: "image/webp" }),
            width,
            height,
          }),
        "image/webp",
        0.85,
      );
    };
    img.src = url;
  });
}
