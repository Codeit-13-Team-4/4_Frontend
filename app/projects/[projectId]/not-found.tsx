import Image from "next/image";
import Link from "next/link";
import { Button } from "@/shared/ui";

export default function ProjectsDetailNotFound() {
  return (
    <div className="flex h-full min-h-[calc(100vh-64px)] w-full flex-col items-center justify-center gap-6">
      <Image
        src="/images/img_empty.png"
        alt="프로젝트 없음"
        width={121}
        height={72}
      />
      <div className="flex flex-col items-center gap-2">
        <p className="text-lg font-semibold text-gray-200">
          프로젝트를 찾을 수 없습니다
        </p>
        <p className="text-sm text-gray-500">
          삭제되었거나 존재하지 않는 프로젝트입니다.
        </p>
      </div>
      <div className="flex gap-4">
        <Button asChild variant="dark">
          <Link href={"/"}>홈으로 가기</Link>
        </Button>

        <Button asChild variant="default">
          <Link href={"/projects"}>프로젝트 목록</Link>
        </Button>
      </div>
    </div>
  );
}
