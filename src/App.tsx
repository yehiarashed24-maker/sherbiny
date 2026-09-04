import { useState, useEffect, useRef } from 'react';
import { ArrowRight, ArrowLeft, Menu, X } from 'lucide-react';
import About from './About';
import Contact from './Contact';
import Services from './Services';
import Laws from './Laws';
import Chatbot from './components/ui/chatbot';
import Footer from './components/ui/footer';
import ConsultationModal from './components/ui/consultation-modal';
import MobileTabBar from './components/ui/mobile-tab-bar';
import LanguageSelector, { type LangType } from './components/ui/language-selector';
import SocialStackCard from './components/ui/social-stack-card';

import { translations } from './data/translations';

const clientLogos = [
  { name: 'ديرما صن', img: '/clients/client-1.png' },
  { name: 'الرمانة للدواجن', img: '/clients/client-2.png' },
  { name: 'شركة التعمير السياحي', img: '/clients/client-3.png' },
  { name: 'J’s Designs', img: '/clients/client-4.png' },
  { name: 'الصالحية للاستثمار والتنمية', img: '/clients/client-5.png' },
  { name: 'المقاولون العرب للاستثمارات', img: '/clients/client-6.png' },
  { name: 'طيبة لجدود الدواجن', img: '/clients/client-7.png' },
  { name: 'منتجع بيراميدز بارك', img: '/clients/client-8.png' }
];

