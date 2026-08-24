import { ArrowLeft, ArrowRight, MousePointer2 } from 'lucide-react';
import SocialCards from './components/ui/card-fan-carousel';
import Footer from './components/ui/footer';

interface ServicesProps {
  lang: 'en' | 'ar';
  setView: (view: 'home' | 'about' | 'contact' | 'services' | 'laws') => void;
}

const SERVICES_DATA = {
  ar: [
    {
      title: 'المحاسبة والمراجعة',
      content: (
        <div className="space-y-6 text-white/90">
          <div>
            <h4 className="font-bold text-lg text-white mb-2">1- المراجعة الخارجية (External Auditing)</h4>
            <p className="leading-relaxed">
              يقوم فريق عمل مؤهل يتمتع بكفاءة وخبرات متعددة بتنفيذ خدمات المراجعة المالية من خلال تطبيق أساليب المراجعة الحديثة وكذا تطبيق متطلبات معايير المراجعة المصرية والدولية بهدف الإلتزام بالمتطلبات النظامية للقوانين واللوائح السارية والإستجابة لمتطلبات أصحاب حقوق الملكية. وتغطى خدمات المراجعة الخارجية المجالات التالية:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>مراجعة ذات الأغراض العامة وتشمل المراجعة المالية الشاملة للقوائم المالية أو الفحص المحدود للقوائم المالية المرحلية.</li>
              <li>المراجعة ذات الأغراض الخاصة وتشمل تنفيذ إجراءات تحقق متفق عليها لفحص معلومات مالية محددة.</li>
              <li>تنفيذ مهام إختبار المعلومات المالية المستقبلية والتاريخية.</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg text-white mb-2">2- المراجعة الداخلية (Internal Auditing)</h4>
            <p className="leading-relaxed">
              إجراء تقييم لهيكلة وظيفة المراجعة الداخلية وتقديم الحلول المناسبة. نهتم بصورة أساسية بتحديد المخاطر الخاصة بمراحل النشاط المختلفة وما ينتج عنها من تدنى كفاءة الأداء ونعد مقترحات التطوير ونحدد أولويات التنفيذ وفقا لدرجة الأهمية والسرعة المطلوبة.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-lg text-white mb-2">3- مراجعة نظم الرقابة الداخلية (Internal Control)</h4>
            <p className="leading-relaxed">
              إجراء مراجعة شاملة مصممة للحصول علي تأكيدات معقولة بخصوص تحقيق الأهداف الخاصة بكل من: كفاءة وفاعلية العمليات التشغيلية، مصداقية التقارير المالية، ومدي الالتزام بتطبيق القوانين والمتطلبات النظامية.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-lg text-white mb-2">4- مراجعة المخاطر (Risk Audit)</h4>
            <p className="leading-relaxed">
              تقوم بتنفيذ مراجعة المخاطر لمساعدة الإدارة والمراجعين الداخليين للتعرف علي وتقدير حجم المخاطر في الأنظمة المستخدمة مع وضع إطار لمستوي المخاطر المقبولة وتحديد الوظائف ذات المخاطر بطريقة منتظمة.
            </p>
          </div>
        </div>
      )
    },
    {
      title: 'الاستشارات المالية والادارية',
      content: (
        <div className="space-y-6 text-white/90">
          <p className="leading-relaxed font-medium">نقدم خدماتنا الاستشارية من خلال مجموعات عمل متعددة الخبرات والمهارات تتكون من مراجعين ماليين واستشاري ضرائب ومراجعين للبيئة وخبراء في الصناعات المختلفة وذلك لضمان التميز لخدماتنا الاستشارية.</p>
          
          <div>
            <h4 className="font-bold text-lg text-white mb-2">1- استشارات تمويل الشركات</h4>
            <p className="leading-relaxed">
              <strong>الفحص النافي للجهالة (Due Diligence):</strong> الفحص التفصيلي لبيانات الشركة بهدف إجراء التقييم المنهجى للمخاطر والفرص المستقبلية للاستحواذ والإندماج.<br/>
              <strong>تقييم الشركات (Corporate Valuation):</strong> إيجاد قيمة للشركة من خلال التحليل المكثف للنشاط والصناعة واتجاهات النمو.<br/>
              <strong>الاكتتاب العام (Initial Public Offering):</strong> تهدف إلي عرض أسهم الشركة للبيع من خلال الاكتتاب العام للمرة الأولي.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-lg text-white mb-2">2- دراسات الجدوى الاقتصادية (Feasibility Studies)</h4>
            <p className="leading-relaxed">تقدير ربحية المشروع المستقبلية مع التركيز علي عوامل النجاح الرئيسية. يقوم فريق متعدد الخبرات بتنفيذ الدراسة وفحص التشريعات التي تحكم عمل المشروع.</p>
          </div>
          <div>
            <h4 className="font-bold text-lg text-white mb-2">3- بحوث العمليات وخدمات التأسيس</h4>
            <p className="leading-relaxed">دراسات الأسواق وفحص تطوير المنتجات واستقصاءات العملاء. كذلك تنفيذ إجراءات تأسيس الشركات وتصفيتها والقيد فى البورصة.</p>
          </div>
          <div>
            <h4 className="font-bold text-lg text-white mb-2">4- إدارة المخاطر وإعادة الهيكلة</h4>
            <p className="leading-relaxed">نساعد الشركة في تطوير نظام لإدارة المخاطر وتطبيق سلوكيات وأسس جديدة تؤدي إلي تطوير الكفاءة العامة للنشاط، بالإضافة لإتاحة مواردنا كمصدر خارجي (Out Sourcing).</p>
          </div>
        </div>
      )
    },
    {
      title: 'الخدمات الضريبية',
      content: (
        <div className="space-y-4 text-white/90">
          <p className="leading-relaxed">
            لدينا نخبة من الاستشاريين اللذين لديهم معرفة عميقة وواسعة بجميع أنظمة الضرائب المصرية والممارسات المتعلقة بها يقدمون خدماتهم لكل من الشركات المحلية والأجنبية بهدف الوصول إلي الحد الأدني من الأعباء الضريبية.
          </p>
          <ul className="list-disc list-inside space-y-2 mt-4">
            <li>التخطيط الضريبي لمختلف الأوعية الضريبية.</li>
            <li>مراجعة العقود والاتفاقيات التجارية وإبداء الرأي بخصوص الأثر الضريبي المترتب عليها.</li>
            <li>إعداد ومراجعة الإقرارات الضريبة السنوية قبل تقديمها لمصلحة الضرائب.</li>
            <li>المساعدة للإعداد للفحص الضريبي والتواجد خلال أعمال الفحص الميداني.</li>
            <li>حضور اللجان الداخلية نيابة عن العملاء ومناقشة المنازعات الناتجة عن الفحص الضريبي.</li>
            <li>إعداد مذكرة الدفاع الخاصة بلجان الطعن بشأن المنازعات الضريبية بين مصلحة الضرائب والعملاء.</li>
          </ul>
        </div>
      )
    },
    {
      title: 'تأسيس الشركات',
      content: (
        <div className="space-y-4 text-white/90">
          <p className="leading-relaxed">
            مكتب أحمد الشربينى وشركاه يساعدك علي تأسيس شركتك فى جمهورية مصر العربية بمنتهى السرعة.
          </p>
          <p className="leading-relaxed">
            يمكن إنشاء تلك الشركة وفقاً لأحكام القانون رقم 159 لسنة 1981 والمعدل بالقانون رقم 3 لسنة 1998 كما يمكن أنشاؤها طبقاً لقانون الإستثمار الموحد.
          </p>
          <p className="leading-relaxed">
            آخذين في الإعتبار إلغاء الإعفاءات الضريبية الخاصة بذلك القانون. علي أن يكون رأس مالها المصدر بحد أدني 250,000 جنيه يسدد منه 10% عند إنشاء الشركة علي أن يزاد رأس المال ليصل 25% خلال فترة 3 شهور من تاريخ إستخراج السجل التجاري مع ضرورة إستكمال رأس المال إلي 100% خلال خمس سنوات.
          </p>
        </div>
      )
    },
    {
      title: 'الخدمات الألكترونية',
      content: (
        <div className="space-y-4 text-white/90">
          <p className="leading-relaxed font-medium">
            نتولي عنك تقديم الاقرارات الضريبية الكترونيا واستخدام انظمة التخزين السحابية لتحقيق المميزات الاتية:
          </p>
          <ul className="list-disc list-inside space-y-2 mt-2">
            <li>تقليل العبء عليك من خلال تيسير عملية ملئ وتقديم الاقرار وتقديم الاقرار الكترونيا عبر الويب.</li>
            <li>تقديم خدمة فعالة من خلال القدرة على الدخول الى نظامك/سجلك الضريبي الإلكتروني خلال 24 ساعة/365 يوم.</li>
            <li>القدرة على تخزين تعاملات الخصم والتحصيل تحت حساب الضريبة كما يتم تخزين فواتير المشتريات والمبيعات لتطبيق القيمة المضافة.</li>
            <li>سهولة إدارة سجلك الضريبي الإلكتروني بالكامل.</li>
          </ul>
        </div>
      )
    }
  ],
  en: [
    {
      title: 'Accounting and Auditing',
      content: (
        <div className="space-y-6 text-white/90">
          <div>
            <h4 className="font-bold text-lg text-white mb-2">1- External Auditing</h4>
            <p className="leading-relaxed">
              A highly qualified team carries out financial auditing services applying modern auditing methods and Egyptian/International auditing standards. This ensures compliance with regulatory requirements and responds to equity holders' needs.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-lg text-white mb-2">2- Internal Auditing</h4>
            <p className="leading-relaxed">
              Evaluating the structure of the internal audit function and providing appropriate solutions. We identify risks in various activity stages and prepare development proposals.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-lg text-white mb-2">3- Internal Control Audit</h4>
            <p className="leading-relaxed">
              Conducting a comprehensive review to obtain reasonable assurance regarding operational efficiency, financial reporting reliability, and compliance with laws.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-lg text-white mb-2">4- Risk Audit</h4>
            <p className="leading-relaxed">
              Implementing risk audits to help management identify and estimate the volume of risks in used systems, setting a framework for acceptable risk levels.
            </p>
          </div>
        </div>
      )
    },
    {
      title: 'Financial & Administrative Consulting',
      content: (
        <div className="space-y-6 text-white/90">
          <p className="leading-relaxed font-medium">We offer our consulting services through multi-skilled working groups consisting of financial auditors, tax consultants, and industry experts.</p>
          
          <div>
            <h4 className="font-bold text-lg text-white mb-2">1- Corporate Finance Consulting</h4>
            <p className="leading-relaxed">
              <strong>Due Diligence:</strong> Detailed examination for systemic assessment of risks and future opportunities.<br/>
              <strong>Corporate Valuation:</strong> Finding the company's value through intensive activity and industry analysis.<br/>
              <strong>Initial Public Offering (IPO):</strong> Preparing the company for its first public share offering.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-lg text-white mb-2">2- Feasibility Studies</h4>
            <p className="leading-relaxed">Estimating the project's future profitability focusing on key success factors. A multi-expert team examines the legislations governing the project.</p>
          </div>
          <div>
            <h4 className="font-bold text-lg text-white mb-2">3- Market Research & Company Formation</h4>
            <p className="leading-relaxed">Market studies, product development examination, and customer surveys. We also handle company formation, liquidation, and stock exchange listing procedures.</p>
          </div>
          <div>
            <h4 className="font-bold text-lg text-white mb-2">4- Risk Management & Restructuring</h4>
            <p className="leading-relaxed">Helping companies develop risk management systems and apply new behaviors to improve overall efficiency, in addition to providing Out Sourcing services.</p>
          </div>
        </div>
      )
    },
    {
      title: 'Tax Services',
      content: (
        <div className="space-y-4 text-white/90">
          <p className="leading-relaxed">
            Our elite consultants have deep knowledge of all Egyptian tax systems, providing services to both local and foreign companies to achieve minimum tax burdens.
          </p>
          <ul className="list-disc list-inside space-y-2 mt-4">
            <li>Tax planning for various tax bases.</li>
            <li>Reviewing commercial contracts and advising on their tax impact.</li>
            <li>Preparing and reviewing annual tax returns before submission.</li>
            <li>Assistance in preparing for tax inspections and presence during field audits.</li>
            <li>Attending internal committees on behalf of clients.</li>
            <li>Preparing defense memorandums for appeal committees regarding tax disputes.</li>
          </ul>
        </div>
      )
    },
    {
      title: 'Company Formation',
      content: (
        <div className="space-y-4 text-white/90">
          <p className="leading-relaxed">
            Ahmed El Sherbiny & Co. helps you establish your company in the Arab Republic of Egypt swiftly.
          </p>
          <p className="leading-relaxed">
            The company can be established according to the provisions of Law No. 159 of 1981, amended by Law No. 3 of 1998, or the Unified Investment Law.
          </p>
          <p className="leading-relaxed">
            The minimum issued capital is 250,000 EGP, of which 10% is paid upon establishment, increased to 25% within 3 months, and 100% within five years.
          </p>
        </div>
      )
    },
    {
      title: 'E-Services',
      content: (
        <div className="space-y-4 text-white/90">
          <p className="leading-relaxed font-medium">
            We handle the electronic submission of tax returns and utilize cloud storage systems to achieve the following:
          </p>
          <ul className="list-disc list-inside space-y-2 mt-2">
            <li>Reducing your burden by facilitating the process of filling and submitting the return online.</li>
            <li>Providing effective service with 24/7 access to your electronic tax record.</li>
            <li>Ability to store deduction and collection transactions under the tax account, as well as purchase and sales invoices for VAT application.</li>
            <li>Easy management of your entire electronic tax record.</li>
          </ul>
        </div>
      )
    }
  ]
};

