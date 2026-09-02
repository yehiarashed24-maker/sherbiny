import { BookOpen, Scale, FileText, Landmark, Gavel, ExternalLink, ArrowLeft, ArrowRight } from 'lucide-react';
import type { LangType } from './components/ui/language-selector';
import Footer from './components/ui/footer';

interface LawsProps {
  isRtl?: boolean;
  lang?: LangType;
  setView: (view: 'home' | 'about' | 'contact' | 'services' | 'laws') => void;
}

const LAWS_DATA = [
  {
    title: {
      ar: 'أولاً: القوانين والتشريعات',
      en: '1. Laws & Regulations',
      fr: '1. Lois & Réglementations',
      tr: '1. Kanunlar ve Mevzuat', ja: '1. 法律と規制', zh: '1. 法律法规', ko: '1. 법률 및 규정', es: '1. Leyes y Regulaciones'
    },
    icon: Scale,
    links: [
      { text: { ar: 'قانون شركات الاموال رقم 159 لسنة 1981 ولائحتة التنفيذية', en: 'Companies Law No. 159 of 1981', fr: 'Loi sur les Sociétés n° 159 de 1981', tr: '1981 Tarihli 159 Sayılı Şirketler Kanunu', ja: '1981年第159号会社法', zh: '1981年第159号公司法', ko: '1981년 제159호 회사법', es: 'Ley de Sociedades No. 159 de 1981' }, url: 'http://hamdyabdelghany.net/L_159_index.htm' },
      { text: { ar: 'قانون الاستثمار رقم 72 لسنة 2017 ولائحتة التنفيذية', en: 'Investment Law No. 72 of 2017', fr: 'Loi sur l’Investissement n° 72 de 2017', tr: '2017 Tarihli 72 Sayılı Yatırım Kanunu', ja: '2017年第72号投資法', zh: '2017年第72号投资法', ko: '2017년 제72호 투자법', es: 'Ley de Inversiones No. 72 de 2017' }, url: 'http://hamdyabdelghany.net/Investement%20Low.htm' },
      { text: { ar: 'قانون الاجراءات الضريبية الموحد رقم 206 لسنة 2020', en: 'Unified Tax Procedures Law No. 206 of 2020', fr: 'Loi sur les Procédures Fiscales Unifiées n° 206 de 2020', tr: '2020 Tarihli 206 Sayılı Birleşik Vergi Usul Kanunu', ja: '2020年第206号統一税務手続法', zh: '2020年第206号统一税务程序法', ko: '2020년 제206호 통합 세무 절차법', es: 'Ley de Procedimientos Fiscales Unificados No. 206 de 2020' }, url: 'http://hamdyabdelghany.net/index_206_2020.htm' },
      { text: { ar: 'قانون الضرائب على الدخل رقم 91 لسنة 2005 و لائحنة التنفيذية', en: 'Income Tax Law No. 91 of 2005', fr: 'Loi sur l’Impôt sur le Revenu n° 91 de 2005', tr: '2005 Tarihli 91 Sayılı Gelir Vergisi Kanunu', ja: '2005年第91号所得税法', zh: '2005年第91号所得税法', ko: '2005년 제91호 소득세법', es: 'Ley del Impuesto sobre la Renta No. 91 de 2005' }, url: 'http://hamdyabdelghany.net/index1_1.htm' },
      { text: { ar: 'قانون الضريبة علي القيمة المضافة رقم 76 لسنة 2016 و لائحتة التنفيذية', en: 'Value Added Tax Law No. 76 of 2016', fr: 'Loi sur la TVA n° 76 de 2016', tr: '2016 Tarihli 76 Sayılı KDV Kanunu', ja: '2016年第76号付加価値税法', zh: '2016年第76号增值税法', ko: '2016년 제76호 부가가치세법', es: 'Ley del Impuesto al Valor Agregado No. 76 de 2016' }, url: 'http://hamdyabdelghany.net/VAT_Index.htm' },
      { text: { ar: 'قانون الدمغة رقم 111 لسنة 1980 ولائحتة التنفيذية', en: 'Stamp Duty Law No. 111 of 1980', fr: 'Loi sur le Droit de Timbre n° 111 de 1980', tr: '1980 Tarihli 111 Sayılı Damga Vergisi Kanunu', ja: '1980年第111号印紙税法', zh: '1980年第111号印花税法', ko: '1980년 제111호 인지세법', es: 'Ley de Impuesto de Timbre No. 111 de 1980' }, url: 'http://hamdyabdelghany.net/111-1980.htm' },
      { text: { ar: 'قانون الضريبة علي العقارات المبينية رقم 196 لسنة 2008 و لائحتة التنفيذية', en: 'Real Estate Tax Law No. 196 of 2008', fr: 'Loi sur la Taxe Foncière n° 196 de 2008', tr: '2008 Tarihli 196 Sayılı Emlak Vergisi Kanunu', ja: '2008年第196号不動産税法', zh: '2008年第196号房地产税法', ko: '2008년 제196호 부동산 세법', es: 'Ley de Impuesto Inmobiliario No. 196 de 2008' }, url: 'http://hamdyabdelghany.net/196_index.htm' },
      { text: { ar: 'القوانين والقرارات المنظمة للإستيراد والتصدير', en: 'Import & Export Regulations', fr: 'Réglementations d’Importation et d’Exportation', tr: 'İthalat ve İhracat Düzenlemeleri', ja: '輸出入規制', zh: '进出口规定', ko: '수출입 규정', es: 'Regulaciones de Importación y Exportación' }, url: 'http://hamdyabdelghany.net/Index_Imp_Exp.htm' },
    ]
  },
  {
    title: {
      ar: 'ثانياً: القرارات الوزارية',
      en: '2. Ministerial Decrees',
      fr: '2. Décrets Ministériels',
      tr: '2. Bakanlık Kararları', ja: '2. 閣僚令', zh: '2. 部长法令', ko: '2. 장관 법령', es: '2. Decretos Ministeriales'
    },
    icon: Landmark,
    links: [
      { text: { ar: 'قرارات خاصة بالارباح الراسمالية', en: 'Capital Gains Decrees', fr: 'Décrets sur les Plus-Values', tr: 'Sermaye Kazançları Kararları', ja: 'キャピタルゲイン法令', zh: '资本利得法令', ko: '자본 이득 법령', es: 'Decretos sobre Ganancias de Capital' }, url: 'https://www.incometax.gov.eg/karar610.asp' },
      { text: { ar: 'قرارات خاصة بالقانون الجديد', en: 'New Law Decrees', fr: 'Décrets d’Application de la Nouvelle Loi', tr: 'Yeni Kanun Uygulama Kararları', ja: '新法令', zh: '新法令', ko: '신규 법령', es: 'Decretos de la Nueva Ley' }, url: 'https://www.incometax.gov.eg/karar91.asp' },
      { text: { ar: 'قرارات متنوعة', en: 'Miscellaneous Decrees', fr: 'Décrets Divers', tr: 'Muhtelif Kararlar', ja: 'その他の法令', zh: '杂项法令', ko: '기타 법령', es: 'Decretos Varios' }, url: 'https://www.incometax.gov.eg/karar-new.asp' },
    ]
  },
  {
    title: {
      ar: 'ثالثاً: مبادئ لجان الطعن الضريبي',
      en: '3. Tax Appeal Principles',
      fr: '3. Principes des Commissions de Recours',
      tr: '3. Vergi İtiraz Komisyonu Kararları', ja: '3. 租税不服申し立ての原則', zh: '3. 税收上诉原则', ko: '3. 조세 불복 원칙', es: '3. Principios de Apelación Fiscal'
    },
    icon: Gavel,
    links: [
      { text: { ar: 'الجزء الأول', en: 'Part 1', fr: 'Partie 1', tr: 'Bölüm 1', ja: 'パート1', zh: '第1部分', ko: '1부', es: 'Parte 1' }, url: 'https://www.incometax.gov.eg/legan.asp' },
      { text: { ar: 'الجزء الثاني', en: 'Part 2', fr: 'Partie 2', tr: 'Bölüm 2', ja: 'パート2', zh: '第2部分', ko: '2부', es: 'Parte 2' }, url: 'https://www.incometax.gov.eg/legan.asp' },
      { text: { ar: 'الجزء الثالث', en: 'Part 3', fr: 'Partie 3', tr: 'Bölüm 3', ja: 'パート3', zh: '第3部分', ko: '3부', es: 'Parte 3' }, url: 'https://www.incometax.gov.eg/legan.asp' },
    ]
  },
  {
    title: {
      ar: 'رابعاً: كتب دورية وتعليمات',
      en: '4. Instructions & Circulars',
      fr: '4. Circulaires & Instructions',
      tr: '4. Genelgeler ve Yönergeler', ja: '4. 指示と通達', zh: '4. 指示与通告', ko: '4. 지침 및 회람', es: '4. Instrucciones y Circulares'
    },
    icon: FileText,
    links: [
      { text: { ar: 'كتب دورية', en: 'Periodic Circulars', fr: 'Circulaires Périodiques', tr: 'Dönemsel Genelgeler', ja: '定期通達', zh: '定期通告', ko: '정기 회람', es: 'Circulares Periódicas' }, url: 'https://www.incometax.gov.eg/kdawry.asp' },
      { text: { ar: 'جميع التعليمات التنفيذية لفحص جميع الأنشطة', en: 'Executive Instructions for Examining Activities', fr: 'Instructions Exécutives de Contrôle des Activités', tr: 'Faaliyet İnceleme Uygulama Talimatları', ja: '活動審査に関する執行指示', zh: '关于审查活动的执行指示', ko: '활동 심사에 관한 집행 지침', es: 'Instrucciones Ejecutivas para el Examen de Actividades' }, url: 'https://www.incometax.gov.eg/pand-y.asp' },
      { text: { ar: 'التعليمات التنفيذية للانشطة التي تم عمل اتفاقيات لها', en: 'Executive Instructions for Agreements', fr: 'Instructions Exécutives pour Accords', tr: 'Anlaşmalı Faaliyetler Uygulama Talimatları', ja: '合意に関する執行指示', zh: '关于协议的执行指示', ko: '합의에 관한 집행 지침', es: 'Instrucciones Ejecutivas para Acuerdos' }, url: 'https://www.incometax.gov.eg/btreaties.asp' },
    ]
  }
];

