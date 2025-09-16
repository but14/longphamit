"use client";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      className="border-t border-neutral-800/50 py-8 mt-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <div className="container max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <motion.div 
            className="text-neutral-400 text-sm"
            whileHover={{ color: "#3b82f6" }}
          >
            © {currentYear} Pham Nguyen Hoang Long. All rights reserved.
          </motion.div>
          
          <motion.div 
            className="flex items-center gap-1 text-sm text-neutral-400"
            whileHover={{ scale: 1.05 }}
          >
            Built with 
            <motion.span
              animate={{ 
                scale: [1, 1.2, 1],
              }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <Heart size={14} className="text-red-500 fill-red-500" />
            </motion.span>
            using Next.js & Tailwind CSS
          </motion.div>
        </div>
      </div>
    </motion.footer>
  );
}