"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { personalInfo } from "@/data/portfolio";
import { FiDownload, FiArrowLeft } from "react-icons/fi";

export default function ResumePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-primary)]">
      <div className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[rgba(10,10,15,0.95)] backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
          >
            <FiArrowLeft size={16} />
            <span>Back to Portfolio</span>
          </Link>

          <h1
            className="hidden sm:block text-sm font-semibold text-slate-200"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            {personalInfo.name} — Resume
          </h1>

          <motion.a
            href="/resume.pdf"
            download="Akash_Gupta_Resume.pdf"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white text-sm font-medium rounded-lg shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/50 transition-all duration-300"
          >
            <FiDownload size={15} />
            Download PDF
          </motion.a>
        </div>
      </div>

      <div className="flex-1 px-4 sm:px-6 lg:px-8 pt-16">
        <div className="max-w-5xl mx-auto h-[calc(100vh-4rem)] rounded-xl overflow-hidden border border-[var(--border)] bg-white">
          <embed
            src="/resume.pdf"
            type="application/pdf"
            style={{ border: "none", width: "100%", height: "100%" }}
            title="Akash Gupta Resume"
          />
        </div>
      </div>
    </div>
  );
}
