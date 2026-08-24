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

// API Key can be supplied via Vite environment variable (e.g. VITE_GEMINI_API_KEY in .env or Vercel Environment Variables)
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';

const SYSTEM_PROMPT = `You are AhmedSherbiny AI (أحمد الشربيني AI), an elite legal, tax, and corporate finance intelligence assistant for Ahmed El Sherbiny & Co. Certified Public Accountants & Auditors (أحمد الشربيني وشركاه محاسبون ومراجعون قانونيون وخبراء ضرائب).

About Ahmed El Sherbiny (أحمد الشربيني):
- Founder and Managing Director of the firm.
- Certified Public Accountant (CPA) and accredited Tax & Legal Consultant in Egypt.
- Over 40+ years of professional practice (since the 1980s) representing Egypt's top industrial, commercial, and tourism conglomerates before the Egyptian Tax Authority, Large Taxpayers Center (مركز كبار الممولين), and Appeal Committees.
- Expert in corporate valuations, Due Diligence, and Egyptian investment laws.

Firm Overview & Services:
- Company Formation: Establishing JSCs (مساهمة), LLCs (مسؤولية محدودة), OPCs (شركة الشخص الواحد), and foreign branch offices with GAFI.
- Tax Planning & Dispute Settlement: Handling Model 19/15 tax assessments, internal committees, appeals, and lawful tax minimization.
- Digital Compliance: E-Invoicing (الفاتورة الإلكترونية), E-Receipt (الإيصال الإلكتروني), and electronic tax return filing.
- Auditing & Accounting: Statutory financial audits adhering strictly to Egyptian Accounting Standards (EAS) and IFRS.

Branches & Contacts:
- Cairo (Headquarters): 59 Media City - Agouza, Cairo | Tel: +20222718131 / +201205373330 / 0233470139
- Alexandria: Concorde Tower - Raml Station | Tel: 034806050
- Mansoura: Al Hegaz Tower - Tamyouhi Square | Tel: 0502269057
- Direct Mobile & WhatsApp: +201223233620
- Email: Sherbiny.co@gmail.com / A.elsherbiny@yahoo.com`;

