import { useState } from 'react';
import { ArrowLeft, ArrowRight, MapPin, Phone, Mail, Clock, Send, ExternalLink, MessageCircle, QrCode } from 'lucide-react';
import Footer from './components/ui/footer';
import type { LangType } from './components/ui/language-selector';

const BRANCHES: Record<LangType, { city: string; address: string; phones: string[]; mapUrl: string }[]> = {
  en: [
    {
      city: 'Cairo (Headquarters)',
      address: '59 Media City - Agouza, Cairo',
      phones: ['+20 2 3347 0139', '+20 106 616 2823'],
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=59+Media+City%2C+Agouza%2C+Giza%2C+Cairo'
    },
    {
      city: 'Mansoura',
      address: 'Al Hegaz Tower - Tamyouhi Square',
      phones: ['+20 50 2269 057'],
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=Al+Hegaz+Tower+Tamyouhi+Square+Mansoura'
    }
  ],
  ar: [
    {
      city: 'القاهرة (المقر الرئيسي)',
      address: '59 مدينة الإعلام - العجوزة، القاهرة',
      phones: ['33470139 (02)', '0106 6162823'],
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=59+Media+City%2C+Agouza%2C+Giza%2C+Cairo'
    },
    {
      city: 'المنصورة',
      address: 'برج الحجاز - ميدان الطميهى',
      phones: ['2269057 (050)'],
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=Al+Hegaz+Tower+Tamyouhi+Square+Mansoura'
    }
  ],
  fr: [
    {
      city: 'Le Caire (Siège Principal)',
      address: '59 Cité des Médias - Agouza, Le Caire',
      phones: ['+20 2 3347 0139', '+20 106 616 2823'],
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=59+Media+City%2C+Agouza%2C+Giza%2C+Cairo'
    },
    {
      city: 'Mansourah',
      address: 'Tour Al Hegaz - Place Tamyouhi',
      phones: ['+20 50 2269 057'],
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=Al+Hegaz+Tower+Tamyouhi+Square+Mansoura'
    }
  ],
  tr: [
    {
      city: 'Kahire (Genel Merkez)',
      address: '59 Medya Şehri - Agouza, Kahire',
      phones: ['+20 2 3347 0139', '+20 106 616 2823'],
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=59+Media+City%2C+Agouza%2C+Giza%2C+Cairo'
    },
    {
      city: 'Mansura',
      address: 'Al Hegaz Kulesi - Tamyouhi Meydanı',
      phones: ['+20 50 2269 057'],
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=Al+Hegaz+Tower+Tamyouhi+Square+Mansoura'
    }
  ]
};

const DIRECT_PHONES: { label: Record<LangType, string>; phone: string; isPrimary?: boolean }[] = [
  {
    label: {
      ar: 'الرقم الأساسي / واتساب',
      en: 'Primary / WhatsApp',
      fr: 'Numéro Principal / WhatsApp',
      tr: 'Ana Hat / WhatsApp'
    },
    phone: '+20 122 323 3620',
    isPrimary: true
  },
  {
    label: {
      ar: 'القاهرة (أرضي)',
      en: 'Cairo Office',
      fr: 'Le Caire (Fixe)',
      tr: 'Kahire (Sabit)'
    },
    phone: '+20 2 3347 0139'
  },
  {
    label: {
      ar: 'المحمول الثاني',
      en: 'Mobile 2',
      fr: 'Mobile 2',
      tr: 'Mobil Hat 2'
    },
    phone: '+20 106 616 2823'
  },
  {
    label: {
      ar: 'المنصورة (أرضي)',
      en: 'Mansoura Office',
      fr: 'Mansourah (Fixe)',
      tr: 'Mansura (Sabit)'
    },
    phone: '+20 50 2269 057'
  }
];

