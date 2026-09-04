import { Home, Briefcase, Scale, PhoneCall, CalendarPlus } from 'lucide-react';
import type { LangType } from './language-selector';

interface MobileTabBarProps {
  currentView: 'home' | 'about' | 'contact' | 'services' | 'laws';
  setView: (view: 'home' | 'about' | 'contact' | 'services' | 'laws') => void;
  onOpenConsultation: () => void;
  lang: LangType;
}

const TAB_LABELS: Record<LangType, { home: string; services: string; book: string; laws: string; contact: string }> = {
  ar: { home: 'الرئيسية', services: 'الخدمات', book: 'حجز استشارة', laws: 'القوانين', contact: 'تواصل' },
  en: { home: 'Home', services: 'Services', book: 'Book', laws: 'Laws', contact: 'Contact' },
  fr: { home: 'Accueil', services: 'Services', book: 'Réserver', laws: 'Lois', contact: 'Contact' },
  tr: { home: 'Ana Sayfa', services: 'Hizmetler', book: 'Danışmanlık', laws: 'Mevzuat', contact: 'İletişim' },
  ja: { home: 'ホーム', services: 'サービス', book: '予約', laws: '法律', contact: '連絡先' },
  zh: { home: '首页', services: '服务', book: '预约', laws: '法律', contact: '联系我们' },
  ko: { home: '홈', services: '서비스', book: '예약', laws: '법률', contact: '연락처' },
  es: { home: 'Inicio', services: 'Servicios', book: 'Reserva', laws: 'Leyes', contact: 'Contacto' },
  it: { home: 'Home', services: 'Servizi', book: 'Prenota', laws: 'Leggi', contact: 'Contatto' }
};

export default function MobileTabBar({
  currentView,
  setView,
  onOpenConsultation,
  lang
}: MobileTabBarProps) {
  const isRtl = lang === 'ar';
  const labels = TAB_LABELS[lang] || TAB_LABELS.en;

  const tabs = [
    {
      id: 'home' as const,
      label: labels.home,
      icon: Home,
      action: () => setView('home')
    },
    {
      id: 'services' as const,
      label: labels.services,
      icon: Briefcase,
      action: () => setView('services')
    },
    {
      id: 'book' as const,
      label: labels.book,
      icon: CalendarPlus,
      isSpecial: true,
      action: onOpenConsultation
    },
    {
      id: 'laws' as const,
      label: labels.laws,
      icon: Scale,
      action: () => setView('laws')
    },
    {
      id: 'contact' as const,
      label: labels.contact,
      icon: PhoneCall,
      action: () => setView('contact')
    }
  ];

  return (
    <nav
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-black/10 shadow-[0_-4px_24px_rgba(0,0,0,0.08)] pb-[calc(env(safe-area-inset-bottom,0px)+6px)] pt-2 px-3"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentView === tab.id;

          if (tab.isSpecial) {
            return (
              <button
                key={tab.id}
                onClick={tab.action}
                className="flex flex-col items-center justify-center -mt-5 group focus:outline-none"
                aria-label={tab.label}
              >
                <div className="w-12 h-12 rounded-full bg-neutral-900 text-amber-400 flex items-center justify-center shadow-lg border-2 border-white group-active:scale-95 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold text-neutral-900 mt-1">
                  {tab.label}
                </span>
              </button>
            );
          }

          return (
            <button
              key={tab.id}
              onClick={tab.action}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all duration-200 focus:outline-none ${
                isActive
                  ? 'text-neutral-950 font-bold scale-105'
                  : 'text-neutral-500 hover:text-neutral-800 font-medium'
              }`}
            >
              <div className={`p-1 rounded-lg ${isActive ? 'bg-black/5' : ''}`}>
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
              </div>
              <span className="text-[10px] tracking-tight leading-tight mt-0.5">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
