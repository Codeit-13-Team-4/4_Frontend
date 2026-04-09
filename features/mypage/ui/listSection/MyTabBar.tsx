import { MY_TAB_ITEMS } from "@/features/mypage/model/mypage.constants";
import { MyTab } from "@/features/mypage/model/mypage.types";

interface MyTabBarProps {
  activeTab: MyTab;
  onTabChange: (tab: MyTab) => void;
}

export default function MyTabBar({ activeTab, onTabChange }: MyTabBarProps) {
  return (
    <div className="flex justify-center border-b-2 border-gray-700 sm:justify-start">
      {MY_TAB_ITEMS.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onTabChange(tab.value)}
          className={`flex-1 border-b px-6 py-2 text-sm font-semibold whitespace-nowrap text-gray-600 hover:cursor-pointer sm:flex-none sm:px-10 sm:py-4.25 sm:text-lg ${
            activeTab === tab.value
              ? "border-mint-500 text-mint-500"
              : "border-transparent text-gray-600"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
