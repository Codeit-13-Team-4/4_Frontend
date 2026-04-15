import localFont from "next/font/local";
import "./globals.css";
import { AlertModalGlobal, Toaster } from "@/shared/ui";
import { cn } from "@/shared/utils";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "./providers/getQueryClient";
import { QueryProvider } from "./providers/QueryProvider";
import { getMeServer } from "@/features/auth/api/getMeServer";
import Header from "@/widgets/layout/Header/ui/Header";
import { Metadata } from "next";

const pretendard = localFont({
  src: "../fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    default: "DevUp | 개발자를 위한 모임 플랫폼",
    template: "%s | DevUp",
  },

  description:
    "개발자들이 스터디, 프로젝트를 통해 함께 성장하는 커뮤니티 플랫폼입니다.",

  icons: {
    icon: "/favicon.ico",
  },

  openGraph: {
    title: "DevUp | 개발자를 위한 모임 플랫폼",
    description:
      "개발자 스터디와 프로젝트를 통해 함께 성장하는 커뮤니티 플랫폼입니다.",
    url: "https://devupup.vercel.app/",
    siteName: "DevUp",
    type: "website",
    images: [
      {
        url: "https://devupup.vercel.app/og-image.png",
      },
    ],
  },

  twitter: {
    card: "summary",
    title: "DevUp | 개발자를 위한 모임 플랫폼",
    description: "개발자 커뮤니티 플랫폼",
    images: ["https://devupup.vercel.app/og-image.png"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["auth", "me"],
    queryFn: getMeServer,
  });

  return (
    <html lang="ko">
      <body className={cn("", pretendard.className)}>
        <QueryProvider>
          <HydrationBoundary state={dehydrate(queryClient)}>
            <Header />
            {children}
            <Toaster richColors position="bottom-center" />
            <AlertModalGlobal />
          </HydrationBoundary>
        </QueryProvider>
      </body>
    </html>
  );
}
