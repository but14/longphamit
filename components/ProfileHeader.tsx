"use client";
import Image from "next/image";
import Badge from "@/components/Badge";
import { Github, Linkedin, Mail } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import profile from "@/data/profile.json";

interface ProfileHeaderProps {
  t: (key: string) => string;
  getProfileValue: (obj: any) => string;
}

export default function ProfileHeader({ t, getProfileValue }: ProfileHeaderProps) {
  const { language } = useLanguage();
  
  return (
    <div className="grid md:grid-cols-3 gap-8 items-center">
      {/* Avatar Column */}
      <div className="flex justify-center">
        <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-neutral-800 shadow-lg">
          <Image 
            src={profile.avatar?.url || "/images/avatar.jpg"} 
            alt={getProfileValue(profile.avatar?.alt) || getProfileValue(profile.name)}
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
      
      {/* Info Column */}
      <div className="md:col-span-2 space-y-6">
        <Badge text={getProfileValue(profile.role)} />
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          {getProfileValue(profile.name)}
        </h1>
        <p className="text-neutral-300 leading-relaxed">
          {getProfileValue(profile.summary)}
        </p>
        <div className="flex flex-wrap gap-3">
          {profile.contacts.github && (
            <a
              className="card px-4 py-2 inline-flex items-center gap-2"
              href={profile.contacts.github}
              target="_blank"
              rel="noreferrer"
            >
              <Github size={18} /> {t("profile.contactLinks.github")}
            </a>
          )}
          {profile.contacts.linkedin && (
            <a
              className="card px-4 py-2 inline-flex items-center gap-2"
              href={profile.contacts.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              <Linkedin size={18} /> {t("profile.contactLinks.linkedin")}
            </a>
          )}
          {profile.contacts.email && (
            <a
              className="card px-4 py-2 inline-flex items-center gap-2"
              href={`mailto:${profile.contacts.email}`}
            >
              <Mail size={18} /> {t("profile.contactLinks.email")}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}