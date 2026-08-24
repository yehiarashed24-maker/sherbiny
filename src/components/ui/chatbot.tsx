import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, Loader2, Sparkles, PhoneCall } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface ChatbotProps {
  isRtl: boolean;
}

type Message = {
  role: 'user' | 'model';
  content: string;
};

// API Key can be supplied via Vite environment variable (e.g. VITE_GEMINI_API_KEY in .env)
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';

const SYSTEM_PROMPT = `أنت المستشار القانوني والمالي الذكي لمكتب "أحمد الشربيني وشركاه - محاسبون ومراجعون قانونيون وخبراء ضرائب".
تأسس المكتب بخبرة عريقة في جمهورية مصر العربية ويقدم خدمات:
- تأسيس وتعديل كافة أشكال الشركات (مساهمة، ذات مسؤولية محدودة، الشخص الواحد، شركات الأشخاص، الفروع الأجنبية).
- الفحص والتخطيط الضريبي وتسوية المنازعات أمام اللجان الداخلية ولجان الطعن والمحاكم، وتخفيض الفروق الضريبية قانونياً.
- منظومة الفاتورة والإيصال الإلكتروني وتقديم الإقرارات الضريبية الرقمية.
- المراجعة والتدقيق المالي وتجهيز واعتماد القوائم المالية وفقاً لمعايير المحاسبة المصرية والدولية.
- دراسات الجدوى والتقييم والفحص النافي للجهالة (Due Diligence).

بيانات التواصل والفروع:
- فرع القاهرة (المقر الرئيسي): 59 مدينة الإعلام - العجوزة، القاهرة | هاتف: +20222718131 / +201205373330 / 0233470139
- فرع الإسكندرية: برج كونكورد - محطة الرمل | هاتف: 034806050
- فرع المنصورة: برج الحجاز - ميدان الطميهي | هاتف: 0502269057
- الخط المباشر / واتساب: +201223233620
- البريد الإلكتروني: Sherbiny.co@gmail.com / A.elsherbiny@yahoo.com

أجب دائماً باحترافية وبشكل مهذب ومباشر. استخدم تنسيق Markdown لتنسيق النقاط والعناوين بوضوح.`;

