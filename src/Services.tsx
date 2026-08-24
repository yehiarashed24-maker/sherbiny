import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const CARD_VIDEOS = [
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260506_030111_a9e15665-d379-4a7f-8116-695bbe452ad1.mp4',
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260429_171347_f640c30d-ec21-426a-98bc-77e07c2c60cb.mp4',
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260503_104800_bc43ae09-f494-43e3-97d7-2f8c1692cfd7.mp4',
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260423_161253_c72b1869-400f-45ed-ac0c-52f68c2ed5bd.mp4',
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_115655_b4d9cd77-feed-43cd-a198-af78ebdf1f7a.mp4'
];

interface ServiceItem {
  id: string;
  category: string;
  title: string;
  shortDesc: string;
  cardNumber: string;
  bullets: string[];
  client: string;
}

const SERVICES_CARDS: { ar: ServiceItem[]; en: ServiceItem[] } = {
  ar: [
    {
      id: '01',
      category: 'المحاسبة والمراجعة',
      title: 'المراجعة والتدقيق المالي',
      shortDesc: 'مراجعة شاملة للقوائم المالية وفحص الحسابات طبقاً لمعايير المحاسبة المصرية والدولية لضمان الشفافية.',
      cardNumber: '9021 8842 1040 0019',
      bullets: ['المراجعة الخارجية والداخلية', 'تقييم نظم الرقابة الداخلية', 'فحص وتحليل المخاطر المالية'],
      client: 'AHMED EL SHERBINY AUDIT'
    },
    {
      id: '02',
      category: 'الاستشارات المالية',
      title: 'الاستشارات وإعادة الهيكلة',
      shortDesc: 'دراسات الجدوى، تقييم الشركات، الفحص النافي للجهالة، وتقديم استشارات التمويل والاستثمار.',
      cardNumber: '5120 7733 9035 4412',
      bullets: ['الفحص النافي للجهالة (Due Diligence)', 'تقييم القيمة العادلة للشركات', 'إعادة الهيكلة وتخطيط السيولة'],
      client: 'FINANCIAL ADVISORY GROUP'
    },
    {
      id: '03',
      category: 'الضرائب والمنازعات',
      title: 'التخطيط والحلول الضريبية',
      shortDesc: 'إنهاء الفحوصات بمركز كبار الممولين، اللجان الداخلية ولجان الطعن، وترشيد العبء الضريبي بالقانون.',
      cardNumber: '4441 5567 1223 2468',
      bullets: ['تسوية المنازعات والفحص الضريبي', 'التخطيط والامتثال القانوني', 'لجان الطعن وإنهاء الفروق'],
      client: 'TAX PLANNING & DEFENSE'
    },
    {
      id: '04',
      category: 'تأسيس الشركات',
      title: 'تأسيس وتعديل الشركات',
      shortDesc: 'تأسيس الشركات المساهمة، ذات المسؤولية المحدودة، الفروع الأجنبية، واستخراج التراخيص الاستثمارية.',
      cardNumber: '5375 8891 2234 7713',
      bullets: ['تأسيس كافة الأشكال القانونية', 'زيادة وتخفيض رؤوس الأموال', 'استخراج السجلات والتراخيص'],
      client: 'CORPORATE INCORPORATION'
    },
    {
      id: '05',
      category: 'الخدمات الإلكترونية',
      title: 'الفاتورة والإقرارات الرقمية',
      shortDesc: 'الربط بمنظومة الفاتورة والإيصال الإلكتروني، إعداد وتقديم الإقرارات الضريبية المميكنة بدقة.',
      cardNumber: '4232 8908 1121 4892',
      bullets: ['منظومة الفاتورة الإلكترونية', 'تقديم الإقرارات المميكنة', 'التسجيل في البوابات الحكومية'],
      client: 'DIGITAL TAX COMPLIANCE'
    }
  ],
  en: [
    {
      id: '01',
      category: 'Audit & Assurance',
      title: 'Financial Auditing & Review',
      shortDesc: 'Comprehensive auditing adhering strictly to Egyptian and International Financial Reporting Standards.',
      cardNumber: '9021 8842 1040 0019',
      bullets: ['External & Internal Auditing', 'Internal Control Evaluation', 'Risk Assessment & Analysis'],
      client: 'AHMED EL SHERBINY AUDIT'
    },
    {
      id: '02',
      category: 'Financial Advisory',
      title: 'Valuation & Restructuring',
      shortDesc: 'Due diligence, corporate valuation, restructuring plans, and strategic investment feasibility studies.',
      cardNumber: '5120 7733 9035 4412',
      bullets: ['Due Diligence Reviews', 'Fair Value Corporate Valuation', 'Debt & Capital Restructuring'],
      client: 'FINANCIAL ADVISORY GROUP'
    },
    {
      id: '03',
      category: 'Tax Strategy',
      title: 'Tax Planning & Resolution',
      shortDesc: 'Resolving high-stakes tax inspections, dispute settlements, and lawful tax burden optimization.',
      cardNumber: '4441 5567 1223 2468',
      bullets: ['Tax Inspection Settlements', 'Appeals Committee Defense', 'Strategic Tax Planning'],
      client: 'TAX PLANNING & DEFENSE'
    },
    {
      id: '04',
      category: 'Company Formation',
      title: 'Corporate Incorporation',
      shortDesc: 'End-to-end company establishment, foreign branch setup, commercial records, and investor licenses.',
      cardNumber: '5375 8891 2234 7713',
      bullets: ['Joint Stock & LLC Setup', 'Capital Increase & Amendments', 'Licensing & Commercial Records'],
      client: 'CORPORATE INCORPORATION'
    },
    {
      id: '05',
      category: 'Digital Systems',
      title: 'E-Invoicing & Compliance',
      shortDesc: 'Full integration with governmental e-invoicing portals and real-time electronic tax compliance.',
      cardNumber: '4232 8908 1121 4892',
      bullets: ['E-Invoicing & E-Receipts', 'Digital Tax Return Filing', 'Automated Regulatory Portals'],
      client: 'DIGITAL TAX COMPLIANCE'
    }
  ]
};

