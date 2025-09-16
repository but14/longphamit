"use client";
import { Github, Link as LinkIcon, CalendarClock, Users, Tag, ChevronRight } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import languages from "@/data/languages.json";

export default function ProjectCard({ project }: { project: any }) {
  const [isHovered, setIsHovered] = useState(false);
  const { language } = useLanguage();
  
  // Lấy nội dung theo ngôn ngữ
  const t = (key: string) => {
    const keys = key.split(".");
    let value: any = languages[language as keyof typeof languages];

    for (const k of keys) {
      if (!value || !value[k]) return key;
      value = value[k];
    }

    return value;
  };
  
  // Hàm lấy giá trị theo ngôn ngữ
  const getLocalizedValue = (value: any) => {
    if (!value) return "";
    return typeof value === "object" && value[language] ? value[language] : value;
  };

  // Placeholder image nếu không có hình ảnh dự án
  const placeholderImage = "/images/project-placeholder.svg";
  
  return (
    <motion.article 
      className="card overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col"
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative w-full aspect-[16/9] bg-neutral-800/50 overflow-hidden">
        <motion.div
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.5 }}
          className="h-full w-full"
        >
          <Image 
            src={project.image || placeholderImage} 
            alt={getLocalizedValue(project.title)} 
            fill 
            sizes="(max-width: 768px) 100vw, 50vw" 
            className="object-cover transition-transform duration-500" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/90 via-neutral-900/50 to-transparent" />
          
          {/* Project category badge */}
          {project.category && (
            <div className="absolute top-4 right-4 z-10">
              <motion.span 
                className="text-xs px-2 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 backdrop-blur-sm"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Tag size={10} className="inline mr-1" /> {project.category}
              </motion.span>
            </div>
          )}
          
          {/* Project title overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
            <h3 className="text-xl font-semibold text-white">{getLocalizedValue(project.title)}</h3>
            {project.role && (
              <p className="text-sm text-blue-300 mt-1">{getLocalizedValue(project.role)}</p>
            )}
          </div>
        </motion.div>
      </div>
      
      <div className="p-6 space-y-4 flex-grow flex flex-col">
        <p className="text-neutral-300 flex-grow">{getLocalizedValue(project.description)}</p>
        
        {/* Project highlights */}
        {project.highlights && project.highlights.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-neutral-200">Highlights:</h4>
            <ul className="grid grid-cols-2 gap-2">
              {project.highlights.map((highlight: any, i: number) => (
                <motion.li 
                  key={i} 
                  className="text-xs flex items-start gap-1 text-neutral-400"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <ChevronRight size={12} className="mt-1 text-blue-400 flex-shrink-0" />
                  <span>{typeof highlight === 'object' ? getLocalizedValue(highlight) : highlight}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        )}
        
        <motion.ul 
          className="flex flex-wrap gap-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
          viewport={{ once: true }}
        >
          {project.tech?.map((tech: string, i: number) => (
            <motion.li 
              key={i} 
              className="text-xs bg-neutral-800 px-2 py-1 rounded-md border border-neutral-700 hover:border-blue-500/50 hover:bg-neutral-700 transition-colors"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              viewport={{ once: true }}
            >
              {tech}
            </motion.li>
          ))}
        </motion.ul>
        
        <div className="flex items-center gap-4 text-sm text-neutral-400">
          {project.year && (
            <span className="inline-flex items-center gap-1">
              <CalendarClock size={16} className="text-blue-400"/> {project.year}
            </span>
          )}
          {project.team && (
            <span className="inline-flex items-center gap-1">
              <Users size={16} className="text-green-400"/> {project.team}
            </span>
          )}
        </div>
        
        <div className="pt-2 flex gap-3">
          {project.github && (
            <motion.a 
              className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-neutral-800/70 hover:bg-neutral-700 transition-colors"
              href={project.github} 
              target="_blank" 
              rel="noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github size={16} className="text-neutral-300"/> {t("common.sourceCode")}
            </motion.a>
          )}
          {project.link && (
            <motion.a 
              className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-blue-900/30 hover:bg-blue-800/40 transition-colors"
              href={project.link} 
              target="_blank" 
              rel="noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <LinkIcon size={16} className="text-blue-400"/> {t("common.liveDemo")}
            </motion.a>
          )}
        </div>
      </div>
    </motion.article>
  );
}