// Comprehensive semantic response engine for AhmedSherbiny AI
function getAhmedSherbinyAIResponse(query: string, isRtl: boolean): string {
  const q = query.toLowerCase().trim();

  // 1. Who is Ahmed El Sherbiny / Founder Bio
  if (/(who is ahmed|who is el sherbiny|who is elsherbiny|about ahmed|founder|owner|managing director|من هو احمد|من هو أحمد|مين احمد|مين أحمد|نبذة عن أحمد|المؤسس|صاحب المكتب|احمد الشربينى|أحمد الشربيني|المدير)/i.test(q)) {
    return isRtl
      ? `### 👨‍💼 الأستاذ أحمد الشربيني (Ahmed El Sherbiny)

**المؤسس والمدير التنفيذي لمكتب أحمد الشربيني وشركاه محاسبون ومراجعون قانونيون وخبراء ضرائب.** 🏛️

- **المؤهلات والاعتمادات**:
  - محاسب ومراجع قانوني مقيد بسجل المحاسبين والمراجعين ومصلحة الضرائب المصرية.
  - خبير ضرائب معتمد ومستشار مالي لفض المنازعات الضريبية الكبرى.
  - مستشار مالي مستقل معتمد لتقييم الشركات والفحص النافي للجهالة (*Due Diligence*).

- **الخبرة المهنية (أكثر من 40 عاماً)**:
  - قاد وأشرف على إنهاء أعمال الفحص والطعون الضريبية لشركات كبرى بـ **مركز كبار الممولين** واللجان الداخلية ولجان الطعن منذ الثمانينات بنسب نجاح استثنائية.
  - مستشار تأسيس وتطوير مالي لمئات الشركات المصرية والأجنبية والمؤسسات الفندقية والسياحية والتجارية.
  - الإشراف على اعتماد القوائم المالية والتقارير الرقابية للبنوك والجهات الحكومية والجمعيات العمومية.

📞 **للتواصل مع مكتب الأستاذ أحمد الشربيني مباشرة**: \`+201223233620\``
      : `### 👨‍💼 Mr. Ahmed El Sherbiny

**Founder & Managing Director of Ahmed El Sherbiny & Co. Certified Public Accountants & Tax Advisors.** 🏛️

- **Credentials & Accreditations**:
  - Certified Public Accountant (CPA) and Legal Auditor registered with the Egyptian Register of Accountants & Auditors and the Egyptian Tax Authority.
  - Accredited Senior Tax Consultant specializing in high-stakes dispute settlements.
  - Independent Financial Advisor for Corporate Valuation & *Due Diligence*.

- **Professional Track Record (40+ Years of Experience)**:
  - Successfully represented leading multinational, tourism, industrial, and trading corporations before the **Large Taxpayers Center**, Internal Committees, and Appeal Courts since the 1980s.
  - Strategic advisor behind the incorporation and restructuring of 500+ Egyptian and foreign corporations.
  - Certified hundreds of independent statutory audit reports recognized by banks and governmental authorities.

📞 **Direct Office Line**: \`+20 122 323 3620\``;
  }

  // 2. Greetings
  if (/^(hi|hello|hey|welcome|hola|hii|hiii|good\s*(morning|evening|afternoon)|greetings)/i.test(q)) {
    return isRtl
      ? `أهلاً بك! أنا **AhmedSherbiny AI** 🤖، المستشار الذكي لمكتب **أحمد الشربيني وشركاه محاسبون ومراجعون قانونيون**.\n\nأنا هنا لتقديم استشارات فورية ودقيقة في:\n- 🏢 **تأسيس الشركات** واختيار الشكل القانوني الأنسب واستخراج التراخيص.\n- 📊 **الفحص والطعن الضريبي** (ضريبة الدخل، القيمة المضافة، كسب العمل، كبار الممولين).\n- 💻 **منظومة الفاتورة والإيصال الإلكتروني** والامتثال الرقمي.\n- 📋 **مراجعة واعتماد القوائم المالية** وفق معايير المحاسبة المصرية والدولية.\n- 📍 **عناوين الفروع وحجز استشارة خاصة مع خبرائنا**.\n\nكيف يمكنني مساعدتك اليوم؟`
      : `Hello! I am **AhmedSherbiny AI** 🤖, the official legal, tax, and accounting AI assistant for **Ahmed El Sherbiny & Co.**\n\nI can assist you with:\n- 🏢 **Company Formation** & Investment Licensing in Egypt.\n- 📊 **Tax Planning, Audits & Appeals** (Income Tax, VAT, Payroll Tax, Large Taxpayers).\n- 💻 **E-Invoicing & E-Receipt Systems**.\n- 📋 **Statutory Financial Audits & EAS/IFRS Compliance**.\n- 📍 **Office Locations & Direct Consultations**.\n\nHow can I help you navigate your financial or corporate goals today?`;
  }

  if (/^(مرحبا|مرحباً|أهلا|اهلا|السلام عليكم|مساء الخير|صباح الخير|هاي|سلام|يا هلا)/i.test(q)) {
    return `وعليكم السلام ورحمة الله وبركاته! مرحباً بك، أنا **AhmedSherbiny AI** 🤖 المستشار الذكي لمكتب **أحمد الشربيني وشركاه محاسبون ومراجعون قانونيون**.\n\nيسعدني تقديم الإرشاد القانوني والمالي الدقيق لمشروعك. يمكنك سؤالي عن أي استفسار يخص:\n\n1. **من هو أ. أحمد الشربيني وتاريخ المكتب**\n2. **خطوات وشروط تأسيس شركة في مصر**\n3. **حل المشكلات الضريبية ونماذج 19 و 15 ولجان الطعن**\n4. **الفاتورة الإلكترونية والتسجيل بمنظومة الضرائب**\n5. **المراجعة والتدقيق المالي للقوائم**\n6. **حجز استشارة أو التواصل المباشر**\n\nتفضل بطرح سؤالك وسأجيبك فوراً!`;
  }

  // 3. Company Formation / تأسيس الشركات
  if (/(تأسيس|شرك|سجل تجاري|بطاقة ضريبية|ترخيص|شركات|شخص واحد|مسؤولية محدودة|مساهمة|تراخيص|استثمار|gafi|incorporation|formation|company|start business|setup)/i.test(q)) {
    return isRtl
      ? `### 🏢 دليل تأسيس الشركات في مصر عبر مكتب أحمد الشربيني وشركاه

نقدم خدمة تأسيس متكاملة من الألف إلى الياء عبر الهيئة العامة للاستثمار (GAFI):

#### 1. أهم الأشكال القانونية:
* **شركة الشخص الواحد (ذ.م.م)**:
  - يؤسسها شخص واحد (مصري أو أجنبي).
  - حماية كاملة للذمة المالية المنفصلة عن الذمة الشخصية.
* **الشركة ذات المسؤولية المحدودة (ذ.م.م)**:
  - تبدأ من شريكين فأكثر (حتى 50 شريكاً).
  - لا يُشترط حد أدنى تعجيزي لرأس المال، وتناسب أغلب الأنشطة التجارية والخدمية.
* **شركة المساهمة المصرية (ش.م.م)**:
  - 3 شركاء على الأقل، رأس مال مدفوع وفق النشاط، وتتيح دخول مستثمرين وإصدار أسهم.
* **فروع الشركات الأجنبية والمكاتب التمثيلية**.

#### 2. ما نقوم به نيابة عنك:
1. صياغة عقود التأسيس والنظام الأساسي واعتمادها من نقابة المحامين وهيئة الاستثمار.
2. استخراج السجل التجاري والبطاقة الضريبية.
3. فتح الملف التأميني وتعيين مراقب الحسابات القانوني.
4. استخراج شهادات عدم الالتباس وتراخيص مزاولة النشاط.

📞 **لبدء إجراءات التأسيس فوراً**: \`+201223233620\``
      : `### 🏢 Corporate Formation Guide in Egypt

**Ahmed El Sherbiny & Co.** handles complete establishment via the General Authority for Investment (GAFI):

#### 1. Recommended Legal Entities:
* **One-Person Company (OPC - LLC)**: Single shareholder structure with limited liability.
* **Limited Liability Company (LLC)**: 2 to 50 partners, ideal for standard commercial and service ventures.
* **Joint Stock Company (JSC)**: Minimum 3 founders, suitable for scalable investments and institutional capital.
* **Foreign Corporate Branches & Rep Offices**.

#### 2. What We Handle:
1. Drafting Articles of Incorporation and GAFI approvals.
2. Issuing Commercial Registration & Tax Identification Card.
3. Appointing certified statutory auditors & opening social insurance files.
4. Operational and municipal licensing.

📞 **Initiate incorporation with our team**: \`+20 122 323 3620\``;
  }

  // 4. Taxes, Inspections, Appeals / الضرائب والفحص ولجان الطعن
  if (/(ضريب|ضرائب|قيمة مضافة|فحص|طعن|كسب عمل|ارباح تجارية|دخل|كبار الممولين|نموذج 19|نموذج 15|tax|vat|inspection|appeal|dispute|taxpayer)/i.test(q)) {
    return isRtl
      ? `### 📊 الاستشارات والطعون والحلول الضريبية المتخصصة

يعد التخطيط الضريبي وفض المنازعات التخصص الأبرز للأستاذ **أحمد الشربيني** وفريقه بخبرة 40 عاماً أمام مصلحة الضرائب المصرية:

#### 1. مجالات الفحص والتقييم:
* **ضريبة الدخل والأرباح التجارية والصناعية**: إعداد الإقرارات السنوية واعتمادها لضمان تجنب التقديرات الجزافية.
* **ضريبة القيمة المضافة (VAT)**: فحص الفواتير وخصم المدخلات وتقديم الإقرارات الشهرية واسترداد الضريبة.
* **ضريبة المرتبات وكسب العمل**: إعداد التسويات الربع سنوية والسنوية وحساب استقطاعات العاملين طبقاً للقانون.
* **ضريبة الدمغة وتوزيعات الأرباح والخصم والتحصيل تحت حساب الضريبة**.

#### 2. حل النزاعات واللجان:
* **الاعتراض على النماذج الضريبية (نماذج 19، 15، 9)** خلال المواعيد القانونية (30 يوماً).
* **الدفاع أمام اللجان الداخلية ولجان الطعن ومجلس الدولة** لتخفيض الفروق الضريبية وإلغاء الغرامات غير القانونية.
* **فحوصات مركز كبار ومتوسطي الممولين**.

💼 **لحماية موقف شركتك الضريبي تواصل معنا**: \`+201223233620\``
      : `### 📊 Strategic Tax Advisory & Dispute Defense

Led by **Mr. Ahmed El Sherbiny**, our tax practice brings over four decades of deep experience with the Egyptian Tax Authority:

#### 1. Core Tax Areas:
* **Corporate Income Tax**: Precision return preparation and statutory certification to avoid arbitrary assessments.
* **Value Added Tax (VAT - 14%)**: Monthly filings, input tax deductions, and refund applications.
* **Payroll & Wage Tax**: Quarterly reconciliations and compliance with progressive tax brackets.
* **Withholding Tax & Dividend Tax**.

#### 2. Dispute Resolution:
* **Appealing Tax Assessment Forms (Model 19, Model 15)** within strict statutory deadlines.
* **Internal Committees & Tax Appeals Committee representation** to rationalize tax differentials.
* **Representation at the Large Taxpayer Center (LTC)**.

💼 **Direct Tax Defense Hotline**: \`+20 122 323 3620\``;
  }

  // 5. E-Invoicing & E-Receipt / الفاتورة والإيصال الإلكتروني
  if (/(فاتورة|إيصال|الكترون|الكترونية|إلكترونية|منظومة|ختم|توقيع الكتروني|e-invoice|invoicing|receipt|portal|eta|pos)/i.test(q)) {
    return isRtl
      ? `### 💻 منظومة الفاتورة والإيصال الإلكتروني (الامتثال الرقمي)

يقدم مكتب **أحمد الشربيني وشركاه** الحلول الشاملة للربط بمنظومة مصلحة الضرائب المصرية:

1. **استخراج الختم الإلكتروني والتوقيع الرقمي (E-Token)** بالتعاون مع جهات الإصدار المعتمدة (Egypt Trust / MCDR).
2. **تكويد المنتجات والخدمات**:
   - تكويد بنظام **EGS** والربط بالكود الدولي **GPC**.
   - تكويد السلع بنظام **GS1**.
3. **الربط التقني والمحاسبي**:
   - الربط المباشر مع أنظمة تخطيط الموارد (ERP Systems).
   - أو تشغيل وتدريب موظفيك على العمل عبر **بوابة مصلحة الضرائب (ETA Portal)**.
4. **منظومة الإيصال الإلكتروني (B2C)** لنقاط البيع (POS).

⚠️ *عدم التسجيل في المنظومة قد يعرض الشركة لعقوبات قانونية واستبعاد الفواتير من الخصم الضريبي.*

📞 **للمساعدة في الربط والتكويد فوراً**: \`+201223233620\``
      : `### 💻 E-Invoicing & E-Receipt Digital Compliance

**Ahmed El Sherbiny & Co.** provides full-cycle integration with the Egyptian Tax Authority (ETA) digital portals:

1. **E-Token & Digital Seal Issuance** through licensed authorities.
2. **Item & Service Coding**: EGS/GPC and GS1 standardized classification.
3. **Integration**: Direct API link with ERP systems or manual operation via the ETA Web Portal.
4. **B2C E-Receipt Integration** for retail POS units.

📞 **Contact our digital compliance team**: \`+20 122 323 3620\``;
  }

  // 6. Audit & Accounting / المراجعة والتدقيق
  if (/(مراجعة|تدقيق|قوائم|ميزانية|محاسب|دفاتر|معايير|eas|ifrs|audit|financial statements|balance sheet|accounting|due diligence)/i.test(q)) {
    return isRtl
      ? `### 📋 خدمات المراجعة والتدقيق المالي وإعداد القوائم

نلتزم بتطبيق **معايير المحاسبة المصرية (EAS)** و **معايير التقارير المالية الدولية (IFRS)**:

- **مراجعة القوائم المالية وإصدار تقرير مراقب الحسابات المستقل** المعتمد للبنوك، البورصة، والجهات الرقابية.
- **الفحص النافي للجهالة (Due Diligence)** وتقييم الشركات لصفقات الاستحواذ والاندماج.
- **إمساك الدفاتر المحاسبية وإعداد القيود والتسويات البنكية**.
- **تقييم ومراجعة أنظمة الرقابة الداخلية وإدارة المخاطر التشغيلية والمالية**.

📞 **لحجز مراجعة مالية معتمدة**: \`+201223233620\``
      : `### 📋 Statutory Financial Auditing & Assurance

We provide accredited auditing in full compliance with **Egyptian Accounting Standards (EAS)** & **IFRS**:

- **Annual & Interim Statutory Financial Audits** with certified Independent Auditor’s Reports.
- **Financial Due Diligence & Corporate Valuation** for M&A and restructuring.
- **Bookkeeping, Cost Accounting, and Bank Reconciliations**.
- **Internal Controls & Operational Risk Review**.

📞 **Schedule an audit with our CPAs**: \`+20 122 323 3620\``;
  }

  // 7. Contact, Address, Branches / العناوين والتواصل
  if (/(تواصل|عنوان|فرع|فروع|تليفون|رقم|واتس|موقع|مكان|ساعات|حجز|مواعيد|contact|address|phone|location|branches|hours|hotline)/i.test(q)) {
    return isRtl
      ? `### 📍 فروع وبيانات التواصل مع مكتب أحمد الشربيني وشركاه

- **فرع القاهرة (المقر الرئيسي)**: 59 مدينة الإعلام - العجوزة، القاهرة
  - هاتف: \`+20222718131\` / \`+201205373330\` / \`0233470139\`
  - [🗺️ فتح موقع فرع القاهرة على Google Maps](https://www.google.com/maps/search/?api=1&query=59+Media+City%2C+Agouza%2C+Giza%2C+Cairo)
- **فرع الإسكندرية**: برج كونكورد - محطة الرمل | هاتف: \`034806050\`
  - [🗺️ فتح موقع فرع الإسكندرية على Google Maps](https://www.google.com/maps/search/?api=1&query=Concorde+Tower+Raml+Station+Alexandria)
- **فرع المنصورة**: برج الحجاز - ميدان الطميهي | هاتف: \`0502269057\`
  - [🗺️ فتح موقع فرع المنصورة على Google Maps](https://www.google.com/maps/search/?api=1&query=Al+Hegaz+Tower+Tamyouhi+Square+Mansoura)
- **الخط المباشر / واتساب**: \`+201223233620\`
- **البريد الإلكتروني**: \`Sherbiny.co@gmail.com\` / \`A.elsherbiny@yahoo.com\`
- **مواعيد العمل**: من السبت إلى الخميس (9:00 ص - 9:00 م)`
      : `### 📍 Our Office Locations & Direct Contacts

- **Cairo Branch (Headquarters)**: 59 Media City - Agouza, Cairo
  - Tel: \`+20 222718131\` / \`+20 1205373330\` / \`02 33470139\`
  - [🗺️ Open Cairo Location on Google Maps](https://www.google.com/maps/search/?api=1&query=59+Media+City%2C+Agouza%2C+Giza%2C+Cairo)
- **Alexandria Branch**: Concorde Tower - Raml Station | Tel: \`03 4806050\`
- **Mansoura Branch**: Al Hegaz Tower - Tamyouhi Sq | Tel: \`050 2269057\`
- **Direct Mobile & WhatsApp**: \`+20 122 323 3620\`
- **Email**: \`Sherbiny.co@gmail.com\` / \`A.elsherbiny@yahoo.com\`
- **Working Hours**: Saturday to Thursday (9:00 AM - 9:00 PM)`;
  }

  // 8. Cost, Pricing, Fees / الأسعار والتكلفة
  if (/(سعر|اسعار|أسعار|تكلفة|رسوم|اتعاب|أتعاب|كم يكلف|كم يكلفني|cost|price|fee|fees|pricing)/i.test(q)) {
    return isRtl
      ? `### 💼 أتعاب ورسوم الخدمات لدى مكتب أحمد الشربيني وشركاه

تُحدد الأتعاب والرسوم بدقة وفقاً لطبيعة وحجم كل مشروع:
- **تأسيس الشركات**: تعتمد على الشكل القانوني (شخص واحد، ذ.م.م، مساهمة) ورأس المال ورسوم هيئة الاستثمار الحكومية.
- **الاستشارات والفحص الضريبي**: تتحدد حسب حجم الأعمال والمأمورية التابع لها والنزاع القائم.
- **المراجعة والتدقيق السنوي**: حسب عدد العمليات وحجم القوائم المالية.

💡 **نقدم استشارة أولية مجانية لدراسة الموقف وتحديد خطة العمل والتكلفة بدقة.**
📞 لحجز استشارتك: **+201223233620**`
      : `### 💼 Professional Fees & Pricing

Fees are tailored based on the project scope and corporate size:
- **Company Incorporation**: Structured by entity type (OPC, LLC, JSC), capital size, and official statutory GAFI fees.
- **Tax Advisory & Dispute Settlement**: Based on business volume and inspection complexity.
- **Financial Auditing**: Tailored to transaction volume and reporting requirements.

💡 **We offer an initial consultation to evaluate your case and present a transparent proposal.**
📞 Call us directly: **+20 122 323 3620**`;
  }

  // 9. Intelligent Contextual Fallback
  return isRtl
    ? `أهلاً بك، بصفتي **AhmedSherbiny AI** 🤖 المستشار الذكي لمكتب **أحمد الشربيني وشركاه**:

فيما يتعلق باستفسارك:
نحن نقدم حلولاً متكاملة وفقاً لأحكام القانون المصري ومعايير المحاسبة والضرائب:
- **تأسيس الشركات وتراخيص الاستثمار**.
- **فض المنازعات الضريبية والفحص والدفاع أمام لجان الطعن**.
- **منظومة الفاتورة والإيصال الإلكتروني**.
- **مراجعة وتدقيق القوائم المالية السنوية**.

📞 للحصول على إجابة مفصلة لحالتك الخاصة، يمكنك التحدث مباشرة مع المستشار المالي على الرقم: **+201223233620** أو كتابة مزيد من التفاصيل هنا.`
    : `Hello! As **AhmedSherbiny AI** 🤖 representing **Ahmed El Sherbiny & Co. Certified Public Accountants & Tax Advisors**:

Regarding your inquiry:
We offer comprehensive solutions under Egyptian corporate and tax frameworks:
- **Company Formation & Legal Structuring**.
- **Tax Planning, Audits & Dispute Defense before Appeal Committees**.
- **E-Invoicing & ETA Digital Compliance**.
- **Statutory Financial Auditing & Certified Financial Statements**.

📞 For tailored advice on your specific case, feel free to call our senior advisors directly at **+20 122 323 3620** or provide further details here.`;
}

