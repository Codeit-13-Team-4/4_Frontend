import { Field, FieldLabel, Input, Label } from "@/shared/ui";
import Image from "next/image";

export default function ProjectCreatePage() {
  return (
    <div className="text-gray-400">
      <Image
        src="/icons/common/chevron_left-icon.svg"
        alt=""
        width={16}
        height={16}
      />
      <section>
        <div className="text-[20px] text-gray-50">기본정보</div>
        <main>
          <Field>
            <FieldLabel required>프로젝트명</FieldLabel>
            <Input
              id="required"
              placeholder="프로젝트 모임명을 입력해주세요."
            />
          </Field>
        </main>
      </section>
    </div>
  );
}
