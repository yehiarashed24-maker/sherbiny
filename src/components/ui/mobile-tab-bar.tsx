import { Home, Briefcase, Scale, PhoneCall, CalendarPlus, UserCheck } from 'lucide-react';

interface MobileTabBarProps {
  currentView: 'home' | 'about' | 'contact' | 'services' | 'laws';
  setView: (view: 'home' | 'about' | 'contact' | 'services' | 'laws') => void;
  onOpenConsultation: () => void;
  isRtl: boolean;
}

export default function MobileTabBar({
  currentView,
  setView,
  onOpenConsultation,
  isRtl
}: MobileTabBarProps) {
  const tabs = [
    {
      id: 'home' as const,
      label: isRtl ? 'الرئيسية' : 'Home',
      icon: Home,
      action: () => setView('home')
    },
    {
      id: 'services' as const,
      label: isRtl ? 'الخدمات' : 'Services',
      icon: Briefcase,
      action: () => setView('services')
    },
    {
      id: 'book' as const,
      label: isRtl ? 'حجز استشارة' : 'Book',
      icon: CalendarPlus,
      isSpecial: true,
      action: onOpenConsultation
    },
    {
      id: 'laws' as const,
      label: isRtl ? 'القوانين' : 'Laws',
      icon: Scale,
      action: () => setView('laws')
    },
    {
      id: 'contact' as const,
      label: isRtl ? 'تواصل' : 'Contact',
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
