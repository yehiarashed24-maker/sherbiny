import React, { useState, useEffect, useRef } from "react";
import {
  FileText,
  Calculator,
  Building2,
  Award,
  Users,
  Calendar,
  CheckCircle,
  Sparkles,
  Star,
  ArrowRight,
  ArrowLeft,
  Zap,
  TrendingUp,
  Scale,
  ShieldCheck,
  Briefcase
} from "lucide-react";
import { motion, useScroll, useTransform, useInView, useSpring } from "framer-motion";

import type { LangType } from "./language-selector";

interface AboutUsSectionProps {
  isRtl?: boolean;
  lang?: LangType;
  onContactClick?: () => void;
}

const ABOUT_TEXT: Record<LangType, {
  badge: string;
  title: string;
  intro: string;
  founderBadge: string;
  founderName: string;
  founderTitle: string;
  founderBio: string;
  ctaTitle: string;
  ctaSubtitle: string;
  ctaButton: string;
  stats: { label: string; value: number; suffix: string }[];
  services: { title: string; description: string; position: 'left' | 'right' }[];
}> = {
  ar: {
    badge: "عن المؤسسة وتاريخنا",
    title: "أحمد الشربيني وشركاه",
    intro: "نحن مؤسسة رائدة في المحاسبة القانونية والمراجعة والاستشارات الضريبية، نعمل بشغف وخبرة متوارثة تمتد لعقود لتمكين عملائنا من تحقيق النمو المالي المستدام وتأمين استثماراتهم وفقاً لأعلى المعايير.",
    founderBadge: "المؤسس والمدير للشركة",
    founderName: "المحاسب القانوني أحمد الشربيني",
    founderTitle: "محاسب ومراجع قانوني مقيد وخبير ضرائب",
    founderBio: "خبرة مهنية متفردة تمتد لأكثر من 40 عاماً في الفحص الضريبي، الاستشارات، وتأسيس كبرى الشركات في جمهورية مصر العربية.",
    ctaTitle: "هل تبحث عن استشارة مالية أو ضريبية معتمدة؟",
    ctaSubtitle: "تواصل مع فريقنا الآن لبحث ملفك الضريبي أو تأسيس شركتك بدقة وكفاءة واحترافية متناهية.",
    ctaButton: "تواصل معنا الآن",
    stats: [
      { label: "شركة ومؤسسة كبرى", value: 500, suffix: "+" },
      { label: "استشارة منجزة", value: 1200, suffix: "+" },
      { label: "عاماً من الخبرة والريادة", value: 40, suffix: "+" },
      { label: "التزام وموثوقية", value: 100, suffix: "%" }
    ],
    services: [
      {
        title: "التخطيط الضريبي",
        description: "مساعدة العملاء على ترشيد عبء الضريبة وفقاً لأحكام القانون من خلال التخطيط المالي والاستفادة من كافة الإعفاءات والمزايا المتاحة.",
        position: "left"
      },
      {
        title: "الفحص والمنازعات",
        description: "إنهاء أعمال الفحص الضريبي لشركات كبرى بمركز كبار الممولين منذ عام 1981 وحتى الآن بصورة نموذجية ومرضية للغاية.",
        position: "left"
      },
      {
        title: "الاستشارات والتقييم",
        description: "تقييم القيمة العادلة لأسهم كبرى الشركات السياحية والفندقية كمستشار مالي مستقل واعتماد التقييمات دون أي تحفظات.",
        position: "left"
      },
      {
        title: "المحاسبة والمراجعة",
        description: "تنفيذ عمليات المراجعة والتدقيق المالي وتطبيق المعايير المحاسبية المصرية والدولية لضمان دقة القوائم والشفافية.",
        position: "right"
      },
      {
        title: "تأسيس الشركات",
        description: "استخراج كافة التراخيص والسجلات وتأسيس الكيانات الاستثمارية والشركات المساهمة وذات المسؤولية المحدودة بسرعة واحترافية.",
        position: "right"
      },
      {
        title: "الخدمات الإلكترونية",
        description: "تقديم الإقرارات الضريبية إلكترونياً واستخراج المستندات الرقمية والفاتورة الإلكترونية بدقة متناهية وسرعة قياسية.",
        position: "right"
      }
    ]
  },
  en: {
    badge: "DISCOVER OUR FIRM",
    title: "About Ahmed El Sherbiny & Co.",
    intro: "A premier firm in certified accounting, auditing, and tax advisory. We leverage decades of seasoned expertise to empower clients with sustainable financial growth and legal compliance.",
    founderBadge: "Founder & Managing Director",
    founderName: "CPA Ahmed El Sherbiny",
    founderTitle: "Certified Public Accountant & Tax Consultant",
    founderBio: "Over 40 years of trusted advisory in corporate restructuring, tax appeals, and audit leadership across Egypt.",
    ctaTitle: "Looking for Certified Financial or Tax Advisory?",
    ctaSubtitle: "Connect with our expert team to review your tax position or structure your company with speed and precision.",
    ctaButton: "Get in Touch Today",
    stats: [
      { label: "Corporate Clients", value: 500, suffix: "+" },
      { label: "Consultations Delivered", value: 1200, suffix: "+" },
      { label: "Years of Experience", value: 40, suffix: "+" },
      { label: "Success & Trust Rate", value: 100, suffix: "%" }
    ],
    services: [
      {
        title: "Tax Planning",
        description: "Helping clients rationalize the tax burden according to the law through financial planning and utilizing all statutory exemptions.",
        position: "left"
      },
      {
        title: "Tax Inspection",
        description: "Successfully resolving complex tax inspections for major corporations at the Large Taxpayers Center with top-tier results.",
        position: "left"
      },
      {
        title: "Advisory & Valuation",
        description: "Independent fair value assessments and strategic financial restructuring accepted by official regulatory authorities.",
        position: "left"
      },
      {
        title: "Auditing & Assurance",
        description: "Comprehensive auditing and assurance adhering strictly to Egyptian and International Financial Reporting Standards.",
        position: "right"
      },
      {
        title: "Company Formation",
        description: "End-to-end company incorporation, commercial registrations, and licensing for local and international investors.",
        position: "right"
      },
      {
        title: "E-Services & Compliance",
        description: "Digital tax return submissions, E-Invoicing integration, and real-time electronic compliance monitoring.",
        position: "right"
      }
    ]
  },
  fr: {
    badge: "DÉCOUVRIR NOTRE CABINET",
    title: "Cabinet Ahmed El Sherbiny & Co.",
    intro: "Cabinet leader en expertise comptable, audit financier et conseil fiscal en Égypte, fort de plus de 40 ans d'expérience aux côtés des plus grandes entreprises.",
    founderBadge: "Fondateur & Directeur Général",
    founderName: "Expert-Comptable Ahmed El Sherbiny",
    founderTitle: "Expert-Comptable Agréé & Expert Fiscal",
    founderBio: "Plus de 40 ans d'excellence en gestion des contentieux fiscaux et création de sociétés en Égypte.",
    ctaTitle: "Besoin d'un Conseil Fiscal ou Comptable Certifié ?",
    ctaSubtitle: "Prenez contact avec notre équipe pour structurer vos opérations et optimiser votre conformité fiscale.",
    ctaButton: "Prendre Contact",
    stats: [
      { label: "Grandes Entreprises", value: 500, suffix: "+" },
      { label: "Consultations Réalisées", value: 1200, suffix: "+" },
      { label: "Ans d'Excellence", value: 40, suffix: "+" },
      { label: "Taux de Confiance", value: 100, suffix: "%" }
    ],
    services: [
      {
        title: "Planification Fiscale",
        description: "Optimisation de la charge fiscale en conformité avec la loi égyptienne et exploitation des exonérations légales.",
        position: "left"
      },
      {
        title: "Contrôle & Contentieux",
        description: "Représentation et clôture des contrôles fiscaux auprès du Centre des Grands Contribuables.",
        position: "left"
      },
      {
        title: "Conseil & Évaluation",
        description: "Évaluation de la juste valeur des actions et restructuration financière stratégique.",
        position: "left"
      },
      {
        title: "Audit & Révision Légale",
        description: "Audit financier rigoureux selon les normes égyptiennes (EAS) et internationales (IFRS).",
        position: "right"
      },
      {
        title: "Création d'Entreprises",
        description: "Constitution de sociétés, immatriculation au registre du commerce et autorisations d'investissement.",
        position: "right"
      },
      {
        title: "Services Numériques",
        description: "Télédéclarations fiscales, intégration de la facturation électronique et conformité numérique.",
        position: "right"
      }
    ]
  },
  tr: {
    badge: "FİRMAMIZI TANIYIN",
    title: "Ahmed El Sherbiny & Co.",
    intro: "Mısır'da yeminli mali müşavirlik, bağımsız denetim ve vergi danışmanlığı alanında 40 yılı aşkın köklü tecrübemizle şirketlerin sürdürülebilir büyümesine öncülük ediyoruz.",
    founderBadge: "Kurucu & Yönetici Ortak",
    founderName: "YMM Ahmed El Sherbiny",
    founderTitle: "Yeminli Mali Müşavir & Vergi Uzmanı",
    founderBio: "Mısır Vergi Dairesi ve Büyük Mükellefler nezdinde 40 yılı aşkın üst düzey danışmanlık ve denetim tecrübesi.",
    ctaTitle: "Mali veya Vergi Danışmanlığına mı İhtiyacınız Var?",
    ctaSubtitle: "Şirket kuruluşunuzu başlatmak veya vergi durumunuzu analiz etmek için uzman ekibimizle hemen görüşün.",
    ctaButton: "Hemen İletişime Geçin",
    stats: [
      { label: "Kurumsal Müvekkil", value: 500, suffix: "+" },
      { label: "Başarılı Danışmanlık", value: 1200, suffix: "+" },
      { label: "Yıllık Köklü Deneyim", value: 40, suffix: "+" },
      { label: "Müşteri Memnuniyeti", value: 100, suffix: "%" }
    ],
    services: [
      {
        title: "Vergi Planlaması",
        description: "Mevzuata tam uyumlu stratejik mali planlama ile vergi yükünün optimize edilmesi ve muafiyet yönetimi.",
        position: "left"
      },
      {
        title: "Vergi Teftişi & İtirazlar",
        description: "Büyük Mükellefler Merkezinde karmaşık vergi teftişlerinin ve komisyon süreçlerinin başarıyla sonuçlandırılması.",
        position: "left"
      },
      {
        title: "Mali Değerleme & Danışmanlık",
        description: "Şirket değerlemeleri, durum tespiti (Due Diligence) ve kurumsal finansal yeniden yapılandırma.",
        position: "left"
      },
      {
        title: "Muhasebe & Bağımsız Denetim",
        description: "Mısır ve Uluslararası Standartlara (IFRS) tam uyumlu bağımsız mali denetim ve güvence hizmetleri.",
        position: "right"
      },
      {
        title: "Şirket Kuruluşu",
        description: "Yatırımcılar için Mısır'da şirket kuruluşu, ticari sicil ve faaliyet izinlerinin eksiksiz tamamlanması.",
        position: "right"
      },
      {
        title: "E-Vergi & E-Fatura",
        description: "Elektronik vergi beyannameleri, E-Fatura entegrasyonu ve mevzuata tam dijital uyum takibi.",
        position: "right"
      }
    ]
  }
};

