import localFont from "next/font/local";
import "./globals.css";
import { AlertModalGlobal } from "@/shared/ui";
import { cn } from "@/shared/utils";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "./providers/getQueryClient";
import { QueryProvider } from "./providers/QueryProvider";
import { getMeServer } from "@/features/auth/api/getMeServer";
import Header from "@/widgets/layout/Header/ui/Header";

const pretendard = localFont({
  src: "../fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "100 900",
});

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
            <AlertModalGlobal />
          </HydrationBoundary>
        </QueryProvider>
      </body>
    </html>
  );
}
