"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Twitter, Instagram, Linkedin, Youtube, Mail } from "lucide-react";
import { toast } from "sonner";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Stories", href: "#articles" },
  { label: "Topics", href: "#categories" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const topicLinks = [
  "Clinical Optometry",
  "Myopia Management",
  "Practice Growth",
  "Contact Lenses",
  "Ocular Disease",
  "Technology",
];

const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

const bottomLinks = [
  { label: "Privacy", href: "#" },
  { label: "Terms", href: "#" },
  { label: "Sitemap", href: "#" },
];

export function Footer() {
  const [footerEmail, setFooterEmail] = useState("");

  const handleNavClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleFooterSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!footerEmail || !footerEmail.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }
    toast.success("Subscribed! Welcome to Focus Magazine.");
    setFooterEmail("");
  };

  return (
    <footer className="bg-foreground text-background mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-20 pb-8">
        {/* 4-Column Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
          {/* Col 1 - Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-0 mb-5">
              <span className="text-2xl font-black tracking-tight text-background">
                FOCUS
              </span>
            </div>
            <p className="text-[10px] tracking-[0.3em] font-medium uppercase text-background/40 mb-4">
              MAGAZINE
            </p>
            <p className="text-sm text-background/50 leading-relaxed">
              The premier digital publication for optometrists and eye care
              professionals worldwide. Curating the future of vision.
            </p>
          </div>

          {/* Col 2 - Navigation */}
          <div>
            <h3 className="text-xs tracking-[0.15em] text-background/30 font-semibold uppercase mb-4">
              Navigation
            </h3>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className="text-sm text-background/60 hover:text-background transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 - Topics */}
          <div>
            <h3 className="text-xs tracking-[0.15em] text-background/30 font-semibold uppercase mb-4">
              Topics
            </h3>
            <ul className="space-y-2.5">
              {topicLinks.map((topic) => (
                <li key={topic}>
                  <span className="text-sm text-background/60 hover:text-background transition-colors duration-200 cursor-pointer">
                    {topic}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 - Connect */}
          <div>
            <h3 className="text-xs tracking-[0.15em] text-background/30 font-semibold uppercase mb-4">
              Connect
            </h3>

            {/* Mini Subscribe */}
            <form
              onSubmit={handleFooterSubscribe}
              className="flex gap-2 mb-6"
            >
              <Input
                type="email"
                placeholder="your@email.com"
                value={footerEmail}
                onChange={(e) => setFooterEmail(e.target.value)}
                className="bg-background/10 border-background/10 text-background placeholder:text-background/30 focus-visible:ring-background/20 h-9 text-sm rounded-none"
              />
              <button
                type="submit"
                className="bg-background/10 hover:bg-background/20 border border-background/10 text-background text-xs font-semibold tracking-wider uppercase px-4 h-9 transition-colors rounded-none shrink-0"
              >
                Join
              </button>
            </form>

            {/* Social Icons */}
            <div className="flex gap-2">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-10 h-10 rounded-lg bg-background/10 hover:bg-background/20 hover:scale-110 flex items-center justify-center transition-all duration-200 text-background/60 hover:text-background"
                >
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <Separator className="bg-background/10 mb-6" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-background/40">
            © 2026 Focus Magazine. Published by Focuslinks.
          </p>
          <div className="flex items-center gap-4">
            {bottomLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs text-background/40 hover:text-background transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}