import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import StarterKit from "@tiptap/starter-kit";

export const tiptapExtensions = [
  StarterKit.configure({
    heading: { levels: [1, 2, 3, 4] },
    link: {
      openOnClick: false,
      HTMLAttributes: {
        class: "text-mint-500 underline cursor-pointer",
      },
    },
  }),
  TextAlign.configure({
    types: ["heading", "paragraph"],
    alignments: ["left", "center", "right", "justify"],
  }),
  Image.configure({
    inline: false,
    allowBase64: true,
    HTMLAttributes: {
      class: "max-w-[600px] w-full rounded-lg",
    },
  }),
];
