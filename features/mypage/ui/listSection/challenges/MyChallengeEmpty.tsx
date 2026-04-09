import Image from "next/image";

export default function MyChallengeEmpty() {
  return (
    <div className="flex flex-col items-center gap-4 py-16 text-gray-400">
      <Image src="/images/img_empty.png" alt="empty" width={121} height={72} />
      <p>아직 챌린지가 없어요</p>
    </div>
  );
}
