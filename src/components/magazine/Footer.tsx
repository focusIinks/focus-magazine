import { Eye, Github, Twitter, Linkedin, Youtube } from "lucide-react";
import { Separator } from "@/components/ui/separator";
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
  return (
    <footer className="bg-foreground text-background/80 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
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
                  className="w-8 h-8 rounded-lg bg-background/10 hover:bg-background/20 flex items-center justify-center transition-colors"
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

        <Separator className="bg-background/10 mb-6" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-background/50">
          <p>&copy; 2026 Focus Magazine. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-background transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-background transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-background transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}