"use client";
import Image from "next/image";
import Badge from "@/components/Badge";
import { Github, Linkedin, Mail } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import profile from "@/data/profile.json";
import { motion } from "framer-motion";

interface ProfileHeaderProps {
  t: (key: string) => string;
  getProfileValue: (obj: any) => string;
}

export default function ProfileHeader({
  t,
  getProfileValue,
}: ProfileHeaderProps) {
  const { language } = useLanguage();

  return (
    <div className="grid md:grid-cols-3 gap-8 items-center">
      {/* Avatar Column */}
      <motion.div 
        className="flex justify-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-neutral-800 shadow-lg hover:border-blue-500 transition-colors duration-300"
          whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(59, 130, 246, 0.5)" }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-600/20 z-10" />
          <Image
            src={profile.avatar?.url || "/images/avatar.jpg"}
            alt={
              getProfileValue(profile.avatar?.alt) ||
              getProfileValue(profile.name)
            }
            fill
            className="object-cover"
            priority
          />
        </motion.div>
      </motion.div>

      {/* Info Column */}
      <motion.div 
        className="md:col-span-2 space-y-6"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Badge text={getProfileValue(profile.role)} />
        </motion.div>
        
        <motion.h1 
          className="text-4xl md:text-5xl font-bold tracking-tight gradient-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {getProfileValue(profile.name)}
        </motion.h1>
        
        <motion.p 
          className="text-neutral-300 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {getProfileValue(profile.summary)}
        </motion.p>
        
        <motion.div 
          className="flex flex-wrap gap-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          {profile.contacts.github && (
            <motion.a
              className="card glass px-4 py-2 inline-flex items-center gap-2 hover:bg-neutral-800/80"
              href={profile.contacts.github}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Github size={18} className="text-blue-400" /> {t("profile.contactLinks.github")}
            </motion.a>
          )}
          {profile.contacts.linkedin && (
            <motion.a
              className="card glass px-4 py-2 inline-flex items-center gap-2 hover:bg-neutral-800/80"
              href={profile.contacts.linkedin}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Linkedin size={18} className="text-blue-400" /> {t("profile.contactLinks.linkedin")}
            </motion.a>
          )}
          {profile.contacts.email && (
            <motion.a
              className="card glass px-4 py-2 inline-flex items-center gap-2 hover:bg-neutral-800/80"
              href={`mailto:${profile.contacts.email}`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Mail size={18} className="text-blue-400" /> {t("profile.contactLinks.email")}
            </motion.a>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}