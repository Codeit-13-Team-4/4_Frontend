import { ApiError } from "@/shared/lib/errors/ApiError";
import { fetchClient } from "@/shared/lib/client/fetchClient";
import type { TechStackKey } from "@/shared/types/techStack";
import type { JobLabelType } from "@/shared/types/user";

interface CompleteSignupProfileRequest {
  nickname: string;
  jobLabel: JobLabelType;
  bio: string;
  skills: TechStackKey[];
  externalLink: string;
}

const PROFILE_SAVE_FAILED_MESSAGE =
  "추가 정보를 저장하지 못했어요. 잠시 후 다시 시도해주세요.";
function resolveProfileLinks(externalLink: string) {
  const trimmedLink = externalLink.trim();

  if (!trimmedLink) {
    return {
      githubLink: null,
      blogLink: null,
      portfolioLink: null,
    };
  }

  const hostname = new URL(trimmedLink).hostname.toLowerCase();

  if (hostname.includes("github.com")) {
    return {
      githubLink: trimmedLink,
      blogLink: null,
      portfolioLink: null,
    };
  }

  if (
    hostname.includes("notion.") ||
    hostname.includes("velog.io") ||
    hostname.includes("tistory.com") ||
    hostname.includes("blog.naver.com") ||
    hostname.includes("brunch.co.kr") ||
    hostname.includes("medium.com")
  ) {
    return {
      githubLink: null,
      blogLink: trimmedLink,
      portfolioLink: null,
    };
  }

  return {
    githubLink: null,
    blogLink: null,
    portfolioLink: trimmedLink,
  };
}

export async function completeSignupProfile(
  payload: CompleteSignupProfileRequest,
) {
  const links = resolveProfileLinks(payload.externalLink);
  const requestBody = JSON.stringify({
    nickname: payload.nickname,
    bio: payload.bio,
    jobLabel: payload.jobLabel,
    skills: payload.skills,
    profileImageUrl: null,
    ...links,
  });

  try {
    await fetchClient("/api/users/me", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: requestBody,
    });
  } catch (error) {
    if (error instanceof ApiError) {
      if (error.status === 404) {
        throw new Error(
          "회원 정보를 준비하는 중이에요. 잠시 후 다시 시도해주세요.",
        );
      }

      throw new Error(error.message || PROFILE_SAVE_FAILED_MESSAGE);
    }

    throw new Error(PROFILE_SAVE_FAILED_MESSAGE);
  }
}
