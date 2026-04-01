import { cn } from "@/shared/utils";
import Image from "next/image";

function LikeButton({
  liked,
  onToggle,
  className,
  ...props
}: React.ComponentProps<"button"> & {
  liked: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={cn(
        "flex items-center justify-center rounded-full border p-2 transition-all duration-100 hover:cursor-pointer active:scale-90",
        liked ? "border-mint-500" : "border-gray-700",
        className,
      )}
      {...props}
    >
      <Image
        src={
          liked
            ? "/common/icons/heart-active.svg"
            : "/common/icons/heart-disable.svg"
        }
        alt={liked ? "좋아요 취소" : "좋아요"}
        width={24}
        height={24}
      />
    </button>
  );
}

export { LikeButton };
