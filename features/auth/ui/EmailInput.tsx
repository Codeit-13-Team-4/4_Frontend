import { Field, FieldError, FieldLabel, Input } from "@/shared/ui";
import { getInputClassName, handleInputChange } from "../util/signupUtil";
import { SocialSignupFormValues } from "./SocialSignupForm";

interface EmailInputProps {
  email: string;
  isDisabled?: boolean;
  setForm: React.Dispatch<React.SetStateAction<SocialSignupFormValues>>;
  isPending: boolean;
}
const EmailInput = (props: EmailInputProps) => {
  const { email, isDisabled, setForm, isPending } = props;
  return (
    <Field>
      <FieldLabel htmlFor="email" required className="text-gray-50">
        이메일
      </FieldLabel>

      <Input
        id="email"
        name="email"
        type="email"
        value={email}
        onChange={(e) => handleInputChange(e, setForm)}
        placeholder="이메일을 입력해주세요"
        className={getInputClassName(!email && isPending ? true : false)}
        disabled={isDisabled ? true : false}
      />

      <FieldError className="min-h-5">
        {!email && isPending ? "이메일 형식이 아니거나 올바르지 않습니다" : ""}
      </FieldError>
    </Field>
  );
};

export default EmailInput;
