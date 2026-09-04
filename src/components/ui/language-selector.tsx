import { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';

export type LangType = 'ar' | 'en' | 'fr' | 'es' | 'it' | 'tr' | 'ja' | 'zh' | 'ko';

export const LANGUAGES: {
  id: LangType;
  name: string;
  nativeName: string;
  flag: string;
  dir: 'rtl' | 'ltr';
}[] = [
  { id: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇪🇬', dir: 'rtl' },
  { id: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧', dir: 'ltr' },
  { id: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', dir: 'ltr' },
  { id: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', dir: 'ltr' },
  { id: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹', dir: 'ltr' },
  { id: 'tr', name: 'Turkish', nativeName: 'Türkçe', flag: '🇹🇷', dir: 'ltr' },
  { id: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵', dir: 'ltr' },
  { id: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳', dir: 'ltr' },
  { id: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷', dir: 'ltr' }
];

interface LanguageSelectorProps {
  lang: LangType;
  setLang: (lang: LangType) => void;
  variant?: 'navbar' | 'mobile-bar' | 'compact';
}

export default function LanguageSelector({
  lang,
  setLang,
  variant = 'navbar'
}: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const current = LANGUAGES.find(l => l.id === lang) || LANGUAGES[0];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Variant: Mobile Segmented Bar
  if (variant === 'mobile-bar') {
    return (
      <div className="w-full bg-black/5 p-1 rounded-2xl flex items-center justify-between gap-1 border border-black/5">
        {LANGUAGES.map(l => {
          const isActive = l.id === lang;
          return (
            <button
              key={l.id}
              onClick={() => setLang(l.id)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                isActive
                  ? 'bg-neutral-900 text-white shadow-md scale-[1.02]'
                  : 'text-neutral-600 hover:text-neutral-950 hover:bg-white/60'
              }`}
            >
              <span className="text-sm">{l.flag}</span>
              <span>{l.nativeName}</span>
            </button>
          );
        })}
      </div>
    );
  }

  // Variant: Desktop & Header Dropdown
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 bg-white/80 hover:bg-white backdrop-blur-md px-3.5 py-2 rounded-full border border-black/10 shadow-xs text-neutral-800 hover:text-black font-semibold text-xs md:text-sm transition-all duration-200 active:scale-95 group focus:outline-none"
        aria-label="Change Language"
      >
        <span className="text-base">{current.flag}</span>
        <span className="font-medium tracking-tight">{current.nativeName}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-black/50 group-hover:text-black transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 right-0 rtl:right-auto rtl:left-0 w-44 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-black/10 p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-black/40 border-b border-black/5 mb-1 flex items-center gap-1">
            <Globe className="w-3 h-3" />
            <span>Select Language</span>
          </div>
          {LANGUAGES.map(l => {
            const isActive = l.id === lang;
            return (
              <button
                key={l.id}
                onClick={() => {
                  setLang(l.id);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-neutral-900 text-white font-semibold'
                    : 'text-neutral-700 hover:bg-neutral-100 hover:text-black'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-base">{l.flag}</span>
                  <span>{l.nativeName}</span>
                </div>
                {isActive && <Check className="w-3.5 h-3.5 text-amber-400" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
