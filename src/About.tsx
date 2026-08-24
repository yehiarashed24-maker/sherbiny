import { ArrowLeft, ArrowRight, Target, ShieldCheck, Award, TrendingUp, CheckCircle2 } from 'lucide-react';
import Footer from './components/ui/footer';

interface AboutProps {
  lang: 'en' | 'ar';
  setView: (view: 'home' | 'about' | 'contact' | 'services' | 'laws') => void;
}

const HIGHLIGHTS = {
  ar: [
    {
      title: 'التخطيط الضريبي',
      description: 'مساعدة العملاء علي ترشيد عبء الضريبية وفقاً لأحكام القانون من خلال التخطيط المالي والاستفادة من كافة الإعفاءات والمزايا المتاحة للأفراد والشركات.',
      tag: 'إدارة وتخطيط'
    },
    {
      title: 'الأعمال والفحص الضريبي',
      description: 'إنهاء أعمال الفحص الضريبي لشركة الصالحية للاستثمار والتنمية بمركز كبار الممولين منذ بداية النشاط في عام 1981 وحتى الآن بصورة مرضية ومثالية.',
      tag: 'سجل حافل'
    },
    {
      title: 'الخبرة الاستشارية والتقييم',
      description: 'تقييم القيمة العادلة لأسهم شركتي فنادق حدائق الأهرام وشركة بيراميدز للسياحة كمستشار مالي مستقل وتم قبول التقييم بدون أدنى تحفظ.',
      tag: 'استشارات كبرى'
    },
    {
      title: 'المراجعة وإنهاء النزاعات',
      description: 'الإشراف على فحص شركة التعمير السياحي والربط الضريبي في زمن قياسي، مما مكن الشركة والبنك من تسوية القرض وتحقيق انطلاقة استثمارية جديدة.',
      tag: 'إنجاز قياسي'
    }
  ],
  en: [
    {
      title: 'Tax Planning',
      description: 'Helping clients rationalize the tax burden according to the law through robust financial planning and utilizing all available statutory exemptions.',
      tag: 'Strategy'
    },
    {
      title: 'Tax Inspection & Resolution',
      description: 'Successfully finalized tax inspections for major enterprises like Salhia Investment & Development at the Large Taxpayers Center with outstanding results.',
      tag: 'Track Record'
    },
    {
      title: 'Financial Advisory & Fair Valuation',
      description: 'Conducted independent fair value assessments for major tourism and hotel chains, accepted by financial authorities without reservation.',
      tag: 'Advisory'
    },
    {
      title: 'Auditing & Debt Settlement',
      description: 'Supervised urgent tax inspections and settlements in record time, enabling corporations and banks to restructure debts and start fresh.',
      tag: 'Execution'
    }
  ]
};

const VALUES = {
  ar: [
    {
      icon: Target,
      title: 'أهدافنا ورؤيتنا',
      desc: 'تقديم أعلى مستويات الخدمات الاستشارية والمحاسبية والضريبية والمالية التي تُمكّن عملاءنا من النمو والريادة والتوسع في كافة القطاعات الاقتصادية.'
    },
    {
      icon: ShieldCheck,
      title: 'السرية والأمانة المهنية',
      desc: 'الحفاظ الصارم على سرية بيانات عملائنا المالية، وبناء علاقات استراتيجية طويلة الأمد تقوم على الثقة والشفافية التامة.'
    },
    {
      icon: TrendingUp,
      title: 'مواكبة التطور والرقمنة',
      desc: 'اتباع أحدث الأنظمة التكنولوجية والأساليب الرقمية في المعاملات الضريبية والمحاسبية لتسريع الإجراءات وضمان دقة النتائج.'
    },
    {
      icon: Award,
      title: 'الكفاءة والخبرة المتراكمة',
      desc: 'فريق عمل من نخبة المحاسبين والمستشارين القانونيين ذوي الخبرات العميقة في التعامل مع مصلحة الضرائب والجهات الحكومية.'
    }
  ],
  en: [
    {
      icon: Target,
      title: 'Our Vision & Objectives',
      desc: 'Delivering the highest tier of financial, auditing, and tax advisory services that empower our clients to expand and thrive in dynamic markets.'
    },
    {
      icon: ShieldCheck,
      title: 'Confidentiality & Integrity',
      desc: 'Strict adherence to information confidentiality, building long-term partnerships rooted in transparency, accuracy, and mutual trust.'
    },
    {
      icon: TrendingUp,
      title: 'Innovation & Digital Systems',
      desc: 'Utilizing modern digital tools and electronic tax filing systems to maximize speed, compliance, and procedural efficiency.'
    },
    {
      icon: Award,
      title: 'Proven Competence',
      desc: 'A dedicated team of senior certified public accountants with decades of experience navigating regulatory and tax frameworks.'
    }
  ]
};

