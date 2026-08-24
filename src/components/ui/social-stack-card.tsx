import { useState } from 'react';
import type { LangType } from './language-selector';

interface SocialStackCardProps {
  lang?: LangType;
  isRtl?: boolean;
}

export default function SocialStackCard({ lang = 'ar', isRtl = false }: SocialStackCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  const title = lang === 'ar' ? 'Socials' : 'Socials';

  const layers = [
    {
      id: 'instagram',
      name: 'Instagram',
      url: 'https://www.instagram.com/ahmedelsherbiny6/',
      bg: 'linear-gradient(135deg, rgba(236, 72, 153, 0.85) 0%, rgba(217, 70, 239, 0.9) 100%)',
      borderColor: 'rgba(255, 255, 255, 0.45)',
      size: '86%',
      zIndex: 10,
      icon: (
        <svg className="w-5 h-5 text-white drop-shadow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
        </svg>
      )
    },
    {
      id: 'twitter',
      name: 'X (Twitter)',
      url: 'https://twitter.com/ElsherbinyAhmed',
      bg: 'linear-gradient(135deg, rgba(14, 165, 233, 0.9) 0%, rgba(56, 189, 248, 0.95) 100%)',
      borderColor: 'rgba(255, 255, 255, 0.5)',
      size: '69%',
      zIndex: 20,
      icon: (
        <svg className="w-4 h-4 text-white drop-shadow" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      )
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/ahmed-elsherbiny-96698b17/',
      bg: 'linear-gradient(135deg, rgba(59, 130, 246, 0.9) 0%, rgba(96, 165, 250, 0.95) 100%)',
      borderColor: 'rgba(255, 255, 255, 0.5)',
      size: '52%',
      zIndex: 30,
      icon: (
        <svg className="w-4 h-4 text-white drop-shadow" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.5a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28z"/>
        </svg>
      )
    },
    {
      id: 'facebook',
      name: 'Facebook',
      url: 'https://www.facebook.com/ahmed.elsherbiny.142',
      bg: 'linear-gradient(135deg, rgba(37, 99, 235, 0.92) 0%, rgba(29, 78, 216, 0.95) 100%)',
      borderColor: 'rgba(255, 255, 255, 0.5)',
      size: '36%',
      zIndex: 40,
      icon: (
        <svg className="w-3.5 h-3.5 text-white drop-shadow" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      )
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      url: 'https://wa.me/201223233620',
      bg: 'linear-gradient(135deg, rgba(16, 185, 129, 0.95) 0%, rgba(5, 150, 105, 0.95) 100%)',
      borderColor: 'rgba(255, 255, 255, 0.55)',
      size: '22%',
      zIndex: 50,
      icon: (
        <svg className="w-3 h-3 text-white drop-shadow" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.97.53 1.771.815 2.796.815 3.182 0 5.768-2.587 5.768-5.768 0-3.18-2.586-5.768-5.768-5.768zm3.393 8.163c-.144.405-.837.774-1.17.822-.312.043-.687.07-2.074-.504-1.637-.677-2.716-2.34-2.799-2.45-.083-.11-1.008-1.34-1.008-2.555 0-1.215.637-1.813.864-2.059.227-.247.495-.309.66-.309.165 0 .33.003.474.011.155.008.363-.058.568.433.216.516.732 1.784.794 1.912.062.128.103.278.02.443-.082.165-.124.268-.247.412-.124.144-.261.322-.372.433-.124.124-.254.258-.11.505.144.247.64 1.056 1.373 1.708.943.839 1.738 1.099 1.986 1.223.247.124.392.103.536-.062.144-.165.619-.722.784-.97.165-.247.33-.206.557-.124.227.082 1.444.68 1.692.804.247.124.412.186.474.289.062.103.062.598-.082 1.003z"/>
        </svg>
      )
    }
  ];

  return (
    <div
      className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-[36px] p-6 flex flex-col justify-between overflow-hidden shadow-2xl transition-all duration-500 cursor-pointer group select-none border-2 border-white/20 hover:border-white/40"
      style={{
        background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 35%, #ec4899 70%, #f97316 100%)',
        boxShadow: isHovered
          ? '0 25px 50px -12px rgba(168, 85, 247, 0.45), 0 0 0 1px rgba(255, 255, 255, 0.3)'
          : '0 15px 35px -10px rgba(124, 58, 237, 0.35)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setActiveTooltip(null);
      }}
      onClick={() => setIsHovered(!isHovered)}
    >
      {/* Soft Ambient Radial Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          background: 'radial-gradient(circle at top right, rgba(255, 255, 255, 0.4), transparent 60%)'
        }}
      />

      {/* Header "Socials" Text */}
      <div className="relative z-30 flex items-start justify-between w-full">
        <div
          className={`font-extrabold text-white text-2xl sm:text-3xl tracking-tight transition-all duration-500 drop-shadow-md ${
            isHovered
              ? 'translate-y-0 text-right sm:text-right w-full flex justify-end opacity-95'
              : 'translate-y-20 w-full text-center opacity-100'
          }`}
        >
          {title}
        </div>
      </div>

      {/* Active Tooltip / Badge */}
      {activeTooltip && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-black/85 text-white text-xs font-bold px-3.5 py-1.5 rounded-full shadow-2xl border border-white/30 backdrop-blur-md animate-in fade-in zoom-in-95 pointer-events-none">
          {activeTooltip}
        </div>
      )}

      {/* Nested Concentric Fan-out Layers */}
      <div className="absolute inset-0 pointer-events-none">
        {layers.map((layer, index) => {
          return (
            <a
              key={layer.id}
              href={layer.url}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={(e) => {
                e.stopPropagation();
                setActiveTooltip(layer.name);
              }}
              onMouseLeave={() => setActiveTooltip(null)}
              className={`absolute bottom-0 left-0 rounded-tr-[28px] rounded-tl-[20px] rounded-br-[12px] border-2 shadow-lg transition-all duration-500 ease-out flex items-start justify-end p-2.5 sm:p-3 ${
                isHovered
                  ? 'pointer-events-auto opacity-100 hover:brightness-110 active:scale-98'
                  : 'pointer-events-none opacity-0 scale-75'
              }`}
              style={{
                width: layer.size,
                height: layer.size,
                background: layer.bg,
                borderColor: layer.borderColor,
                zIndex: layer.zIndex,
                transitionDelay: isHovered ? `${index * 45}ms` : `${(layers.length - 1 - index) * 30}ms`
              }}
              aria-label={layer.name}
            >
              {/* Exposed Corner Icon */}
              <div
                className={`transition-transform duration-300 ${
                  activeTooltip === layer.name ? 'scale-125' : 'hover:scale-110'
                }`}
              >
                {layer.icon}
              </div>
            </a>
          );
        })}
      </div>

      {/* Bottom Subtle Indicator */}
      <div className={`relative z-20 transition-opacity duration-300 text-center ${isHovered ? 'opacity-0' : 'opacity-80'}`}>
        <span className="text-[11px] font-semibold text-white/80 bg-black/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
          {isRtl ? 'مرر المؤشر للاستعراض' : 'Hover to open'}
        </span>
      </div>
    </div>
  );
}
