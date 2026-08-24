import { BookOpen, Scale, FileText, Landmark, Gavel, ExternalLink, ArrowLeft, ArrowRight } from 'lucide-react';

interface LawsProps {
  isRtl: boolean;
  setView: (view: 'home' | 'about' | 'contact' | 'services' | 'laws') => void;
}

const LAWS_DATA = [
  {
    title: { ar: 'أولاً: القوانين', en: 'First: Laws' },
    icon: Scale,
    links: [
      { text: { ar: 'قانون شركات الاموال رقم 159 لسنة 1981 ولائحتة التنفيذية', en: 'Companies Law No. 159 of 1981' }, url: 'http://hamdyabdelghany.net/L_159_index.htm' },
      { text: { ar: 'قانون الاستثمار رقم 72 لسنة 2017 ولائحتة التنفيذية', en: 'Investment Law No. 72 of 2017' }, url: 'http://hamdyabdelghany.net/Investement%20Low.htm' },
      { text: { ar: 'قانون الاجراءات الضريبية الموحد رقم 206 لسنة 2020', en: 'Unified Tax Procedures Law No. 206 of 2020' }, url: 'http://hamdyabdelghany.net/index_206_2020.htm' },
      { text: { ar: 'قانون الضرائب على الدخل رقم 91 لسنة 2005 و لائحنة التنفيذية', en: 'Income Tax Law No. 91 of 2005' }, url: 'http://hamdyabdelghany.net/index1_1.htm' },
      { text: { ar: 'قانون الضريبة علي القيمة المضافة رقم 76 لسنة 2016 و لائحتة التنفيذية', en: 'Value Added Tax Law No. 76 of 2016' }, url: 'http://hamdyabdelghany.net/VAT_Index.htm' },
      { text: { ar: 'قانون الدمغة رقم 111 لسنة 1980 ولائحتة التنفيذية', en: 'Stamp Duty Law No. 111 of 1980' }, url: 'http://hamdyabdelghany.net/111-1980.htm' },
      { text: { ar: 'قانون الضريبة علي العقارات المبينية رقم 196 لسنة 2008 و لائحتة التنفيذية', en: 'Real Estate Tax Law No. 196 of 2008' }, url: 'http://hamdyabdelghany.net/196_index.htm' },
      { text: { ar: 'القوانين والقرارات المنظمة للإستيراد والتصدير', en: 'Import & Export Regulations' }, url: 'http://hamdyabdelghany.net/Index_Imp_Exp.htm' },
    ]
  },
  {
    title: { ar: 'ثانياً: القرارات الوزارية', en: 'Second: Ministerial Decrees' },
    icon: Landmark,
    links: [
      { text: { ar: 'قرارات خاصة بالارباح الراسمالية', en: 'Capital Gains Decrees' }, url: 'https://www.incometax.gov.eg/karar610.asp' },
      { text: { ar: 'قرارات خاصة بالقانون الجديد', en: 'New Law Decrees' }, url: 'https://www.incometax.gov.eg/karar91.asp' },
      { text: { ar: 'قرارات متنوعة', en: 'Miscellaneous Decrees' }, url: 'https://www.incometax.gov.eg/karar-new.asp' },
    ]
  },
  {
    title: { ar: 'ثالثاً: مبادئ لجان الطعن الضريبي', en: 'Third: Tax Appeal Principles' },
    icon: Gavel,
    links: [
      { text: { ar: 'الجزء الأول', en: 'Part 1' }, url: 'https://www.incometax.gov.eg/legan.asp' },
      { text: { ar: 'الجزء الثاني', en: 'Part 2' }, url: 'https://www.incometax.gov.eg/legan.asp' },
      { text: { ar: 'الجزء الثالث', en: 'Part 3' }, url: 'https://www.incometax.gov.eg/legan.asp' },
    ]
  },
  {
    title: { ar: 'رابعاً: كتب دورية وتعليمات', en: 'Fourth: Instructions & Periodic Books' },
    icon: FileText,
    links: [
      { text: { ar: 'كتب دورية', en: 'Periodic Books' }, url: 'https://www.incometax.gov.eg/kdawry.asp' },
      { text: { ar: 'جميع التعليمات التنفيذية لفحص جميع الأنشطة', en: 'Executive Instructions for Examining Activities' }, url: 'https://www.incometax.gov.eg/pand-y.asp' },
      { text: { ar: 'التعليمات التنفيذية للانشطة التي تم عمل اتفاقيات لها', en: 'Executive Instructions for Agreements' }, url: 'https://www.incometax.gov.eg/btreaties.asp' },
    ]
  }
];

export default function Laws({ isRtl, setView }: LawsProps) {
  const IconBack = isRtl ? ArrowRight : ArrowLeft;

  return (
    <div className={`min-h-screen bg-[#F5F5F5] ${isRtl ? 'rtl' : 'ltr'}`} dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Navigation Bar */}
      <nav className="fixed w-full z-50 bg-[#F5F5F5]/80 backdrop-blur-md border-b border-black/5 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
          <button 
            onClick={() => setView('home')}
            className="group flex items-center gap-3 text-black hover:text-black/70 transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
              <IconBack className="w-5 h-5" />
            </div>
            <span className="font-medium text-lg hidden sm:block">
              {isRtl ? 'العودة للرئيسية' : 'Back to Home'}
            </span>
          </button>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 pt-32 pb-24">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-black text-white mb-6 shadow-xl">
            <BookOpen className="w-10 h-10" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight" style={{ letterSpacing: '-0.02em' }}>
            {isRtl ? 'المكتبة القانونية' : 'Legal Library'}
          </h1>
          <p className="text-lg md:text-xl text-black/60 max-w-2xl mx-auto leading-relaxed">
            {isRtl 
              ? 'مجموعة شاملة من القوانين والقرارات الوزارية والتعليمات التنفيذية المنظمة للعمل المالي والضريبي في مصر.'
              : 'A comprehensive collection of laws, ministerial decrees, and executive instructions regulating financial and tax work in Egypt.'}
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {LAWS_DATA.map((section, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-8 shadow-sm border border-black/5 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center">
                  <section.icon className="w-6 h-6 text-black" />
                </div>
                <h2 className="text-2xl font-bold text-black">
                  {isRtl ? section.title.ar : section.title.en}
                </h2>
              </div>
              
              <ul className="space-y-3">
                {section.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <a 
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-start gap-3 p-4 rounded-2xl hover:bg-gray-50 transition-colors"
                    >
                      <ExternalLink className="w-5 h-5 text-black/40 mt-0.5 group-hover:text-black transition-colors shrink-0" />
                      <span className="text-black/70 group-hover:text-black font-medium transition-colors">
                        {isRtl ? link.text.ar : link.text.en}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Source Footer */}
        <div className="mt-12 text-center">
          <a 
            href="https://www.egypt.gov.eg/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-black/40 hover:text-black/80 transition-colors text-sm font-medium"
          >
            <Landmark className="w-4 h-4" />
            {isRtl ? 'المصدر: بوابة الحكومة المصرية ®' : 'Source: Egyptian Government Portal ®'}
          </a>
        </div>
      </div>
    </div>
  );
}
