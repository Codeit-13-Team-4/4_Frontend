import { Button } from "@/shared/ui";

interface SignupSubmitButtonProps {
  disabled: boolean;
  isPending: boolean;
}

export default function LoginSubmitButton({
  disabled,
  isPending,
}: SignupSubmitButtonProps) {
  return (
    <Button
      type="submit"
      variant="primary"
      disabled={disabled}
      className="w-full"
    >
      {isPending ? "회원가입 중..." : "회원가입"}
    </Button>
  );
}
