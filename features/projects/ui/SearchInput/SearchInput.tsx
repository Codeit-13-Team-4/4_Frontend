"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export function SearchInput() {
  const searchParams = useSearchParams();

  const [keyword, setKeyword] = useState(searchParams.get("search") ?? "");
  const router = useRouter();

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (keyword.trim()) {
      params.set("search", keyword);
    }

    router.push(`/projects?${params.toString()}`);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  return (
    <div className="relative">
      <input
        placeholder="키워드 입력"
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyDown={handleKeyDown}
        className="h-14 w-full rounded-full bg-gray-800 px-4 py-2 pr-10 text-gray-400 placeholder:text-[14px] placeholder:text-gray-400 focus:outline-none md:w-full md:placeholder:text-[16px] lg:w-137.5 lg:max-w-137.5"
      />
      <button onClick={handleSearch} className="cursor-pointer">
        <svg
          className="absolute top-1/2 right-3 h-4.5 w-4.5 -translate-y-1/2 md:h-6 md:w-6"
          viewBox="0 0 18 18"
          fill="#00d7a0"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.56055 0.823242C5.42708 0.526691 6.35016 0.432901 7.25879 0.547852H7.26074C9.84031 0.861085 11.9847 2.91244 12.418 5.47461L12.4189 5.47559C12.5685 6.34711 12.5233 7.2416 12.2871 8.09375C12.0509 8.94576 11.6295 9.73517 11.0527 10.4053L10.7529 10.7529L10.4053 11.0527C9.73517 11.6295 8.94576 12.0509 8.09375 12.2871C7.2416 12.5233 6.34711 12.5685 5.47559 12.4189L5.47461 12.418C2.91244 11.9847 0.861085 9.84031 0.547852 7.26074V7.25879L0.514648 6.91699C0.459827 6.11992 0.563802 5.31864 0.823242 4.56055C1.11986 3.69394 1.61111 2.90647 2.25879 2.25879C2.90647 1.61111 3.69394 1.11986 4.56055 0.823242ZM6.50098 1.50098C3.7352 1.50123 1.50123 3.7352 1.50098 6.50098C1.50098 9.26696 3.73505 11.5007 6.50098 11.501C9.26712 11.501 11.501 9.26712 11.501 6.50098C11.5007 3.73505 9.26696 1.50098 6.50098 1.50098ZM11.501 11.5098L11.3613 11.3643L11.2764 11.2764L11.3643 11.3613L11.5098 11.501H12.293L16.3867 15.6143L16.3877 15.6152C16.6024 15.8299 16.6023 16.1827 16.3877 16.3975C16.173 16.6122 15.8202 16.6122 15.6055 16.3975L11.501 12.293V11.5098Z"
            stroke="#00d7a0"
          />
        </svg>
      </button>
    </div>
  );
}
