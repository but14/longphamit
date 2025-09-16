"use client";

import ProjectCard from "@/components/ProjectCard";
import Section from "@/components/Section";
import projects from "@/data/projects.json";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState, useEffect } from "react";
import languages from "@/data/languages.json";
import { Filter, Search, X } from "lucide-react";

export default function Projects() {
  const { language } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [categories, setCategories] = useState<string[]>([]);

  // Đảm bảo render phía client để tránh lỗi hydration
  useEffect(() => {
    setMounted(true);
    
    // Tính toán danh sách các danh mục dự án một lần khi component được mount
    const allCategories = projects.flatMap(p => {
      if (typeof p.category === 'string') {
        return p.category.split(' & ');
      }
      return [];
    });
    
    setCategories(["all", ...Array.from(new Set(allCategories))]);
  }, []);

  // Lấy giá trị theo ngôn ngữ
  const getLocalizedValue = (value: any) => {
    if (!value) return "";
    return typeof value === "object" && value[language] ? value[language] : value;
  };

  // Lọc dự án khi filter hoặc search thay đổi
  useEffect(() => {
    let result = [...projects];
    
    // Lọc theo danh mục
    if (activeFilter !== "all") {
      result = result.filter(project => {
        if (typeof project.category === 'string') {
          const categories = project.category.split(' & ');
          return categories.includes(activeFilter);
        }
        return false;
      });
    }
    
    // Lọc theo từ khóa tìm kiếm
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(project => {
        const title = getLocalizedValue(project.title).toLowerCase();
        const description = getLocalizedValue(project.description).toLowerCase();
        const techMatch = project.tech && project.tech.some((tech: string) => tech.toLowerCase().includes(term));
        
        return title.includes(term) || description.includes(term) || techMatch;
      });
    }
    
    setFilteredProjects(result);
  }, [activeFilter, searchTerm, language]);

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

  // Placeholder text cho tìm kiếm theo ngôn ngữ
  const searchPlaceholder = language === 'vi' 
    ? "Tìm kiếm dự án theo tên, mô tả hoặc công nghệ..." 
    : "Search projects by name, description or technology...";

  // Text cho nút "Tất cả" theo ngôn ngữ
  const allCategoriesText = language === 'vi' ? "Tất cả" : "All";

  // Text cho thông báo không tìm thấy dự án theo ngôn ngữ
  const noProjectsFoundText = language === 'vi' 
    ? "Không tìm thấy dự án phù hợp với tiêu chí tìm kiếm." 
    : "No projects found matching your search criteria.";

  // Text cho nút xóa bộ lọc theo ngôn ngữ
  const clearFiltersText = language === 'vi' ? "Xóa bộ lọc" : "Clear filters";

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
              placeholder={searchPlaceholder}
              className="w-full pl-10 pr-4 py-2 bg-neutral-900/80 border border-neutral-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-200"
                onClick={() => setSearchTerm("")}
              >
                <X size={16} />
              </button>
            )}
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
                {category === "all" ? allCategoriesText : category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Hiển thị kết quả */}
        <AnimatePresence mode="wait">
          {filteredProjects.length > 0 ? (
            <motion.div 
              className="grid md:grid-cols-2 gap-6"
              variants={containerVariants}
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {filteredProjects.map((p, i) => (
                <motion.div
                  key={i}
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
              key="no-results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <p className="text-lg">{noProjectsFoundText}</p>
              <motion.button 
                className="mt-4 px-4 py-2 bg-neutral-800 rounded-lg hover:bg-neutral-700 transition-colors"
                onClick={() => {
                  setActiveFilter("all");
                  setSearchTerm("");
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {clearFiltersText}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </Section>
    </motion.div>
  );
}