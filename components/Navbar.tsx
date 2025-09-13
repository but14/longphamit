"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const { language, setLanguage } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Định nghĩa các liên kết cho cả hai ngôn ngữ
  const links = {
    vi: [
      { href: "/", label: "Giới thiệu" },
      { href: "/projects", label: "Dự án" },
    ],
    en: [
      { href: "/", label: "About" },
      { href: "/projects", label: "Projects" },
    ],
  };

  // Hiệu ứng scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Đảm bảo hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // Chuyển đổi ngôn ngữ
  const toggleLanguage = () => {
    setLanguage(language === "vi" ? "en" : "vi");
  };

  // Hiển thị ngôn ngữ hiện tại
  const languageDisplay = language === "vi" ? "EN" : "VI";

  // Chỉ render khi đã mounted để tránh lỗi hydration
  if (!mounted) {
    return (
      <header className="border-b border-neutral-800/80 sticky top-0 backdrop-blur bg-neutral-950/70 z-50">
        <nav className="container max-w-6xl mx-auto flex items-center justify-between py-4 px-4">
          <div className="font-semibold tracking-tight">PNH Long</div>
          <div className="flex gap-1"></div>
        </nav>
      </header>
    );
  }

  return (
    <motion.header 
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled 
          ? "border-neutral-800/80 bg-neutral-950/90 backdrop-blur-md shadow-lg" 
          : "border-neutral-800/50 bg-neutral-950/70 backdrop-blur"
      }`}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <nav className="container max-w-6xl mx-auto flex items-center justify-between py-4 px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Link href="/" className="font-semibold tracking-tight text-lg hover:text-white transition-colors">
            PNH Long
          </Link>
        </motion.div>
        
        <div className="flex items-center gap-4">
          <ul className="flex gap-3">
            {links[language].map((link, index) => (
              <motion.li 
                key={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * (index + 1), duration: 0.3 }}
              >
                <Link
                  href={link.href}
                  className={`px-3 py-2 rounded-lg transition-all duration-300 ${
                    pathname === link.href 
                      ? "bg-neutral-800/70 text-white" 
                      : "hover:bg-neutral-800/40 text-neutral-300 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              </motion.li>
            ))}
          </ul>
          
          <motion.button
            onClick={toggleLanguage}
            className="ml-2 px-3 py-2 rounded-lg bg-neutral-800/50 hover:bg-neutral-700 text-neutral-200 hover:text-white transition-colors"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {languageDisplay}
          </motion.button>
        </div>
      </nav>
    </motion.header>
  );
}