import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const CARD_VIDEOS = [
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260506_030111_a9e15665-d379-4a7f-8116-695bbe452ad1.mp4',
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260429_171347_f640c30d-ec21-426a-98bc-77e07c2c60cb.mp4',
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260503_104800_bc43ae09-f494-43e3-97d7-2f8c1692cfd7.mp4',
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260423_161253_c72b1869-400f-45ed-ac0c-52f68c2ed5bd.mp4',
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_115655_b4d9cd77-feed-43cd-a198-af78ebdf1f7a.mp4',
];

const ABOUT_INFO = {
  en: [
    { title: 'Tax Planning', description: 'Helping clients rationalize the tax burden according to the law through financial planning and utilizing all available exemptions for individuals or corporate entities.' },
    { title: 'Tax Inspection', description: 'Successfully finalized the tax inspection for Salhia Investment and Development Company at the Large Taxpayers Center from 1981 to date, with highly satisfactory results.' },
    { title: 'Consulting Expertise', description: 'Acted as an independent financial advisor for the fair value assessment of shares for Hadaek Al-Ahram Hotels and Pyramids Tourism, accepted without reservations.' },
    { title: 'Tax Auditing', description: 'Supervised the tax inspection of Al-Taameer Touristic Company, achieving tax assessment in record time, allowing the company to settle its loans and start fresh.' },
  ],
  ar: [
    { title: 'التخطيط الضريبي', description: 'مساعدة العملاء علي ترشيد عبء الضريبية وفقا لأحكام القانون من خلال التخطيط المالي واستخدام الخطة المالية بكافة الإعفاءات المُتاحة.' },
    { title: 'الأعمال الضريبية', description: 'إنهاء أعمال الفحص الضريبيى لشركة الصالحية للاستثمار والتنمية بمركز كبار الممولين منذ بداية النشاط فى عام 1981 وحتى الأن بصورة مرضية جداً.' },
    { title: 'الخبرة الأستشارية', description: 'تقييم القيمة العادلة لسهمي شركتين فنادق حدائق الأهرام و شركة بيراميدز للسياحة كمستشار مالي مستقل وتم قبول التقييم دون أدني تحفظ.' },
    { title: 'المراجعة الضريبية', description: 'فحص شركة التعمير السياحى تحت أشرافنا والربط الضريبي في زمن قياسي، مما مكن الشركة والبنك من تسوية القرض وتحقيق انطلاقة جديدة.' },
  ]
};

interface AboutProps {
  lang: 'en' | 'ar';
  setView: (view: 'home' | 'about' | 'contact' | 'services' | 'laws') => void;
}

