"use client";
import { motion } from "framer-motion";

interface TimelineItemProps {
  title: string;
  subtitle: string;
  period: string;
  description: string;
  isLast?: boolean;
}

export function TimelineItem({ title, subtitle, period, description, isLast = false }: TimelineItemProps) {
  return (
    <motion.div 
      className="relative pl-8"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* Timeline dot */}
      <motion.div 
        className="absolute left-0 top-1.5 size-4 rounded-full bg-blue-500/20 border border-blue-500/50 z-10"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.3 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.5, backgroundColor: "rgba(59, 130, 246, 0.3)" }}
      />
      
      {/* Timeline line */}
      {!isLast && (
        <motion.div 
          className="absolute left-2 top-5 bottom-0 w-0.5 bg-neutral-800"
          initial={{ height: 0 }}
          whileInView={{ height: "100%" }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        />
      )}
      
      {/* Content */}
      <motion.div 
        className="card p-5 hover:shadow-lg transition-all duration-300"
        whileHover={{ scale: 1.02, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)" }}
      >
        <div className="flex justify-between items-start flex-wrap gap-2 mb-2">
          <div>
            <h3 className="font-semibold text-lg">{title}</h3>
            <p className="text-neutral-300">{subtitle}</p>
          </div>
          <span className="text-sm bg-neutral-800/70 px-3 py-1 rounded-full text-neutral-400">{period}</span>
        </div>
        <p className="text-neutral-300">{description}</p>
      </motion.div>
    </motion.div>
  );
}

interface TimelineProps {
  items: {
    title: string;
    subtitle: string;
    period: string;
    description: string;
  }[];
}

export default function Timeline({ items }: TimelineProps) {
  return (
    <div className="space-y-6 py-2">
      {items.map((item, index) => (
        <TimelineItem
          key={index}
          title={item.title}
          subtitle={item.subtitle}
          period={item.period}
          description={item.description}
          isLast={index === items.length - 1}
        />
      ))}
    </div>
  );
}