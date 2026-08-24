import React, { useState } from 'react';
import { X, CheckCircle2, Phone, User, Mail, MessageSquare, Send, Loader2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { LangType } from './language-selector';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  isRtl?: boolean;
  lang?: LangType;
}

const MODAL_TEXT: Record<LangType, {
  badge: string;
  title: string;
  subtitle: string;
  nameLabel: string;
  namePlaceholder: string;
  phoneLabel: string;
  phonePlaceholder: string;
  serviceLabel: string;
  services: { tax: string; audit: string; incorporation: string; advisory: string; other: string };
  emailLabel: string;
  notesLabel: string;
  notesPlaceholder: string;
  submit: string;
  submitting: string;
  successTitle: string;
  successDesc: string;
  hotline: string;
  doneBtn: string;
}> = {
  ar: {
    badge: 'استشارة مالية وضريبية مجانية',
    title: 'احجز استشارتك الآن',
    subtitle: 'املأ النموذج وسيقوم أحد خبرائنا الماليين بالتواصل معك لمناقشة احتياجاتك وتحديد أفضل خطة عمل.',
    nameLabel: 'الاسم بالكامل *',
    namePlaceholder: 'أدخل اسمك أو اسم الشركة',
    phoneLabel: 'رقم الهاتف / الواتساب *',
    phonePlaceholder: '010XXXXXXXX',
    serviceLabel: 'نوع الاستشارة',
    services: {
      tax: 'الضرائب والفحص الضريبي',
      audit: 'المحاسبة والمراجعة',
      incorporation: 'تأسيس وتعديل الشركات',
      advisory: 'الاستشارات المالية والتقييم',
      other: 'استشارة أخرى'
    },
    emailLabel: 'البريد الإلكتروني (اختياري)',
    notesLabel: 'تفاصيل إضافية أو موعد مفضل',
    notesPlaceholder: 'اكتب نبذة عن مشروعك أو استفسارك أو الوقت الأنسب للاتصال بك...',
    submit: 'تأكيد وحجز الاستشارة',
    submitting: 'جاري الإرسال وتأكيد الحجز...',
    successTitle: 'تم استلام طلبك بنجاح!',
    successDesc: 'شكراً لتواصلك مع مكتب أحمد الشربيني وشركاه. سيقوم مستشارنا المالي بالتواصل معك هاتفياً أو عبر الواتساب لتأكيد موعد الاستشارة.',
    hotline: 'الخط الساخن والواتساب الفوري للمكتب:',
    doneBtn: 'تم'
  },
  en: {
    badge: 'Complimentary Consultation',
    title: 'Book a Consultation',
    subtitle: 'Fill in your details and our senior financial consultant will reach out to tailor the ideal roadmap for you.',
    nameLabel: 'Full Name *',
    namePlaceholder: 'Enter your name or company',
    phoneLabel: 'Phone / WhatsApp *',
    phonePlaceholder: '+20 1XXXXXXXXX',
    serviceLabel: 'Service Type',
    services: {
      tax: 'Tax & Inspection',
      audit: 'Audit & Accounting',
      incorporation: 'Company Formation',
      advisory: 'Financial Advisory',
      other: 'Other'
    },
    emailLabel: 'Email (Optional)',
    notesLabel: 'Additional Notes / Preferred Time',
    notesPlaceholder: 'Share brief details about your inquiry or best time to call...',
    submit: 'Confirm & Book Consultation',
    submitting: 'Submitting your request...',
    successTitle: 'Request Received Successfully!',
    successDesc: 'Thank you for reaching out to Ahmed El Sherbiny & Co. Our advisor will contact you via phone or WhatsApp shortly.',
    hotline: 'Direct Hotline & WhatsApp:',
    doneBtn: 'Done'
  },
  fr: {
    badge: 'Consultation Gratuite',
    title: 'Réserver une Consultation',
    subtitle: 'Remplissez le formulaire et nos experts vous contacteront rapidement pour analyser vos besoins.',
    nameLabel: 'Nom Complet *',
    namePlaceholder: 'Entrez votre nom ou raison sociale',
    phoneLabel: 'Téléphone / WhatsApp *',
    phonePlaceholder: '+20 1XXXXXXXXX',
    serviceLabel: 'Type de Consultation',
    services: {
      tax: 'Fiscalité & Contrôle',
      audit: 'Audit & Comptabilité',
      incorporation: 'Création de Société',
      advisory: 'Conseil Financier',
      other: 'Autre'
    },
    emailLabel: 'Email (Optionnel)',
    notesLabel: 'Détails ou horaire souhaité',
    notesPlaceholder: 'Détails sur votre demande ou meilleur moment pour vous joindre...',
    submit: 'Confirmer la Réservation',
    submitting: 'Envoi en cours...',
    successTitle: 'Demande Reçue avec Succès !',
    successDesc: "Merci d'avoir contacté Ahmed El Sherbiny & Co. Notre conseiller vous contactera par téléphone ou WhatsApp.",
    hotline: 'Hotline Directe & WhatsApp :',
    doneBtn: 'Fermer'
  },
  tr: {
    badge: 'Ücretsiz Danışmanlık',
    title: 'Danışmanlık Randevusu Alın',
    subtitle: 'Formu doldurun, uzman mali danışmanlarımız en uygun çözümü sunmak üzere sizinle iletişime geçsin.',
    nameLabel: 'Ad Soyad *',
    namePlaceholder: 'Adınızı veya şirket unvanını girin',
    phoneLabel: 'Telefon / WhatsApp *',
    phonePlaceholder: '+20 1XXXXXXXXX',
    serviceLabel: 'Hizmet Türü',
    services: {
      tax: 'Vergi ve Teftiş',
      audit: 'Muhasebe ve Denetim',
      incorporation: 'Şirket Kuruluşu',
      advisory: 'Mali Danışmanlık',
      other: 'Diğer'
    },
    emailLabel: 'E-posta (İsteğe bağlı)',
    notesLabel: 'Ek Notlar veya Tercih Edilen Saat',
    notesPlaceholder: 'Talebiniz veya görüşme için en uygun zaman hakkında bilgi verin...',
    submit: 'Randevuyu Onayla',
    submitting: 'Talebiniz iletiliyor...',
    successTitle: 'Talebiniz Başarıyla Alındı!',
    successDesc: 'Ahmed El Sherbiny & Co. ile iletişime geçtiğiniz için teşekkür ederiz. Danışmanımız en kısa sürede sizinle iletişime geçecektir.',
    hotline: 'Doğrudan Hat & WhatsApp:',
    doneBtn: 'Tamam'
  }
};