const CONTACT_INFO: Record<LangType, {
  title: string;
  subtitle: string;
  workingHoursTitle: string;
  workingHours: string;
  branchesTitle: string;
  phonesTitle: string;
  emailTitle: string;
  emails: string[];
  openMap: string;
  callNow: string;
  qrBadge: string;
  qrTitle: string;
  qrDesc: string;
  form: { name: string; email: string; phone: string; message: string; submit: string };
  back: string;
}> = {
  en: {
    title: 'Get in Touch',
    subtitle: 'We are here to answer any questions you may have about our financial and tax consulting services. Reach out to us and we\'ll respond promptly.',
    workingHoursTitle: 'Working Hours',
    workingHours: 'Questions? Fill out this form and we will get back to you as soon as possible! Our team responds to inquiries within 4 hours. Working hours are Saturday to Thursday from 9 AM to 9 PM.',
    branchesTitle: 'Our Branches',
    phonesTitle: 'Direct Phone Lines',
    emailTitle: 'Email Us',
    emails: ['Sherbiny.co@gmail.com', 'A.elsherbiny@yahoo.com'],
    openMap: 'Open in Google Maps',
    callNow: 'Call',
    qrBadge: 'Instant Contact QR Code',
    qrTitle: 'Scan to Save Contact',
    qrDesc: 'Scan with your smartphone camera to instantly save Ahmed El Sherbiny & Co. official contact details.',
    form: {
      name: 'Full Name',
      email: 'Email Address',
      phone: 'Phone Number',
      message: 'Your Message',
      submit: 'Send Message'
    },
    back: 'Back'
  },
  ar: {
    title: 'تواصل معنا',
    subtitle: 'نحن هنا للإجابة على أي أسئلة قد تكون لديكم حول خدماتنا الاستشارية المالية والضريبية. تواصل معنا وسنرد عليك في أسرع وقت.',
    workingHoursTitle: 'ساعات العمل',
    workingHours: 'الأسئلة ؟ املأ هذا النموذج ونعود إليك في أقرب وقت ممكن! نحاول الإجابة على استفسارك خلال 4 ساعات. يرجى ملاحظة أن أيام العمل لدينا هي من السبت إلى الخميس من الساعة 9 صباحًا إلى 9 مساءً.',
    branchesTitle: 'فروعنا وعناويننا',
    phonesTitle: 'خطوط الاتصال المباشرة',
    emailTitle: 'البريد الإلكتروني',
    emails: ['Sherbiny.co@gmail.com', 'A.elsherbiny@yahoo.com'],
    openMap: 'فتح الموقع في خرائط Google',
    callNow: 'اتصال',
    qrBadge: 'حفظ بيانات التواصل الفوري',
    qrTitle: 'امسح الرمز ضوئياً (Scan QR)',
    qrDesc: 'امسح الكود بكاميرا هاتفك لحفظ أرقام وعناوين مكتب أحمد الشربيني وشركاه مباشرة في جهات اتصالك.',
    form: {
      name: 'الاسم الكامل',
      email: 'البريد الإلكتروني',
      phone: 'رقم الهاتف',
      message: 'نص الرسالة',
      submit: 'إرسال الرسالة'
    },
    back: 'العودة'
  },
  fr: {
    title: 'Contactez-nous',
    subtitle: "Nous sommes à votre disposition pour répondre à toutes vos questions relatives à nos services d'audit, de fiscalité et de création d'entreprises en Égypte.",
    workingHoursTitle: "Horaires d'Ouverture",
    workingHours: "Du Samedi au Jeudi, de 9h00 à 21h00. Notre équipe d'experts répond à vos demandes sous 4 heures.",
    branchesTitle: 'Nos Agences & Adresses',
    phonesTitle: 'Lignes Téléphoniques Directes',
    emailTitle: 'Contact Email',
    emails: ['Sherbiny.co@gmail.com', 'A.elsherbiny@yahoo.com'],
    openMap: 'Ouvrir dans Google Maps',
    callNow: 'Appeler',
    qrBadge: 'QR Code de Contact Immédiat',
    qrTitle: 'Scannez pour Enregistrer le Contact',
    qrDesc: "Scannez avec l'appareil photo de votre smartphone pour enregistrer directement les coordonnées du cabinet.",
    form: {
      name: 'Nom Complet',
      email: 'Adresse Email',
      phone: 'Numéro de Téléphone',
      message: 'Votre Message',
      submit: 'Envoyer le Message'
    },
    back: 'Retour'
  },
  tr: {
    title: 'İletişime Geçin',
    subtitle: "Mısır'daki mali müşavirlik, şirket kuruluşu ve vergi danışmanlığı خدماتlerimiz hakkında sorularınız için bize ulaşın.",
    workingHoursTitle: 'Çalışma Saatleri',
    workingHours: 'Cumartesi - Perşembe: 09:00 - 21:00. Ekibimiz sorularınıza en geç 4 saat içinde dönüş sağlamaktadır.',
    branchesTitle: 'Şubelerimiz ve Adreslerimiz',
    phonesTitle: 'Doğrudan İletişim Hatları',
    emailTitle: 'E-posta',
    emails: ['Sherbiny.co@gmail.com', 'A.elsherbiny@yahoo.com'],
    openMap: "Google Haritalar'da Aç",
    callNow: 'Ara',
    qrBadge: 'Hızlı İletişim Karekodu',
    qrTitle: 'Karekod ile İletişim Bilgilerini Kaydedin',
    qrDesc: "Ahmed El Sherbiny & Co. iletişim bilgilerini doğrudan rehberinize kaydetmek için akıllı telefonunuzla tarayın.",
    form: {
      name: 'Ad Soyad',
      email: 'E-posta Adresi',
      phone: 'Telefon Numarası',
      message: 'Mesajınız',
      submit: 'Mesajı Gönder'
    },
    back: 'Geri'
  }
};

