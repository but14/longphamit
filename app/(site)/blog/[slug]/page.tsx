"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { BlogPost, getPostBySlug } from "@/sanity/queries";
import BlogContent from "@/components/BlogContent";
import { motion } from "framer-motion";
import { Calendar, Clock, Tag, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import languages from "@/data/languages.json";
import { notFound } from "next/navigation";

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const { language } = useLanguage();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    async function fetchPost() {
      try {
        const fetchedPost = await getPostBySlug(params.slug);
        if (!fetchedPost || fetchedPost.isDraft) {
          notFound();
        }
        setPost(fetchedPost);
      } catch (error) {
        console.error("Error fetching post:", error);
        notFound();
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [params.slug]);

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!post) {
    return notFound();
  }

  const title = post.title[language as keyof typeof post.title];
  const excerpt = post.excerpt[language as keyof typeof post.excerpt];
  const content = post.content[language as keyof typeof post.content];
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
      className="max-w-4xl mx-auto mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Back Button */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors mb-8"
      >
        <ArrowLeft size={18} />
        {t("common.backToBlog")}
      </Link>

      {/* Cover Image */}
      {post.coverImage?.asset?.url && (
        <div className="relative w-full h-[400px] rounded-xl overflow-hidden mb-8">
          <Image
            src={post.coverImage.asset.url}
            alt={post.coverImage.alt || title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>

      {/* Meta Info */}
      <div className="flex flex-wrap items-center gap-4 text-neutral-400 mb-6 pb-6 border-b border-neutral-800">
        <span className="flex items-center gap-2">
          <Calendar size={16} />
          {formattedDate}
        </span>
        {post.readTime && (
          <span className="flex items-center gap-2">
            <Clock size={16} />
            {post.readTime} {t("common.readTime")}
          </span>
        )}
      </div>

      {/* Excerpt */}
      <p className="text-xl text-neutral-300 mb-8 leading-relaxed">
        {excerpt}
      </p>

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {post.tags.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1 px-3 py-1 text-sm rounded-full bg-neutral-800 text-neutral-300 border border-neutral-700"
            >
              <Tag size={12} />
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Content */}
      <div className="prose-container">
        <BlogContent content={content} />
      </div>

      {/* Back to Blog */}
      <div className="mt-12 pt-8 border-t border-neutral-800">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
        >
          <ArrowLeft size={18} />
          {t("common.backToBlog")}
        </Link>
      </div>
    </motion.article>
  );
}
