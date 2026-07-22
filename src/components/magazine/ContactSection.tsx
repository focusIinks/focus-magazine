"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, MapPin, Send, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";
import { toast } from "sonner";

const contactInfo = [
  {
    icon: Mail,
    label: "Editorial",
    value: "editorial@focusmagazine.com",
  },
  {
    icon: Phone,
    label: "Advertising",
    value: "+91 44 2345 6789",
  },
  {
    icon: MapPin,
    label: "Office",
    value: "Chennai, India",
  },
];

const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

export function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setSending(true);
    setTimeout(() => {
      toast.success(
        "Message sent successfully! We'll get back to you soon."
      );
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      setSending(false);
    }, 800);
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-3">
            Reach Out
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            Get in Touch
          </h2>
        </motion.div>

        <Separator className="mt-6 mb-12" />

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Left - Editorial Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2 space-y-8"
          >
            <p className="text-muted-foreground leading-relaxed">
              Have a story to share, a question about submission guidelines, or
              interested in advertising opportunities? We&apos;d love to hear
              from you. Our editorial team responds within 24 hours.
            </p>

            <div className="space-y-5">
              {contactInfo.map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-foreground">
                      {item.label}
                    </p>
                    <p className="text-muted-foreground text-sm mt-0.5">
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <p className="text-xs font-semibold tracking-[0.15em] uppercase text-muted-foreground mb-4">
                Follow Us
              </p>
              <div className="flex gap-2">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="w-10 h-10 rounded-lg border border-border hover:border-primary hover:text-primary flex items-center justify-center transition-colors duration-200 text-muted-foreground"
                  >
                    <s.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="bg-card rounded-xl p-8 shadow-sm border border-border/50">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-sm font-medium mb-1.5 block text-foreground">
                      Name <span className="text-destructive">*</span>
                    </label>
                    <Input
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="h-11"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block text-foreground">
                      Email <span className="text-destructive">*</span>
                    </label>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-11"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1.5 block text-foreground">
                    Subject
                  </label>
                  <Select value={subject} onValueChange={setSubject}>
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="editorial">
                        Editorial Inquiry
                      </SelectItem>
                      <SelectItem value="advertising">Advertising</SelectItem>
                      <SelectItem value="submission">
                        Article Submission
                      </SelectItem>
                      <SelectItem value="feedback">Feedback</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1.5 block text-foreground">
                    Message <span className="text-destructive">*</span>
                  </label>
                  <textarea
                    placeholder="Your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={5}
                    className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none min-h-[120px]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full bg-foreground text-background font-semibold text-sm uppercase tracking-wider h-12 hover:bg-foreground/90 transition-colors disabled:opacity-70 rounded-none flex items-center justify-center gap-2"
                >
                  {sending ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Message
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}