// Intelligent knowledge base fallback for legal & tax consultations
function getKnowledgeBaseResponse(query: string, isRtl: boolean): string {
  const q = query.toLowerCase().trim();

  // Greetings
  if (/^(hi|hello|hey|welcome|hola|hii|hiii|good\s*(morning|evening|afternoon))/i.test(q)) {
    return isRtl
      ? `أهلاً بك في مكتب **أحمد الشربيني وشركاه** لمحاسبة ومراجعة الشركات والاستشارات الضريبية. 🏛️\n\nكيف يمكنني مساعدتك اليوم؟ يمكنك سؤالي عن:\n- **تأسيس الشركات** وشروطها وإجراءاتها في مصر.\n- **الفحص والتخطيط الضريبي** (ضريبة الدخل، القيمة المضافة، كسب العمل).\n- **الفاتورة والإيصال الإلكتروني**.\n- **المراجعة واعتماد القوائم المالية**.\n- **حجز استشارة أو عناوين الفروع**.`
      : `Hello and welcome to **Ahmed El Sherbiny & Co.** Certified Public Accountants & Tax Consultants. 🏛️\n\nHow can we assist you today? You can inquire about:\n- **Company Formation** & Licensing in Egypt.\n- **Tax Planning & Inspections** (Income Tax, VAT, Payroll Tax).\n- **E-Invoicing & Digital Compliance**.\n- **Financial Auditing & Review**.\n- **Consultations & Office Locations**.`;
  }

  if (/^(مرحبا|مرحباً|أهلا|اهلا|السلام عليكم|مساء الخير|صباح الخير|هاي|سلام)/i.test(q)) {
    return `وعليكم السلام ورحمة الله وبركاته! أهلاً بك في **مكتب أحمد الشربيني وشركاه** للمحاسبة والمراجعة والاستشارات الضريبية القانونية. ⚖️\n\nيسعدنا تقديم المشورة القانونية والمالية لمشروعك. بم يمكننا مساعدتك اليوم؟\n\n1. **تأسيس الشركات** (مساهمة / ذات مسؤولية محدودة / فرد واحد)\n2. **الاستشارات الضريبية** وإنهاء الفحوصات ولجان الطعن\n3. **الفاتورة والإيصال الإلكتروني**\n4. **مراجعة وتدقيق القوائم المالية**\n5. **التواصل مع خبرائنا مباشرة**`;
  }

  // Company formation / تأسيس شركات
  if (/(تأسيس|شرك|سجل تجاري|بطاقة ضريبية|ترخيص|شركات|شخص واحد|مسؤولية محدودة|مساهمة|incorporation|formation|company|start business)/i.test(q)) {
    return isRtl
      ? `### 🏢 خدمات تأسيس وتعديل الشركات في مصر\n\nيقوم مكتب **أحمد الشربيني وشركاه** بإنهاء إجراءات تأسيس كافة الأشكال القانونية في أسرع وقت:\n\n1. **شركة الشخص الواحد (ذ.م.م)**: مناسبة للمستثمر الفردي مع حماية ذمته المالية.\n2. **الشركة ذات المسؤولية المحدودة**: من أكثر الأشكال انتشاراً (شريكان على الأقل).\n3. **شركة المساهمة (ش.م.م)**: للمشاريع الكبيرة وجذب رؤوس الأموال.\n4. **الفروع والمكاتب التمثيلية الأجنبية**.\n\n**الخدمات المشمولة:**\n- استخراج السجل التجاري والبطاقة الضريبية.\n- فتح الملف التأميني وتراخيص مزاولة النشاط.\n- إعداد العقود والنظام الأساسي واعتمادها من الهيئة العامة للاستثمار (GAFI).\n\n📞 لحجز موعد لبدء إجراءات التأسيس: **01223233620**`
      : `### 🏢 Corporate Incorporation Services in Egypt\n\n**Ahmed El Sherbiny & Co.** handles complete establishment and licensing across all legal structures:\n\n1. **One-Person Company (LLC)**: Full corporate protection for solo entrepreneurs.\n2. **Limited Liability Company (LLC)**: Flexible structure for partners.\n3. **Joint Stock Company (JSC)**: Ideal for scale and institutional capital.\n4. **Foreign Branches & Representative Offices**.\n\n**Included Services:**\n- Commercial Registration & Tax Card issuance.\n- Social insurance opening and operational licensing.\n- Drafting Articles of Association approved by GAFI.\n\n📞 Call our corporate team directly: **+20 122 323 3620**`;
  }

  // Taxes / الضرائب
  if (/(ضريب|ضرائب|قيمة مضافة|فحص|طعن|كسب عمل|ارباح تجارية|دخل|tax|vat|inspection|appeal)/i.test(q)) {
    return isRtl
      ? `### 📊 الاستشارات والتخطيط الضريبي وفض المنازعات\n\nنمتلك خبرة تتجاوز عقوداً في التعامل مع مصلحة الضرائب المصرية ومراكز كبار ومتوسطي الممولين:\n\n- **الفحص الضريبي الشامل**: تمثيل الشركة أمام مأموريات الضرائب وتجهيز الدفاتر والمستندات القانونية.\n- **لجان الطعن واللجان الداخلية**: الدفاع القانوني والاعتراض على نماذج (19، 15، 9) لترشيد وتخفيض الفروق الضريبية.\n- **ضريبة القيمة المضافة (VAT)**: تقديم الإقرارات الشهرية والخصم والرد الضريبي.\n- **ضريبة المرتبات وكسب العمل**: إعداد وحساب التسويات الضريبية الربع سنوية والسنوية بدقة.\n- **ضريبة الأرباح التجارية والصناعية وكبار الممولين**.\n\n💼 نضمن لك حماية مركزك القانوني وترشيد العبء الضريبي بأعلى دقة.`
      : `### 📊 Strategic Tax Advisory & Dispute Resolution\n\nWith extensive experience before the Egyptian Tax Authority and Large Taxpayer Center:\n\n- **Comprehensive Tax Audits & Inspections**: Full representation and documentation.\n- **Internal & Appeals Committees**: Formal appeals against tax assessment models (Models 19, 15, etc.).\n- **Value Added Tax (VAT)**: Monthly filings, input tax deductions, and refunds.\n- **Payroll & Wage Tax**: Quarterly reconciliations and compliance.\n- **Corporate Income Tax Planning**.\n\n💼 Contact our tax specialists: **+20 122 323 3620**`;
  }

  // E-Invoicing / الفاتورة الإلكترونية
  if (/(فاتورة|إيصال|الكترون|الكترونية|إلكترونية|منظومة|e-invoice|invoicing|receipt|portal)/i.test(q)) {
    return isRtl
      ? `### 💻 منظومة الفاتورة والإيصال الإلكتروني\n\nنقدم الدعم الفني والمحاسبي الكامل لربط أعمالكم بالمنظومات الضريبية الرقمية في مصر:\n\n1. **التسجيل واستخراج الختم / التوقيع الإلكتروني** (E-Token).\n2. **تكويد الأصناف والسلع والخدمات** بنظامي (GS1 / EGS) وربطها بالتصنيف الدولي (GPC).\n3. **الربط مع برامج الحسابات (ERP Integration)** أو تفعيل العمل من خلال Portal مصلحة الضرائب.\n4. **إرسال ومتابعة الفواتير والإشعارات الدائنة والمدينة** لتجنب أي غرامات أو استبعاد من الخصم الضريبي.`
      : `### 💻 E-Invoicing & Digital Tax Compliance\n\nWe provide end-to-end integration with the Egyptian Tax Authority digital systems:\n\n1. **Registration & E-Token / Digital Signature Issuance**.\n2. **Item & Service Coding** with GS1 / EGS aligned with GPC standards.\n3. **ERP System Integration** or direct access via ETA Web Portal.\n4. **Issuing, tracking, and validating electronic invoices & credit notes** to prevent penalties.`;
  }

  // Audit & Accounting / المراجعة والمحاسبة
  if (/(مراجعة|تدقيق|قوائم|ميزانية|محاسب|دفاتر|audit|financial statements|balance sheet|accounting)/i.test(q)) {
    return isRtl
      ? `### 📋 خدمات المراجعة والتدقيق المالي وإعداد القوائم\n\nيقدم مكتبنا خدمات تدقيق معتمدة للشركات والمؤسسات:\n\n- **مراجعة وتدقيق القوائم المالية السنوية والدورية** وفقاً لمعايير المحاسبة المصرية (EAS) والدولية (IFRS).\n- **إصدار تقارير مراقب الحسابات المستقل** المعتمدة للبنوك والهيئات الحكومية والجمعيات العمومية.\n- **تقييم ومراجعة نظم الرقابة الداخلية** وإدارة المخاطر المالية.\n- **إمساك الدفاتر المحاسبية المنتظمة** والتسويات البنكية وحسابات التكاليف.`
      : `### 📋 Financial Auditing & Assurance Services\n\nOur certified audit team delivers robust assurance:\n\n- **Annual & Interim Financial Audits** adhering to EAS & IFRS.\n- **Independent Auditor's Reports** certified for banks, shareholders, and government entities.\n- **Internal Controls Review** & operational risk management.\n- **Bookkeeping & Accounting Supervision**.`;
  }

  // Contact / Address / Branches / تواصل
  if (/(تواصل|عنوان|فرع|فروع|تليفون|رقم|واتس|موقع|مكان|ساعات|حجز|contact|address|phone|location|branches|hours)/i.test(q)) {
    return isRtl
      ? `### 📍 فروع وبيانات التواصل مع مكتب أحمد الشربيني وشركاه\n\n- **فرع القاهرة (المقر الرئيسي)**: 59 مدينة الإعلام - العجوزة، القاهرة | هاتف: \`+20222718131\` / \`+201205373330\` / \`0233470139\`\n  - [🗺️ فتح موقع فرع القاهرة على Google Maps](https://www.google.com/maps/search/?api=1&query=59+Media+City%2C+Agouza%2C+Giza%2C+Cairo)\n- **فرع الإسكندرية**: برج كونكورد - محطة الرمل | هاتف: \`034806050\`\n- **فرع المنصورة**: برج الحجاز - ميدان الطميهي | هاتف: \`0502269057\`\n- **الخط المباشر / واتساب**: \`+201223233620\`\n- **البريد الإلكتروني**: \`Sherbiny.co@gmail.com\`\n- **مواعيد العمل**: من السبت إلى الخميس (9:00 ص - 9:00 م)`
      : `### 📍 Our Office Locations & Direct Contacts\n\n- **Cairo Branch (Headquarters)**: 59 Media City - Agouza, Cairo | Tel: \`+20 222718131\` / \`+20 1205373330\` / \`02 33470139\`\n  - [🗺️ Open Cairo Location on Google Maps](https://www.google.com/maps/search/?api=1&query=59+Media+City%2C+Agouza%2C+Giza%2C+Cairo)\n- **Alexandria Branch**: Concorde Tower - Raml Station | Tel: \`03 4806050\`\n- **Mansoura Branch**: Al Hegaz Tower - Tamyouhi Sq | Tel: \`050 2269057\`\n- **Direct Mobile & WhatsApp**: \`+20 122 323 3620\`\n- **Email**: \`Sherbiny.co@gmail.com\`\n- **Working Hours**: Saturday to Thursday (9:00 AM - 9:00 PM)`;
  }

  // Default intelligent response
  return isRtl
    ? `شكراً لتواصلك مع **أحمد الشربيني وشركاه - محاسبون ومراجعون قانونيون**. ⚖️\n\nنحن على أتم الاستعداد لتقديم الاستشارات المتخصصة في مجالات:\n- **تأسيس الشركات** واستخراج السجلات والتراخيص الاستثمارية.\n- **حل المنازعات الضريبية** والتمثيل أمام لجان الفحص والطعن.\n- **الفاتورة الإلكترونية** والإقرارات الضريبية الدورية.\n- **تدقيق القوائم المالية** وإصدار التقارير المحاسبية المعتمدة.\n\n📞 يمكنك التواصل مباشرة مع المستشار المختص على: **+201223233620** أو كتابة استفسارك بالتفصيل وسنقوم بالرد عليك فوراً.`
    : `Thank you for contacting **Ahmed El Sherbiny & Co. Certified Public Accountants & Tax Consultants**. ⚖️\n\nWe provide comprehensive corporate and legal services in Egypt:\n- **Company Formation & Legal Structuring**\n- **Tax Dispute Settlement & Planning**\n- **E-Invoicing & Automated Tax Returns**\n- **Certified Financial Audits & Feasibility Studies**\n\n📞 Feel free to call us directly at **+20 122 323 3620** or share your query details here.`;
}

