"use client";
import { motion } from "framer-motion";

interface SkillBarProps {
  name: string;
  level: number; // 0-100
  color?: string;
}

export default function SkillBar({ name, level, color = "blue" }: SkillBarProps) {
  // Các màu sắc cho thanh kỹ năng
  const colorClasses = {
    blue: "from-blue-500 to-blue-700",
    purple: "from-purple-500 to-purple-700",
    green: "from-green-500 to-green-700",
    red: "from-red-500 to-red-700",
    yellow: "from-yellow-500 to-yellow-700",
    indigo: "from-indigo-500 to-indigo-700",
    pink: "from-pink-500 to-pink-700",
  };
  
  const selectedColor = colorClasses[color as keyof typeof colorClasses] || colorClasses.blue;
  
  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">{name}</span>
        <span className="text-xs text-neutral-400">{level}%</span>
      </div>
      <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
        <motion.div 
          className={`h-full bg-gradient-to-r ${selectedColor}`}
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
        />
      </div>
    </div>
  );
}