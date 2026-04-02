import Image from "next/image";

export default function CommentEmpty() {
  return (
    <div className="mt-8 flex flex-col items-center gap-4 py-16 text-gray-400">
      <Image
        src="/common/icons/empty.svg"
        alt="empty"
        width={121}
        height={72}
      />
      <p>등록된 댓글이 없습니다.</p>
    </div>
  );
}
