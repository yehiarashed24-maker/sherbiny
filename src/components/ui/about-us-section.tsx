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

interface AboutUsSectionProps {
  isRtl?: boolean;
  onContactClick?: () => void;
}

export default function AboutUsSection({ isRtl = false, onContactClick }: AboutUsSectionProps) {
  const [, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });
  const isStatsInView = useInView(statsRef, { once: false, amount: 0.3 });

  // Parallax effect for decorative elements
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 20]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -20]);

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

  const services = [
    {
      icon: <Calculator className="w-6 h-6" />,
      secondaryIcon: <Sparkles className={`w-4 h-4 absolute -top-1 ${isRtl ? '-left-1' : '-right-1'} text-[#A9BBC8]`} />,
      title: isRtl ? "التخطيط الضريبي" : "Tax Planning",
      description: isRtl
        ? "مساعدة العملاء على ترشيد عبء الضريبة وفقاً لأحكام القانون من خلال التخطيط المالي والاستفادة من كافة الإعفاءات والمزايا المتاحة."
        : "Helping clients rationalize the tax burden according to the law through financial planning and utilizing all statutory exemptions.",
      position: "left",
    },
    {
      icon: <Scale className="w-6 h-6" />,
      secondaryIcon: <CheckCircle className={`w-4 h-4 absolute -top-1 ${isRtl ? '-left-1' : '-right-1'} text-[#A9BBC8]`} />,
      title: isRtl ? "الفحص والمنازعات" : "Tax Inspection",
      description: isRtl
        ? "إنهاء أعمال الفحص الضريبي لشركات كبرى بمركز كبار الممولين منذ عام 1981 وحتى الآن بصورة نموذجية ومرضية للغاية."
        : "Successfully resolving complex tax inspections for major corporations at the Large Taxpayers Center with top-tier results.",
      position: "left",
    },
    {
      icon: <Briefcase className="w-6 h-6" />,
      secondaryIcon: <Star className={`w-4 h-4 absolute -top-1 ${isRtl ? '-left-1' : '-right-1'} text-[#A9BBC8]`} />,
      title: isRtl ? "الاستشارات والتقييم" : "Advisory & Valuation",
      description: isRtl
        ? "تقييم القيمة العادلة لأسهم كبرى الشركات السياحية والفندقية كمستشار مالي مستقل واعتماد التقييمات دون أي تحفظات."
        : "Independent fair value assessments and strategic financial restructuring accepted by official regulatory authorities.",
      position: "left",
    },
    {
      icon: <FileText className="w-6 h-6" />,
      secondaryIcon: <Sparkles className={`w-4 h-4 absolute -top-1 ${isRtl ? '-left-1' : '-right-1'} text-[#A9BBC8]`} />,
      title: isRtl ? "المحاسبة والمراجعة" : "Auditing & Assurance",
      description: isRtl
        ? "تنفيذ عمليات المراجعة والتدقيق المالي وتطبيق المعايير المحاسبية المصرية والدولية لضمان دقة القوائم والشفافية."
        : "Comprehensive auditing and assurance adhering strictly to Egyptian and International Financial Reporting Standards.",
      position: "right",
    },
    {
      icon: <Building2 className="w-6 h-6" />,
      secondaryIcon: <CheckCircle className={`w-4 h-4 absolute -top-1 ${isRtl ? '-left-1' : '-right-1'} text-[#A9BBC8]`} />,
      title: isRtl ? "تأسيس الشركات" : "Company Formation",
      description: isRtl
        ? "استخراج كافة التراخيص والسجلات وتأسيس الكيانات الاستثمارية والشركات المساهمة وذات المسؤولية المحدودة بسرعة واحترافية."
        : "End-to-end company incorporation, commercial registrations, and licensing for local and international investors.",
      position: "right",
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      secondaryIcon: <Star className={`w-4 h-4 absolute -top-1 ${isRtl ? '-left-1' : '-right-1'} text-[#A9BBC8]`} />,
      title: isRtl ? "الخدمات الإلكترونية" : "E-Services & Compliance",
      description: isRtl
        ? "تقديم الإقرارات الضريبية إلكترونياً واستخراج المستندات الرقمية والفاتورة الإلكترونية بدقة متناهية وسرعة قياسية."
        : "Digital tax return submissions, E-Invoicing integration, and real-time electronic compliance monitoring.",
      position: "right",
    },
  ];

  const stats = [
    { icon: <Award />, value: 500, label: isRtl ? "شركة ومؤسسة ناجحة" : "Corporate Clients", suffix: "+" },
    { icon: <Users />, value: 1200, label: isRtl ? "استشارة مالية وضريبية" : "Consultations Delivered", suffix: "+" },
    { icon: <Calendar />, value: 40, label: isRtl ? "عاماً من الخبرة والريادة" : "Years of Experience", suffix: "+" },
    { icon: <TrendingUp />, value: 100, label: isRtl ? "نسبة الالتزام والنجاح" : "Success Rate", suffix: "%" },
  ];

  return (
    <section
      id="about-section"
      ref={sectionRef}
      className="w-full py-20 px-4 bg-gradient-to-b from-[#F6F5F2] to-[#ECEAE4] text-[#202e44] overflow-hidden relative font-sans"
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* Decorative background elements */}
      <motion.div
        className="absolute top-20 left-10 w-64 h-64 rounded-full bg-[#88734C]/5 blur-3xl"
        style={{ y: y1, rotate: rotate1 }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-[#A9BBC8]/5 blur-3xl"
        style={{ y: y2, rotate: rotate2 }}
      />
      <motion.div
        className="absolute top-1/2 left-1/4 w-4 h-4 rounded-full bg-[#88734C]/30"
        animate={{
          y: [0, -15, 0],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-6 h-6 rounded-full bg-[#A9BBC8]/30"
        animate={{
          y: [0, 20, 0],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      <motion.div
        className="container mx-auto max-w-6xl relative z-10"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <motion.div className="flex flex-col items-center mb-6" variants={itemVariants}>
          <motion.span
            className="text-[#88734C] font-semibold mb-2 flex items-center gap-2 text-xs md:text-sm tracking-wider uppercase"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Zap className="w-4 h-4" />
            {isRtl ? "اكتشف مسيرتنا وخبراتنا" : "DISCOVER OUR STORY"}
          </motion.span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-center tracking-tight text-[#1a2332]">
            {isRtl ? "أحمد الشربيني وشركاه" : "About Ahmed El Sherbiny & Co."}
          </h2>
          <motion.div
            className="w-24 h-1 bg-[#88734C] rounded-full"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 1, delay: 0.5 }}
          ></motion.div>
        </motion.div>

        <motion.p className="text-center max-w-3xl mx-auto mb-16 text-[#202e44]/80 text-base md:text-lg leading-relaxed" variants={itemVariants}>
          {isRtl
            ? "نحن مؤسسة رائدة في المحاسبة القانونية والمراجعة والاستشارات الضريبية، نعمل بشغف وخبرة متوارثة تمتد لعقود لتمكين عملائنا من تحقيق النمو المالي المستدام وتأمين استثماراتهم وفقاً لأعلى المعايير."
            : "A premier firm in certified accounting, auditing, and tax advisory. We leverage decades of seasoned expertise to empower clients with sustainable financial growth and legal compliance."}
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative items-center">
          {/* Left Column */}
          <div className="space-y-12 md:space-y-14">
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

          {/* Center Image - Founder Portrait with Floating Badges */}
          <div className="flex justify-center items-center order-first md:order-none mb-8 md:mb-0">
            <motion.div className="relative w-full max-w-xs" variants={itemVariants}>
              <motion.div
                className="rounded-2xl overflow-hidden shadow-2xl bg-white border-2 border-white/80"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
              >
                <div className="relative h-96 w-full overflow-hidden bg-gradient-to-b from-[#dfded9] to-[#cbc8bd]">
                  <img
                    src="/founder.jpg"
                    alt="Ahmed El Sherbiny"
                    className="w-full h-full object-cover object-top filter contrast-[1.03]"
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-[#202e44]/80 via-transparent to-transparent flex flex-col justify-end p-5 text-white"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.9 }}
                  >
                    <span className="text-xs text-[#E6D38B] font-semibold uppercase tracking-wider mb-1">
                      {isRtl ? "مؤسس ورئيس مجلس الإدارة" : "Founder & Managing Director"}
                    </span>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {isRtl ? "أ. أحمد الشربيني" : "Ahmed El Sherbiny"}
                    </h3>
                    <motion.button
                      onClick={onContactClick}
                      className="bg-white/95 hover:bg-white text-[#202e44] px-4 py-2 rounded-full flex items-center justify-center gap-2 text-xs font-bold transition-all shadow-md mt-1"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span>{isRtl ? "احجز استشارة خاصة" : "Book a Consultation"}</span>
                      {isRtl ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                    </motion.button>
                  </motion.div>
                </div>
              </motion.div>
              
              <motion.div
                className="absolute inset-0 border-4 border-[#88734C]/40 rounded-2xl -m-3 z-[-1]"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              ></motion.div>

              {/* Floating accent elements */}
              <motion.div
                className="absolute -top-4 -right-6 w-16 h-16 rounded-full bg-[#88734C]/15 blur-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.9 }}
                style={{ y: y1 }}
              ></motion.div>
              <motion.div
                className="absolute -bottom-6 -left-8 w-20 h-20 rounded-full bg-[#A9BBC8]/20 blur-sm"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.1 }}
                style={{ y: y2 }}
              ></motion.div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-12 md:space-y-14">
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
          className="mt-16 bg-[#1a2434] text-white p-8 md:p-10 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl"
          initial={{ opacity: 0, y: 30 }}
          animate={isStatsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="flex-1 text-center md:text-start">
            <h3 className="text-2xl md:text-3xl font-bold mb-2">
              {isRtl ? "هل أنت مستعد لتأمين وتطوير أعمالك؟" : "Ready to secure and grow your business?"}
            </h3>
            <p className="text-white/70 text-sm md:text-base">
              {isRtl ? "دعنا نبني معاً نظاماً مالياً وضريبياً قوياً ومستداماً." : "Let's build a robust, compliant financial structure together."}
            </p>
          </div>
          <motion.button
            onClick={onContactClick}
            className="bg-[#88734C] hover:bg-[#88734C]/90 text-white px-7 py-3.5 rounded-full flex items-center gap-2 font-bold transition-colors shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>{isRtl ? "تواصل معنا الآن" : "Get Started"}</span>
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
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      <motion.div
        className="flex items-center gap-3 mb-2.5"
        initial={{ x: direction === "left" ? -20 : 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: delay + 0.2 }}
      >
        <motion.div
          className="text-[#88734C] bg-[#88734C]/10 p-3 rounded-xl transition-colors duration-300 group-hover:bg-[#88734C]/20 relative shrink-0 shadow-sm"
          whileHover={{ rotate: [0, -10, 10, -5, 0], transition: { duration: 0.5 } }}
        >
          {icon}
          {secondaryIcon}
        </motion.div>
        <h3 className="text-lg md:text-xl font-bold text-[#1a2434] group-hover:text-[#88734C] transition-colors duration-300">
          {title}
        </h3>
      </motion.div>
      <motion.p
        className={`text-xs md:text-sm text-[#202e44]/80 leading-relaxed ${isRtl ? 'pr-12' : 'pl-12'}`}
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
      className="bg-white/70 backdrop-blur-md p-6 rounded-2xl border border-black/5 flex flex-col items-center text-center group hover:bg-white shadow-sm hover:shadow-md transition-all duration-300"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, delay },
        },
      }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <motion.div
        className="w-12 h-12 rounded-2xl bg-[#202e44]/5 flex items-center justify-center mb-3 text-[#88734C] group-hover:bg-[#88734C]/15 transition-colors duration-300"
        whileHover={{ rotate: 360, transition: { duration: 0.8 } }}
      >
        {icon}
      </motion.div>
      <motion.div ref={countRef} className="text-3xl font-extrabold text-[#1a2434] flex items-center gap-0.5">
        <motion.span>{displayValue}</motion.span>
        <span>{suffix}</span>
      </motion.div>
      <p className="text-[#202e44]/70 text-xs md:text-sm mt-1 font-medium">{label}</p>
      <motion.div className="w-8 h-0.5 bg-[#88734C] mt-2.5 group-hover:w-14 transition-all duration-300 rounded-full" />
    </motion.div>
  );
}
