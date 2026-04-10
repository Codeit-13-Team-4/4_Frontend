import Image from "next/image";

export default function MyCommentEmpty() {
  return (
    <div className="flex flex-col items-center gap-4 py-16 text-gray-400">
      <Image src="/images/img_empty.png" alt="empty" width={121} height={72} />
      <p>작성한 댓글이 없어요</p>
    </div>
  );
}
