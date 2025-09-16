"use client";
import { motion } from "framer-motion";
import { useState } from "react";

interface SkillCardProps {
  category: string;
  items: string[];
  icon?: React.ReactNode;
  color?: string;
}

export default function SkillCard({ category, items, icon, color = "blue-500" }: SkillCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div 
      className="card p-5 h-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ 
        y: -5,
        boxShadow: `0 10px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1), 0 0 15px rgba(var(--${color.replace('-', '-')})/0.2)`
      }}
    >
      <h3 className="font-semibold mb-4 flex items-center gap-2">
        {icon && <span className={`text-${color}`}>{icon}</span>}
        {category}
      </h3>
      <div className="flex flex-wrap gap-2">
        {items.map((item, i) => (
          <motion.span
            key={i}
            className={`bg-neutral-800/50 px-3 py-1 rounded-lg text-sm hover:bg-neutral-700/70 transition-colors border border-neutral-700 hover:border-${color}/50`}
            whileHover={{ scale: 1.05, backgroundColor: `rgba(var(--${color.replace('-', '-')})/0.1)` }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.05 * i, duration: 0.3 }}
          >
            {item}
          </motion.span>
        ))}
      </div>
      
      {/* Particle effect on hover */}
      {isHovered && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="particles-container"
          />
        </div>
      )}
    </motion.div>
  );
}