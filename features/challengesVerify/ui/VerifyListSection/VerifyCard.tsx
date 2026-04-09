"use client";
import { AvatarIcon, Meetballs } from "@/shared/icons";
import { Dropdown } from "@/shared/ui";
import { useEffect, useRef, useState } from "react";

const isHost = true;
export default function VerifyCard() {
  const [isOverflow, setIsOverflow] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const descriptionRef = useRef<HTMLDivElement>(null);

  const description =
    "여기 각 내용임 두줄넘어가면 더보기해달래요.ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ";

  useEffect(() => {
    const checkOverflow = () => {
      const el = descriptionRef.current;
      if (el) {
        const isTextOverflow = el.scrollHeight > el.clientHeight;
        setIsOverflow(isTextOverflow);
      }
    };

    checkOverflow();

    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [description]);

  return (
    <div className="flex h-150 w-full flex-col gap-10 rounded-[20px] border border-gray-700 bg-gray-800 px-5 pt-10 pb-5">
      <div className="flex items-center justify-center gap-1.5">
        <AvatarIcon className="text-gray-800" width={52} height={52} />

        <div className="flex w-full items-center justify-between">
          <div className="flex flex-col">
            <span className="text-gray-400">닉네임</span>
            <span className="text-gray-600">1분 전</span>
          </div>
          {isHost ? (
            <div>dd</div>
          ) : (
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
                <Dropdown.Item className="px-3 py-2 hover:bg-gray-900">
                  수정
                </Dropdown.Item>
                <Dropdown.Item className="px-3 py-2 text-red-400 hover:bg-gray-900">
                  삭제
                </Dropdown.Item>
              </Dropdown.Content>
            </Dropdown>
          )}
        </div>
      </div>
      <div className="flex-1 rounded-[40px] bg-gray-700"></div>
      <div>
        <div
          ref={descriptionRef}
          className={`leading-6 text-gray-300 ${
            !expanded ? "line-clamp-2" : ""
          }`}
          style={{ maxHeight: !expanded ? "3rem" : "none" }}
        >
          {description}
        </div>

        {isOverflow && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-1 cursor-pointer text-[14px] font-semibold text-gray-400 hover:text-gray-200"
          >
            {expanded ? "접기" : "더보기"}
          </button>
        )}
      </div>
    </div>
  );
}
