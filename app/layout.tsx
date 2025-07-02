import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ToastProvider } from "@/components/providers/toaster-provider";
import { ConfettiProvider } from "@/components/providers/confetti-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Altitude Aviation Academy",
  description: "Empowering Future Pilots with Knowledge and Skill",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
        <ClerkProvider>
        <head>
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4078042381069561"
            crossOrigin="anonymous"
          ></script>
           <meta name="google-adsense-account" content="ca-pub-4078042381069561" />
        </head>
        <body className={inter.className}>
          {children}
          <ConfettiProvider />
          <ToastProvider />
        </body>
    </ClerkProvider>
      </html>
  );
}
