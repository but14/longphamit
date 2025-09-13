"use client";
import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      className="border-t border-neutral-800/50 py-6 mt-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <div className="container max-w-6xl mx-auto px-4 text-center text-neutral-400 text-sm">
        © {currentYear} PNH Long. All rights reserved.
      </div>
    </motion.footer>
  );
}
