import { Button } from "@/shared/ui";

interface LoginSubmitButtonProps {
  disabled: boolean;
  isPending: boolean;
}

export default function LoginSubmitButton({
  disabled,
  isPending,
}: LoginSubmitButtonProps) {
  return (
    <Button type="submit" disabled={disabled} className="w-full">
      {isPending ? "로그인 중..." : "로그인"}
    </Button>
  );
}
