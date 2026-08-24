import { MapPin, Phone, Mail, MessageCircle, ArrowUpRight } from 'lucide-react';
import type { LangType } from './language-selector';

interface FooterProps {
  isRtl?: boolean;
  lang?: LangType;
  setView: (view: 'home' | 'about' | 'contact' | 'services' | 'laws') => void;
}

const FOOTER_TEXT: Record<LangType, {
  name: string;
  sub: string;
  desc: string;
  quickLinks: string;
  home: string;
  about: string;
  services: string;
  laws: string;
  contact: string;
  address: string;
  cairo: string;
  mobile: string;
  mansoura: string;
  whatsapp: string;
  rights: string;
}> = {
  ar: {
    name: 'أحمد الشربيني وشركاه',
    sub: 'محاسبون ومراجعون قانونيون',
    desc: 'مكتب أحمد الشربينى وشركاه محاسبون ومراجعون قانونيون، خبراء في تقديم الاستشارات المالية، المراجعة المحاسبية وتأسيس الشركات لضمان نموك المالي بأمان.',
    quickLinks: 'روابط سريعة',
    home: 'الرئيسية',
    about: 'من نحن',
    services: 'الخدمات',
    laws: 'القوانين',
    contact: 'تواصل معنا',
    address: '59 مدينة الإعلام - العجوزة، القاهرة',
    cairo: 'القاهرة (أرضي)',
    mobile: 'المحمول الثاني',
    mansoura: 'المنصورة (أرضي)',
    whatsapp: 'الواتساب الأساسي',
    rights: 'جميع الحقوق محفوظة.'
  },
  en: {
    name: 'Ahmed El Sherbiny & Co.',
    sub: 'Certified Public Accountants & Auditors',
    desc: 'Ahmed El Sherbiny & Co. Certified Public Accountants and Auditors. Experts in financial consulting, auditing, and company formation in Egypt.',
    quickLinks: 'Quick Links',
    home: 'Home',
    about: 'About Us',
    services: 'Services',
    laws: 'Laws',
    contact: 'Contact Us',
    address: '59 Media City - Agouza, Cairo',
    cairo: 'Cairo Office',
    mobile: 'Mobile 2',
    mansoura: 'Mansoura Office',
    whatsapp: 'Primary WhatsApp',
    rights: 'All rights reserved.'
  },
  fr: {
    name: 'Ahmed El Sherbiny & Co.',
    sub: 'Experts-Comptables & Commissaires aux Comptes',
    desc: "Cabinet d'expertise comptable, d'audit financier et de conseil fiscal stratégique en Égypte.",
    quickLinks: 'Liens Rapides',
    home: 'Accueil',
    about: 'À Propos',
    services: 'Services',
    laws: 'Lois',
    contact: 'Contactez-nous',
    address: '59 Cité des Médias - Agouza, Le Caire',
    cairo: 'Le Caire (Fixe)',
    mobile: 'Mobile 2',
    mansoura: 'Mansourah (Fixe)',
    whatsapp: 'WhatsApp Principal',
    rights: 'Tous droits réservés.'
  },
  tr: {
    name: 'Ahmed El Sherbiny & Co.',
    sub: 'Yeminli Mali Müşavirlik ve Bağımsız Denetim',
    desc: "Mısır'da şirket kuruluşu, vergi danışmanlığı ve bağımsız denetim alanında 40 yılı aşkın güvenilir çözüm ortağınız.",
    quickLinks: 'Hızlı Bağlantılar',
    home: 'Ana Sayfa',
    about: 'Hakkımızda',
    services: 'Hizmetler',
    laws: 'Mevzuat',
    contact: 'İletişim',
    address: '59 Medya Şehri - Agouza, Kahire',
    cairo: 'Kahire (Sabit)',
    mobile: 'Mobil Hat 2',
    mansoura: 'Mansura (Sabit)',
    whatsapp: 'Ana WhatsApp',
    rights: 'Tüm hakları saklıdır.'
  }
};

