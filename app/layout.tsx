import localFont from "next/font/local";
import "./globals.css";
import QueryProvider from "./providers/QueryProvider";
import { AlertModalGlobal } from "@/shared/ui";
import { cn } from "@/shared/utils";

const pretendard = localFont({
  src: "../fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={cn("", pretendard.className)}>
        <QueryProvider>
          {children}
          <AlertModalGlobal />
        </QueryProvider>
      </body>
    </html>
  );
}
