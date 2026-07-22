"use client";

import { Twitter, Instagram, Linkedin, Rss, Mail, ExternalLink } from "lucide-react";

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "Articles", href: "#articles" },
  { label: "Categories", href: "#categories" },
  { label: "About", href: "#about" },
  { label: "Newsletter", href: "#newsletter", icon: Mail },
];

const topics = [
  "Clinical Optometry",
  "Myopia Management",
  "Contact Lenses",
  "Glaucoma",
  "Technology",
];

const socialLinks = [
  { icon: Twitter, label: "Twitter", href: "#" },
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Rss, label: "RSS", href: "#" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Use", href: "#" },
  { label: "Cookie Policy", href: "#" },
];

export function Footer() {
  const handleClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-foreground text-background mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 md:pt-16 pb-0">
        {/* ─── Brand Header ─── */}
        <div className="mb-12 md:mb-14">
          <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-background leading-none">
            FOCUS MAGAZINE
          </h2>
          <p className="mt-3 text-sm sm:text-base text-background/45 tracking-wide">
            Where Vision Science Meets Clinical Excellence
          </p>
        </div>

        {/* ─── 4-Column Grid ─── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8 mb-14 md:mb-16">
          {/* Quick Links */}
          <div>
            <h3 className="text-[10px] tracking-[0.2em] text-background/30 font-bold uppercase mb-5">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleClick(link.href);
                      }}
                      className="inline-flex items-center gap-2 text-sm text-background/60 hover:text-background transition-colors duration-200"
                    >
                      {Icon && <Icon className="w-3.5 h-3.5" />}
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Topics */}
          <div>
            <h3 className="text-[10px] tracking-[0.2em] text-background/30 font-bold uppercase mb-5">
              Topics
            </h3>
            <ul className="space-y-3">
              {topics.map((topic) => (
                <li key={topic}>
                  <span className="text-sm text-background/60 hover:text-background transition-colors duration-200 cursor-pointer">
                    {topic}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-[10px] tracking-[0.2em] text-background/30 font-bold uppercase mb-5">
              Connect
            </h3>
            <div className="flex gap-2.5">
              {socialLinks.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="w-9 h-9 border border-background/15 hover:border-background/40 flex items-center justify-center transition-colors duration-200 text-background/50 hover:text-background"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-[10px] tracking-[0.2em] text-background/30 font-bold uppercase mb-5">
              Legal
            </h3>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="inline-flex items-center gap-2 text-sm text-background/60 hover:text-background transition-colors duration-200"
                  >
                    {link.label}
                    <ExternalLink className="w-3 h-3 opacity-40" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ─── Bottom Bar ─── */}
        <div className="border-t border-background/10 py-6">
          <p className="text-xs text-background/40 text-center sm:text-left">
            &copy; 2026 Focus Magazine. Published by{" "}
            <span className="text-background/60 font-medium">Focuslinks</span>.
          </p>
        </div>
      </div>
    </footer>
  );
}