export default function Footer({ isRtl = false, lang = 'ar', setView }: FooterProps) {
  const t = FOOTER_TEXT[lang] || FOOTER_TEXT.ar;

  return (
    <footer className="bg-black text-white pt-16 pb-12 border-t border-white/10" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="max-w-[88rem] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 mb-14">
          
          {/* Brand Column (5 cols) */}
          <div className="md:col-span-4 flex flex-col items-start">
            <div className="flex items-center gap-3 mb-5 bg-white/10 p-2.5 rounded-2xl backdrop-blur-sm border border-white/10">
              <img
                src={lang === 'ar' ? '/logo.png' : '/logo-en.png'}
                alt={t.name}
                className="h-10 w-auto object-contain brightness-0 invert"
              />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold mb-1.5 tracking-tight text-white">
              {t.name}
            </h3>
            <p className="text-xs text-amber-400/90 mb-4 font-semibold tracking-wide">
              {t.sub}
            </p>
            <p className="text-white/65 max-w-sm text-sm leading-relaxed mb-6">
              {t.desc}
            </p>
          </div>

          {/* Quick Links Column (3 cols) */}
          <div className="md:col-span-3 flex flex-col">
            <h4 className="text-base sm:text-lg font-bold mb-6 text-white border-b border-white/10 pb-2 inline-flex items-center gap-2">
              <span>{t.quickLinks}</span>
            </h4>
            <ul className="space-y-3.5 text-white/70">
              <li>
                <button
                  onClick={() => { setView('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-amber-400 hover:translate-x-1 rtl:hover:-translate-x-1 transition-all duration-200 text-sm font-medium inline-flex items-center gap-1.5"
                >
                  <span>{t.home}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setView('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-amber-400 hover:translate-x-1 rtl:hover:-translate-x-1 transition-all duration-200 text-sm font-medium inline-flex items-center gap-1.5"
                >
                  <span>{t.about}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setView('services'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-amber-400 hover:translate-x-1 rtl:hover:-translate-x-1 transition-all duration-200 text-sm font-medium inline-flex items-center gap-1.5"
                >
                  <span>{t.services}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setView('laws'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-amber-400 hover:translate-x-1 rtl:hover:-translate-x-1 transition-all duration-200 text-sm font-medium inline-flex items-center gap-1.5"
                >
                  <span>{t.laws}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setView('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-amber-400 hover:translate-x-1 rtl:hover:-translate-x-1 transition-all duration-200 text-sm font-medium inline-flex items-center gap-1.5"
                >
                  <span>{t.contact}</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details Column (5 cols) */}
          <div className="md:col-span-5 flex flex-col">
            <h4 className="text-base sm:text-lg font-bold mb-6 text-white border-b border-white/10 pb-2 inline-flex items-center gap-2">
              <span>{t.contact}</span>
            </h4>

            <div className="space-y-3.5">
              {/* Address */}
              <a
                href="https://www.google.com/maps/search/?api=1&query=59+Media+City%2C+Agouza%2C+Giza%2C+Cairo"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-3 p-3 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center shrink-0 text-white/70 group-hover:text-amber-400 transition-colors">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span className="text-xs sm:text-sm text-white/80 group-hover:text-white transition-colors leading-relaxed">
                    {t.address}
                  </span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-white transition-colors shrink-0" />
              </a>

              {/* WhatsApp Primary Highlight Card */}
              <a
                href="https://wa.me/201223233620"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-3 p-3 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/20 flex items-center justify-center shrink-0 text-emerald-400">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-emerald-300 font-bold uppercase tracking-wider">
                      {t.whatsapp}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-white tracking-wide" dir="ltr">
                      +20 122 323 3620
                    </span>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-full border border-emerald-400/20 group-hover:bg-emerald-400 group-hover:text-black transition-colors shrink-0">
                  {isRtl ? 'محادثة' : 'Chat'}
                </span>
              </a>

              {/* Phone Lines Clean Grid */}
              <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 space-y-2.5">
                <div className="flex items-center justify-between text-xs sm:text-sm pb-2 border-b border-white/5">
                  <span className="text-white/60 font-medium">{t.cairo}:</span>
                  <a
                    href="tel:+20233470139"
                    className="font-semibold text-white/90 hover:text-amber-400 transition-colors inline-flex items-center gap-1.5"
                    dir="ltr"
                  >
                    <Phone className="w-3 h-3 text-white/40" />
                    <span>+20 2 3347 0139</span>
                  </a>
                </div>

                <div className="flex items-center justify-between text-xs sm:text-sm pb-2 border-b border-white/5">
                  <span className="text-white/60 font-medium">{t.mobile}:</span>
                  <a
                    href="tel:+201066162823"
                    className="font-semibold text-white/90 hover:text-amber-400 transition-colors inline-flex items-center gap-1.5"
                    dir="ltr"
                  >
                    <Phone className="w-3 h-3 text-white/40" />
                    <span>+20 106 616 2823</span>
                  </a>
                </div>

                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="text-white/60 font-medium">{t.mansoura}:</span>
                  <a
                    href="tel:+20502269057"
                    className="font-semibold text-white/90 hover:text-amber-400 transition-colors inline-flex items-center gap-1.5"
                    dir="ltr"
                  >
                    <Phone className="w-3 h-3 text-white/40" />
                    <span>+20 50 2269 057</span>
                  </a>
                </div>
              </div>

              {/* Email */}
              <a
                href="mailto:Sherbiny.co@gmail.com"
                className="flex items-center justify-between gap-3 p-3 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center shrink-0 text-white/70 group-hover:text-amber-400 transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span className="text-xs sm:text-sm text-white/80 group-hover:text-white transition-colors" dir="ltr">
                    Sherbiny.co@gmail.com
                  </span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-white transition-colors shrink-0" />
              </a>

            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-start">
          <p className="text-white/50 text-xs sm:text-sm font-medium">
            © {new Date().getFullYear()} {t.name}. {t.rights}
          </p>
          <div className="flex items-center gap-6 text-xs text-white/40">
            <span>Cairo • Mansoura • Egypt</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