const App = () => {
  const [lang, setLang] = useState<LangType>('ar');
  const [view, setView] = useState<'home' | 'about' | 'contact' | 'services' | 'laws'>('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const advisoryVideoRef = useRef<HTMLVideoElement>(null);

  const t = translations[lang] || translations.ar;
  const isRtl = lang === 'ar';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  // Robust Mobile AutoPlay without native media overlay controls
  useEffect(() => {
    const playVideo = (v: HTMLVideoElement | null) => {
      if (!v) return;
      v.defaultMuted = true;
      v.muted = true;
      v.playsInline = true;
      v.setAttribute('playsinline', '');
      v.setAttribute('webkit-playsinline', '');
      v.setAttribute('autoplay', '');
      const promise = v.play();
      if (promise !== undefined) {
        promise.catch(() => {
          const forcePlay = () => {
            v.play().catch(() => {});
          };
          window.addEventListener('touchstart', forcePlay, { once: true });
          window.addEventListener('scroll', forcePlay, { once: true });
          window.addEventListener('click', forcePlay, { once: true });
        });
      }
    };

    if (view === 'home') {
      playVideo(heroVideoRef.current);
      playVideo(advisoryVideoRef.current);
    }
  }, [view]);

  if (view === 'about') {
    return (
      <div className="pb-16 md:pb-0 min-h-screen bg-[#F5F5F5]">
        <About lang={lang} setLang={setLang} setView={setView} onBookConsultation={() => setIsModalOpen(true)} />
        <MobileTabBar currentView={view} setView={setView} onOpenConsultation={() => setIsModalOpen(true)} lang={lang} />
        <ConsultationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} isRtl={isRtl} lang={lang} />
        <Chatbot isRtl={isRtl} lang={lang} />
      </div>
    );
  }

  if (view === 'contact') {
    return (
      <div className="pb-16 md:pb-0 min-h-screen bg-white">
        <Contact lang={lang} setLang={setLang} setView={setView} onBookConsultation={() => setIsModalOpen(true)} />
        <MobileTabBar currentView={view} setView={setView} onOpenConsultation={() => setIsModalOpen(true)} lang={lang} />
        <ConsultationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} isRtl={isRtl} lang={lang} />
        <Chatbot isRtl={isRtl} lang={lang} />
      </div>
    );
  }

  if (view === 'services') {
    return (
      <div className="pb-16 md:pb-0 min-h-screen bg-[#F5F5F5]">
        <Services lang={lang} setLang={setLang} setView={setView} onBookConsultation={() => setIsModalOpen(true)} />
        <MobileTabBar currentView={view} setView={setView} onOpenConsultation={() => setIsModalOpen(true)} lang={lang} />
        <ConsultationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} isRtl={isRtl} lang={lang} />
        <Chatbot isRtl={isRtl} lang={lang} />
      </div>
    );
  }
  
  if (view === 'laws') {
    return (
      <div className="pb-16 md:pb-0 min-h-screen bg-[#F5F5F5]">
        <Laws isRtl={isRtl} lang={lang} setLang={setLang} setView={setView} />
        <MobileTabBar currentView={view} setView={setView} onOpenConsultation={() => setIsModalOpen(true)} lang={lang} />
        <ConsultationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} isRtl={isRtl} lang={lang} />
        <Chatbot isRtl={isRtl} lang={lang} />
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-[#F5F5F5] min-h-screen pb-16 md:pb-0" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Wrapper for Navbar + Hero */}
      <div className="min-h-screen flex flex-col relative">
        {/* Navbar */}
        <nav className="absolute top-0 left-0 right-0 z-20 px-3 sm:px-6 py-3 sm:py-5">
          <div className="flex items-center justify-between max-w-[88rem] mx-auto">
            {/* Logo */}
            <div className="flex items-center gap-2 sm:gap-3 cursor-pointer select-none" onClick={() => setView('home')}>
              <img
                src={lang === 'ar' ? '/logo.png' : '/logo-en.png'}
                alt={t.brandName}
                className="h-8 sm:h-11 md:h-12 w-auto object-contain shrink-0"
              />
              <div className="flex flex-col">
                <span className="text-sm sm:text-lg md:text-xl font-bold tracking-tight text-black leading-tight">
                  {t.brandName}
                </span>
                <span className="text-[9px] sm:text-[11px] md:text-xs text-black/60 font-medium line-clamp-1">
                  {t.brandSub}
                </span>
              </div>
            </div>
            
            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-7">
              <button onClick={() => setView('home')} className="text-sm md:text-base font-bold transition-colors text-black">
                {t.home}
              </button>
              <button onClick={() => setView('about')} className="text-sm md:text-base font-medium transition-colors text-gray-700 hover:text-black">
                {t.about}
              </button>
              <button onClick={() => setView('services')} className="text-sm md:text-base font-medium transition-colors text-gray-700 hover:text-black">
                {t.services}
              </button>
              <button onClick={() => setView('laws')} className="text-sm md:text-base font-medium transition-colors text-gray-700 hover:text-black">
                {t.laws}
              </button>
              <button onClick={() => setView('contact')} className="text-sm md:text-base font-medium transition-colors text-gray-700 hover:text-black">
                {t.contact}
              </button>
            </div>

            {/* Desktop Language Selector & Action Button */}
            <div className="hidden md:flex items-center gap-3">
              <LanguageSelector lang={lang} setLang={setLang} />
              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-black text-white text-sm md:text-base font-medium px-6 py-2.5 rounded-full hover:bg-gray-800 transition-all duration-200 active:scale-95 shadow-md"
              >
                {t.bookConsultation}
              </button>
            </div>

            {/* Mobile Controls (Language + Hamburger) */}
            <div className="md:hidden flex items-center gap-2">
              <LanguageSelector lang={lang} setLang={setLang} />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="w-10 h-10 rounded-full bg-white/90 shadow-sm border border-black/5 flex items-center justify-center text-black"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="absolute top-[68px] sm:top-[76px] left-3 right-3 sm:left-4 sm:right-4 bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl z-50 p-5 sm:p-6 flex flex-col gap-3.5 sm:gap-4 border border-black/10 md:hidden animate-in slide-in-from-top-3 max-h-[85vh] overflow-y-auto">
            {/* Language Segmented Bar inside mobile menu */}
            <div className="pb-3 border-b border-black/5">
              <div className="text-[11px] font-bold text-black/50 mb-2">
                {t.chooseLang}
              </div>
              <LanguageSelector 
                lang={lang} 
                setLang={setLang} 
                variant="mobile-bar" 
                onSelect={() => setIsMobileMenuOpen(false)} 
              />
            </div>

            <button onClick={() => { setView('home'); setIsMobileMenuOpen(false); }} className={`text-lg font-bold transition-colors text-black ${isRtl ? 'text-right' : 'text-left'}`}>
              {t.home}
            </button>
            <button onClick={() => { setView('about'); setIsMobileMenuOpen(false); }} className={`text-lg font-medium transition-colors text-gray-700 hover:text-black ${isRtl ? 'text-right' : 'text-left'}`}>
              {t.about}
            </button>
            <button onClick={() => { setView('services'); setIsMobileMenuOpen(false); }} className={`text-lg font-medium transition-colors text-gray-700 hover:text-black ${isRtl ? 'text-right' : 'text-left'}`}>
              {t.services}
            </button>
            <button onClick={() => { setView('laws'); setIsMobileMenuOpen(false); }} className={`text-lg font-medium transition-colors text-gray-700 hover:text-black ${isRtl ? 'text-right' : 'text-left'}`}>
              {t.laws}
            </button>
            <button onClick={() => { setView('contact'); setIsMobileMenuOpen(false); }} className={`text-lg font-medium transition-colors text-gray-700 hover:text-black ${isRtl ? 'text-right' : 'text-left'}`}>
              {t.contact}
            </button>
            
            <hr className="border-black/5 my-1" />
            
            <button onClick={() => { setIsModalOpen(true); setIsMobileMenuOpen(false); }} className="bg-black text-white text-base font-bold py-3.5 rounded-2xl hover:bg-gray-800 w-full shadow-lg active:scale-98 transition-transform">
              {t.bookConsultation}
            </button>
          </div>
        )}

        {/* Hero Section */}
        <section className="flex-1 px-4 sm:px-6 pt-20 pb-4 sm:pb-6 flex items-end max-w-[88rem] mx-auto w-full">
          <div className="relative w-full rounded-2xl md:rounded-3xl overflow-hidden h-[calc(100vh-96px)] min-h-[480px]">
            <video 
              ref={heroVideoRef}
              autoPlay 
              muted 
              loop 
              playsInline 
              preload="auto"
              disablePictureInPicture
              disableRemotePlayback
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260423_161253_c72b1869-400f-45ed-ac0c-52f68c2ed5bd.mp4"
            />

            <div className="relative z-10 flex flex-col items-start justify-start h-full p-6 sm:p-10 md:p-12 pt-24 sm:pt-32 md:pt-36">
              <h1 
                className="text-black text-3xl sm:text-5xl md:text-6xl font-medium leading-tight max-w-xl mb-3 sm:mb-4"
                style={{ letterSpacing: '-0.04em' }}
                dangerouslySetInnerHTML={{ __html: t.heroTitle }}
              />
              
              <p 
                className="text-black/80 text-sm sm:text-base md:text-lg max-w-md mb-6 sm:mb-8 leading-relaxed font-medium"
                style={{ fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif" }}
              >
                {t.heroSubtitle}
              </p>

              <button 
                onClick={() => setView('about')}
                className={`inline-flex items-center gap-3 bg-black text-white text-sm sm:text-base md:text-lg font-medium py-2 rounded-full hover:bg-gray-800 transition-colors duration-200 group active:scale-95 shadow-lg ${isRtl ? 'pr-6 sm:pr-8 pl-2' : 'pl-6 sm:pl-8 pr-2'}`}
              >
                {t.getStarted}
                <div className="bg-white rounded-full p-1.5 sm:p-2 group-hover:bg-gray-100 transition-colors duration-200">
                  <ArrowIcon className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
                </div>
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Backed By Section (Clients Marquee) */}
      <section className="bg-[#F5F5F5] px-4 sm:px-6 pb-16 sm:pb-24">
        <div className="mt-8 sm:mt-20 md:mt-32 pt-8 sm:pt-16 border-t border-black/5 text-center">
          <h3 
            className="text-black/60 text-base sm:text-lg md:text-xl font-medium mb-8 sm:mb-12 whitespace-pre-line"
          >
            {t.fundedBy}
          </h3>
          
          <div className="w-full overflow-hidden" dir="ltr">
            <div className="marquee-track-reverse flex items-center">
              {[...clientLogos, ...clientLogos, ...clientLogos, ...clientLogos].map((item, index) => (
                <div 
                  key={index} 
                  className="mx-5 sm:mx-8 md:mx-12 shrink-0 flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity"
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    loading="eager"
                    className="h-14 sm:h-18 md:h-24 w-auto object-contain max-w-[130px] sm:max-w-[160px] md:max-w-none mix-blend-multiply"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="bg-[#F5F5F5] px-4 sm:px-6 py-12 sm:py-24">
        <div className="max-w-[88rem] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className={`md:pt-2 ${isRtl ? 'md:pl-12' : 'md:pr-12'}`}>
            <div className="text-black/60 text-sm mb-2">{t.expertiseEyebrow}</div>
            <h2 
              className="text-4xl sm:text-5xl md:text-6xl font-medium leading-none mb-6 text-black"
              style={{ letterSpacing: '-0.04em' }}
            >
              {t.expertiseTitle}
            </h2>
            <p className="text-black/60 text-base leading-relaxed max-w-sm">
              {t.expertiseSubtitle}
            </p>
          </div>

          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden min-h-[520px] sm:min-h-[720px] w-full">
            <video 
              ref={advisoryVideoRef}
              autoPlay 
              muted 
              loop 
              playsInline 
              preload="auto"
              disablePictureInPicture
              disableRemotePlayback
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260423_183428_ab5e672a-f608-4dcb-b319-f3e040f02e2d.mp4"
            />
            
            <div className="relative z-10 p-6 sm:p-10 md:p-12">
              <h3 
                className="text-3xl sm:text-4xl md:text-5xl font-medium leading-tight mb-4 sm:mb-5 text-black"
                style={{ letterSpacing: '-0.03em' }}
              >
                {t.advisoryTitle}
              </h3>
              <p className="text-black/70 text-sm sm:text-base max-w-md mb-6 sm:mb-8">
                {t.advisorySubtitle}
              </p>
              
              <button 
                onClick={() => setView('services')}
                className="inline-flex items-center gap-3 group mt-auto"
              >
                <div className="w-9 h-9 rounded-full bg-white/80 backdrop-blur flex items-center justify-center group-hover:bg-white transition-colors duration-200">
                  <ArrowIcon className="w-4 h-4 text-black" />
                </div>
                <span className="text-black font-medium">{t.knowMore}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media Hub Section (Above Footer) */}
      <section className="bg-[#F5F5F5] px-4 sm:px-6 py-12 sm:py-16 border-t border-black/5">
        <div className="max-w-[88rem] mx-auto flex flex-col md:flex-row items-center justify-between gap-8 sm:gap-12 bg-white rounded-3xl sm:rounded-[36px] p-8 sm:p-12 shadow-sm border border-black/5">
          <div className="max-w-xl text-center md:text-start">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-bold mb-3">
              <span>{t.socialsBadge}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-black mb-3">
              {t.socialsTitle}
            </h2>
            <p className="text-black/60 text-sm sm:text-base leading-relaxed">
              {t.socialsSubtitle}
            </p>
          </div>

          <div className="shrink-0 flex items-center justify-center">
            <SocialStackCard lang={lang} isRtl={isRtl} />
          </div>
        </div>
      </section>

      {/* Universal Footer */}
      <Footer isRtl={isRtl} lang={lang} setView={setView} />

      {/* Consultation Modal */}
      <ConsultationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} isRtl={isRtl} lang={lang} />

      {/* Floating Legal Chatbot */}
      <Chatbot isRtl={isRtl} lang={lang} />

      {/* Native Mobile App Tab Bar */}
      <MobileTabBar
        currentView={view}
        setView={setView}
        onOpenConsultation={() => setIsModalOpen(true)}
        lang={lang}
      />
    </div>
  );
};

export default App;