interface ServicesProps {
  lang: 'en' | 'ar';
  setView: (view: 'home' | 'about' | 'contact' | 'services' | 'laws') => void;
  onBookConsultation?: () => void;
}

export default function Services({ lang, setView, onBookConsultation }: ServicesProps) {
  const isRtl = lang === 'ar';
  const BackIcon = isRtl ? ArrowRight : ArrowLeft;
  const servicesList = SERVICES_CARDS[lang];
  const cardCount = servicesList.length;

  const cardsRefs = useRef<(HTMLDivElement | null)[]>([]);
  const frameId = useRef<number>(0);
  
  // Continuous scroll progress
  const progress = useRef<number>(0);
  const targetProgress = useRef<number>(0);
  const isDragging = useRef(false);
  const startTouchY = useRef(0);

  // Track mouse coordinates for interactive 3D parallax tilt with inertia damping
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  // Responsive state containing card dimensions
  const [metrics, setMetrics] = useState({
    cardW: 350,
    cardH: 220, // 1.59 standard credit card ratio
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rx = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      const ry = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
      mouse.current.targetX = Math.max(-1, Math.min(1, rx));
      mouse.current.targetY = Math.max(-1, Math.min(1, ry));
    };

    const handleMouseLeave = () => {
      mouse.current.targetX = 0;
      mouse.current.targetY = 0;
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      targetProgress.current += e.deltaY * 0.0018;
    };

    const handleTouchStart = (e: TouchEvent) => {
      isDragging.current = true;
      startTouchY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging.current) return;
      const deltaY = startTouchY.current - e.touches[0].clientY;
      targetProgress.current += deltaY * 0.005;
      startTouchY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = () => {
      isDragging.current = false;
    };

    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      let cardW = Math.round(w * 0.16 + 160);
      const heightFactor = Math.min(1.0, Math.max(0.65, h / 850));
      cardW = Math.round(cardW * heightFactor);
      cardW = Math.min(380, Math.max(280, cardW));
      const cardH = Math.round(cardW / 1.5925);

      setMetrics({ cardW, cardH });
    };

    handleResize();

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Compute positions, rotations, and visual rules at 60fps
  const renderLoop = () => {
    // Upward flow speed of continuous transition
    targetProgress.current += 0.0016;
    progress.current += (targetProgress.current - progress.current) * 0.08;

    // Smoothly interpolate mouse tilt
    mouse.current.x += (mouse.current.targetX - mouse.current.x) * 0.08;
    mouse.current.y += (mouse.current.targetY - mouse.current.y) * 0.08;

    const cards = cardsRefs.current;
    const h = window.innerHeight;
    const { cardH } = metrics;

    const continuousProgress = progress.current;
    const roundedIndex = Math.round(continuousProgress);
    const diffFromRound = continuousProgress - roundedIndex;
    
    // Non-linear dwell logic
    const easedDiff = Math.sign(diffFromRound) * Math.pow(Math.abs(diffFromRound) * 2, 4.2) / 2;
    const virtualActiveIndex = roundedIndex + easedDiff;

    for (let i = 0; i < cardCount; i++) {
      const card = cards[i];
      if (!card) continue;

      let offset = i - virtualActiveIndex;
      const halfCount = cardCount / 2;
      while (offset > halfCount) offset -= cardCount;
      while (offset < -halfCount) offset += cardCount;

      const absOffset = Math.abs(offset);
      const sign = Math.sign(offset);

      if (absOffset > 3.0) {
        card.style.visibility = 'hidden';
        continue;
      } else {
        card.style.visibility = 'visible';
      }

      const gap = 36;
      const peekAmount = -55;
      const D = 1350;

      let y = 0;
      let z = 0;
      let rot = 0;

      if (absOffset <= 1) {
        const t = absOffset;
        const easedT = t * t * (3 - 2 * t);
        const targetY = cardH + gap;
        y = -sign * (easedT * targetY);
        z = 400 + easedT * (220 - 400);
        rot = easedT * 132;
      } else if (absOffset <= 2) {
        const t = absOffset - 1;
        const easedT = t * t * (3 - 2 * t);
        const yStart = cardH + gap;
        const zStart = 220;
        const rotStart = 132;
        const zEnd = -60;
        const rotEnd = 175;

        const sEnd = D / (D - zEnd);
        const yEnd = (h / 2 - peekAmount) / sEnd - (cardH / 2);
        const currentY = yStart + easedT * (yEnd - yStart);
        y = -sign * currentY;
        z = zStart + easedT * (zEnd - zStart);
        rot = rotStart + easedT * (rotEnd - rotStart);
      } else {
        const t = Math.min(absOffset - 2, 1);
        const easedT = t * t * (3 - 2 * t);
        const zStart = -60;
        const rotStart = 175;
        const zEnd3 = -250;
        const rotEnd3 = 195;

        const sEnd2 = D / (D - zStart);
        const yEnd2 = (h / 2 - peekAmount) / sEnd2 - (cardH / 2);
        const sEnd3 = D / (D - zEnd3);
        const yEnd3 = (h / 2 + 100) / sEnd3 + (cardH / 2);

        const currentY = yEnd2 + easedT * (yEnd3 - yEnd2);
        y = -sign * currentY;
        z = zStart + easedT * (zEnd3 - zStart);
        rot = rotStart + easedT * (rotEnd3 - rotStart);
      }

      const localCardRotation = -sign * rot;
      const centerFactor = Math.max(0, 1 - absOffset);

      const maxTiltY = 15;
      const maxTiltX = 12;
      const activeTiltX = -mouse.current.y * maxTiltX * centerFactor;
      const activeTiltY = mouse.current.x * maxTiltY * centerFactor;

      const totalRotX = localCardRotation + activeTiltX;
      const totalRotY = activeTiltY;

      card.style.zIndex = Math.round(z).toString();
      card.style.opacity = `${Math.min(1, 0.4 + centerFactor * 0.6)}`;

      card.style.transform = `translateY(${y.toFixed(2)}px) translateZ(${z.toFixed(2)}px) rotateX(${totalRotX.toFixed(2)}deg) rotateY(${totalRotY.toFixed(2)}deg) rotateZ(-3deg)`;
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
  const handleConsultation = onBookConsultation || (() => setView('contact'));

  return (
    <div className="relative w-screen h-screen bg-[#000000] text-white flex items-center justify-center overflow-hidden select-none font-sans" dir={isRtl ? 'rtl' : 'ltr'}>
      
      {/* Top Navbar */}
      <nav className="absolute top-0 left-0 right-0 z-50 px-6 py-5 flex items-center justify-between pointer-events-none">
        <div className="max-w-[88rem] mx-auto w-full flex items-center justify-between">
          <button 
            onClick={() => setView('home')} 
            className="pointer-events-auto inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-xl px-5 py-2.5 rounded-full border border-white/15 shadow-md text-white transition-all duration-200"
          >
            <BackIcon className="w-5 h-5" />
            <span className="font-semibold text-sm">{isRtl ? 'الرئيسية' : 'Home'}</span>
          </button>

          <div className="pointer-events-none text-center">
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white/90">
              {isRtl ? 'خدماتنا المهنية' : 'Our Professional Services'}
            </h1>
            <p className="text-[11px] text-white/50 hidden sm:block">
              {isRtl ? 'أحمد الشربيني وشركاه - محاسبون ومراجعون قانونيون' : 'Ahmed El Sherbiny & Co. Certified Public Accountants'}
            </p>
          </div>

          <button 
            onClick={handleConsultation}
            className="pointer-events-auto bg-white text-black px-5 py-2.5 rounded-full text-xs md:text-sm font-bold hover:bg-white/90 transition-all shadow-md hover:scale-105"
          >
            {isRtl ? 'احجز استشارة' : 'Book Consultation'}
          </button>
        </div>
      </nav>

      {/* Floating Bottom Helper / Action Bar */}
      <div className="absolute bottom-6 inset-x-6 z-40 flex items-center justify-between max-w-xl mx-auto pointer-events-none">
        <div className="bg-white/10 backdrop-blur-xl border border-white/15 px-4 py-2 rounded-full text-xs text-white/80 shadow-lg mx-auto flex items-center gap-2">
          <span>{isRtl ? '🖱️ حرّك بالماوس أو مرّر (Scroll) لتصفح الخدمات' : '🖱️ Move mouse or scroll to explore services'}</span>
        </div>
      </div>

      {/* 3D perspective camera space */}
      <div
        className="relative w-full h-full flex items-center justify-center pointer-events-none"
        style={{
          perspective: '1350px',
        }}
      >
        {/* Dynamic 3D coordinate viewport */}
        <div
          className="absolute"
          style={{
            width: `${metrics.cardW}px`,
            height: `${metrics.cardH}px`,
            transformStyle: 'preserve-3d',
          }}
        >
          {servicesList.map((service, i) => (
            <div
              key={service.id}
              ref={(el) => { cardsRefs.current[i] = el; }}
              className="absolute inset-0"
              style={{
                width: `${metrics.cardW}px`,
                height: `${metrics.cardH}px`,
                transformStyle: 'preserve-3d',
                backfaceVisibility: 'visible',
              }}
            >
              {/* Build physical 3D volumetric thickness by dense parallel layering */}
              {thicknessLayers.map((zOffset, layerIdx) => {
                const isFrontFace = layerIdx === thicknessLayers.length - 1;
                const isBackFace = layerIdx === 0;

                const videoSrc = CARD_VIDEOS[i % CARD_VIDEOS.length];
                const baseBgColor = '#0f0f0f';

                // Middle structural slice
                if (!isFrontFace && !isBackFace) {
                  return (
                    <div
                      key={layerIdx}
                      className="absolute inset-0 rounded-[20px] border border-[#808080] pointer-events-none overflow-hidden"
                      style={{
                        backgroundColor: '#808080',
                        transform: `translateZ(${zOffset}px)`,
                      }}
                    />
                  );
                }

                // Front face slice
                if (isFrontFace) {
                  return (
                    <div
                      key={layerIdx}
                      className="absolute inset-0 rounded-[20px] border border-white/20 pointer-events-none overflow-hidden shadow-2xl"
                      style={{
                        backgroundColor: baseBgColor,
                        transform: `translateZ(${zOffset}px)`,
                        backfaceVisibility: 'hidden',
                        boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.2)',
                      }}
                    >
                      <video
                        src={videoSrc}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover rounded-[20px] filter contrast-[1.05]"
                      />

                      {/* Dark Gradient Overlay for readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/30 z-10" />

                      <div className="absolute inset-0 p-5 sm:p-6 text-white h-full w-full font-sans z-20 flex flex-col justify-between" dir={isRtl ? 'rtl' : 'ltr'}>
                        {/* Top Header on Card */}
                        <div className="flex items-center justify-between">
                          {/* Silver Metallic Contact Chip */}
                          <div className="w-8 h-8 sm:w-9 sm:h-9">
                            <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M20 8H40V14C40.0016 14.5299 40.2128 15.0377 40.5875 15.4125C40.9623 15.7872 41.4701 15.9984 42 16H59V24H42C41.4701 24.0016 40.9623 24.2128 40.5875 24.5875C40.2128 24.9623 40.0016 25.4701 40 26V52H20V8ZM18 8H8.00039C4.47435 8 1.56576 10.6083 1.08 14H18V8ZM1 16V24V26V34V36V44H18V36H1V34H18V26H1V24H18V16H1ZM1.08 46C1.56576 49.3917 4.47435 52 8.00039 52H18V46H1.08ZM42 14V8H52.0004C55.5264 8 58.4342 10.6084 58.92 14H42ZM59 26H42V34H59V26ZM59 36H42V44H59V36ZM52.0004 52H42V46H58.92C58.4342 49.3916 55.5264 52 52.0004 52Z"
                                fill={`url(#chip_grad_${i})`}
                              />
                              <defs>
                                <linearGradient id={`chip_grad_${i}`} x1="30" y1="8" x2="30" y2="52" gradientUnits="userSpaceOnUse">
                                  <stop stopColor="white" />
                                  <stop offset="1" stopColor="#999999" />
                                </linearGradient>
                              </defs>
                            </svg>
                          </div>

                          {/* Category Badge / Logo */}
                          <div className="flex items-center gap-2">
                            <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-[10px] sm:text-xs font-bold text-white tracking-wide">
                              {service.category}
                            </span>
                            <img src="/logo.png" alt="Logo" className="h-6 w-auto object-contain brightness-0 invert opacity-80" />
                          </div>
                        </div>

                        {/* Middle Content */}
                        <div className="my-auto py-1">
                          <h3 className="text-lg sm:text-xl font-bold text-white mb-1.5 tracking-tight drop-shadow-md">
                            {service.title}
                          </h3>
                          <p className="text-[11px] sm:text-xs text-white/85 leading-relaxed font-normal line-clamp-2 drop-shadow-sm">
                            {service.shortDesc}
                          </p>
                        </div>

                        {/* Bottom Footer on Card */}
                        <div className="flex items-end justify-between pt-2 border-t border-white/15">
                          <div className="font-mono text-[10px] sm:text-[11px] font-medium tracking-widest text-white/90">
                            {service.cardNumber}
                          </div>
                          
                          {/* Intersecting Circles */}
                          <div className="flex -space-x-2.5 items-center opacity-85">
                            <div className="w-5 h-5 rounded-full bg-white/30 backdrop-blur-[1px] border border-white/20" />
                            <div className="w-5 h-5 rounded-full bg-white/50 backdrop-blur-[1px] border border-white/20" />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }

                // Back face slice
                if (isBackFace) {
                  return (
                    <div
                      key={layerIdx}
                      className="absolute inset-0 rounded-[20px] border border-white/20 pointer-events-none overflow-hidden"
                      style={{
                        backgroundColor: baseBgColor,
                        transform: `translateZ(${zOffset}px) rotateX(180deg)`,
                        backfaceVisibility: 'hidden',
                        boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.2)',
                      }}
                    >
                      {/* Render Video with blur */}
                      <div className="absolute inset-0 pointer-events-none" style={{ filter: 'blur(16px)', transform: 'scale(1.15)' }}>
                        <video
                          src={videoSrc}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      </div>

                      {/* Magnetic stripe */}
                      <div className="absolute left-0 right-0 top-4 h-7 sm:h-8 bg-black/90 backdrop-blur-md z-10" />

                      {/* Details on Back Face */}
                      <div className="absolute inset-x-5 top-14 bottom-4 z-20 flex flex-col justify-between text-white" dir={isRtl ? 'rtl' : 'ltr'}>
                        <ul className="space-y-1.5 text-[10px] sm:text-xs text-white/90 leading-tight">
                          {service.bullets.map((b, idx) => (
                            <li key={idx} className="flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0" />
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>

                        <div 
                          className="pt-2 border-t border-white/15 flex items-center justify-between text-[9px] sm:text-[10px] text-white/70 font-mono"
                          style={{ fontFamily: '"JetBrains Mono", monospace' }}
                        >
                          <span className="uppercase tracking-wide">{service.client}</span>
                          <span>CVV: {service.id}09</span>
                        </div>
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