export default function AboutUsSection({ isRtl = false, lang = 'ar', onContactClick }: AboutUsSectionProps) {
  const [, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });
  const isStatsInView = useInView(statsRef, { once: false, amount: 0.3 });

  const t = ABOUT_TEXT[lang] || ABOUT_TEXT.en;

  // Parallax effect for decorative elements
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 15]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -15]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  const serviceIcons = [
    { icon: <Calculator className="w-5 h-5" />, sec: <Sparkles className={`w-3.5 h-3.5 absolute -top-1 ${isRtl ? '-left-1' : '-right-1'} text-black/40`} /> },
    { icon: <Scale className="w-5 h-5" />, sec: <CheckCircle className={`w-3.5 h-3.5 absolute -top-1 ${isRtl ? '-left-1' : '-right-1'} text-black/40`} /> },
    { icon: <Briefcase className="w-5 h-5" />, sec: <Star className={`w-3.5 h-3.5 absolute -top-1 ${isRtl ? '-left-1' : '-right-1'} text-black/40`} /> },
    { icon: <FileText className="w-5 h-5" />, sec: <Sparkles className={`w-3.5 h-3.5 absolute -top-1 ${isRtl ? '-left-1' : '-right-1'} text-black/40`} /> },
    { icon: <Building2 className="w-5 h-5" />, sec: <CheckCircle className={`w-3.5 h-3.5 absolute -top-1 ${isRtl ? '-left-1' : '-right-1'} text-black/40`} /> },
    { icon: <ShieldCheck className="w-5 h-5" />, sec: <Star className={`w-3.5 h-3.5 absolute -top-1 ${isRtl ? '-left-1' : '-right-1'} text-black/40`} /> },
  ];

  const services = t.services.map((s, idx) => ({
    ...s,
    icon: serviceIcons[idx]?.icon || <FileText className="w-5 h-5" />,
    secondaryIcon: serviceIcons[idx]?.sec || null
  }));

  const statIcons = [
    <Award className="w-6 h-6" />,
    <Users className="w-6 h-6" />,
    <Calendar className="w-6 h-6" />,
    <TrendingUp className="w-6 h-6" />
  ];

  const stats = t.stats.map((s, idx) => ({
    icon: statIcons[idx] || <Award className="w-6 h-6" />,
    ...s
  }));

  return (
    <section
      id="about-section"
      ref={sectionRef}
      className="w-full py-16 px-4 bg-[#F5F5F5] text-black overflow-hidden relative font-sans"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <motion.div
        className="container mx-auto max-w-6xl relative z-10"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <motion.div className="flex flex-col items-center mb-6" variants={itemVariants}>
          <motion.span
            className="text-black/60 font-semibold mb-2 flex items-center gap-2 text-xs md:text-sm tracking-wider uppercase bg-black/5 px-4 py-1 rounded-full border border-black/5"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Zap className="w-3.5 h-3.5 text-black" />
            {t.badge}
          </motion.span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-center tracking-tight text-black">
            {t.title}
          </h2>
          <motion.div
            className="w-20 h-1 bg-black rounded-full"
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ duration: 1, delay: 0.5 }}
          ></motion.div>
        </motion.div>

        <motion.p className="text-center max-w-3xl mx-auto mb-16 text-black/70 text-base md:text-lg leading-relaxed font-normal" variants={itemVariants}>
          {t.intro}
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative items-center">
          {/* Left Column */}
          <div className="space-y-10 md:space-y-12">
            {services
              .filter((service) => service.position === "left")
              .map((service, index) => (
                <ServiceItem
                  key={`left-${index}`}
                  icon={service.icon}
                  secondaryIcon={service.secondaryIcon}
                  title={service.title}
                  description={service.description}
                  variants={itemVariants}
                  delay={index * 0.2}
                  direction={isRtl ? "right" : "left"}
                  isRtl={isRtl}
                />
              ))}
          </div>

          {/* Center Image - Founder Portrait */}
          <div className="flex justify-center items-center order-first md:order-none mb-8 md:mb-0">
            <motion.div className="relative w-full max-w-xs" variants={itemVariants}>
              <motion.div
                className="rounded-3xl overflow-hidden shadow-xl bg-white border border-black/10"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
              >
                <div className="relative h-[26rem] w-full overflow-hidden bg-neutral-100">
                  <img
                    src="/founder.jpg"
                    alt="Ahmed El Sherbiny"
                    className="w-full h-full object-cover object-top filter contrast-[1.02]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent flex flex-col justify-end p-6 text-white">
                    {/* Framed Founder & Managing Director Badge */}
                    <div className="bg-white text-black font-extrabold text-xs md:text-sm px-4 py-2 rounded-2xl shadow-2xl w-fit mb-3 border-2 border-white/80 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-black" />
                      <span>{t.founderBadge}</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-1 tracking-tight drop-shadow-md">
                      {t.founderName}
                    </h3>
                    <p className="text-xs md:text-sm text-white/80 font-medium leading-relaxed drop-shadow-sm mb-1">
                      {t.founderTitle}
                    </p>
                    <p className="text-[11px] text-white/60 leading-tight">
                      {t.founderBio}
                    </p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                className="absolute inset-0 border-2 border-black/10 rounded-3xl -m-3 z-[-1]"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              ></motion.div>

              {/* Floating accent elements */}
              <motion.div
                className="absolute -top-4 -right-6 w-16 h-16 rounded-full bg-black/5 blur-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.9 }}
                style={{ y: y1 }}
              ></motion.div>
              <motion.div
                className="absolute -bottom-6 -left-8 w-20 h-20 rounded-full bg-black/5 blur-sm"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.1 }}
                style={{ y: y2 }}
              ></motion.div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-10 md:space-y-12">
            {services
              .filter((service) => service.position === "right")
              .map((service, index) => (
                <ServiceItem
                  key={`right-${index}`}
                  icon={service.icon}
                  secondaryIcon={service.secondaryIcon}
                  title={service.title}
                  description={service.description}
                  variants={itemVariants}
                  delay={index * 0.2}
                  direction={isRtl ? "left" : "right"}
                  isRtl={isRtl}
                />
              ))}
          </div>
        </div>

        {/* Stats Section */}
        <motion.div
          ref={statsRef}
          className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          initial="hidden"
          animate={isStatsInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {stats.map((stat, index) => (
            <StatCounter
              key={index}
              icon={stat.icon}
              value={stat.value}
              label={stat.label}
              suffix={stat.suffix}
              delay={index * 0.1}
            />
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="mt-16 bg-black text-white p-8 md:p-12 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl"
          initial={{ opacity: 0, y: 30 }}
          animate={isStatsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="flex-1 text-center md:text-start">
            <h3 className="text-2xl md:text-3xl font-bold mb-2">
              {t.ctaTitle}
            </h3>
            <p className="text-white/70 text-sm md:text-base">
              {t.ctaSubtitle}
            </p>
          </div>
          <motion.button
            onClick={onContactClick}
            className="bg-white hover:bg-neutral-100 text-black px-8 py-4 rounded-full flex items-center gap-2 font-bold transition-all shadow-lg hover:scale-105 active:scale-95"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>{t.ctaButton}</span>
            {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
}

interface ServiceItemProps {
  icon: React.ReactNode;
  secondaryIcon?: React.ReactNode;
  title: string;
  description: string;
  variants: {
    hidden: { opacity: number; y?: number };
    visible: { opacity: number; y?: number; transition: { duration: number; ease: string } };
  };
  delay: number;
  direction: "left" | "right";
  isRtl?: boolean;
}

function ServiceItem({ icon, secondaryIcon, title, description, variants, delay, direction, isRtl }: ServiceItemProps) {
  return (
    <motion.div
      className="flex flex-col group cursor-default"
      variants={variants}
      transition={{ delay }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
    >
      <motion.div
        className="flex items-center gap-3 mb-2"
        initial={{ x: direction === "left" ? -20 : 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: delay + 0.2 }}
      >
        <motion.div
          className="text-black bg-black/5 p-3 rounded-2xl transition-all duration-300 group-hover:bg-black group-hover:text-white relative shrink-0 border border-black/5 shadow-sm"
          whileHover={{ rotate: [0, -10, 10, -5, 0], transition: { duration: 0.5 } }}
        >
          {icon}
          {secondaryIcon}
        </motion.div>
        <h3 className="text-lg md:text-xl font-bold text-black group-hover:text-black/80 transition-colors duration-300">
          {title}
        </h3>
      </motion.div>
      <motion.p
        className={`text-xs md:text-sm text-black/65 leading-relaxed ${isRtl ? 'pr-12' : 'pl-12'}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: delay + 0.4 }}
      >
        {description}
      </motion.p>
    </motion.div>
  );
}

interface StatCounterProps {
  icon: React.ReactNode;
  value: number;
  label: string;
  suffix: string;
  delay: number;
}

function StatCounter({ icon, value, label, suffix, delay }: StatCounterProps) {
  const countRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(countRef, { once: false });
  const [hasAnimated, setHasAnimated] = useState(false);

  const springValue = useSpring(0, {
    stiffness: 50,
    damping: 10,
  });

  useEffect(() => {
    if (isInView && !hasAnimated) {
      springValue.set(value);
      setHasAnimated(true);
    } else if (!isInView && hasAnimated) {
      springValue.set(0);
      setHasAnimated(false);
    }
  }, [isInView, value, springValue, hasAnimated]);

  const displayValue = useTransform(springValue, (latest) => Math.floor(latest));

  return (
    <motion.div
      className="bg-white p-6 rounded-2xl border border-black/5 flex flex-col items-center text-center group hover:shadow-md transition-all duration-300 shadow-sm"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, delay },
        },
      }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      <motion.div
        className="w-12 h-12 rounded-2xl bg-black/5 flex items-center justify-center mb-3 text-black group-hover:bg-black group-hover:text-white transition-colors duration-300"
        whileHover={{ rotate: 360, transition: { duration: 0.8 } }}
      >
        {icon}
      </motion.div>
      <motion.div ref={countRef} className="text-3xl font-extrabold text-black flex items-center gap-0.5">
        <motion.span>{displayValue}</motion.span>
        <span>{suffix}</span>
      </motion.div>
      <p className="text-black/60 text-xs md:text-sm mt-1 font-medium">{label}</p>
      <motion.div className="w-8 h-0.5 bg-black/20 mt-2.5 group-hover:w-14 group-hover:bg-black transition-all duration-300 rounded-full" />
    </motion.div>
  );
}
