"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { BlogPost } from "@/sanity/queries";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, Tag } from "lucide-react";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  const { language } = useLanguage();

  const title = post.title[language as keyof typeof post.title];
  const excerpt = post.excerpt[language as keyof typeof post.excerpt];
  const formattedDate = new Date(post.publishedAt).toLocaleDateString(
    language === "vi" ? "vi-VN" : "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  return (
    <motion.article
      className="card overflow-hidden group hover:shadow-2xl transition-all duration-300"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Link href={`/blog/${post.slug.current}`}>
        {/* Cover Image */}
        {post.coverImage?.asset?.url && (
          <div className="relative h-48 w-full overflow-hidden bg-neutral-800">
            <Image
              src={post.coverImage.asset.url}
              alt={post.coverImage.alt || title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300"
            />
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          {/* Meta Info */}
          <div className="flex items-center gap-4 text-sm text-neutral-400 mb-3">
            <span className="flex items-center gap-1">
              <Calendar size={14} />
              {formattedDate}
            </span>
            {post.readTime && (
              <span className="flex items-center gap-1">
                <Clock size={14} />
                {post.readTime} {language === "vi" ? "phút đọc" : "min read"}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-400 transition-colors">
            {title}
          </h3>

          {/* Excerpt */}
          <p className="text-neutral-300 mb-4 line-clamp-3">{excerpt}</p>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full bg-neutral-800 text-neutral-300 border border-neutral-700"
                >
                  <Tag size={10} />
                  {tag}
                </span>
              ))}
              {post.tags.length > 3 && (
                <span className="inline-flex items-center px-2 py-1 text-xs rounded-full bg-neutral-800 text-neutral-400">
                  +{post.tags.length - 3}
                </span>
              )}
            </div>
          )}

          {/* Read More Link */}
          <span className="text-blue-400 hover:text-blue-300 transition-colors inline-flex items-center gap-1">
            {language === "vi" ? "Đọc thêm" : "Read more"} →
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
