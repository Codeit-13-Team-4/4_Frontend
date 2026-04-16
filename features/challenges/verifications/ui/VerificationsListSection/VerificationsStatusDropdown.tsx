import { Meetballs } from "@/shared/icons";
import { Dropdown } from "@/shared/ui";

export function VerificationsStatusDropdown({ ...props }) {
  const { onEdit, onDelete } = props;
  return (
    <Dropdown>
      <Dropdown.Trigger>
        <button type="button" aria-label="인증 메뉴">
          <Meetballs width={24} height={24} className="text-gray-400" />
        </button>
      </Dropdown.Trigger>
      <Dropdown.Content
        align="end"
        className="min-w-24 border-gray-700 bg-gray-800 text-sm text-gray-200"
      >
        <Dropdown.Item className="px-3 py-2 hover:bg-gray-900" onClick={onEdit}>
          수정
        </Dropdown.Item>
        <Dropdown.Item
          className="px-3 py-2 text-red-400 hover:bg-gray-900"
          onClick={onDelete}
        >
          삭제
        </Dropdown.Item>
      </Dropdown.Content>
    </Dropdown>
  );
}
