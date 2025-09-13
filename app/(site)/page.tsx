"use client";
import Badge from "@/components/Badge";
import Section from "@/components/Section";
import {
  Github,
  Linkedin,
  Mail,
  Award,
  GraduationCap,
  BookOpenText,
  Briefcase,
  Code,
  Languages,
  Phone,
} from "lucide-react";
import profile from "@/data/profile.json";
import languages from "@/data/languages.json";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState, useEffect } from "react";

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

  return (
    <div className="space-y-12 mb-12">
      {/* Language Switcher */}
      <div className="flex justify-end mt-4">
        <button
          onClick={() => setLanguage(language === "vi" ? "en" : "vi")}
          className="px-3 py-1 rounded-lg bg-neutral-800/50 hover:bg-neutral-800/70 text-sm"
        >
          {language === "vi" ? "English" : "Tiếng Việt"}
        </button>
      </div>

      {/* Header Section */}
      <header className="grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
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
        <div className="card p-6 md:p-8 relative overflow-hidden">
          <div
            className="absolute -right-10 -top-10 size-40 rounded-full blur-3xl opacity-30"
            style={{
              background:
                "radial-gradient(circle at center, hsl(var(--brand)) 0%, transparent 70%)",
            }}
          />
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <GraduationCap className="mt-1 animate-float" />
              <div>
                <h3 className="font-semibold">{t("profile.university")}</h3>
                <p className="text-neutral-300">
                  {getProfileValue(profile.university.name)} —{" "}
                  {getProfileValue(profile.university.department)}
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <BookOpenText className="mt-1" />
              <div>
                <h3 className="font-semibold">{t("sections.certificates")}</h3>
                <ul className="list-disc ml-5 text-neutral-300">
                  {profile.certificates.map((c, i) => (
                    <li key={i}>{getProfileValue(c)}</li>
                  ))}
                </ul>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Award className="mt-1" />
              <div>
                <h3 className="font-semibold">{t("sections.awards")}</h3>
                <ul className="list-disc ml-5 text-neutral-300">
                  {profile.awards.map((a, i) => (
                    <li key={i}>{getProfileValue(a)}</li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </header>

      {/* Experience Section */}
      <Section title={t("sections.experience")}>
        <div className="space-y-6">
          {profile.experience.map((exp, i) => (
            <div key={i} className="card p-5">
              <div className="flex justify-between items-start flex-wrap gap-2">
                <div>
                  <h3 className="font-semibold text-lg">
                    {getProfileValue(exp.position)}
                  </h3>
                  <p className="text-neutral-300">
                    {getProfileValue(exp.company)}
                  </p>
                </div>
                <span className="text-sm text-neutral-400">{exp.period}</span>
              </div>
              <p className="mt-3 text-neutral-300">
                {getProfileValue(exp.description)}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Skills Section */}
      <Section title={t("sections.skills.title")}>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="card p-5">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Code size={18} />
              {t("sections.skills.technical")}
            </h3>
            <div className="space-y-4">
              {profile.skills.technical.map((skill, i) => (
                <div key={i}>
                  <h4 className="text-sm font-medium text-neutral-400 mb-2">
                    {getProfileValue(skill.category)}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {skill.items.map((item, j) => (
                      <span
                        key={j}
                        className="bg-neutral-800/50 px-3 py-1 rounded-lg text-sm"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-5">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Languages size={18} />
              {t("sections.skills.languages")}
            </h3>
            <ul className="space-y-3">
              {profile.skills.languages.map((lang, i) => (
                <li key={i} className="flex justify-between">
                  <span>{getProfileValue(lang.name)}</span>
                  <span className="text-neutral-400">
                    {getProfileValue(lang.level)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Research Section */}
      <Section title={t("sections.research")}>
        <ul className="grid md:grid-cols-2 gap-4">
          {profile.research.map((r, i) => (
            <li key={i} className="card p-5">
              <h4 className="font-semibold">{getProfileValue(r.title)}</h4>
              <p className="text-sm text-neutral-300">
                {getProfileValue(r.venue)} — {r.year}
              </p>
              {r.link && (
                <a
                  className="underline mt-2 inline-block"
                  href={r.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  {t("profile.viewDetails")}
                </a>
              )}
            </li>
          ))}
        </ul>
      </Section>

      {/* Contact Section */}
      <Section title={t("sections.contact")}>
        <div className="card p-5">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
            {profile.contacts.github && (
              <a
                className="flex items-center gap-2 hover:text-neutral-100"
                href={profile.contacts.github}
                target="_blank"
                rel="noreferrer"
              >
                <Github size={20} /> GitHub
              </a>
            )}
            {profile.contacts.linkedin && (
              <a
                className="flex items-center gap-2 hover:text-neutral-100"
                href={profile.contacts.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                <Linkedin size={20} /> LinkedIn
              </a>
            )}
            {profile.contacts.email && (
              <a
                className="flex items-center gap-2 hover:text-neutral-100"
                href={`mailto:${profile.contacts.email}`}
              >
                <Mail size={20} /> {profile.contacts.email}
              </a>
            )}
          </div>
        </div>
      </Section>
    </div>
  );
}
