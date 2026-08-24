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

  const services = [
    {
      icon: <Calculator className="w-5 h-5" />,
      secondaryIcon: <Sparkles className={`w-3.5 h-3.5 absolute -top-1 ${isRtl ? '-left-1' : '-right-1'} text-black/40`} />,
      title: isRtl ? "التخطيط الضريبي" : "Tax Planning",
      description: isRtl
        ? "مساعدة العملاء على ترشيد عبء الضريبة وفقاً لأحكام القانون من خلال التخطيط المالي والاستفادة من كافة الإعفاءات والمزايا المتاحة."
        : "Helping clients rationalize the tax burden according to the law through financial planning and utilizing all statutory exemptions.",
      position: "left",
    },
    {
      icon: <Scale className="w-5 h-5" />,
      secondaryIcon: <CheckCircle className={`w-3.5 h-3.5 absolute -top-1 ${isRtl ? '-left-1' : '-right-1'} text-black/40`} />,
      title: isRtl ? "الفحص والمنازعات" : "Tax Inspection",
      description: isRtl
        ? "إنهاء أعمال الفحص الضريبي لشركات كبرى بمركز كبار الممولين منذ عام 1981 وحتى الآن بصورة نموذجية ومرضية للغاية."
        : "Successfully resolving complex tax inspections for major corporations at the Large Taxpayers Center with top-tier results.",
      position: "left",
    },
    {
      icon: <Briefcase className="w-5 h-5" />,
      secondaryIcon: <Star className={`w-3.5 h-3.5 absolute -top-1 ${isRtl ? '-left-1' : '-right-1'} text-black/40`} />,
      title: isRtl ? "الاستشارات والتقييم" : "Advisory & Valuation",
      description: isRtl
        ? "تقييم القيمة العادلة لأسهم كبرى الشركات السياحية والفندقية كمستشار مالي مستقل واعتماد التقييمات دون أي تحفظات."
        : "Independent fair value assessments and strategic financial restructuring accepted by official regulatory authorities.",
      position: "left",
    },
    {
      icon: <FileText className="w-5 h-5" />,
      secondaryIcon: <Sparkles className={`w-3.5 h-3.5 absolute -top-1 ${isRtl ? '-left-1' : '-right-1'} text-black/40`} />,
      title: isRtl ? "المحاسبة والمراجعة" : "Auditing & Assurance",
      description: isRtl
        ? "تنفيذ عمليات المراجعة والتدقيق المالي وتطبيق المعايير المحاسبية المصرية والدولية لضمان دقة القوائم والشفافية."
        : "Comprehensive auditing and assurance adhering strictly to Egyptian and International Financial Reporting Standards.",
      position: "right",
    },
    {
      icon: <Building2 className="w-5 h-5" />,
      secondaryIcon: <CheckCircle className={`w-3.5 h-3.5 absolute -top-1 ${isRtl ? '-left-1' : '-right-1'} text-black/40`} />,
      title: isRtl ? "تأسيس الشركات" : "Company Formation",
      description: isRtl
        ? "استخراج كافة التراخيص والسجلات وتأسيس الكيانات الاستثمارية والشركات المساهمة وذات المسؤولية المحدودة بسرعة واحترافية."
        : "End-to-end company incorporation, commercial registrations, and licensing for local and international investors.",
      position: "right",
    },
    {
      icon: <ShieldCheck className="w-5 h-5" />,
      secondaryIcon: <Star className={`w-3.5 h-3.5 absolute -top-1 ${isRtl ? '-left-1' : '-right-1'} text-black/40`} />,
      title: isRtl ? "الخدمات الإلكترونية" : "E-Services & Compliance",
      description: isRtl
        ? "تقديم الإقرارات الضريبية إلكترونياً واستخراج المستندات الرقمية والفاتورة الإلكترونية بدقة متناهية وسرعة قياسية."
        : "Digital tax return submissions, E-Invoicing integration, and real-time electronic compliance monitoring.",
      position: "right",
    },
  ];

  const stats = [
    { icon: <Award className="w-6 h-6" />, value: 500, label: isRtl ? "شركة ومؤسسة كبرى" : "Corporate Clients", suffix: "+" },
    { icon: <Users className="w-6 h-6" />, value: 1200, label: isRtl ? "استشارة منجزة" : "Consultations Delivered", suffix: "+" },
    { icon: <Calendar className="w-6 h-6" />, value: 40, label: isRtl ? "عاماً من الخبرة والريادة" : "Years of Experience", suffix: "+" },
    { icon: <TrendingUp className="w-6 h-6" />, value: 100, label: isRtl ? "التزام وموثوقية" : "Success & Trust Rate", suffix: "%" },
  ];

  return (
    <section
      id="about-section"
      ref={sectionRef}
      className="w-full py-20 px-4 bg-[#F5F5F5] text-black overflow-hidden relative font-sans"
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* Decorative background elements */}
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 rounded-full bg-black/[0.02] blur-3xl"
        style={{ y: y1, rotate: rotate1 }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-black/[0.02] blur-3xl"
        style={{ y: y2, rotate: rotate2 }}
      />
      <motion.div
        className="absolute top-1/2 left-1/4 w-3 h-3 rounded-full bg-black/10"
        animate={{
          y: [0, -15, 0],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-4 h-4 rounded-full bg-black/10"
        animate={{
          y: [0, 15, 0],
          opacity: [0.3, 0.7, 0.3],
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
            className="text-black/60 font-semibold mb-2 flex items-center gap-2 text-xs md:text-sm tracking-wider uppercase bg-black/5 px-4 py-1 rounded-full border border-black/5"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Zap className="w-3.5 h-3.5 text-black" />
            {isRtl ? "عن المؤسسة وتاريخنا" : "DISCOVER OUR FIRM"}
          </motion.span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-center tracking-tight text-black">
            {isRtl ? "أحمد الشربيني وشركاه" : "About Ahmed El Sherbiny & Co."}
          </h2>
          <motion.div
            className="w-20 h-1 bg-black rounded-full"
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ duration: 1, delay: 0.5 }}
          ></motion.div>
        </motion.div>

        <motion.p className="text-center max-w-3xl mx-auto mb-16 text-black/70 text-base md:text-lg leading-relaxed font-normal" variants={itemVariants}>
          {isRtl
            ? "نحن مؤسسة رائدة في المحاسبة القانونية والمراجعة والاستشارات الضريبية، نعمل بشغف وخبرة متوارثة تمتد لعقود لتمكين عملائنا من تحقيق النمو المالي المستدام وتأمين استثماراتهم وفقاً لأعلى المعايير."
            : "A premier firm in certified accounting, auditing, and tax advisory. We leverage decades of seasoned expertise to empower clients with sustainable financial growth and legal compliance."}
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-6 text-white">
                    <span className="text-[11px] text-white/80 font-bold uppercase tracking-wider mb-1 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full w-fit">
                      {isRtl ? "مؤسس ومدير الشركة" : "Founder & Managing Director"}
                    </span>
                    <h3 className="text-2xl font-bold text-white mb-1">
                      {isRtl ? "أ. أحمد الشربيني" : "Ahmed El Sherbiny"}
                    </h3>
                    <p className="text-xs text-white/70 font-medium">
                      {isRtl ? "محاسب وخبير ضرائب ومراجع قانوني معتمد" : "Certified Public Accountant & Senior Tax Expert"}
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
              {isRtl ? "هل أنت مستعد لتأمين وتطوير أعمالك؟" : "Ready to secure and grow your business?"}
            </h3>
            <p className="text-white/70 text-sm md:text-base">
              {isRtl ? "دعنا نبني معاً نظاماً مالياً وضريبياً قوياً ومستداماً." : "Let's build a robust, compliant financial structure together."}
            </p>
          </div>
          <motion.button
            onClick={onContactClick}
            className="bg-white hover:bg-neutral-100 text-black px-8 py-4 rounded-full flex items-center gap-2 font-bold transition-all shadow-lg hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>{isRtl ? "احجز استشارتك الآن" : "Book a Consultation"}</span>
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
