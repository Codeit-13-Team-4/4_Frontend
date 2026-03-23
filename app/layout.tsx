import localFont from "next/font/local";
import "./globals.css";
<<<<<<< HEAD
import QueryProvider from "./providers/QueryProvider";
import { AlertModalGlobal } from "@/shared/ui";
=======
import QueryProvider from "./QueryProvider";
import AuthProvider from "@/features/auth/provider/AuthProvider";
>>>>>>> 16255a6 (feat(login): 인증 상태 관리 및 AuthProvider 추가)

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProvider>
          {children}
          <AlertModalGlobal />
        </QueryProvider>
      </body>
    </html>
  );
}