const Services = ({ lang, setView }: ServicesProps) => {
  const isRtl = lang === 'ar';
  const services = SERVICES_DATA[lang];
  const BackIcon = isRtl ? ArrowRight : ArrowLeft;

  // Map exactly 5 services to their specific images
  const carouselCards = [
    { 
      imgUrl: '/carousel_5.jpg', 
      title: services[0].title,
      content: services[0].content 
    }, // Accounting (Desk)
    { 
      imgUrl: '/carousel_3.jpg', 
      title: services[1].title,
      content: services[1].content 
    }, // Consulting (Handshake)
    { 
      imgUrl: '/carousel_2.jpg', 
      title: services[2].title,
      content: services[2].content 
    }, // Tax (Charts)
    { 
      imgUrl: '/carousel_1.jpg', 
      title: services[3].title,
      content: services[3].content 
    }, // Company Formation (Office)
    { 
      imgUrl: '/carousel_6.jpg', 
      title: services[4].title,
      content: services[4].content 
    }  // E-Services (Network)
  ];

  return (
    <div className="min-h-screen bg-[#F6F5F2] text-black font-sans selection:bg-black selection:text-white" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between pointer-events-none">
        <div className="max-w-[88rem] mx-auto w-full flex items-center justify-between">
          <button 
            onClick={() => setView('home')} 
            className="pointer-events-auto inline-flex items-center gap-2 bg-white/60 backdrop-blur-md px-5 py-2.5 rounded-full border border-black/5 shadow-sm text-black/70 hover:text-black transition-colors duration-200"
          >
            <BackIcon className="w-5 h-5" />
            <span className="font-medium">{isRtl ? 'العودة' : 'Back'}</span>
          </button>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 pt-32 pb-4">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight" style={{ letterSpacing: '-0.02em' }}>
            {isRtl ? 'خدماتنا المهنية' : 'Our Professional Services'}
          </h1>
          <p className="text-lg md:text-xl text-black/60 max-w-2xl mx-auto leading-relaxed mb-6">
            {isRtl 
              ? 'نقدم مجموعة شاملة من الخدمات المحاسبية والضريبية والاستشارية المصممة لتمكين أعمالك من النمو بأمان وامتثال كامل للتشريعات.'
              : 'We offer a comprehensive suite of accounting, tax, and advisory services designed to empower your business to grow securely and in full compliance with legislation.'}
          </p>
          
          <div className="inline-flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-full text-sm md:text-base font-medium shadow-lg animate-bounce mt-4">
            <MousePointer2 className="w-4 h-4 md:w-5 md:h-5" />
            <span>{isRtl ? 'مرر الماوس فوق أي صورة لقراءة التفاصيل' : 'Hover over any image to read details'}</span>
          </div>
        </div>
      </div>

      {/* Fan Carousel Gallery replaces the accordion entirely */}
      <div className="w-full bg-[#F6F5F2] pt-2 pb-24 overflow-hidden flex justify-center">
        <SocialCards cards={carouselCards} />
      </div>
      <Footer isRtl={isRtl} setView={setView} />
    </div>
  );
};

export default Services;
