
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ToastProvider } from "@/components/providers/toaster-provider";
import { ConfettiProvider } from "@/components/providers/confetti-provider";
import { cn } from "@/lib/utils";
import { Footer } from "./(home)/_components/threejsTheme/components/main/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Adamya Kumar",
  description: "Gyani Hulk aspiring Software Engineer",
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4078042381069561"
            crossOrigin="anonymous"
          ></script>
           <meta name="google-adsense-account" content="ca-pub-4078042381069561" />
        </head>
        <body   className={cn(
          "overflow-y-scroll overflow-x-hidden",
          inter.className
        )}>

        {children}
      
          <ConfettiProvider />
          <ToastProvider />
        </body>
      </html>
    </ClerkProvider>
  );
}
