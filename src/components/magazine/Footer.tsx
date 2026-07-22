"use client";

import { useState } from "react";
import { Twitter, Instagram, Linkedin, Youtube } from "lucide-react";
import { toast } from "sonner";

const sectionLinks = [
  { label: "Home", href: "#home" },
  { label: "Stories", href: "#articles" },
  { label: "Topics", href: "#categories" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const categoryLinks = [
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

export function Footer() {
  const [footerEmail, setFooterEmail] = useState("");

  const handleNavClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSubscribe = (e: React.FormEvent) => {
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-20 pb-0">
        {/* 4-Column Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8 mb-16">
          {/* Col 1 — Brand + Subscribe */}
          <div className="col-span-2 md:col-span-1">
            <span className="font-editorial text-3xl tracking-tight text-background">
              FOCUS
            </span>
            <p className="text-[10px] tracking-[0.3em] font-medium uppercase text-background/40 mt-1 mb-5">
              MAGAZINE
            </p>
            <p className="text-sm text-background/50 leading-relaxed mb-6">
              The premier digital publication for optometrists and eye care
              professionals. Curating the future of vision.
            </p>

            {/* Mini Subscribe Form */}
            <form onSubmit={handleSubscribe} className="flex">
              <input
                type="email"
                placeholder="your@email.com"
                value={footerEmail}
                onChange={(e) => setFooterEmail(e.target.value)}
                className="flex-1 min-w-0 h-9 bg-background/10 border border-background/10 text-background text-sm placeholder:text-background/30 px-3 focus:outline-none focus:border-background/30 transition-colors"
              />
              <button
                type="submit"
                className="bg-primary text-primary-foreground text-xs font-bold tracking-[0.15em] uppercase px-4 h-9 hover:bg-primary/90 transition-colors shrink-0"
              >
                Join
              </button>
            </form>
          </div>

          {/* Col 2 — Sections */}
          <div>
            <h3 className="text-[10px] tracking-[0.2em] text-background/30 font-bold uppercase mb-5">
              Sections
            </h3>
            <ul className="space-y-3">
              {sectionLinks.map((link) => (
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

          {/* Col 3 — Categories */}
          <div>
            <h3 className="text-[10px] tracking-[0.2em] text-background/30 font-bold uppercase mb-5">
              Categories
            </h3>
            <ul className="space-y-3">
              {categoryLinks.map((cat) => (
                <li key={cat}>
                  <span className="text-sm text-background/60 hover:text-background transition-colors duration-200 cursor-pointer">
                    {cat}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Connect */}
          <div>
            <h3 className="text-[10px] tracking-[0.2em] text-background/30 font-bold uppercase mb-5">
              Connect
            </h3>

            <div className="flex gap-2 mb-6">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 border border-background/15 hover:border-background/40 flex items-center justify-center transition-colors duration-200 text-background/50 hover:text-background"
                >
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
            </div>

            <p className="text-xs text-background/30 leading-relaxed">
              Follow us for the latest in optometry and eye care innovation.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/10 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-background/40">
            © {new Date().getFullYear()} Focus Magazine
          </p>
          <p className="text-xs text-background/40">
            Published by{" "}
            <span className="text-background/60 font-medium">Focuslinks</span>
          </p>
        </div>
      </div>
    </footer>
  );
}