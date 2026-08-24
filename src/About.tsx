import { ArrowLeft, ArrowRight } from 'lucide-react';
import AboutUsSection from './components/ui/about-us-section';
import Footer from './components/ui/footer';

interface AboutProps {
  lang: 'en' | 'ar';
  setView: (view: 'home' | 'about' | 'contact' | 'services' | 'laws') => void;
}

export default function About({ lang, setView }: AboutProps) {
  const isRtl = lang === 'ar';
  const BackIcon = isRtl ? ArrowRight : ArrowLeft;

  return (
    <div className="min-h-screen bg-[#F6F5F2] text-black font-sans selection:bg-black selection:text-white" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Fixed Navbar with Back Button */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between pointer-events-none">
        <div className="max-w-[88rem] mx-auto w-full flex items-center justify-between">
          <button 
            onClick={() => setView('home')} 
            className="pointer-events-auto inline-flex items-center gap-2 bg-white/80 backdrop-blur-md px-5 py-2.5 rounded-full border border-black/5 shadow-md text-black/80 hover:text-black hover:bg-white transition-all duration-200"
          >
            <BackIcon className="w-5 h-5" />
            <span className="font-semibold text-sm">{isRtl ? 'الرئيسية' : 'Home'}</span>
          </button>
          
          <div className="pointer-events-auto flex items-center gap-3">
            <button 
              onClick={() => setView('contact')}
              className="bg-[#88734C] text-white px-6 py-2.5 rounded-full text-xs md:text-sm font-bold hover:bg-[#88734C]/90 transition-colors shadow-md"
            >
              {isRtl ? 'احجز استشارة' : 'Book Consultation'}
            </button>
          </div>
        </div>
      </nav>

      {/* Main Animated About Section */}
      <div className="pt-12">
        <AboutUsSection isRtl={isRtl} onContactClick={() => setView('contact')} />
      </div>

      {/* Universal Footer */}
      <Footer isRtl={isRtl} setView={setView} />
    </div>
  );
}
