import { useState } from 'react';
import { ArrowRight, ArrowLeft, Menu, X } from 'lucide-react';
import About from './About';
import Contact from './Contact';
import Services from './Services';
import Laws from './Laws';
import Chatbot from './components/ui/chatbot';

const LogoIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M20 4L4 36H11.5L20 19L28.5 36H36L20 4Z" fill="currentColor" />
    <rect x="14" y="24" width="12" height="3.5" fill="currentColor" />
  </svg>
);

const translations = {
  en: {
    nav: ['Home', 'About Us', 'Services', 'Laws', 'Contact Us'],
    about: 'About Us',
    contact: 'Contact Us',
    services: 'Services',
    laws: 'Laws',
    bookConsultation: 'Contact Us',
    heroTitle: 'Ahmed El Sherbiny & Co.<br />Certified Accountants',
    heroSubtitle: 'Welcome to the official website of Ahmed El Sherbiny & Co. Certified Public Accountants and Auditors. We help you navigate financial success.',
    getStarted: 'Read More',
    whyUsTitle: 'Why Ahmed El Sherbiny?',
    discoverIt: 'Discover it',
    whyUsSubtitle: 'Our firm offers expert consulting services with deep knowledge of tax systems to achieve the best results tailored to our clients.',
    strategiesTitle: 'Tax Planning',
    strategiesSubtitle: 'We help clients rationalize the tax burden according to the law through robust financial planning.',
    transparentTitle: 'Always transparent,\nalways reliable.',
    transparentSubtitle: 'Supervised tax inspections and seamless administrative and financial consulting, all in record time.',
    tailoredTitle: 'Fully\ntailored',
    tailoredSubtitle: 'Skip the guesswork. Let Ahmed El Sherbiny handle your company formation and financial planning in Egypt.',
    fundedBy: 'Trusted by premier partners\nand forward-thinking leaders.',
    expertiseEyebrow: 'Our Services',
    expertiseTitle: 'Accounting & Audit',
    expertiseSubtitle: 'Our team is highly qualified and experienced to execute financial auditing services applying Egyptian and international auditing standards.',
    advisoryTitle: 'E-Services',
    advisorySubtitle: 'We handle your tax returns electronically, allowing you to access your digital tax record within 24 hours.',
    knowMore: 'Know more'
  },
  ar: {
    nav: ['الرئيسية', 'من نحن', 'الخدمات', 'القوانين', 'تواصل معنا'],
    about: 'من نحن',
    contact: 'تواصل معنا',
    services: 'الخدمات',
    laws: 'القوانين',
    bookConsultation: 'تواصل معنا',
    heroTitle: 'أحمد الشربيني وشركاه<br />محاسبون قانونيون',
    heroSubtitle: 'أهلا بك ومرحباً فى الموقع الإلكترونى للمحاسب القانوني أحمد الشربينى وشركاه. نساعدك في بناء مشروعك وتأمين نموك المالي.',
    getStarted: 'أقرأ المزيد',
    whyUsTitle: 'لماذا أحمد الشربيني؟',
    discoverIt: 'اكتشف المزيد',
    whyUsSubtitle: 'لدينا نخبة من الاستشاريين لديهم معرفة عميقة بجميع أنظمة الضرائب للوصول لأفضل النتائج، بما يتوافق ويرضى عملائنا.',
    strategiesTitle: 'التخطيط الضريبي',
    strategiesSubtitle: 'نهدف لمساعدة العملاء علي ترشيد العبء الضريبي وفقا لأحكام القانون من خلال تخطيط مالي شامل.',
    transparentTitle: 'شفافية دائمة،\nوموثوقية عالية.',
    transparentSubtitle: 'فحص مالي وإشراف ضريبي كامل في زمن قياسي لضمان تسوية المواقف المالية والانطلاق بثقة.',
    tailoredTitle: 'مخصص\nبالكامل',
    tailoredSubtitle: 'نساعدك فى تأسيس شركتك فى جمهورية مصر العربية مع توفير جميع التسهيلات لبناء مشروعك بنجاح.',
    fundedBy: 'نحظى بثقة شركاء متميزين\nوقادة مبتكرين.',
    expertiseEyebrow: 'خدماتنا',
    expertiseTitle: 'المحاسبة والمراجعة',
    expertiseSubtitle: 'فريقنا مؤهل بكفاءة وخبرات لتنفيذ خدمات المراجعة المالية من خلال تطبيق أساليب المراجعة المصرية والدولية.',
    advisoryTitle: 'الخدمات الإلكترونية',
    advisorySubtitle: 'نتولي عنك تقديم الاقرارات الضريبية كترونيا ويمكنك الدخول الى سجلك الضريبي الإلكتروني خلال 24 ساعة.',
    knowMore: 'المزيد من التفاصيل'
  }
};