interface ContactProps {
  lang: LangType;
  setView: (view: 'home' | 'about' | 'contact' | 'services' | 'laws') => void;
  onBookConsultation?: () => void;
}

export default function Contact({ lang, setView, onBookConsultation }: ContactProps) {
  const isRtl = lang === 'ar';
  const BackIcon = isRtl ? ArrowRight : ArrowLeft;
  const t = CONTACT_INFO[lang];
  const branches = BRANCHES[lang];

  const [formState, setFormState] = useState({ name: '', email: '', phone: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: `رسالة تواصل جديدة من: ${formState.name}`,
          name: formState.name,
          email: formState.email,
          phone: formState.phone || 'غير محدد',
          message: formState.message
        })
      });

      if (res.ok) {
        setIsSuccess(true);
        setFormState({ name: '', email: '', phone: '', message: '' });
        setTimeout(() => setIsSuccess(false), 8000);
      } else {
        alert(isRtl ? 'حدث خطأ أثناء الإرسال، يرجى المحاولة مرة أخرى.' : 'Error sending message, please try again.');
      }
    } catch (err) {
      console.error('Contact form error:', err);
      alert(isRtl ? 'حدث خطأ في الاتصال، يرجى المحاولة لاحقاً.' : 'Connection error, please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const sanitizePhone = (phone: string) => phone.replace(/[^\d+]/g, '');

  return (
    <div 
      className="absolute inset-0 bg-white text-black overflow-y-auto font-sans" 
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* Navbar/Header area */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-black/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <button 
            onClick={() => setView('home')} 
            className="inline-flex items-center gap-2 text-black/70 hover:text-black transition-colors duration-200"
          >
            <BackIcon className="w-5 h-5" />
            <span className="font-medium text-lg">{t.back}</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
        
        {/* Page Header */}
        <div className="max-w-3xl mb-16">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">{t.title}</h1>
          <p className="text-lg md:text-xl text-black/60 leading-relaxed max-w-2xl">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Left Column: Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              {isSuccess && (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-sm font-semibold flex items-center gap-2.5 animate-fadeIn">
                  <span>{isRtl ? '✅ تم إرسال رسالتك بنجاح وسنقوم بالرد عليك في أقرب وقت!' : '✅ Your message was sent successfully! We will get back to you shortly.'}</span>
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-black/70">{t.form.name}</label>
                  <input 
                    required
                    type="text" 
                    value={formState.name}
                    onChange={e => setFormState({...formState, name: e.target.value})}
                    className="w-full bg-black/5 border-none rounded-xl px-5 py-4 focus:ring-2 focus:ring-black outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-black/70">{t.form.phone}</label>
                  <input 
                    type="tel" 
                    value={formState.phone}
                    onChange={e => setFormState({...formState, phone: e.target.value})}
                    className="w-full bg-black/5 border-none rounded-xl px-5 py-4 focus:ring-2 focus:ring-black outline-none transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-black/70">{t.form.email}</label>
                <input 
                  required
                  type="email" 
                  value={formState.email}
                  onChange={e => setFormState({...formState, email: e.target.value})}
                  className="w-full bg-black/5 border-none rounded-xl px-5 py-4 focus:ring-2 focus:ring-black outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-black/70">{t.form.message}</label>
                <textarea 
                  required
                  rows={5}
                  value={formState.message}
                  onChange={e => setFormState({...formState, message: e.target.value})}
                  className="w-full bg-black/5 border-none rounded-xl px-5 py-4 focus:ring-2 focus:ring-black outline-none transition-all resize-none"
                />
              </div>
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto bg-black text-white px-8 py-4 rounded-xl font-medium hover:bg-black/80 transition-colors inline-flex justify-center items-center gap-2 disabled:opacity-60"
              >
                <span>{isSubmitting ? (isRtl ? 'جاري الإرسال...' : 'Sending...') : t.form.submit}</span>
                <Send className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
              </button>
            </form>
          </div>

          {/* Right Column: Contact Information */}
          <div className="space-y-12">
            
            {/* Working Hours */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center text-black">
                  <Clock className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-semibold">{t.workingHoursTitle}</h3>
              </div>
              <p className="text-black/60 leading-relaxed pl-13 rtl:pl-0 rtl:pr-13">
                {t.workingHours}
              </p>
            </div>

            {/* Email & Direct Phones */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pl-13 rtl:pl-0 rtl:pr-13">
              <div>
                <div className="flex items-center gap-3 mb-3 text-black">
                  <Phone className="w-5 h-5" />
                  <h4 className="font-semibold">{t.phonesTitle}</h4>
                </div>
                <div className="space-y-2">
                  {DIRECT_PHONES.map((item, i) => (
                    <div key={i} className="flex items-center justify-between group py-1 border-b border-black/5 last:border-0">
                      <span className="text-xs text-black/60 font-medium">
                        {item.label[lang] || item.label.en}
                      </span>
                      <a
                        href={`tel:${sanitizePhone(item.phone)}`}
                        className={`text-sm inline-flex items-center gap-1.5 transition-colors ${
                          item.isPrimary
                            ? 'font-bold text-black hover:text-amber-600'
                            : 'text-black/80 hover:text-black font-medium'
                        }`}
                        dir="ltr"
                      >
                        <Phone className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
                        <span className="group-hover:underline underline-offset-4">{item.phone}</span>
                      </a>
                    </div>
                  ))}
                  <a
                    href="https://wa.me/201223233620"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-2 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-bold hover:bg-emerald-100 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{isRtl ? 'تواصل عبر الواتساب' : 'Chat on WhatsApp'}</span>
                  </a>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-3 text-black">
                  <Mail className="w-5 h-5" />
                  <h4 className="font-semibold">{t.emailTitle}</h4>
                </div>
                <div className="space-y-2">
                  {t.emails.map((email, idx) => (
                    <a
                      key={idx}
                      href={`mailto:${email}`}
                      className="block text-sm text-black/70 hover:text-black hover:underline underline-offset-4 transition-colors"
                    >
                      {email}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Branches Cards - Fully Clickable */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center text-black">
                  <MapPin className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-semibold">{t.branchesTitle}</h3>
              </div>

              <div className="grid grid-cols-1 gap-4 pl-13 rtl:pl-0 rtl:pr-13">
                {branches.map((branch, idx) => (
                  <div
                    key={idx}
                    className="bg-black/5 hover:bg-black/[0.08] p-5 rounded-2xl transition-all border border-black/5 flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-bold text-lg text-black">{branch.city}</h4>
                        <a
                          href={branch.mapUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-medium text-black/60 hover:text-black bg-white px-2.5 py-1 rounded-full border border-black/10 shadow-2xs transition-colors"
                        >
                          <span>{t.openMap}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                      
                      <a
                        href={branch.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-black/70 text-sm mb-3 hover:text-black hover:underline underline-offset-4 leading-relaxed"
                      >
                        {branch.address}
                      </a>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-black/10 text-sm">
                      <span className="text-xs text-black/50 font-medium">{t.callNow}:</span>
                      {branch.phones.map((phone, pIdx) => (
                        <a
                          key={pIdx}
                          href={`tel:${sanitizePhone(phone)}`}
                          className="inline-flex items-center gap-1 font-semibold text-black/80 hover:text-amber-600 hover:underline transition-colors"
                          dir="ltr"
                        >
                          <Phone className="w-3 h-3 text-black/50" />
                          <span>{phone}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* QR Code Quick Save Card */}
            <div className="pl-13 rtl:pl-0 rtl:pr-13">
              <div className="bg-gradient-to-br from-neutral-900 to-black text-white p-6 sm:p-7 rounded-3xl shadow-xl border border-white/10 flex flex-col sm:flex-row items-center gap-6">
                <div className="bg-white p-3 rounded-2xl shadow-lg shrink-0 flex items-center justify-center border-2 border-white/80">
                  <img src="/qr-code.png" alt="Office Contact QR Code" className="w-28 h-28 sm:w-32 sm:h-32 object-contain" />
                </div>
                <div className="text-center sm:text-start flex flex-col items-center sm:items-start">
                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold mb-2.5 border border-amber-400/30">
                    <QrCode className="w-3.5 h-3.5" />
                    <span>{t.qrBadge}</span>
                  </div>
                  <h4 className="text-lg sm:text-xl font-bold text-white mb-1.5 tracking-tight">
                    {t.qrTitle}
                  </h4>
                  <p className="text-xs sm:text-sm text-white/70 leading-relaxed max-w-sm">
                    {t.qrDesc}
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      <Footer isRtl={isRtl} lang={lang} setView={setView} />
    </div>
  );
}
