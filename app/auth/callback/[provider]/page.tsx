"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import { type SocialType } from "@/features/auth/api/socialAuth";

function isValidSocialType(value: string): value is SocialType {
  return value === "google" || value === "kakao" || value === "github";
}

export default function SocialCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();

  useEffect(() => {
    const token = searchParams.get("token");
    const typeFromQuery = searchParams.get("type");
    const providerFromPath = params.provider;

    const provider =
      typeof providerFromPath === "string" ? providerFromPath : typeFromQuery;

    const userParam = searchParams.get("user");

    if (!token || !provider || !isValidSocialType(provider)) {
      router.replace("/login?error=invalid_social_callback");
      return;
    }

    let parsedUser: { email?: string; name?: string } | null = null;

    if (userParam) {
      try {
        parsedUser = JSON.parse(userParam);
      } catch {
        parsedUser = null;
      }
    }

    const query = new URLSearchParams({
      token,
      type: provider,
    });

    if (parsedUser?.email) {
      query.set("email", parsedUser.email);
    }

    if (parsedUser?.name) {
      query.set("name", parsedUser.name);
    }

    router.replace(`/signup?${query.toString()}`);
  }, [params.provider, router, searchParams]);

  return <div className="flex min-h-screen bg-gray-900"></div>;
}
