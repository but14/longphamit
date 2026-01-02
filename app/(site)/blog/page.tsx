"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { BlogPost, getAllPosts, getAllTags } from "@/sanity/queries";
import BlogCard from "@/components/BlogCard";
import Section from "@/components/Section";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Tag, X } from "lucide-react";
import languages from "@/data/languages.json";

export default function BlogPage() {
  const { language } = useLanguage();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTag, setActiveTag] = useState<string>("all");
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Ensure client-side rendering
  useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch posts and tags
  useEffect(() => {
    async function fetchData() {
      try {
        const [fetchedPosts, fetchedTags] = await Promise.all([
          getAllPosts(),
          getAllTags(),
        ]);
        setPosts(fetchedPosts);
        setFilteredPosts(fetchedPosts);
        setTags(["all", ...fetchedTags]);
      } catch (error) {
        console.error("Error fetching blog data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Filter posts
  useEffect(() => {
    let result = [...posts];

    // Filter by tag
    if (activeTag !== "all") {
      result = result.filter((post) => post.tags?.includes(activeTag));
    }

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter((post) => {
        const title =
          post.title[language as keyof typeof post.title].toLowerCase();
        const excerpt =
          post.excerpt[language as keyof typeof post.excerpt].toLowerCase();
        const tagMatch =
          post.tags && post.tags.some((tag) => tag.toLowerCase().includes(term));

        return title.includes(term) || excerpt.includes(term) || tagMatch;
      });
    }

    setFilteredPosts(result);
  }, [posts, activeTag, searchTerm, language]);

  if (!mounted) return null;

  // Get translations
  const t = (key: string) => {
    const keys = key.split(".");
    let value: any = languages[language as keyof typeof languages];

    for (const k of keys) {
      if (!value || !value[k]) return key;
      value = value[k];
    }

    return value;
  };

  const searchPlaceholder =
    language === "vi"
      ? "Tìm kiếm bài viết theo tên, mô tả hoặc tag..."
      : "Search posts by title, description or tag...";

  const allPostsText = t("common.allPosts");
  const noPostsText = t("common.noPosts");
  const clearFiltersText =
    language === "vi" ? "Xóa bộ lọc" : "Clear filters";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="mb-12"
    >
      <Section title={t("sections.blog")} subtitle={t("sections.blogSubtitle")}>
        {/* Search and Filter */}
        <motion.div
          className="mb-8 space-y-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Search bar */}
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400"
              size={18}
            />
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

          {/* Tag filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            <Tag size={16} className="text-neutral-400 flex-shrink-0" />
            {tags.map((tag, index) => (
              <motion.button
                key={tag}
                className={`px-3 py-1 rounded-full text-sm whitespace-nowrap transition-all ${
                  activeTag === tag
                    ? "bg-blue-500/20 border border-blue-500/40 text-blue-300"
                    : "bg-neutral-800/50 border border-neutral-700 text-neutral-300 hover:bg-neutral-700/50"
                }`}
                onClick={() => setActiveTag(tag)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                {tag === "all" ? allPostsText : tag}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Posts Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            {filteredPosts.length > 0 ? (
              <motion.div
                className="grid md:grid-cols-2 gap-6"
                key="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {filteredPosts.map((post) => (
                  <BlogCard key={post._id} post={post} />
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
                <p className="text-lg">{noPostsText}</p>
                <motion.button
                  className="mt-4 px-4 py-2 bg-neutral-800 rounded-lg hover:bg-neutral-700 transition-colors"
                  onClick={() => {
                    setActiveTag("all");
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
        )}
      </Section>
    </motion.div>
  );
}
