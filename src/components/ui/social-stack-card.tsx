import { useState } from 'react';
import type { LangType } from './language-selector';

interface SocialStackCardProps {
  lang?: LangType;
  isRtl?: boolean;
}

const SOCIAL_LINKS = [
  {
    id: 'instagram',
    name: 'Instagram',
    arName: 'إنستغرام',
    url: 'https://www.instagram.com/ahmedelsherbiny6/',
    color: 'from-[#833ab4]/90 via-[#fd1d1d]/85 to-[#fcb045]/90',
    hoverBg: 'hover:brightness-110',
    icon: (
      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
      </svg>
    )
  },
  {
    id: 'twitter',
    name: 'X (Twitter)',
    arName: 'منصة إكس',
    url: 'https://twitter.com/ElsherbinyAhmed',
    color: 'from-[#000000] via-[#14171a] to-[#242b33]',
    hoverBg: 'hover:border-white/40',
    icon: (
      <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    )
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    arName: 'لينكد إن',
    url: 'https://www.linkedin.com/in/ahmed-elsherbiny-96698b17/',
    color: 'from-[#0077b5] via-[#0a66c2] to-[#004182]',
    hoverBg: 'hover:brightness-110',
    icon: (
      <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.5a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28z"/>
      </svg>
    )
  },
  {
    id: 'facebook',
    name: 'Facebook',
    arName: 'فيسبوك',
    url: 'https://www.facebook.com/ahmed.elsherbiny.142',
    color: 'from-[#1877f2] via-[#0d65d9] to-[#0a4aa6]',
    hoverBg: 'hover:brightness-110',
    icon: (
      <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    )
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    arName: 'واتساب',
    url: 'https://wa.me/201223233620',
    color: 'from-[#25D366] via-[#128C7E] to-[#075E54]',
    hoverBg: 'hover:brightness-110',
    icon: (
      <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.97.53 1.771.815 2.796.815 3.182 0 5.768-2.587 5.768-5.768 0-3.18-2.586-5.768-5.768-5.768zm3.393 8.163c-.144.405-.837.774-1.17.822-.312.043-.687.07-2.074-.504-1.637-.677-2.716-2.34-2.799-2.45-.083-.11-1.008-1.34-1.008-2.555 0-1.215.637-1.813.864-2.059.227-.247.495-.309.66-.309.165 0 .33.003.474.011.155.008.363-.058.568.433.216.516.732 1.784.794 1.912.062.128.103.278.02.443-.082.165-.124.268-.247.412-.124.144-.261.322-.372.433-.124.124-.254.258-.11.505.144.247.64 1.056 1.373 1.708.943.839 1.738 1.099 1.986 1.223.247.124.392.103.536-.062.144-.165.619-.722.784-.97.165-.247.33-.206.557-.124.227.082 1.444.68 1.692.804.247.124.412.186.474.289.062.103.062.598-.082 1.003z"/>
      </svg>
    )
  }
];