const LAWS_UI_TEXT: Record<LangType, { back: string; title: string; subtitle: string }> = {
  ar: {
    back: 'العودة للرئيسية',
    title: 'المكتبة والتشريعات الضريبية',
    subtitle: 'مجموعة شاملة من القوانين والقرارات الوزارية والتعليمات التنفيذية المنظمة للعمل المالي والضريبي في مصر.'
  },
  en: {
    back: 'Back to Home',
    title: 'Egyptian Legal & Tax Library',
    subtitle: 'A comprehensive collection of laws, ministerial decrees, and executive instructions regulating financial and tax work in Egypt.'
  },
  fr: {
    back: 'Retour à l’Accueil',
    title: 'Bibliothèque Juridique & Fiscale',
    subtitle: 'Recueil officiel complet des lois, décrets ministériels et instructions fiscales régissant l’activité financière en Égypte.'
  },
  tr: {
    back: 'Ana Sayfaya Dön',
    title: 'Mısır Hukuk ve Vergi Mevzuatı',
    subtitle: 'Mısır’daki mali ve vergi faaliyetlerini düzenleyen kanunlar, bakanlık kararları ve uygulama genelgeleri.'
  },
  ja: {
    back: 'ホームに戻る',
    title: 'エジプトの法的および税務ライブラリ',
    subtitle: 'エジプトの財務および税務作業を規制する法律、閣僚令、および執行指示の包括的なコレクション。'
  },
  zh: {
    back: '返回首页',
    title: '埃及法律与税务图书馆',
    subtitle: '规范埃及财务和税务工作的法律、部长法令和执行指示的综合集合。'
  },
  ko: {
    back: '홈으로 돌아가기',
    title: '이집트 법률 및 세무 라이브러리',
    subtitle: '이집트의 재무 및 세무 업무를 규제하는 법률, 장관 법령 및 집행 지침의 포괄적인 모음입니다.'
  },
  es: {
    back: 'Volver a Inicio',
    title: 'Biblioteca Legal y Fiscal Egipcia',
    subtitle: 'Una colección completa de leyes, decretos ministeriales e instrucciones ejecutivas que regulan el trabajo financiero y fiscal en Egipto.'
  }
};

