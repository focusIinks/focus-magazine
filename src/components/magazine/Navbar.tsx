"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { Search, Sun, Moon, Menu } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home", active: true },
  { label: "Stories", href: "#articles", active: false },
  { label: "Topics", href: "#categories", active: false },
  { label: "About", href: "#about", active: false },
  { label: "Contact", href: "#contact", active: false },
];

interface NavbarProps {
  onSearchOpen: () => void;
}

export function Navbar({ onSearchOpen }: NavbarProps) {
  const { theme, setTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const textColor = scrolled ? "text-foreground" : "text-white";
  const mutedColor = scrolled
    ? "text-muted-foreground hover:text-foreground"
    : "text-white/70 hover:text-white";
  const dotColor = scrolled ? "bg-primary" : "bg-white";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/95 border-b border-border/50 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#home");
            }}
            className="flex items-center group"
          >
            <span
              className={`text-xl font-black tracking-tight ${textColor} transition-colors duration-500`}
            >
              FOCUS
            </span>
            <div className="w-px h-5 bg-current/20 mx-2" />
            <span
              className={`text-[10px] tracking-[0.25em] font-medium uppercase transition-colors duration-500 ${
                scrolled ? "text-foreground/60" : "text-white/60"
              }`}
            >
              MAGAZINE
            </span>
          </a>

          {/* Center Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`relative px-4 py-2 text-sm font-medium tracking-wide transition-colors duration-300 ${
                  link.active
                    ? scrolled
                      ? "text-foreground"
                      : "text-white"
                    : mutedColor
                }`}
              >
                {link.label}
                {link.active && (
                  <span
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${dotColor} transition-colors duration-500`}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-1.5">
            <Button
              variant="ghost"
              size="icon"
              onClick={onSearchOpen}
              className={`h-9 w-9 ${mutedColor} transition-colors duration-300`}
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </Button>

            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className={`h-9 w-9 ${mutedColor} transition-colors duration-300`}
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
              className="hidden md:inline-flex bg-primary text-primary-foreground text-xs font-semibold tracking-wider uppercase px-4 h-8 rounded-none hover:bg-primary/90"
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
                  className={`md:hidden h-9 w-9 ${mutedColor} transition-colors duration-300`}
                  aria-label="Menu"
                >
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72">
                <SheetTitle className="flex items-center gap-2 mb-8">
                  <span className="text-xl font-black tracking-tight">FOCUS</span>
                  <div className="w-px h-5 bg-current/20 mx-1" />
                  <span className="text-[10px] tracking-[0.25em] font-medium uppercase opacity-60">
                    MAGAZINE
                  </span>
                </SheetTitle>
                <div className="flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <button
                      key={link.href}
                      onClick={() => handleNavClick(link.href)}
                      className={`relative px-4 py-3.5 text-left text-sm font-medium tracking-wide transition-colors ${
                        link.active
                          ? "text-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {link.label}
                      {link.active && (
                        <span className="absolute left-2 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-primary" />
                      )}
                    </button>
                  ))}
                  <div className="mt-6 px-4">
                    <Button
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 text-xs font-semibold tracking-wider uppercase h-9 rounded-none"
                      onClick={() => {
                        setMobileOpen(false);
                        const el = document.querySelector("#newsletter");
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }}
                    >
                      Subscribe
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
}