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
import { Search, Sun, Moon, Menu } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Articles", href: "#articles" },
  { label: "Topics", href: "#categories" },
  { label: "About", href: "#about" },
  { label: "Subscribe", href: "#newsletter" },
];

interface NavbarProps {
  onSearchOpen: () => void;
}

export function Navbar({ onSearchOpen }: NavbarProps) {
  const { theme, setTheme } = useTheme();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    setMounted(true);
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    // Hide on scroll down, show on scroll up
    if (latest > previous && latest > 120) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setScrolled(latest > 10);
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

  const formattedDateShort = today.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <motion.header
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      {/* ─── Top Bar ─── */}
      <motion.div
        animate={{ opacity: scrolled ? 0 : 1 }}
        transition={{ duration: 0.2 }}
        className="bg-foreground text-background border-b border-foreground"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-between">
          {/* Date */}
          <span className="text-[11px] tracking-wide font-medium hidden sm:block">
            {formattedDate}
          </span>
          <span className="text-[11px] tracking-wide font-medium sm:hidden">
            {formattedDateShort}
          </span>

          {/* Subscribe Button */}
          <Button
            variant="ghost"
            className="h-6 px-3 text-[10px] font-semibold tracking-[0.15em] uppercase text-background hover:bg-background/10 hover:text-background rounded-none"
            onClick={() => handleNavClick("#newsletter")}
          >
            Subscribe
          </Button>
        </div>
      </motion.div>

      {/* ─── Main Navigation ─── */}
      <nav
        className={`transition-colors duration-300 ${
          scrolled
            ? "bg-background/90 backdrop-blur-xl border-b border-border/50"
            : "bg-background border-b border-border/30"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 md:h-[72px]">
          {/* Logo: FOCUS MAGAZINE */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#home");
            }}
            className="flex-shrink-0 group flex items-end gap-2"
          >
            <span className="font-editorial text-[26px] md:text-[30px] font-black leading-none tracking-tight text-foreground group-hover:opacity-80 transition-opacity duration-200">
              FOCUS
            </span>
            <span className="text-[9px] md:text-[10px] font-sans font-semibold tracking-[0.22em] uppercase text-muted-foreground pb-[3px] md:pb-[4px]">
              MAGAZINE
            </span>
          </a>

          {/* Center Nav Links */}
          <div className="hidden md:flex items-center">
            {navLinks.map((link, i) => (
              <div key={link.href} className="flex items-center">
                <button
                  onClick={() => handleNavClick(link.href)}
                  className={`px-3.5 py-2 text-[11px] font-sans font-medium uppercase tracking-[0.12em] transition-colors duration-200 ${
                    link.label === "Subscribe"
                      ? "text-foreground hover:text-foreground/70"
                      : "text-foreground/60 hover:text-foreground"
                  }`}
                >
                  {link.label}
                </button>
                {i < navLinks.length - 1 && (
                  <span
                    className="text-foreground/15 select-none text-[10px]"
                    aria-hidden
                  >
                    /
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-0.5">
            {/* Search */}
            <Button
              variant="ghost"
              size="icon"
              onClick={onSearchOpen}
              className="h-9 w-9 text-muted-foreground hover:text-foreground transition-colors duration-200"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </Button>

            {/* Dark Mode Toggle */}
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

            {/* Mobile Hamburger */}
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
              <SheetContent
                side="right"
                className="w-72 p-0 bg-background border-l border-border/40"
              >
                <div className="flex flex-col h-full">
                  {/* Mobile Sheet Header */}
                  <div className="px-6 pt-8 pb-5 border-b border-border/30">
                    <SheetTitle className="flex items-end gap-2">
                      <span className="font-editorial text-[26px] font-black leading-none tracking-tight text-foreground">
                        FOCUS
                      </span>
                      <span className="text-[9px] font-sans font-semibold tracking-[0.22em] uppercase text-muted-foreground pb-[3px]">
                        MAGAZINE
                      </span>
                    </SheetTitle>
                    <p className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground/70 mt-2.5 font-medium font-sans">
                      {formattedDate}
                    </p>
                  </div>

                  {/* Mobile Sheet Navigation */}
                  <nav className="flex-1 overflow-y-auto py-2">
                    {navLinks.map((link, i) => (
                      <div key={link.href}>
                        {i > 0 && (
                          <div className="mx-6 border-t border-border/20" />
                        )}
                        <button
                          onClick={() => handleNavClick(link.href)}
                          className={`w-full text-left px-6 py-3.5 font-sans transition-colors duration-150 ${
                            link.label === "Subscribe"
                              ? "text-sm font-semibold tracking-[0.08em] uppercase text-foreground/80 hover:text-foreground hover:bg-muted/30"
                              : "text-base font-medium tracking-tight text-foreground/70 hover:text-foreground hover:bg-muted/30"
                          }`}
                        >
                          {link.label}
                        </button>
                      </div>
                    ))}
                  </nav>

                  {/* Mobile Sheet Footer */}
                  <div className="px-6 py-5 border-t border-border/30">
                    <Button
                      className="w-full bg-foreground text-background hover:bg-foreground/85 text-[10px] font-semibold tracking-[0.15em] uppercase h-10 rounded-none transition-colors duration-200"
                      onClick={() => handleNavClick("#newsletter")}
                    >
                      Subscribe to Focus
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </motion.header>
  );
}