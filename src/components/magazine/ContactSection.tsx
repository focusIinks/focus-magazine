"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { toast } from "sonner";

const contactCards = [
  {
    icon: Mail,
    label: "Email",
    value: "editorial@focusmagazine.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 44 2345 6789",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Chennai, India",
  },
];

const inputBase =
  "w-full h-11 border border-border bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors";

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
          className="mb-12"
        >
          <span className="inline-block text-[10px] font-bold tracking-[0.25em] uppercase text-primary border border-primary px-3 py-1 mb-4">
            Get in Touch
          </span>
          <h2 className="font-editorial text-4xl md:text-5xl tracking-tight text-foreground">
            Contact
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left — Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-xs font-semibold tracking-[0.1em] uppercase text-muted-foreground mb-1.5 block">
                    Name <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={inputBase}
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold tracking-[0.1em] uppercase text-muted-foreground mb-1.5 block">
                    Email <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputBase}
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold tracking-[0.1em] uppercase text-muted-foreground mb-1.5 block">
                  Subject
                </label>
                <Select value={subject} onValueChange={setSubject}>
                  <SelectTrigger className="h-11 border-border text-sm focus:ring-1 focus:ring-primary focus:border-primary">
                    <SelectValue placeholder="Select a subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="editorial">Editorial Inquiry</SelectItem>
                    <SelectItem value="advertising">Advertising</SelectItem>
                    <SelectItem value="submission">Article Submission</SelectItem>
                    <SelectItem value="feedback">Feedback</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-xs font-semibold tracking-[0.1em] uppercase text-muted-foreground mb-1.5 block">
                  Message <span className="text-destructive">*</span>
                </label>
                <textarea
                  placeholder="Your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                  className={`${inputBase} min-h-[120px] resize-none py-3`}
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="w-full bg-primary text-primary-foreground font-semibold text-sm uppercase tracking-[0.15em] h-12 hover:bg-primary/90 transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
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
          </motion.div>

          {/* Right — Contact Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col"
          >
            <p className="text-muted-foreground leading-relaxed mb-8">
              Have a story to share, a question about submission guidelines, or
              interested in advertising opportunities? We&apos;d love to hear
              from you. Our editorial team responds within 24 hours.
            </p>

            <div className="flex flex-col divide-y divide-border border-t border-b border-border">
              {contactCards.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-4 py-5 first:pt-5 last:pb-5"
                >
                  <div className="w-10 h-10 border border-border flex items-center justify-center shrink-0">
                    <item.icon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold tracking-[0.1em] uppercase text-muted-foreground">
                      {item.label}
                    </p>
                    <p className="text-sm text-foreground mt-0.5">
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}