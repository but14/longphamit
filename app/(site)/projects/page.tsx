"use client";

import ProjectCard from "@/components/ProjectCard";
import Section from "@/components/Section";
import projects from "@/data/projects.json";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState, useEffect } from "react";
import languages from "@/data/languages.json";
import { Filter, Search } from "lucide-react";

export default function Projects() {
  const { language } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProjects, setFilteredProjects] = useState(projects);

  // Đảm bảo render phía client để tránh lỗi hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // Lọc dự án khi filter hoặc search thay đổi
  useEffect(() => {
    let result = [...projects];
    
    // Lọc theo danh mục
    if (activeFilter !== "all") {
      result = result.filter(project => project.category === activeFilter);
    }
    
    // Lọc theo từ khóa tìm kiếm
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(project => 
        project.title.toLowerCase().includes(term) || 
        project.description.toLowerCase().includes(term) ||
        (project.tech && project.tech.some((tech: string) => tech.toLowerCase().includes(term)))
      );
    }
    
    setFilteredProjects(result);
  }, [activeFilter, searchTerm]);

  if (!mounted) return null;

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

  // Lấy danh sách các danh mục dự án
  const categories = ["all", ...Array.from(new Set(projects.map(p => p.category)))];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="mb-12"
    >
      <Section 
        title={t("sections.projects")} 
        subtitle={t("sections.projectsSubtitle")}
      >
        {/* Filter và Search */}
        <motion.div 
          className="mb-8 space-y-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" size={18} />
            <input
              type="text"
              placeholder="Tìm kiếm dự án theo tên, mô tả hoặc công nghệ..."
              className="w-full pl-10 pr-4 py-2 bg-neutral-900/80 border border-neutral-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* Category filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            <Filter size={16} className="text-neutral-400 flex-shrink-0" />
            {categories.map((category, index) => (
              <motion.button
                key={category}
                className={`px-3 py-1 rounded-full text-sm whitespace-nowrap transition-all ${
                  activeFilter === category 
                    ? "bg-blue-500/20 border border-blue-500/40 text-blue-300" 
                    : "bg-neutral-800/50 border border-neutral-700 text-neutral-300 hover:bg-neutral-700/50"
                }`}
                onClick={() => setActiveFilter(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {category === "all" ? "Tất cả" : category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Hiển thị kết quả */}
        {filteredProjects.length > 0 ? (
          <motion.div 
            className="grid md:grid-cols-2 gap-6"
            variants={containerVariants}
            layout
          >
            {filteredProjects.map((p, i) => (
              <motion.div
                key={p.title}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <ProjectCard project={p} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            className="text-center py-12 text-neutral-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-lg">Không tìm thấy dự án phù hợp với tiêu chí tìm kiếm.</p>
            <button 
              className="mt-4 px-4 py-2 bg-neutral-800 rounded-lg hover:bg-neutral-700 transition-colors"
              onClick={() => {
                setActiveFilter("all");
                setSearchTerm("");
              }}
            >
              Xóa bộ lọc
            </button>
          </motion.div>
        )}
      </Section>
    </motion.div>
  );
}