export default function SocialStackCard({ lang = 'ar', isRtl = true }: SocialStackCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  const title = lang === 'ar' ? 'وسائل التواصل' : lang === 'fr' ? 'Réseaux Sociaux' : lang === 'tr' ? 'Sosyal Medya' : 'Socials';

  return (
    <div
      className="relative w-52 h-52 sm:w-56 sm:h-56 rounded-[28px] p-4 flex flex-col justify-between overflow-hidden shadow-2xl transition-all duration-500 cursor-pointer group select-none border border-white/15"
      style={{
        background: 'linear-gradient(135deg, #1f1d1d 0%, #121212 40%, #000000 100%)',
        boxShadow: isHovered
          ? '0 20px 40px -15px rgba(217, 119, 6, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.2)'
          : '0 10px 30px -10px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.1)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setActiveTooltip(null);
      }}
      onClick={() => setIsHovered(!isHovered)}
    >
      {/* Background Ambient Shimmer */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none transition-opacity duration-700"
        style={{
          background: 'radial-gradient(circle at 80% 20%, rgba(217, 119, 6, 0.25), transparent 60%)'
        }}
      />

      {/* Top Header / Title */}
      <div className={`relative z-30 transition-all duration-500 ${isHovered ? 'translate-y-0' : 'translate-y-16'}`}>
        <div className={`flex items-center justify-between ${isHovered ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
          <span className="text-[11px] font-bold tracking-wider uppercase text-amber-400/90 bg-white/10 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/10">
            {title}
          </span>
          <span className="text-[10px] text-white/40 font-medium">
            {isRtl ? 'انقر للفتح' : 'Click to visit'}
          </span>
        </div>

        {/* Center Title in Default State */}
        <div
          className={`absolute left-0 right-0 text-center font-bold text-xl sm:text-2xl text-white tracking-wide transition-all duration-500 drop-shadow-md ${
            isHovered ? 'opacity-0 scale-90 pointer-events-none' : 'opacity-100 scale-100'
          }`}
        >
          {title}
        </div>
      </div>

      {/* Tooltip Indicator */}
      {activeTooltip && (
        <div
          className={`absolute top-3 ${
            isRtl ? 'left-3' : 'right-3'
          } z-40 bg-black/90 text-white text-[11px] font-bold px-2.5 py-1 rounded-lg border border-white/20 shadow-xl backdrop-blur-md animate-in fade-in zoom-in-95 duration-200`}
        >
          {activeTooltip}
        </div>
      )}

      {/* Layered Nested Fan-Out Cards */}
      <div className="absolute inset-0 pointer-events-none">
        {SOCIAL_LINKS.map((item, index) => {
          // Layer offsets and scale
          const total = SOCIAL_LINKS.length;
          const reverseIndex = total - 1 - index; // innermost to outermost

          // Compute size and position based on hover
          const sizePercent = 42 + index * 13; // 42% to 94%
          const offsetBase = (index + 1) * 7; // offset from corner

          return (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={(e) => {
                e.stopPropagation();
                setActiveTooltip(lang === 'ar' ? item.arName : item.name);
              }}
              onMouseLeave={() => setActiveTooltip(null)}
              className={`absolute rounded-2xl shadow-xl transition-all duration-500 ease-out border border-white/20 flex items-start justify-start p-2.5 bg-gradient-to-br ${item.color} ${item.hoverBg} ${
                isHovered ? 'pointer-events-auto opacity-100 hover:scale-[1.03] hover:z-30 active:scale-95' : 'pointer-events-none opacity-0 scale-75'
              }`}
              style={{
                width: `${sizePercent}%`,
                height: `${sizePercent}%`,
                bottom: isHovered ? `${(total - 1 - index) * 6}px` : '-40px',
                [isRtl ? 'right' : 'left']: isHovered ? `${(total - 1 - index) * 6}px` : '-40px',
                zIndex: index + 10,
                transformOrigin: isRtl ? 'bottom right' : 'bottom left',
                transitionDelay: isHovered ? `${(total - 1 - index) * 50}ms` : `${index * 30}ms`
              }}
              aria-label={item.name}
            >
              {/* Icon placed in the visible top corner of each layer */}
              <div
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-black/25 backdrop-blur-md border border-white/25 flex items-center justify-center shadow-md transition-transform duration-300 ${
                  activeTooltip === (lang === 'ar' ? item.arName : item.name) ? 'scale-110 bg-white/20' : ''
                }`}
              >
                {item.icon}
              </div>
            </a>
          );
        })}
      </div>

      {/* Bottom Hint */}
      <div className={`relative z-20 transition-all duration-300 ${isHovered ? 'opacity-0' : 'opacity-70'} text-center`}>
        <span className="text-[11px] text-white/50 font-medium">
          {isRtl ? 'مرر المؤشر لاستعراض الروابط' : 'Hover to expand'}
        </span>
      </div>
    </div>
  );
}
