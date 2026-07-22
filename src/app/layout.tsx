import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "next-themes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Focus Magazine — The Premier Publication for Optometrists",
  description:
    "Focus Magazine delivers the latest in optometry — clinical techniques, myopia management, contact lens innovations, glaucoma care, practice growth, and technology advances for eye care professionals.",
  keywords: [
    "optometry",
    "optometrist",
    "eye care",
    "myopia management",
    "glaucoma",
    "contact lenses",
    "clinical refraction",
    "ophthalmology",
    "vision science",
    "eye health",
    "focus magazine",
  ],
  authors: [{ name: "Focus Magazine Editorial Team" }],
  openGraph: {
    title: "Focus Magazine — The Premier Publication for Optometrists",
    description:
      "The latest in optometry research, clinical techniques, and practice management for eye care professionals.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}