export default function Chatbot({ isRtl }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      content: isRtl
        ? 'مرحباً بك في **أحمد الشربيني وشركاه**. كيف يمكنني مساعدتك اليوم في استشاراتك القانونية والمالية والضريبية؟'
        : 'Welcome to **Ahmed El Sherbiny & Co.** How can I assist you today with legal, financial, and tax consultations?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = isRtl
    ? ['تأسيس شركة جديدة', 'الفحص والطعن الضريبي', 'الفاتورة الإلكترونية', 'أرقام وعناوين الفروع']
    : ['Company Formation', 'Tax Inspection & Appeals', 'E-Invoicing System', 'Office Branches & Contacts'];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, isLoading]);

  const sendQuery = async (queryText: string) => {
    if (!queryText.trim() || isLoading) return;

    const userMessage = queryText.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    let assistantResponse = '';

    // If a valid Gemini API key is present, try Gemini API first
    if (GEMINI_API_KEY && GEMINI_API_KEY.startsWith('AIzaSy')) {
      try {
        const conversationHistory = messages.slice(1).map(msg => ({
          role: msg.role === 'model' ? 'model' : 'user',
          parts: [{ text: msg.content }]
        }));

        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [
                {
                  role: 'user',
                  parts: [{ text: `${SYSTEM_PROMPT}\n\nسياق المحادثة:\n${JSON.stringify(conversationHistory)}\n\nسؤال العميل: ${userMessage}` }]
                }
              ],
              generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 800
              }
            })
          }
        );

        if (response.ok) {
          const data = await response.json();
          const generatedText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (generatedText) {
            assistantResponse = generatedText;
          }
        }
      } catch (err) {
        console.warn('Gemini API call failed, using built-in knowledge base:', err);
      }
    }

    // If no API response was generated, use the high-quality built-in knowledge base
    if (!assistantResponse) {
      // Simulate natural thinking delay
      await new Promise(resolve => setTimeout(resolve, 500));
      assistantResponse = getKnowledgeBaseResponse(userMessage, isRtl);
    }

    setMessages(prev => [...prev, { role: 'model', content: assistantResponse }]);
    setIsLoading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendQuery(input);
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 ${
          isRtl ? 'left-6' : 'right-6'
        } w-14 h-14 bg-black text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 z-50 group ${
          isOpen ? 'hidden' : ''
        }`}
        aria-label="Open Chat"
      >
        <MessageSquare className="w-6 h-6 group-hover:rotate-12 transition-transform" />
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-500"></span>
        </span>
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-6 ${
          isRtl ? 'left-6' : 'right-6'
        } w-[92vw] max-w-[420px] h-[620px] max-h-[85vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden z-50 transition-all duration-300 origin-bottom border border-black/10 ${
          isOpen ? 'scale-100 opacity-100' : 'scale-75 opacity-0 pointer-events-none'
        }`}
      >
        {/* Header */}
        <div className="bg-neutral-900 text-white p-4 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-500/20 border border-amber-500/40 rounded-full flex items-center justify-center text-amber-400">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base leading-tight">
                  {isRtl ? 'المستشار القانوني الذكي' : 'Legal & Tax Assistant'}
                </h3>
                <span className="inline-flex items-center gap-1 text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  {isRtl ? 'متاح الآن' : 'Online'}
                </span>
              </div>
              <p className="text-xs text-white/70">
                {isRtl ? 'أحمد الشربيني وشركاه' : 'Ahmed El Sherbiny & Co.'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white/70 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 bg-[#F8F9FA] flex flex-col gap-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[88%] rounded-2xl px-4 py-3 shadow-sm text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-neutral-900 text-white rounded-br-sm'
                    : 'bg-white text-neutral-800 rounded-bl-sm border border-black/5 shadow-sm'
                }`}
              >
                {msg.role === 'model' ? (
                  <div className="prose prose-sm rtl:prose-p:text-right rtl:prose-headings:text-right prose-p:leading-relaxed text-neutral-800 space-y-2">
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                ) : (
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm border border-black/5 flex items-center gap-2 text-neutral-600">
                <Loader2 className="w-4 h-4 animate-spin text-amber-600" />
                <span className="text-xs font-medium">
                  {isRtl ? 'جاري تجهيز الاستشارة القانونية...' : 'Preparing legal advice...'}
                </span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-3 py-2 bg-neutral-100/80 border-t border-black/5 flex gap-1.5 overflow-x-auto no-scrollbar">
          {quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => sendQuery(prompt)}
              disabled={isLoading}
              className="text-[11px] whitespace-nowrap bg-white hover:bg-neutral-900 hover:text-white text-neutral-700 font-medium px-3 py-1.5 rounded-full border border-black/10 transition-colors flex items-center gap-1 shadow-2xs"
            >
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span>{prompt}</span>
            </button>
          ))}
        </div>

        {/* Contact Hotline Bar */}
        <div className="px-4 py-1.5 bg-amber-50 border-t border-amber-100 flex items-center justify-between text-xs text-amber-950 font-medium">
          <span className="flex items-center gap-1.5">
            <PhoneCall className="w-3.5 h-3.5 text-amber-600" />
            {isRtl ? 'الخط الساخن للمكتب:' : 'Direct Hotline:'}
          </span>
          <a
            href="tel:+201223233620"
            className="font-bold text-amber-700 hover:underline font-mono"
            dir="ltr"
          >
            +20 122 323 3620
          </a>
        </div>

        {/* Input Area */}
        <div className="p-3 bg-white border-t border-black/5">
          <form onSubmit={handleSubmit} className="flex items-center gap-2 relative">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder={isRtl ? 'اكتب استفسارك هنا...' : 'Type your inquiry here...'}
              className="flex-1 bg-neutral-100 border border-transparent rounded-full px-4 py-2.5 text-sm focus:outline-none focus:border-black/30 focus:bg-white transition-all rtl:text-right"
              dir="auto"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                input.trim() && !isLoading
                  ? 'bg-neutral-900 text-white hover:scale-105 active:scale-95'
                  : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
              }`}
            >
              <Send className={`w-4 h-4 ${isRtl ? 'mr-0.5 rtl:-scale-x-100' : 'ml-0.5'}`} />
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