export default function ConsultationModal({
  isOpen,
  onClose,
  isRtl = false,
  lang = 'ar'
}: ConsultationModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState('tax');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const t = MODAL_TEXT[lang] || MODAL_TEXT.en;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: `طلب حجز استشارة جديد (${lang.toUpperCase()}) من: ${name}`,
          name,
          phone,
          service: t.services[service as keyof typeof t.services] || service,
          email: email || 'غير محدد',
          notes: notes || 'لا توجد ملاحظات إضافية'
        })
      });
      setIsSuccess(true);
    } catch (err) {
      console.error('Consultation submission error:', err);
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    onClose();
    setTimeout(() => {
      setIsSuccess(false);
      setName('');
      setPhone('');
      setEmail('');
      setNotes('');
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[999] flex items-end sm:items-center justify-center p-0 sm:p-4" dir={isRtl ? 'rtl' : 'ltr'}>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleResetAndClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 40 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.12 }}
            className="relative w-full max-w-lg bg-white rounded-t-[32px] sm:rounded-3xl shadow-2xl border border-black/10 overflow-hidden z-10 max-h-[92vh] flex flex-col"
          >
            {/* Mobile Sheet Handle Bar */}
            <div className="w-12 h-1.5 bg-black/20 rounded-full mx-auto mt-3 sm:hidden shrink-0" />

            {/* Close Button */}
            <button
              onClick={handleResetAndClose}
              className={`absolute top-4 ${isRtl ? 'left-4' : 'right-4'} w-9 h-9 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-black/70 hover:text-black transition-colors z-20`}
            >
              <X className="w-4 h-4" />
            </button>

            {!isSuccess ? (
              <div className="p-6 sm:p-9 overflow-y-auto max-h-[85vh]">
                {/* Header */}
                <div className="mb-6">
                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-black text-white text-xs font-bold mb-3 shadow-sm">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>{t.badge}</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-black tracking-tight mb-2">
                    {t.title}
                  </h3>
                  <p className="text-xs md:text-sm text-black/60 leading-relaxed">
                    {t.subtitle}
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-bold text-black/80 mb-1.5">
                      {t.nameLabel}
                    </label>
                    <div className="relative">
                      <div className={`absolute top-1/2 -translate-y-1/2 ${isRtl ? 'right-3.5' : 'left-3.5'} text-black/40`}>
                        <User className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={t.namePlaceholder}
                        className={`w-full bg-[#F6F5F2] border border-black/10 rounded-xl py-3 ${isRtl ? 'pr-10 pl-4' : 'pl-10 pr-4'} text-sm text-black placeholder:text-black/40 focus:outline-none focus:border-black/40 focus:bg-white transition-all`}
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-bold text-black/80 mb-1.5">
                      {t.phoneLabel}
                    </label>
                    <div className="relative">
                      <div className={`absolute top-1/2 -translate-y-1/2 ${isRtl ? 'right-3.5' : 'left-3.5'} text-black/40`}>
                        <Phone className="w-4 h-4" />
                      </div>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder={t.phonePlaceholder}
                        className={`w-full bg-[#F6F5F2] border border-black/10 rounded-xl py-3 ${isRtl ? 'pr-10 pl-4' : 'pl-10 pr-4'} text-sm text-black placeholder:text-black/40 focus:outline-none focus:border-black/40 focus:bg-white transition-all`}
                        dir="ltr"
                      />
                    </div>
                  </div>

                  {/* Service Selector & Email in Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-bold text-black/80 mb-1.5">
                        {t.serviceLabel}
                      </label>
                      <select
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        className="w-full bg-[#F6F5F2] border border-black/10 rounded-xl py-3 px-3 text-sm text-black focus:outline-none focus:border-black/40 focus:bg-white transition-all"
                      >
                        <option value="tax">{t.services.tax}</option>
                        <option value="audit">{t.services.audit}</option>
                        <option value="incorporation">{t.services.incorporation}</option>
                        <option value="advisory">{t.services.advisory}</option>
                        <option value="other">{t.services.other}</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-black/80 mb-1.5">
                        {t.emailLabel}
                      </label>
                      <div className="relative">
                        <div className={`absolute top-1/2 -translate-y-1/2 ${isRtl ? 'right-3.5' : 'left-3.5'} text-black/40`}>
                          <Mail className="w-4 h-4" />
                        </div>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="example@mail.com"
                          className={`w-full bg-[#F6F5F2] border border-black/10 rounded-xl py-3 ${isRtl ? 'pr-10 pl-3' : 'pl-10 pr-3'} text-sm text-black placeholder:text-black/40 focus:outline-none focus:border-black/40 focus:bg-white transition-all`}
                          dir="ltr"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Notes / Details */}
                  <div>
                    <label className="block text-xs font-bold text-black/80 mb-1.5">
                      {t.notesLabel}
                    </label>
                    <div className="relative">
                      <div className={`absolute top-3.5 ${isRtl ? 'right-3.5' : 'left-3.5'} text-black/40`}>
                        <MessageSquare className="w-4 h-4" />
                      </div>
                      <textarea
                        rows={2}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder={t.notesPlaceholder}
                        className={`w-full bg-[#F6F5F2] border border-black/10 rounded-xl py-3 ${isRtl ? 'pr-10 pl-4' : 'pl-10 pr-4'} text-sm text-black placeholder:text-black/40 focus:outline-none focus:border-black/40 focus:bg-white transition-all resize-none`}
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-black text-white hover:bg-neutral-800 py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-lg transition-all active:scale-[0.99] disabled:opacity-70 mt-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                        <span>{t.submitting}</span>
                      </>
                    ) : (
                      <>
                        <Send className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
                        <span>{t.submit}</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            ) : (
              /* Success View */
              <div className="p-8 sm:p-12 text-center flex flex-col items-center">
                <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mb-6 shadow-inner">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-black mb-3">
                  {t.successTitle}
                </h3>
                <p className="text-sm text-black/60 max-w-sm mb-8 leading-relaxed">
                  {t.successDesc}
                </p>

                <div className="w-full bg-[#F6F5F2] rounded-2xl p-4 mb-8 border border-black/5 flex flex-col items-center gap-2">
                  <span className="text-xs text-black/50 font-medium">
                    {t.hotline}
                  </span>
                  <a
                    href="tel:+201223233620"
                    className="font-bold text-lg text-black hover:text-amber-700 hover:underline font-mono transition-colors"
                    dir="ltr"
                  >
                    +20 122 323 3620
                  </a>
                </div>

                <button
                  onClick={handleResetAndClose}
                  className="w-full bg-black text-white py-3.5 rounded-xl text-sm font-bold hover:bg-neutral-800 transition-colors"
                >
                  {t.doneBtn}
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
