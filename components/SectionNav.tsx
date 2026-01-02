"use client";
import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";

interface Section {
  id: string;
  label: { vi: string; en: string };
}

const sections: Section[] = [
  { id: "about", label: { vi: "Giới thiệu", en: "About" } },
  { id: "experience", label: { vi: "Kinh nghiệm", en: "Experience" } },
  { id: "skills", label: { vi: "Kỹ năng", en: "Skills" } },
  { id: "research", label: { vi: "Nghiên cứu", en: "Research" } },
  { id: "contact", label: { vi: "Liên hệ", en: "Contact" } },
];

export default function SectionNav() {
  const { language } = useLanguage();
  const [activeSection, setActiveSection] = useState<string>("about");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show navigation after a small delay
    const timer = setTimeout(() => setIsVisible(true), 500);

    // Function to find the currently active section
    const updateActiveSection = () => {
      const scrollPosition = window.scrollY + 150; // Offset for navbar

      // Find which section is currently in view
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const element = document.getElementById(section.id);
        
        if (element) {
          const { offsetTop } = element;
          if (scrollPosition >= offsetTop) {
            setActiveSection(section.id);
            return;
          }
        }
      }
      
      // Default to first section if at top
      setActiveSection(sections[0].id);
    };

    // Update on scroll
    const handleScroll = () => {
      updateActiveSection();
    };

    // Initial update
    updateActiveSection();

    // Listen to scroll events
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100; // Offset for fixed navbar + padding
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      
      // Update active section immediately for better UX
      setActiveSection(sectionId);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          className="fixed left-8 top-1/2 -translate-y-1/2 z-40 hidden lg:block"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5 }}
        >
          <div className="backdrop-blur-md bg-neutral-900/50 border border-neutral-800/50 rounded-2xl p-3 shadow-2xl">
            <ul className="space-y-1">
              {sections.map((section) => {
                const isActive = activeSection === section.id;
                return (
                  <motion.li key={section.id} className="relative">
                    {/* Active indicator outside button */}
                    {isActive && (
                      <motion.div
                        className="absolute left-0 top-0 bottom-0 w-1 rounded-r-full bg-gradient-to-b from-blue-500 to-purple-500"
                        layoutId="activeIndicator"
                        initial={false}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 35,
                          mass: 0.8,
                        }}
                      />
                    )}
                    
                    <motion.button
                      onClick={() => scrollToSection(section.id)}
                      className={`
                        relative block w-full text-left px-4 py-2 rounded-lg
                        transition-all duration-300 text-sm font-medium
                        ${
                          isActive
                            ? "text-white bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30"
                            : "text-neutral-400 hover:text-white hover:bg-neutral-800/50"
                        }
                      `}
                      whileHover={{ x: 3 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="relative z-10">
                        {section.label[language as keyof typeof section.label]}
                      </span>
                    </motion.button>
                  </motion.li>
                );
              })}
            </ul>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
