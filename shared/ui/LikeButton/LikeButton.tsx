import { Heart, HeartActive } from "@/shared/icons";
import { cn } from "@/shared/utils";

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
      aria-label={liked ? "좋아요 취소" : "좋아요"}
      className={cn(
        "flex items-center justify-center rounded-full transition-all duration-100 hover:cursor-pointer active:scale-90",
        className,
      )}
      {...props}
    >
      {liked ? (
        <HeartActive width={40} height={40} />
      ) : (
        <Heart width={40} height={40} />
      )}
    </button>
  );
}

export { LikeButton };
