"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { personalInfo } from "@/data/portfolio";
import AnimatedSection from "@/components/ui/AnimatedSection";
import MagneticButton from "@/components/ui/MagneticButton";
import { FiGithub, FiLinkedin, FiMail, FiMapPin, FiSend } from "react-icons/fi";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(formData.subject || "Portfolio Contact");
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`);
    window.location.href = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`;
  };

  return (
    <AnimatedSection id="contact" className="py-28 sm:py-36">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="section-label">Contact</span>
          <h2 className="section-heading"><span className="gradient-text">Let&apos;s Connect</span></h2>
          <p className="text-slate-500 text-sm mt-4 max-w-md mx-auto">Have a project in mind? Let&apos;s build something great together</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <div>
            <p className="text-slate-400 leading-relaxed mb-8">
              I&apos;m always open to new opportunities, collaborations, and conversations. Feel free to reach out.
            </p>

            <div className="space-y-5">
              {[
                { icon: FiMail, label: "Email", value: personalInfo.email, href: `mailto:${personalInfo.email}` },
                { icon: FiMapPin, label: "Location", value: personalInfo.location },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0 border border-cyan-500/10">
                    <item.icon size={17} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-600">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="text-sm text-slate-300 hover:text-cyan-400 transition-colors">{item.value}</a>
                    ) : (
                      <span className="text-sm text-slate-300">{item.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4 mt-8">
              <span className="text-xs text-slate-600 tracking-widest uppercase">Social</span>
              <div className="h-px w-6 bg-white/10" />
              {[
                { icon: FiGithub, href: personalInfo.github, label: "GitHub" },
                { icon: FiLinkedin, href: personalInfo.linkedin, label: "LinkedIn" },
                { icon: FiMail, href: `mailto:${personalInfo.email}`, label: "Email" },
              ].map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg border border-white/[0.1] text-slate-500 hover:text-cyan-400 hover:border-cyan-400/30 hover:bg-cyan-400/5 flex items-center justify-center transition-all duration-300" aria-label={label}>
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required
                className="w-full bg-white/[0.03] border border-white/[0.1] rounded-xl px-4 py-3.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500/40 focus:ring-[3px] focus:ring-cyan-500/10 transition-all" />
              <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required
                className="w-full bg-white/[0.03] border border-white/[0.1] rounded-xl px-4 py-3.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500/40 focus:ring-[3px] focus:ring-cyan-500/10 transition-all" />
            </div>
            <input type="text" name="subject" placeholder="Subject" value={formData.subject} onChange={handleChange}
              className="w-full bg-white/[0.03] border border-white/[0.1] rounded-xl px-4 py-3.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500/40 focus:ring-[3px] focus:ring-cyan-500/10 transition-all" />
            <textarea name="message" placeholder="Your Message" rows={5} value={formData.message} onChange={handleChange} required
              className="w-full bg-white/[0.03] border border-white/[0.1] rounded-xl px-4 py-3.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500/40 focus:ring-[3px] focus:ring-cyan-500/10 transition-all resize-none" />
            <MagneticButton type="submit" variant="primary" className="w-full sm:w-auto justify-center">
              <FiSend size={15} /> Send Message
            </MagneticButton>
          </form>
        </div>
      </div>
    </AnimatedSection>
  );
}