export default function Laws({ isRtl = false, lang = 'ar', setView }: LawsProps) {
  const IconBack = isRtl ? ArrowRight : ArrowLeft;
  const t = LAWS_UI_TEXT[lang] || LAWS_UI_TEXT.en;

  return (
    <div className={`min-h-screen bg-[#F5F5F5] ${isRtl ? 'rtl' : 'ltr'} flex flex-col justify-between`} dir={isRtl ? 'rtl' : 'ltr'}>
      <div>
        {/* Navigation Bar */}
        <nav className="fixed w-full z-50 bg-[#F5F5F5]/80 backdrop-blur-md border-b border-black/5 transition-all duration-300">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <button 
              onClick={() => setView('home')}
              className="group flex items-center gap-3 text-black hover:text-black/70 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                <IconBack className="w-5 h-5" />
              </div>
              <span className="font-semibold text-sm sm:text-base">
                {t.back}
              </span>
            </button>
          </div>
        </nav>

        <div className="max-w-5xl mx-auto px-6 pt-28 pb-24">
          {/* Header */}
          <div className="text-center mb-14">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-black text-white mb-5 shadow-xl">
              <BookOpen className="w-8 h-8 text-amber-400" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight text-black">
              {t.title}
            </h1>
            <p className="text-sm md:text-base text-black/60 max-w-2xl mx-auto leading-relaxed font-normal">
              {t.subtitle}
            </p>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {LAWS_DATA.map((section, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-black/5 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-11 h-11 rounded-xl bg-black/5 flex items-center justify-center text-black">
                    <section.icon className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl font-bold text-black">
                    {(section.title as Record<string, string>)[lang] || section.title.ar || section.title.en}
                  </h2>
                </div>

                <div className="space-y-3">
                  {section.links.map((link, lIdx) => (
                    <a
                      key={lIdx}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between p-3.5 rounded-xl hover:bg-neutral-50 border border-black/5 transition-all duration-200"
                    >
                      <span className="text-xs sm:text-sm font-medium text-black/80 group-hover:text-black leading-relaxed">
                        {(link.text as Record<string, string>)[lang] || link.text.ar || link.text.en}
                      </span>
                      <ExternalLink className="w-4 h-4 text-black/30 group-hover:text-black transition-colors shrink-0 ml-2 rtl:ml-0 rtl:mr-2" />
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer isRtl={isRtl} lang={lang} setView={setView} />
    </div>
  );
}
