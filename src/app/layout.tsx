import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Poppins } from "next/font/google";

import { cn } from "lib/utils";
import { SessionProvider } from "next-auth/react";
import { auth } from "src/auth";

const inter = Inter({ subsets: ["latin"] });

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Next auth",
  description: "Next",
};

interface IProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: Readonly<IProps>) {
  const session = await auth();

  return (
    <html lang="en">
      <body className={cn(inter.className, poppins.className)}>
        <main className="h-full">
          <SessionProvider session={session}>{children}</SessionProvider>
        </main>
      </body>
    </html>
  );
}
