import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display, Source_Serif_4 } from "next/font/google";
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

const playfairDisplay = Playfair_Display({
  variable: "--font-editorial",
  subsets: ["latin"],
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Focus Magazine — Where Vision Science Meets Clinical Excellence",
  description:
    "Focus Magazine is the definitive independent publication for optometrists and vision scientists — delivering peer-reviewed clinical insights, cutting-edge myopia management strategies, advanced contact lens science, glaucoma breakthroughs, and actionable practice growth tactics to elevate patient care and professional development.",
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
    title: "Focus Magazine — Where Vision Science Meets Clinical Excellence",
    description:
      "The definitive independent publication for optometrists — peer-reviewed clinical insights, myopia management strategies, and practice growth for eye care professionals.",
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
        className={`${geistSans.variable} ${geistMono.variable} ${playfairDisplay.variable} ${sourceSerif.variable} antialiased bg-background text-foreground`}
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