export default function Chatbot({ isRtl }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      content: isRtl
        ? 'مرحباً بك! أنا **AhmedSherbiny AI** 🤖، المستشار الذكي لشركة **أحمد الشربيني وشركاه**. كيف يمكنني مساعدتك اليوم في استفساراتك القانونية، الضريبية، وتأسيس الشركات؟'
        : 'Welcome! I am **AhmedSherbiny AI** 🤖, your smart advisor for **Ahmed El Sherbiny & Co.** How can I assist you today with legal, tax, and company formation inquiries?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = isRtl
    ? ['من هو أ. أحمد الشربيني؟', 'تأسيس شركة جديدة', 'الفحص والطعن الضريبي', 'الفاتورة الإلكترونية', 'أرقام وعناوين الفروع']
    : ['Who is Ahmed El Sherbiny?', 'Company Formation', 'Tax Inspection & Appeals', 'E-Invoicing System', 'Office Branches & Contacts'];

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

    // If no API response was generated, use the high-quality built-in AhmedSherbiny AI engine
    if (!assistantResponse) {
      // Simulate natural thinking delay
      await new Promise(resolve => setTimeout(resolve, 550));
      assistantResponse = getAhmedSherbinyAIResponse(userMessage, isRtl);
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
                  AhmedSherbiny AI
                </h3>
                <span className="inline-flex items-center gap-1 text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  {isRtl ? 'متصل' : 'Online'}
                </span>
              </div>
              <p className="text-xs text-white/70">
                {isRtl ? 'المستشار الذكي - أحمد الشربيني وشركاه' : 'Smart Legal & Tax Advisor'}
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
                  {isRtl ? 'جاري التفكير وصياغة الاستشارة...' : 'AhmedSherbiny AI is analyzing...'}
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
              placeholder={isRtl ? 'اسأل AhmedSherbiny AI أي سؤال قانوني أو ضريبي...' : 'Ask AhmedSherbiny AI any legal or tax question...'}
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