export default function About({ lang, setView }: AboutProps) {
  const isRtl = lang === 'ar';
  const BackIcon = isRtl ? ArrowRight : ArrowLeft;
  const highlights = HIGHLIGHTS[lang];
  const values = VALUES[lang];

  return (
    <div className="min-h-screen bg-[#F6F5F2] text-black font-sans selection:bg-black selection:text-white" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Top Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between pointer-events-none">
        <div className="max-w-[88rem] mx-auto w-full flex items-center justify-between">
          <button 
            onClick={() => setView('home')} 
            className="pointer-events-auto inline-flex items-center gap-2 bg-white/80 backdrop-blur-md px-5 py-2.5 rounded-full border border-black/5 shadow-sm text-black/80 hover:text-black hover:bg-white transition-all duration-200"
          >
            <BackIcon className="w-5 h-5" />
            <span className="font-medium text-base">{isRtl ? 'العودة للرئيسية' : 'Back to Home'}</span>
          </button>
          
          <div className="pointer-events-auto flex items-center gap-3">
            <button 
              onClick={() => setView('contact')}
              className="bg-black text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-black/80 transition-colors shadow-sm"
            >
              {isRtl ? 'احجز استشارتك' : 'Book Consultation'}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 max-w-[88rem] mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-black/5 border border-black/10 text-xs font-semibold uppercase tracking-wider text-black/70 mb-4">
            {isRtl ? 'عن المؤسسة' : 'About Our Firm'}
          </span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-black mb-6 leading-tight">
            {isRtl ? 'شريكك المالي والضريبي الموثوق نحو النجاح والنمو' : 'Your Trusted Partner in Financial & Tax Excellence'}
          </h1>
          <p className="text-lg text-black/70 leading-relaxed">
            {isRtl 
              ? 'مكتب أحمد الشربيني وشركاه، مسيرة ممتدة من الخبرة والريادة في المحاسبة القانونية، المراجعة، والتخطيط المالي وتأسيس الشركات.' 
              : 'Ahmed El Sherbiny & Co. brings decades of specialized experience in auditing, tax compliance, financial restructuring, and corporate advisory.'}
          </p>
        </div>

        {/* Founder Profile Card */}
        <div className="bg-white rounded-[2.5rem] p-8 md:p-14 border border-black/5 shadow-xl shadow-black/[0.03] mb-20 overflow-hidden relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Image Column */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-black/20 to-black/5 rounded-[2rem] blur-xl opacity-50 group-hover:opacity-75 transition duration-500" />
                <div className="relative w-64 h-80 md:w-72 md:h-96 rounded-[2rem] overflow-hidden border-4 border-white shadow-2xl bg-[#EBE9E1]">
                  <img 
                    src="/founder.jpg" 
                    alt="Ahmed El Sherbiny" 
                    className="w-full h-full object-cover object-top filter contrast-[1.02] hover:scale-105 transition-transform duration-500" 
                  />
                </div>
              </div>
            </div>

            {/* Info Column */}
            <div className="lg:col-span-8 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black text-white text-xs font-semibold w-fit mb-4">
                <span>{isRtl ? 'المؤسس ورئيس مجلس الإدارة' : 'Founder & Managing Director'}</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-black mb-3 tracking-tight">
                {isRtl ? 'أحمد الشربيني' : 'Ahmed El Sherbiny'}
              </h2>
              <p className="text-base md:text-lg font-semibold text-black/60 mb-6">
                {isRtl ? 'محاسب ومراجع قانوني وخبير ضرائب معتمد' : 'Certified Public Accountant & Senior Tax Consultant'}
              </p>
              
              <div className="space-y-4 text-black/75 text-base md:text-lg leading-relaxed mb-8">
                <p>
                  {isRtl 
                    ? 'يقود الأستاذ أحمد الشربيني المؤسسة بخبرة مهنية راسخة تمتد لعقود في الأوساط المالية والمحاسبية والضريبية في مصر، حيث أشرف على إنجاز ملفات كبرى الشركات الاستثمارية والتجارية والسياحية.' 
                    : 'Leading the firm with decades of deep-rooted financial, auditing, and tax consulting expertise in Egypt, supervising landmark financial files for premier investment, hospitality, and commercial corporations.'}
                </p>
                <p>
                  {isRtl 
                    ? 'يرتكز نهجه المهني على تقديم حلول استباقية مبتكرة لحماية استثمارات العملاء، ترشيد العبء الضريبي في إطار القانون، وبناء أنظمة مالية قوية تضمن الاستدامة.' 
                    : 'His core philosophy centers on proactive, compliant financial solutions that safeguard clients’ investments, optimize tax exposure lawfully, and build resilient accounting foundations.'}
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-black/5">
                <div>
                  <p className="text-3xl font-bold text-black">40+</p>
                  <p className="text-xs text-black/60 font-medium">{isRtl ? 'عاماً من الخبرة' : 'Years of Experience'}</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-black">500+</p>
                  <p className="text-xs text-black/60 font-medium">{isRtl ? 'شركة ومؤسسة كبرى' : 'Corporate Clients'}</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-black">100%</p>
                  <p className="text-xs text-black/60 font-medium">{isRtl ? 'التزام وامتثال قانوني' : 'Legal Compliance'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pillars / Values Grid */}
        <div className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4 tracking-tight">
              {isRtl ? 'ركائز عملنا ومبادئنا' : 'Our Core Pillars'}
            </h2>
            <p className="text-black/60 text-base">
              {isRtl ? 'نلتزم بأعلى المعايير المهنية الدولية لضمان تقديم قيمة حقيقية لأعمالك.' : 'Committed to international professional standards to deliver measurable value to your business.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, idx) => {
              const Icon = v.icon;
              return (
                <div 
                  key={idx} 
                  className="bg-white/80 backdrop-blur-md p-8 rounded-3xl border border-black/5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col"
                >
                  <div className="w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center mb-6 shadow-sm">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-black mb-3">{v.title}</h3>
                  <p className="text-sm text-black/70 leading-relaxed mt-auto">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Major Achievements & Case Highlights */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-block px-4 py-1 rounded-full bg-black/5 text-xs font-bold text-black/70 mb-3">
              {isRtl ? 'نماذج من إنجازاتنا' : 'Proven Track Record'}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4 tracking-tight">
              {isRtl ? 'خبرات عملية ونتائج مثبتة' : 'Real Experience & Proven Results'}
            </h2>
            <p className="text-black/60 text-base">
              {isRtl ? 'محطات مضيئة وتجارب ناجحة في إنهاء الفحوصات والتقييمات لأكبر المؤسسات.' : 'Demonstrated success resolving high-stakes tax inspections and valuations.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {highlights.map((h, i) => (
              <div 
                key={i} 
                className="bg-white p-8 md:p-10 rounded-3xl border border-black/5 shadow-sm hover:border-black/20 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 bg-black/5 text-black/80 rounded-full text-xs font-semibold">
                      {h.tag}
                    </span>
                    <CheckCircle2 className="w-5 h-5 text-black/40" />
                  </div>
                  <h3 className="text-2xl font-bold text-black mb-4">{h.title}</h3>
                  <p className="text-black/70 text-base leading-relaxed">{h.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="bg-black text-white rounded-[2.5rem] p-10 md:p-16 text-center relative overflow-hidden mb-10 shadow-2xl">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
              {isRtl ? 'هل ترغب في تنظيم وتأمين موقفك المالي والضريبي؟' : 'Ready to Secure and Elevate Your Financial Standing?'}
            </h2>
            <p className="text-white/70 text-base md:text-lg mb-8">
              {isRtl 
                ? 'تواصل معنا اليوم واستفد من خبراتنا القانونية والمالية الشاملة لتحقيق أفضل النتائج لمشروعك.' 
                : 'Contact our advisory team today for customized, expert financial & tax consulting.'}
            </p>
            <button 
              onClick={() => setView('contact')}
              className="bg-white text-black px-8 py-4 rounded-full font-bold text-base hover:bg-white/90 transition-all hover:scale-105 shadow-lg"
            >
              {isRtl ? 'تواصل مع فريقنا الآن' : 'Get in Touch Now'}
            </button>
          </div>
        </div>
      </section>

      {/* Universal Footer */}
      <Footer isRtl={isRtl} setView={setView} />
    </div>
  );
}
