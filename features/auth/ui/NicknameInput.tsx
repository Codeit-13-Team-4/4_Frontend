import { Field, FieldError, FieldLabel, Input } from "@/shared/ui";
import Image from "next/image";
import {
  getInputClassName,
  handleInputChange,
  handleRandomNickname,
} from "../util/signupUtil";
import { SocialSignupFormValues } from "./SocialSignupForm";

interface NicknameInputProps {
  nickName: string;
  setForm: React.Dispatch<React.SetStateAction<SocialSignupFormValues>>;
  isPending: boolean;
}
const NicknameInput = (props: NicknameInputProps) => {
  const { nickName, setForm, isPending } = props;
  return (
    <Field>
      <FieldLabel htmlFor="nickname" required className="text-gray-50">
        닉네임
      </FieldLabel>

      <div className="flex items-center gap-1">
        <Input
          id="nickname"
          name="nickname"
          type="text"
          value={nickName}
          onChange={(e) => handleInputChange(e, setForm)}
          placeholder="닉네임을 입력해주세요"
          className={getInputClassName(!nickName && isPending ? true : false)}
        />

        <button
          type="button"
          onClick={() => handleRandomNickname(setForm)}
          className="text-mint-500 flex shrink-0 items-center gap-1 text-sm"
        >
          <Image
            src="/auth/randomIcon.svg"
            alt="랜덤설정 아이콘"
            width={24}
            height={24}
          />
          <span>랜덤설정</span>
        </button>
      </div>

      <FieldError className="min-h-5">
        {!nickName && isPending ? "닉네임을 작성해 주세요" : ""}
      </FieldError>
    </Field>
  );
};

export default NicknameInput;