export default function About({ lang, setView }: AboutProps) {
  const isRtl = lang === 'ar';
  const BackIcon = isRtl ? ArrowRight : ArrowLeft;
  
  const cardCount = 4;
  const cardsRefs = useRef<(HTMLDivElement | null)[]>([]);
  const frameId = useRef<number>(0);
  
  // Continuous scroll progress
  const progress = useRef<number>(0);
  const targetProgress = useRef<number>(0);
  const isDragging = useRef(false);

  // Track mouse coordinates for interactive 3D parallax tilt with inertia damping
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  // Responsive state containing card dimensions
  const [metrics, setMetrics] = useState({
    cardW: 336,
    cardH: 211, // 1.59 standard credit card ratio
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Screen-space cursor offset relative to window center, clamped to [-1.0, 1.0] range
      const rx = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      const ry = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
      mouse.current.targetX = Math.max(-1, Math.min(1, rx));
      mouse.current.targetY = Math.max(-1, Math.min(1, ry));
    };

    const handleMouseLeave = () => {
      // Return gently to center orientation when mouse focus is lost or moves away
      mouse.current.targetX = 0;
      mouse.current.targetY = 0;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    const handleWheel = (e: WheelEvent) => {
      targetProgress.current -= e.deltaY * 0.002;
    };
    
    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      isDragging.current = true;
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging.current) return;
      const dy = e.touches[0].clientY - touchStartY;
      touchStartY = e.touches[0].clientY;
      targetProgress.current += dy * 0.005;
    };
    const handleTouchEnd = () => {
      isDragging.current = false;
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      // 1. Calculate Card Metrics (shrink cards if height is small to save vertical space)
      let cardW = Math.round(w * 0.16 + 130);
      
      const heightFactor = Math.min(1.0, Math.max(0.65, h / 850));
      cardW = Math.round(cardW * heightFactor);
      
      cardW = Math.min(336, Math.max(150, cardW));
      const cardH = Math.round(cardW / 1.5925); // Standard credit card ratio

      setMetrics({ cardW, cardH });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Compute positions, rotations, and visual rules at 60fps
  const renderLoop = () => {
    // Upward flow speed of continuous transition - decreased speed by more than half for slower, premium, and calmer transitions
    if (!isDragging.current) {
      targetProgress.current -= 0.0016; 
    }
    progress.current += (targetProgress.current - progress.current) * 0.1;

    // Smoothly interpolate current mouse variables towards their target positions (damping/inertia logic)
    mouse.current.x += (mouse.current.targetX - mouse.current.x) * 0.08;
    mouse.current.y += (mouse.current.targetY - mouse.current.y) * 0.08;

    const cards = cardsRefs.current;
    const continuousProgress = progress.current;

    for (let i = 0; i < cardCount; i++) {
      const card = cards[i];
      if (!card) continue;

      let offset = i - continuousProgress;
      const halfCount = cardCount / 2;
      while (offset > halfCount) offset -= cardCount;
      while (offset < -halfCount) offset += cardCount;

      const absOffset = Math.abs(offset);
      const sign = Math.sign(offset);

      // Smooth opacity fade out for cards moving to the back (absOffset > 1)
      let opacity = 1;
      if (absOffset > 1.2) {
        opacity = Math.max(0, 1 - (absOffset - 1.2) / 0.8);
      }

      // Hide completely if transparent to save rendering
      if (opacity <= 0.01) {
        card.style.visibility = 'hidden';
        continue;
      } else {
        card.style.visibility = 'visible';
      }

      // Elegant Vertical Coverflow Math
      const gap = 40; // Spacing between cards
      const y = sign * absOffset * (metrics.cardH + gap);
      const z = 200 - absOffset * 250; // Push back adjacent cards
      const rot = sign * absOffset * -25; // Tilt top away if below (-25), tilt bottom away if above (+25)

      const centerFactor = Math.max(0, 1 - absOffset);
      const activeTiltX = -mouse.current.y * 10 * centerFactor;
      const activeTiltY = mouse.current.x * 10 * centerFactor;
      const totalRotX = rot + activeTiltX;
      const totalRotY = activeTiltY;

      card.style.zIndex = Math.round(z).toString();
      card.style.opacity = opacity.toFixed(2);
      card.style.transform = `translateY(${y.toFixed(2)}px) translateZ(${z.toFixed(2)}px) rotateX(${totalRotX.toFixed(2)}deg) rotateY(${totalRotY.toFixed(2)}deg)`;
    }
  };

  useEffect(() => {
    const tick = () => {
      renderLoop();
      frameId.current = requestAnimationFrame(tick);
    };

    frameId.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId.current);
  }, [metrics]);

  const thicknessLayers = [-1.47, -0.73, 0, 0.73, 1.47];

  return (
    <div className="absolute inset-0 bg-gradient-to-b from-[#f8f9fa] to-[#e9ecef] text-black flex items-center justify-center overflow-hidden select-none z-50 font-sans" dir={isRtl ? 'rtl' : 'ltr'}>
      
      {/* Back Button Overlay */}
      <div className="absolute top-6 left-6 z-[100]">
        <button 
          onClick={() => setView('home')} 
          className="pointer-events-auto inline-flex items-center gap-2 bg-white/60 backdrop-blur-md px-5 py-2.5 rounded-full border border-black/5 shadow-sm text-black/70 hover:text-black transition-colors duration-200"
        >
          <BackIcon className="w-5 h-5" />
          <span className="font-medium text-lg">{isRtl ? 'العودة' : 'Back'}</span>
        </button>
      </div>

      {/* Header Overlay */}
      <div className="absolute top-6 left-0 right-0 z-[120] flex justify-center pointer-events-none">
        <h2 className="text-2xl md:text-4xl font-bold text-black/80 tracking-tight" style={{ letterSpacing: '-0.02em' }}>
          {isRtl ? 'من نحن' : 'About Us'}
        </h2>
      </div>

      {/* Founder Panel */}
      <div className={`absolute top-24 left-6 right-6 lg:bottom-auto lg:top-1/2 lg:-translate-y-1/2 lg:w-[380px] z-[80] pointer-events-auto ${isRtl ? 'lg:left-12 lg:right-auto' : 'lg:right-12 lg:left-auto'}`}>
        <div className="bg-white/40 backdrop-blur-2xl border border-white/50 p-6 md:p-8 rounded-3xl shadow-xl text-center transition-transform hover:scale-[1.02] duration-300 flex flex-col items-center">
          <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white/80 shadow-md mb-4 shrink-0 bg-white">
            <img src="/founder.jpg" alt="Ahmed El Sherbiny" className="w-full h-full object-cover object-top" />
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-black mb-1">
            {isRtl ? 'أحمد الشربيني' : 'Ahmed El Sherbiny'}
          </h3>
          <p className="text-sm md:text-[15px] font-medium text-black/80 mb-3 drop-shadow-sm">
            {isRtl ? 'مؤسس ومدير الشركة' : 'Founder & Managing Director'}
          </p>
          <p className="text-xs md:text-sm leading-relaxed text-black/70 drop-shadow-sm text-center">
            {isRtl 
              ? 'محاسب قانوني وخبير ضرائب بخبرة تمتد لعقود في تقديم الاستشارات المالية للشركات الكبرى، وتأسيس أنظمة محاسبية متكاملة لدعم الاقتصاد.' 
              : 'Certified Public Accountant and tax expert with decades of experience providing financial consulting for major companies and establishing integrated accounting systems.'}
          </p>
        </div>
      </div>

      {/* Information Panel (Objectives) */}
      <div className={`absolute bottom-6 left-6 right-6 lg:bottom-auto lg:top-1/2 lg:-translate-y-1/2 lg:w-[420px] z-[80] pointer-events-auto ${isRtl ? 'lg:right-12 lg:left-auto' : 'lg:left-12 lg:right-auto'}`}>
        <div className="bg-white/40 backdrop-blur-2xl border border-white/50 p-6 md:p-8 rounded-3xl shadow-xl text-left rtl:text-right transition-transform hover:scale-[1.02] duration-300">
          <h3 className="text-xl md:text-2xl font-bold mb-4 text-black">{isRtl ? 'أهدافنا' : 'Our Objectives'}</h3>
          <p className="text-sm md:text-[15px] leading-relaxed text-black/90 font-medium mb-4 drop-shadow-sm">
            {isRtl 
              ? 'تقديم الخدمات الاستشارية والمحاسبية والضريبية والمالية التي تمكن عملائنا من التقدم والنماء فى كافة المجالات الاقتصادية.' 
              : 'Providing consulting, accounting, tax, and financial services that enable our clients to progress and grow in all economic fields.'}
          </p>
          <p className="text-sm md:text-[14px] leading-relaxed text-black/70 drop-shadow-sm">
            {isRtl 
              ? 'يحرص المكتب على توفير البيانات والمعلومات التى تبرز أوجه التطور فى مختلف المجالات عن طريق اتباع الاساليب الحديثة مما يؤدي لتقديم افضل الخدمات المهنية والحرص على مبدأ سرية المعلومات وتوفير الكفاءة الإدارية والتنفيذية.' 
              : 'We are keen to provide data and information that highlight aspects of development in various fields by following modern methods, leading to the provision of the best professional services while maintaining confidentiality and executive efficiency.'}
          </p>
        </div>
      </div>

      {/* 3D perspective camera space */}
      <div
        className="relative w-full h-full flex items-center justify-center pointer-events-none mt-10"
        style={{ perspective: '1200px' }}
      >
        <div
          className="absolute"
          style={{ width: `${metrics.cardW}px`, height: `${metrics.cardH}px`, transformStyle: 'preserve-3d' }}
        >
          {Array.from({ length: cardCount }).map((_, i) => (
            <div
              key={i}
              ref={(el) => { cardsRefs.current[i] = el; }}
              className="absolute inset-0"
              style={{
                width: `${metrics.cardW}px`,
                height: `${metrics.cardH}px`,
                transformStyle: 'preserve-3d',
                backfaceVisibility: 'visible',
              }}
            >
              {thicknessLayers.map((zOffset, layerIdx) => {
                const isFrontFace = layerIdx === thicknessLayers.length - 1;
                const isBackFace = layerIdx === 0;
                const videoSrc = CARD_VIDEOS[i % CARD_VIDEOS.length];
                const baseBgColor = '#0f0f0f';

                if (!isFrontFace && !isBackFace) {
                  return (
                    <div
                      key={layerIdx}
                      className="absolute inset-0 rounded-[20px] border border-[#808080] pointer-events-none overflow-hidden"
                      style={{ backgroundColor: '#808080', transform: `translateZ(${zOffset}px)` }}
                    />
                  );
                }

                if (isFrontFace) {
                  const details = ABOUT_INFO[lang][i % ABOUT_INFO[lang].length];
                  
                  return (
                    <div
                      key={layerIdx}
                      className={`absolute inset-0 rounded-[20px] border border-white/20 pointer-events-none overflow-hidden shadow-2xl`}
                      style={{
                        backgroundColor: baseBgColor,
                        transform: `translateZ(${zOffset}px)`,
                        backfaceVisibility: 'hidden',
                      }}
                    >
                      <video src={videoSrc} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover rounded-[20px]" />
                      
                      {/* Dark overlay to make text readable */}
                      <div className="absolute inset-0 bg-black/60 z-10" />

                      {/* Visa Card Elements */}
                      <div className={`absolute top-5 ${isRtl ? 'right-6' : 'left-6'} z-20 opacity-90`}>
                        <svg width="34" height="24" viewBox="0 0 34 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect width="34" height="24" rx="4" fill="#E6D38B"/>
                          <path d="M1 8H33M1 16H33M12 1V23M22 1V23" stroke="#B8973E" strokeWidth="1.5"/>
                        </svg>
                      </div>
                      <div className={`absolute top-5 ${isRtl ? 'left-6' : 'right-6'} z-20 opacity-80`}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white rotate-90"><path d="M5 12.55a11 11 0 0 1 14.08 0"></path><path d="M1.42 9a16 16 0 0 1 21.16 0"></path><path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path><line x1="12" y1="20" x2="12.01" y2="20"></line></svg>
                      </div>

                      {/* Card Info on the front - Centered to prevent clipping */}
                      <div className="absolute inset-x-6 top-16 bottom-6 z-20 flex flex-col justify-center text-center" dir={isRtl ? 'rtl' : 'ltr'}>
                        <h4 className="text-lg sm:text-xl font-bold text-white mb-2 tracking-tight drop-shadow-md">{details.title}</h4>
                        <p className="text-xs sm:text-[13px] text-white/95 leading-relaxed font-medium drop-shadow-md">{details.description}</p>
                      </div>

                      <div className={`absolute ${isRtl ? 'left-6' : 'right-6'} bottom-5 sm:bottom-6 flex -space-x-3 items-center opacity-80 z-20`}>
                        <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-white/20 backdrop-blur-[1px] border border-white/10" />
                        <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-white/35 backdrop-blur-[1px] border border-white/10" />
                      </div>
                    </div>
                  );
                }

                if (isBackFace) {
                  const backBorderStyle = "border border-white/15";
                  
                  return (
                    <div
                      key={layerIdx}
                      className={`absolute inset-0 rounded-[16px] ${backBorderStyle} pointer-events-none overflow-hidden`}
                      style={{
                        backgroundColor: baseBgColor,
                        transform: `translateZ(${zOffset}px) rotateX(180deg)`,
                        backfaceVisibility: 'hidden',
                        boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.15)',
                      }}
                    >
                      <div className="absolute inset-0 pointer-events-none" style={{ filter: 'blur(16px)', transform: 'scale(1.15)' }}>
                        <video src={videoSrc} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" />
                      </div>

                      <div className="absolute inset-0 bg-black/60 z-10" />
                      
                      {/* Logo or pattern for the back */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-10 z-20">
                        <svg className="w-16 h-16 text-white" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M20 4L4 36H11.5L20 19L28.5 36H36L20 4Z" fill="currentColor" />
                          <rect x="14" y="24" width="12" height="3.5" fill="currentColor" />
                        </svg>
                      </div>
                    </div>
                  );
                }

                return null;
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
