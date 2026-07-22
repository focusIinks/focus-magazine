"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "50K+", label: "Readers" },
  { value: "200+", label: "Articles" },
  { value: "12", label: "Expert Authors" },
  { value: "47", label: "Issues Published" },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export function AboutSection() {
  return (
    <section id="about" className="py-24 md:py-32 bg-muted/20">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <span className="editorial-badge">ABOUT</span>
          <h2 className="font-editorial text-4xl md:text-5xl mt-3 tracking-tight">
            Focus Magazine
          </h2>
        </motion.div>

        {/* Two-column layout with vertical rule */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="relative grid grid-cols-1 md:grid-cols-2 gap-0 items-start"
        >
          {/* Vertical rule between columns */}
          <div className="magazine-rule hidden md:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2" />

          {/* Left: Mission statement */}
          <motion.div variants={fadeUp} className="md:pr-12 pb-12 md:pb-0">
            <p className="font-body text-lg leading-relaxed max-w-xl text-foreground/85">
              Focus Magazine was born from a conviction that optometry deserves
              a publication as rigorous as the science it serves. Every issue is
              an editorial act — a deliberate selection of ideas, evidence, and
              perspectives that shape how eye care professionals think about
              their craft. We don&apos;t chase trends; we trace the fault lines
              of clinical change, from myopia management&apos;s shifting
              paradigm to the quiet revolution in diagnostic imaging. Our pages
              belong to the clinicians, researchers, and thought leaders who are
              writing the next chapter of eye care — and to every practitioner
              who reads with intention.
            </p>
          </motion.div>

          {/* Right: Stat cards */}
          <motion.div
            variants={fadeUp}
            className="md:pl-12 grid grid-cols-2 gap-4"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                transition={{ delay: i * 0.08 }}
                className="border border-border p-6 hover:bg-muted/50 transition-colors duration-300"
              >
                <div className="font-editorial text-4xl font-bold text-primary">
                  {stat.value}
                </div>
                <div className="text-sm font-body text-muted-foreground mt-1">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}