"use client";

import { useState } from "react";
import { Eye, Github, Twitter, Linkedin, Youtube, ArrowUp, Mail } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { categories } from "@/lib/magazine-data";

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "Articles", href: "#articles" },
  { label: "Categories", href: "#categories" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Youtube, href: "#", label: "YouTube" },
  { icon: Github, href: "#", label: "GitHub" },
];

export function Footer() {
  const [email, setEmail] = useState("");

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-foreground text-background/80 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Eye className="w-4 h-4 text-primary-foreground" />
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-lg font-bold text-background">FOCUS</span>
                <span className="text-xs font-light text-background/60">Magazine</span>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-background/60 mb-4">
              The premier digital publication for optometrists and eye care professionals worldwide.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-lg bg-background/10 hover:bg-background/25 hover:scale-110 flex items-center justify-center transition-all duration-200"
                >
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-sm text-background mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className="text-sm text-background/60 hover:text-background transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-sm text-background mb-4">Categories</h3>
            <ul className="space-y-2">
              {categories.slice(0, 6).map((cat) => (
                <li key={cat.name}>
                  <span className="text-sm text-background/60 hover:text-background transition-colors cursor-pointer">
                    {cat.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-sm text-background mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-background/60">
              <li>editorial@focusmagazine.com</li>
              <li>+91 44 2345 6789</li>
              <li>Chennai, India</li>
            </ul>
          </div>
        </div>

        {/* Newsletter Subscribe */}
        <div className="bg-background/10 rounded-lg p-4 sm:p-6 mb-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-2 shrink-0">
              <Mail className="w-5 h-5 text-background/60" />
              <span className="text-sm font-medium text-background/80">Subscribe to Newsletter</span>
            </div>
            <div className="flex flex-1 w-full sm:max-w-sm gap-2">
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-background/10 border-background/20 text-background placeholder:text-background/40 focus-visible:ring-primary/50 h-9 text-sm"
              />
              <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 shrink-0 h-9">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <Separator className="bg-background/10 mb-6" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-background/50">
          <p>&copy; 2026 Focus Magazine. All rights reserved. Published by Focuslinks.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-background transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-background transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-background transition-colors">Cookie Policy</a>
            <button
              onClick={scrollToTop}
              className="hover:text-background transition-colors flex items-center gap-1"
            >
              Back to top
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}