const App = () => {
  const [lang, setLang] = useState<'en' | 'ar'>('en');
  const [view, setView] = useState<'home' | 'about' | 'contact' | 'services' | 'laws'>('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const t = translations[lang];
  const isRtl = lang === 'ar';

  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const clientLogos = [
    { name: 'ديرما صن', img: 'https://ahmedelsherbiny.com/wp-content/uploads/2021/02/TIBA2-removebg-preview-1.png' },
    { name: 'الرمانة للدواجن', img: 'https://ahmedelsherbiny.com/wp-content/uploads/2021/02/Picture003_-_Copy-removebg-preview-2.png' },
    { name: 'شركة التعمير السياحي', img: 'https://ahmedelsherbiny.com/wp-content/uploads/2021/02/Picture007-removebg-preview.png' },
    { name: 'J’s Designs', img: 'https://ahmedelsherbiny.com/wp-content/uploads/2021/02/Picture10000-removebg-preview-1-removebg-preview.png' },
    { name: 'الصالحية للاستثمار والتنمية', img: 'https://ahmedelsherbiny.com/wp-content/uploads/2020/01/Picture01-removebg-preview.png' },
    { name: 'المقاولون العرب للاستثمارات', img: 'https://ahmedelsherbiny.com/wp-content/uploads/2020/01/Picture004.png' },
    { name: 'طيبة لجدود الدواجن', img: 'https://ahmedelsherbiny.com/wp-content/uploads/2020/01/TIBA2-removebg-preview.png' },
    { name: 'منتجع بيراميدز بارك', img: 'https://ahmedelsherbiny.com/wp-content/uploads/2020/01/picture_6-removebg-preview.png' }
  ];

  if (view === 'about') {
    return <About lang={lang} onBack={() => setView('home')} />;
  }

  if (view === 'contact') {
    return <Contact lang={lang} onBack={() => setView('home')} />;
  }

  if (view === 'services') {
    return <Services lang={lang} onBack={() => setView('home')} />;
  }
  
  if (view === 'laws') {
    return <Laws isRtl={isRtl} setView={setView} />;
  }

  return (
    <div className="flex flex-col bg-[#F5F5F5] min-h-screen" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Wrapper for Navbar + Hero */}
      <div className="h-screen flex flex-col overflow-hidden relative">
        {/* Navbar */}
        <nav className="absolute top-0 left-0 right-0 z-20 px-6 py-5">
          <div className="flex items-center justify-between max-w-[88rem] mx-auto">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setView('home')}>
              <LogoIcon className="w-7 h-7 text-black" />
              <span className="text-2xl font-medium tracking-tight text-black">
                {isRtl ? 'أحمد الشربيني' : 'Ahmed El Sherbiny'}
              </span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <button onClick={() => setView('home')} className={`text-base font-medium transition-colors ${view === 'home' ? 'text-black font-bold' : 'text-gray-700 hover:text-black'}`}>
                {isRtl ? 'الرئيسية' : 'Home'}
              </button>
              <button onClick={() => setView('about')} className={`text-base font-medium transition-colors ${view === 'about' ? 'text-black font-bold' : 'text-gray-700 hover:text-black'}`}>
                {t.about}
              </button>
              <button onClick={() => setView('services')} className={`text-base font-medium transition-colors ${view === 'services' ? 'text-black font-bold' : 'text-gray-700 hover:text-black'}`}>
                {t.services}
              </button>
              <button onClick={() => setView('laws')} className={`text-base font-medium transition-colors ${view === 'laws' ? 'text-black font-bold' : 'text-gray-700 hover:text-black'}`}>
                {t.laws}
              </button>
              <button onClick={() => setView('contact')} className={`text-base font-medium transition-colors ${view === 'contact' ? 'text-black font-bold' : 'text-gray-700 hover:text-black'}`}>
                {t.contact}
              </button>
            </div>

            <div className="hidden md:flex items-center gap-4">
              <button 
                onClick={() => setLang(lang === 'en' ? 'ar' : 'en')} 
                className="text-gray-700 hover:text-black font-medium transition-colors duration-200"
              >
                {lang === 'en' ? 'العربية' : 'EN'}
              </button>
              <button 
                onClick={() => setView('contact')}
                className="bg-black text-white text-base font-medium px-7 py-2.5 rounded-full hover:bg-gray-800 transition-colors duration-200"
              >
                {t.bookConsultation}
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden flex items-center gap-4">
              <button onClick={() => setLang(lang === 'en' ? 'ar' : 'en')} className="text-gray-700 hover:text-black font-medium transition-colors duration-200">
                {lang === 'en' ? 'العربية' : 'EN'}
              </button>
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-black">
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="absolute top-[80px] left-4 right-4 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl z-50 p-6 flex flex-col gap-4 border border-black/5 md:hidden animate-in slide-in-from-top-4">
            <button onClick={() => { setView('home'); setIsMobileMenuOpen(false); }} className={`text-xl font-medium transition-colors ${isRtl ? 'text-right' : 'text-left'} ${view === 'home' ? 'text-black font-bold' : 'text-gray-700'}`}>
              {isRtl ? 'الرئيسية' : 'Home'}
            </button>
            <button onClick={() => { setView('about'); setIsMobileMenuOpen(false); }} className={`text-xl font-medium transition-colors ${isRtl ? 'text-right' : 'text-left'} ${view === 'about' ? 'text-black font-bold' : 'text-gray-700'}`}>
              {t.about}
            </button>
            <button onClick={() => { setView('services'); setIsMobileMenuOpen(false); }} className={`text-xl font-medium transition-colors ${isRtl ? 'text-right' : 'text-left'} ${view === 'services' ? 'text-black font-bold' : 'text-gray-700'}`}>
              {t.services}
            </button>
            <button onClick={() => { setView('laws'); setIsMobileMenuOpen(false); }} className={`text-xl font-medium transition-colors ${isRtl ? 'text-right' : 'text-left'} ${view === 'laws' ? 'text-black font-bold' : 'text-gray-700'}`}>
              {t.laws}
            </button>
            <button onClick={() => { setView('contact'); setIsMobileMenuOpen(false); }} className={`text-xl font-medium transition-colors ${isRtl ? 'text-right' : 'text-left'} ${view === 'contact' ? 'text-black font-bold' : 'text-gray-700'}`}>
              {t.contact}
            </button>
            <hr className="border-black/5 my-2" />
            <button onClick={() => { setView('contact'); setIsMobileMenuOpen(false); }} className="bg-black text-white text-base font-medium py-3 rounded-full hover:bg-gray-800 w-full">
              {t.bookConsultation}
            </button>
          </div>
        )}

        {/* Hero Section */}
        <section className="flex-1 px-6 pt-20 pb-6 flex items-end max-w-[88rem] mx-auto w-full">
          <div className="relative w-full rounded-2xl overflow-hidden" style={{ height: 'calc(100vh - 96px)' }}>
            <video 
              autoPlay 
              muted 
              loop 
              playsInline 
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260423_161253_c72b1869-400f-45ed-ac0c-52f68c2ed5bd.mp4" type="video/mp4" />
            </video>

            <div className="relative z-10 flex flex-col items-start justify-start h-full p-12 pt-36">
              <h1 
                className="text-black text-5xl md:text-6xl font-medium leading-tight max-w-xl mb-4"
                style={{ letterSpacing: '-0.04em' }}
                dangerouslySetInnerHTML={{ __html: t.heroTitle }}
              />
              
              <p 
                className="text-black/70 text-base md:text-lg max-w-md mb-8 leading-relaxed"
                style={{ fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif" }}
              >
                {t.heroSubtitle}
              </p>

              <button 
                onClick={() => setView('about')}
                className={`inline-flex items-center gap-3 bg-black text-white text-base md:text-lg font-medium py-2 rounded-full hover:bg-gray-800 transition-colors duration-200 group ${isRtl ? 'pr-8 pl-2' : 'pl-8 pr-2'}`}
              >
                {t.getStarted}
                <div className="bg-white rounded-full p-2 group-hover:bg-gray-100 transition-colors duration-200">
                  <ArrowIcon className="w-5 h-5 text-black" />
                </div>
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Info Section */}
      <section className="bg-[#F5F5F5] px-6 py-24">
        <div className="max-w-[88rem] mx-auto">
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 items-start">
            <div>
              <h2 
                className="text-black text-4xl md:text-5xl font-medium leading-tight mb-8"
                style={{ letterSpacing: '-0.03em' }}
              >
                {t.whyUsTitle}
              </h2>
              <button 
                onClick={() => setView('about')}
                className={`inline-flex items-center gap-3 bg-black text-white text-base font-medium py-1.5 rounded-full hover:bg-gray-800 transition-colors duration-200 group ${isRtl ? 'pr-6 pl-1.5' : 'pl-6 pr-1.5'}`}
              >
                {t.discoverIt}
                <div className="bg-white rounded-full p-1.5 group-hover:bg-gray-100 transition-colors duration-200">
                  <ArrowIcon className="w-4 h-4 text-black" />
                </div>
              </button>
            </div>
            <div>
              <p className="text-black/70 text-2xl md:text-3xl leading-relaxed">
                {t.whyUsSubtitle}
              </p>
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1 */}
            <div 
              className="rounded-2xl lg:col-span-2 relative overflow-hidden bg-cover bg-center"
              style={{ backgroundImage: 'url("https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260423_164207_f243351d-ed59-48ec-83a0-a5e996bdbe3c.png&w=1280&q=85")' }}
            >
              <div className="p-7 min-h-80 flex flex-col justify-between h-full relative z-10">
                <h3 
                  className="text-black text-2xl font-medium leading-snug"
                  style={{ letterSpacing: '-0.02em' }}
                >
                  {t.strategiesTitle}
                </h3>
                <p className="text-black/70 text-base max-w-xs mt-8">
                  {t.strategiesSubtitle}
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-[#2B2644] rounded-2xl p-7 min-h-80 flex flex-col justify-between">
              <h3 className="text-white text-2xl font-medium whitespace-pre-line">
                {t.transparentTitle}
              </h3>
              <p className="text-white/60 text-base mt-8">
                {t.transparentSubtitle}
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-[#2B2644] rounded-2xl p-7 min-h-80 flex flex-col justify-between">
              <h3 className="text-white text-2xl font-medium whitespace-pre-line">
                {t.tailoredTitle}
              </h3>
              <p className="text-white/60 text-base mt-8">
                {t.tailoredSubtitle}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Backed By Section */}
      <section className="bg-[#F5F5F5] px-6 pb-24">
          {/* Trusted By Section */}
          <div className="mt-32 pt-16 border-t border-black/5 text-center">
            <h3 
              className="text-black/60 text-lg md:text-xl font-medium mb-12 whitespace-pre-line"
            >
              {t.fundedBy}
            </h3>
            
            <div className="w-full overflow-hidden" dir="ltr">
              <div className="marquee-track-reverse">
                {[...clientLogos, ...clientLogos].map((item, index) => (
                  <div 
                    key={index} 
                    className="mx-12 shrink-0 flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
                  >
                    <img src={item.img} alt={item.name} className="h-20 md:h-24 w-auto object-contain mix-blend-multiply" />
                  </div>
                ))}
              </div>
            </div>
          </div>
      </section>

      {/* Use Cases Section */}
      <section className="bg-[#F5F5F5] px-6 py-24">
        <div className="max-w-[88rem] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className={`md:pt-2 ${isRtl ? 'md:pl-12' : 'md:pr-12'}`}>
            <div className="text-black/60 text-sm mb-2">{t.expertiseEyebrow}</div>
            <h2 
              className="text-5xl md:text-6xl font-medium leading-none mb-6 text-black"
              style={{ letterSpacing: '-0.04em' }}
            >
              {t.expertiseTitle}
            </h2>
            <p className="text-black/60 text-base leading-relaxed max-w-sm">
              {t.expertiseSubtitle}
            </p>
          </div>

          <div className="relative rounded-3xl overflow-hidden min-h-[720px] w-full">
            <video 
              autoPlay 
              muted 
              loop 
              playsInline 
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260423_183428_ab5e672a-f608-4dcb-b319-f3e040f02e2d.mp4" type="video/mp4" />
            </video>
            
            <div className="relative z-10 p-10 md:p-12">
              <h3 
                className="text-4xl md:text-5xl font-medium leading-tight mb-5 text-black"
                style={{ letterSpacing: '-0.03em' }}
              >
                {t.advisoryTitle}
              </h3>
              <p className="text-black/70 text-base max-w-md mb-8">
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

      {/* Floating Legal Chatbot */}
      <Chatbot isRtl={isRtl} />
    </div>
  );
};

export default App;
