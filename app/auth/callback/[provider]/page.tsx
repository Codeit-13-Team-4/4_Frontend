"use client";

import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import { authKeys } from "@/features/auth/model/auth.queryKey";
import { logout } from "@/features/auth/api/logout";
import { socialLogin, type SocialType } from "@/features/auth/api/socialLogin";

function isValidSocialType(value: string): value is SocialType {
  return value === "google" || value === "kakao" || value === "github";
}

export default function SocialCallbackPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
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

    const handleSocialCallback = async () => {
      const clearAuthState = async () => {
        try {
          await logout();
        } catch {
          // Ignore logout failures and still clear local auth cache.
        }

        queryClient.removeQueries({ queryKey: authKeys.all });
      };

      //소셜로그인 여부 검증
      try {
        // if (!typeFromQuery || !token) {
        //   router.replace("/login");
        //   return;
        // }
        // const socialCertToken = await socialToken({
        //   type: typeFromQuery,
        //   socialToken: token,
        // });
        // if (!socialCertToken) {
        //   router.replace("/login");
        //   return;
        // }
        await socialLogin({
          token,
          type: provider,
          remember: true,
        });

        await queryClient.resetQueries({ queryKey: authKeys.me() });
        router.replace("/mypage"); //회원이면
      } catch (error) {
        //회원아닌 에러발생
        if (error instanceof Error && error.message === "NOT_REGISTERED") {
          //에러가 이거면
          await clearAuthState();
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

          router.replace(`/signup?${query.toString()}`); //여기로 이동 + 쿼리파라미터 같이보냄
          return;
        }

        if (
          error instanceof Error &&
          error.message === "EMAIL_ALREADY_REGISTERED"
        ) {
          await clearAuthState();
          router.replace("/login?error=social_email_exists");
          return;
        }

        router.replace("/login?error=social_login_failed");
      }
    };
    handleSocialCallback();
  }, [params, queryClient, router, searchParams]);

  return <div className="flex min-h-screen bg-gray-900"></div>;
}
