import languages from '@/data/languages.json';

export type Language = 'vi' | 'en';

export function translate(key: string, language: Language): string {
  const keys = key.split('.');
  let value: any = languages[language];
  
  for (const k of keys) {
    if (!value || !value[k]) return key;
    value = value[k];
  }
  
  return value;
}

export function getProfileValue(obj: any, language: Language): string {
  if (!obj) return '';
  return typeof obj === 'object' && obj[language] ? obj[language] : obj;
}