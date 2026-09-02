import { ArrowLeft, ArrowRight } from 'lucide-react';
import AboutUsSection from './components/ui/about-us-section';
import Footer from './components/ui/footer';
import type { LangType } from './components/ui/language-selector';

interface AboutProps {
  lang: LangType;
  setView: (view: 'home' | 'about' | 'contact' | 'services' | 'laws') => void;
  onBookConsultation?: () => void;
}

const NAV_TEXT: Record<LangType, { home: string; book: string }> = {
  ar: { home: 'الرئيسية', book: 'احجز استشارة' },
  en: { home: 'Home', book: 'Book Consultation' },
  fr: { home: 'Accueil', book: 'Réserver une Consultation' },
  tr: { home: 'Ana Sayfa', book: 'Danışmanlık Alın' },
  ja: { home: 'ホーム', book: '相談を予約' },
  zh: { home: '首页', book: '预约咨询' },
  ko: { home: '홈', book: '상담 예약' },
  es: { home: 'Inicio', book: 'Reservar Consulta' }
};

export default function About({ lang, setView, onBookConsultation }: AboutProps) {
  const isRtl = lang === 'ar';
  const BackIcon = isRtl ? ArrowRight : ArrowLeft;
  const handleConsultation = onBookConsultation || (() => setView('contact'));
  const t = NAV_TEXT[lang] || NAV_TEXT.en;

  return (
    <div className="min-h-screen bg-[#F5F5F5] text-black font-sans selection:bg-black selection:text-white" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Fixed Navbar with Back Button */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between pointer-events-none">
        <div className="max-w-[88rem] mx-auto w-full flex items-center justify-between">
          <button 
            onClick={() => setView('home')} 
            className="pointer-events-auto inline-flex items-center gap-2 bg-white/80 backdrop-blur-md px-5 py-2.5 rounded-full border border-black/5 shadow-md text-black/80 hover:text-black hover:bg-white transition-all duration-200"
          >
            <BackIcon className="w-5 h-5" />
            <span className="font-semibold text-sm">{t.home}</span>
          </button>
          
          <div className="pointer-events-auto flex items-center gap-3">
            <button 
              onClick={handleConsultation}
              className="bg-black text-white px-6 py-2.5 rounded-full text-xs md:text-sm font-bold hover:bg-black/80 transition-colors shadow-md active:scale-95"
            >
              {t.book}
            </button>
          </div>
        </div>
      </nav>

      {/* Main Animated About Section */}
      <div className="pt-12">
        <AboutUsSection isRtl={isRtl} lang={lang} onContactClick={handleConsultation} />
      </div>

      {/* Universal Footer */}
      <Footer isRtl={isRtl} lang={lang} setView={setView} />
    </div>
  );
}
