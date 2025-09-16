"use client";
import Badge from "@/components/Badge";
import Section from "@/components/Section";
import ProfileHeader from "@/components/ProfileHeader";
import Timeline from "@/components/Timeline";
import SkillCard from "@/components/SkillCard";
import {
  Github,
  Linkedin,
  Mail,
  GraduationCap,
  BookOpenText,
  Briefcase,
  Code,
  Languages,
  Server,
  Database,
  Cloud,
  Puzzle,
  ChevronRight,
  BookOpen
} from "lucide-react";
import profile from "@/data/profile.json";
import languages from "@/data/languages.json";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const { language, setLanguage } = useLanguage();
  const [mounted, setMounted] = useState(false);

  // Đảm bảo render phía client để tránh lỗi hydration
  useEffect(() => {
    setMounted(true);
  }, []);

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

  // Lấy giá trị từ profile theo ngôn ngữ
  const getProfileValue = (obj: any) => {
    if (!obj) return "";
    return typeof obj === "object" && obj[language] ? obj[language] : obj;
  };

  // Chuẩn bị dữ liệu cho Timeline
  const experienceItems = profile.experience.map(exp => ({
    title: getProfileValue(exp.position),
    subtitle: getProfileValue(exp.company),
    period: exp.period, // Giữ nguyên đối tượng period, component Timeline sẽ xử lý
    description: getProfileValue(exp.description)
  }));

  // Các icon cho các loại kỹ năng
  const skillIcons = {
    "Front-end": <Code size={18} />,
    "Back-end": <Server size={18} />,
    "Databases": <Database size={18} />,
    "DevOps & Cloud": <Cloud size={18} />,
    "Others": <Puzzle size={18} />
  };

  // Các màu cho các loại kỹ năng
  const skillColors = {
    "Front-end": "blue-500",
    "Back-end": "green-500",
    "Databases": "purple-500",
    "DevOps & Cloud": "indigo-500",
    "Others": "pink-500"
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.div 
      className="space-y-16 mb-12"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Profile Header with Avatar */}
      <motion.div variants={itemVariants}>
        <ProfileHeader t={t} getProfileValue={getProfileValue} />
      </motion.div>

      {/* Info Card Section */}
      <motion.div 
        className="card p-6 md:p-8 relative overflow-hidden"
        variants={itemVariants}
        whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
      >
        <div
          className="absolute -right-10 -top-10 size-40 rounded-full blur-3xl opacity-30"
          style={{
            background:
              "radial-gradient(circle at center, hsl(var(--brand)) 0%, transparent 70%)",
          }}
        />
        <ul className="space-y-6">
          <motion.li 
            className="flex items-start gap-3"
            whileHover={{ x: 5, transition: { duration: 0.2 } }}
          >
            <GraduationCap className="mt-1 animate-float text-blue-400" />
            <div>
              <h3 className="font-semibold">{t("profile.university")}</h3>
              <p className="text-neutral-300">
                {getProfileValue(profile.university.name)} —{" "}
                {getProfileValue(profile.university.department)}
              </p>
            </div>
          </motion.li>
          <motion.li 
            className="flex items-start gap-3"
            whileHover={{ x: 5, transition: { duration: 0.2 } }}
          >
            <BookOpenText className="mt-1 text-green-400" />
            <div>
              <h3 className="font-semibold">{t("sections.certificates")}</h3>
              <ul className="space-y-2 mt-2">
                {profile.certificates.map((c, i) => (
                  <motion.li 
                    key={i}
                    className="flex items-start gap-2 text-neutral-300"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 * i, duration: 0.5 }}
                  >
                    <ChevronRight size={16} className="mt-1 text-blue-400 flex-shrink-0" />
                    {getProfileValue(c)}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.li>
        </ul>
      </motion.div>

      {/* Experience Section */}
      <Section title={t("sections.experience")}>
        <Timeline items={experienceItems} />
      </Section>

      {/* Skills Section */}
      <Section title={t("sections.skills.title")}>
        <div className="grid md:grid-cols-2 gap-6">
          {profile.skills.technical.map((skill, i) => {
            const category = getProfileValue(skill.category);
            const icon = skillIcons[category as keyof typeof skillIcons] || <Code size={18} />;
            const color = skillColors[category as keyof typeof skillColors] || "blue-500";
            
            return (
              <SkillCard 
                key={i}
                category={category}
                items={skill.items}
                icon={icon}
                color={color}
              />
            );
          })}
          
          <motion.div 
            className="card p-5 md:col-span-2"
            variants={itemVariants}
            whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
          >
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Languages size={18} className="text-purple-400" />
              {t("sections.skills.languages")}
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {profile.skills.languages.map((lang, i) => (
                <motion.div 
                  key={i} 
                  className="flex justify-between items-center p-3 rounded-lg hover:bg-neutral-800/50 transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 * i, duration: 0.4 }}
                  whileHover={{ x: 5 }}
                >
                  <span className="font-medium">{getProfileValue(lang.name)}</span>
                  <span className="text-sm px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300">
                    {getProfileValue(lang.level)}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Research Section */}
      <Section title={t("sections.research")}>
        <motion.ul 
          className="grid md:grid-cols-2 gap-4"
          variants={containerVariants}
        >
          {profile.research.map((r, i) => (
            <motion.li 
              key={i} 
              className="card p-5 hover:shadow-lg transition-all duration-300"
              variants={itemVariants}
              whileHover={{ 
                scale: 1.03, 
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)" 
              }}
            >
              <div className="flex items-start gap-3">
                <BookOpen className="text-indigo-400 flex-shrink-0 mt-1" size={18} />
                <div>
                  <h4 className="font-semibold">{getProfileValue(r.title)}</h4>
                  <p className="text-sm text-neutral-300 mt-1">
                    {getProfileValue(r.venue)} — {r.year}
                  </p>
                  {r.link && (
                    <a
                      className="mt-2 inline-flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300 transition-colors"
                      href={r.link}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {t("profile.viewDetails")} <ChevronRight size={14} />
                    </a>
                  )}
                </div>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </Section>

      {/* Contact Section */}
      <Section title={t("sections.contact")}>
        <motion.div 
          className="card p-6 md:p-8 relative overflow-hidden"
          variants={itemVariants}
          whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
        >
          <div
            className="absolute -left-10 -bottom-10 size-40 rounded-full blur-3xl opacity-20"
            style={{
              background:
                "radial-gradient(circle at center, hsl(var(--accent)) 0%, transparent 70%)",
            }}
          />
          
          <div className="flex flex-col md:flex-row gap-6 items-center justify-center">
            {profile.contacts.github && (
              <motion.a
                className="flex items-center gap-2 hover:text-blue-400 transition-all duration-300 px-5 py-3 rounded-lg hover:bg-neutral-800/70 w-full md:w-auto justify-center"
                href={profile.contacts.github}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github size={22} /> GitHub
              </motion.a>
            )}
            {profile.contacts.linkedin && (
              <motion.a
                className="flex items-center gap-2 hover:text-blue-400 transition-all duration-300 px-5 py-3 rounded-lg hover:bg-neutral-800/70 w-full md:w-auto justify-center"
                href={profile.contacts.linkedin}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Linkedin size={22} /> LinkedIn
              </motion.a>
            )}
            {profile.contacts.email && (
              <motion.a
                className="flex items-center gap-2 hover:text-blue-400 transition-all duration-300 px-5 py-3 rounded-lg hover:bg-neutral-800/70 w-full md:w-auto justify-center"
                href={`mailto:${profile.contacts.email}`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail size={22} /> {profile.contacts.email}
              </motion.a>
            )}
          </div>
        </motion.div>
      </Section>
    </motion.div>
  );
}