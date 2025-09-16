"use client";
import { motion } from "framer-motion";

export default function Badge({ text }: { text: string }) {
  return (
    <motion.span 
      className="inline-flex items-center gap-2 text-xs px-3 py-1 rounded-full bg-brand/15 border border-brand/40 text-brand-foreground hover:bg-brand/20 transition-colors"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.05 }}
    >
      <motion.span 
        className="size-2 rounded-full bg-brand"
        animate={{ 
          scale: [1, 1.2, 1],
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      {text}
    </motion.span>
  );
}