import { cn } from "@/shared/utils";
import { MY_ROLE_TABS } from "../../model/mypage.constants";
import { MyRoleType } from "../../model/mypage.types";

interface MyRoleFilterProps {
  role: MyRoleType;
  onRoleChange: (role: MyRoleType) => void;
}

export default function MyRoleFilter({
  role,
  onRoleChange,
}: MyRoleFilterProps) {
  return (
    <div className="flex justify-center gap-1 rounded-full bg-gray-800 px-2.5 py-2 sm:w-fit sm:justify-start">
      {MY_ROLE_TABS.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onRoleChange(tab.value)}
          className={cn(
            "flex-1 cursor-pointer rounded-full px-3 py-2 text-sm font-medium whitespace-nowrap text-gray-50 transition-colors duration-200 sm:flex-none",
            role === tab.value
              ? "bg-mint-500 border-mint-500"
              : "border-none bg-transparent",
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
