"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { Search, Sun, Moon, Menu, Twitter, Instagram, Linkedin, Rss } from "lucide-react";

const navLinks = [
  { label: "Stories", href: "#articles" },
  { label: "Topics", href: "#categories" },
  { label: "Culture", href: "#culture" },
  { label: "Opinion", href: "#opinion" },
  { label: "About", href: "#about" },
];

interface NavbarProps {
  onSearchOpen: () => void;
}

export function Navbar({ onSearchOpen }: NavbarProps) {
  const { theme, setTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    setMounted(true);
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 40);
  });

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const socialIcons = [
    { icon: Twitter, label: "Twitter" },
    { icon: Instagram, label: "Instagram" },
    { icon: Linkedin, label: "LinkedIn" },
    { icon: Rss, label: "RSS" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* ─── Top Bar ─── */}
      <motion.div
        animate={{ y: scrolled ? "-100%" : "0%" }}
        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
        className="h-8 bg-foreground text-background overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          {/* Date */}
          <span className="text-[11px] tracking-wide font-medium hidden sm:block">
            {formattedDate}
          </span>
          <span className="text-[11px] tracking-wide font-medium sm:hidden">
            {today.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
          </span>

          {/* Social Icons */}
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-3">
            {socialIcons.map(({ icon: Icon, label }) => (
              <button
                key={label}
                aria-label={label}
                className="text-background/70 hover:text-background transition-colors duration-200"
              >
                <Icon className="w-3 h-3" />
              </button>
            ))}
          </div>

          {/* Subscribe */}
          <Button
            variant="ghost"
            className="h-6 px-3 text-[10px] font-semibold tracking-[0.15em] uppercase text-background hover:bg-background/10 hover:text-background rounded-none"
            onClick={() => {
              const el = document.querySelector("#newsletter");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Subscribe
          </Button>
        </div>
      </motion.div>

      {/* ─── Main Navigation ─── */}
      <motion.nav
        animate={{
          y: scrolled ? "-2rem" : "0%",
        }}
        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
        className={`transition-all duration-500 ${
          scrolled
            ? "bg-background/80 backdrop-blur-xl border-b border-border/60"
            : "bg-background"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 md:h-20">
          {/* Wordmark */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#home");
            }}
            className="flex-shrink-0 group"
          >
            <span className="font-editorial text-2xl font-black tracking-tight text-foreground group-hover:opacity-80 transition-opacity duration-200">
              FOCUS
            </span>
          </a>

          {/* Center Nav Links */}
          <div className="hidden md:flex items-center gap-0">
            {navLinks.map((link, i) => (
              <div key={link.href} className="flex items-center">
                <button
                  onClick={() => handleNavClick(link.href)}
                  className="px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-foreground/70 hover:text-foreground transition-colors duration-200"
                >
                  {link.label}
                </button>
                {i < navLinks.length - 1 && (
                  <span className="text-foreground/15 select-none" aria-hidden>
                    /
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={onSearchOpen}
              className="h-9 w-9 text-muted-foreground hover:text-foreground transition-colors duration-200"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </Button>

            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="h-9 w-9 text-muted-foreground hover:text-foreground transition-colors duration-200"
                aria-label="Toggle theme"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={theme}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {theme === "dark" ? (
                      <Sun className="w-4 h-4" />
                    ) : (
                      <Moon className="w-4 h-4" />
                    )}
                  </motion.div>
                </AnimatePresence>
              </Button>
            )}

            <Button
              className="hidden lg:inline-flex bg-foreground text-background text-[10px] font-semibold tracking-[0.15em] uppercase px-5 h-8 rounded-none hover:bg-foreground/85 transition-colors duration-200"
              onClick={() => {
                const el = document.querySelector("#newsletter");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Subscribe
            </Button>

            {/* Mobile Menu */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden h-9 w-9 text-muted-foreground hover:text-foreground transition-colors duration-200"
                  aria-label="Menu"
                >
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 p-0 bg-background border-l border-border/40">
                <div className="flex flex-col h-full">
                  {/* Sheet Header */}
                  <div className="px-6 pt-8 pb-6 border-b border-border/40">
                    <SheetTitle className="flex items-center gap-2">
                      <span className="font-editorial text-2xl font-black tracking-tight text-foreground">
                        FOCUS
                      </span>
                    </SheetTitle>
                    <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mt-2 font-medium">
                      {formattedDate}
                    </p>
                  </div>

                  {/* Sheet Navigation */}
                  <nav className="flex-1 overflow-y-auto py-2">
                    {navLinks.map((link, i) => (
                      <div key={link.href}>
                        {i > 0 && (
                          <div className="mx-6 border-t border-border/30" />
                        )}
                        <button
                          onClick={() => handleNavClick(link.href)}
                          className="w-full text-left px-6 py-4 text-lg font-semibold tracking-tight text-foreground/80 hover:text-foreground hover:bg-muted/40 transition-colors duration-150"
                        >
                          {link.label}
                        </button>
                      </div>
                    ))}
                  </nav>

                  {/* Sheet Footer */}
                  <div className="px-6 py-6 border-t border-border/40 space-y-4">
                    <Button
                      className="w-full bg-foreground text-background hover:bg-foreground/85 text-[10px] font-semibold tracking-[0.15em] uppercase h-10 rounded-none transition-colors duration-200"
                      onClick={() => {
                        setMobileOpen(false);
                        const el = document.querySelector("#newsletter");
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }}
                    >
                      Subscribe
                    </Button>
                    <div className="flex items-center justify-center gap-4">
                      {socialIcons.map(({ icon: Icon, label }) => (
                        <button
                          key={label}
                          aria-label={label}
                          className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                        >
                          <Icon className="w-4 h-4" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </motion.nav>
    </header>
  );
}