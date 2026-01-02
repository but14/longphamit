"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const { language, setLanguage } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Định nghĩa các liên kết cho cả hai ngôn ngữ
  const links = {
    vi: [
      { href: "/", label: "Giới thiệu" },
      { href: "/projects", label: "Dự án" },
      { href: "/blog", label: "Blog" },
    ],
    en: [
      { href: "/", label: "About" },
      { href: "/projects", label: "Projects" },
      { href: "/blog", label: "Blog" },
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

  // Đóng mobile menu khi chuyển trang
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Chỉ render khi đã mounted để tránh lỗi hydration
  if (!mounted) {
    return (
      <header className="border-b border-neutral-800/80 sticky top-0 backdrop-blur bg-neutral-950/70 z-50">
        <nav className="container max-w-6xl mx-auto flex items-center justify-between py-4 px-4">
          <Image src="/images/logo.png" alt="Logo" width={40} height={40} className="object-contain" />
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
          <Link
            href="/"
            className="hover:opacity-80 transition-opacity"
          >
            <Image src="/images/logo.png" alt="Logo" width={80} height={80} className="object-contain" />
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4">
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

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <motion.button
            onClick={toggleLanguage}
            className="px-3 py-2 rounded-lg bg-neutral-800/50 hover:bg-neutral-700 text-neutral-200 hover:text-white transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {languageDisplay}
          </motion.button>

          <motion.button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-neutral-800/50 hover:bg-neutral-700 text-neutral-200 hover:text-white transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </motion.button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="md:hidden absolute top-full left-0 right-0 bg-neutral-900/95 backdrop-blur-lg border-b border-neutral-800"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.ul
              className="container max-w-6xl mx-auto py-4 px-4 flex flex-col gap-2"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
            >
              {links[language].map((link) => (
                <motion.li
                  key={link.href}
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 },
                  }}
                >
                  <Link
                    href={link.href}
                    className={`block px-4 py-3 rounded-lg transition-all duration-300 ${
                      pathname === link.href
                        ? "bg-neutral-800 text-white"
                        : "hover:bg-neutral-800/50 text-neutral-300 hover:text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
