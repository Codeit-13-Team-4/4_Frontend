import { getRandomName } from "@/shared/utils";

/**
 * input에 에러가 있을때 빨간색 테두리 보여주는 함수
 */
export const getInputClassName = (hasError: boolean) =>
  hasError ? "border border-error" : "";
/**
 * 제출하기 눌렀을때 에러메세지 보여주는 함수
 */
export const shouldShowError = (value: string, isSubmitted: boolean) =>
  isSubmitted || value.length > 0;

export const handleInputChange = <T>(
  e: React.ChangeEvent<HTMLInputElement>,
  setForm: React.Dispatch<React.SetStateAction<T>>,
) => {
  const { name, value } = e.target;

  setForm((prev) => ({
    ...prev,
    [name]: value,
  }));
};

export const handleRandomNickname = <T>(
  setForm: React.Dispatch<React.SetStateAction<T>>,
) => {
  setForm((prev) => ({
    ...prev,
    nickname: getRandomName(),
  }));
};
