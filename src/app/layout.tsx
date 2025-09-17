import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";
import ThemeProvider from "~/components/theme-provider";

export const metadata: Metadata = {
  title: "Aramis Soto",
  description: "The funckiest good sir of all times.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <body>
        {" "}
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
