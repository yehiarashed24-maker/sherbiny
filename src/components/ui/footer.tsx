import { MapPin, Phone, Mail, MessageCircle } from 'lucide-react';
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
    rights: 'Tüm hakları saklıdır.'
  }
};

export default function Footer({ isRtl = false, lang = 'ar', setView }: FooterProps) {
  const t = FOOTER_TEXT[lang] || FOOTER_TEXT.en;

  return (
    <footer className="bg-black text-white pt-16 pb-8" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="max-w-[88rem] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1 flex flex-col items-start">
            <div className="flex items-center gap-3 mb-4 bg-white/10 p-2.5 rounded-2xl backdrop-blur-sm">
              <img
                src={lang === 'ar' ? '/logo.png' : '/logo-en.png'}
                alt={t.name}
                className="h-10 w-auto object-contain brightness-0 invert"
              />
            </div>
            <h3 className="text-xl font-bold mb-1">
              {t.name}
            </h3>
            <p className="text-xs text-white/50 mb-4 font-medium">
              {t.sub}
            </p>
            <p className="text-white/60 mb-6 max-w-sm text-sm leading-relaxed">
              {t.desc}
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col">
            <h4 className="text-lg font-semibold mb-6">{t.quickLinks}</h4>
            <ul className="space-y-4 text-white/70">
              <li>
                <button onClick={() => setView('home')} className="hover:text-white transition-colors text-sm">
                  {t.home}
                </button>
              </li>
              <li>
                <button onClick={() => setView('about')} className="hover:text-white transition-colors text-sm">
                  {t.about}
                </button>
              </li>
              <li>
                <button onClick={() => setView('services')} className="hover:text-white transition-colors text-sm">
                  {t.services}
                </button>
              </li>
              <li>
                <button onClick={() => setView('laws')} className="hover:text-white transition-colors text-sm">
                  {t.laws}
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col col-span-1 md:col-span-2">
            <h4 className="text-lg font-semibold mb-6">{t.contact}</h4>
            <ul className="space-y-4 text-white/70">
              <li>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=59+Media+City%2C+Agouza%2C+Giza%2C+Cairo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 hover:text-white group transition-colors"
                >
                  <MapPin className="w-5 h-5 mt-0.5 shrink-0 text-white/50 group-hover:text-amber-400 transition-colors" />
                  <span className="text-sm leading-relaxed group-hover:underline underline-offset-4">
                    {t.address}
                  </span>
                </a>
              </li>
              <li>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 shrink-0 text-white/50" />
                  <div className="flex flex-wrap items-center gap-2 text-sm" dir="ltr">
                    <a
                      href="tel:+20222718131"
                      className="hover:text-amber-400 hover:underline underline-offset-4 transition-colors font-medium"
                    >
                      +20 222718131
                    </a>
                    <span className="text-white/30">/</span>
                    <a
                      href="tel:+201205373330"
                      className="hover:text-amber-400 hover:underline underline-offset-4 transition-colors font-medium"
                    >
                      +20 1205373330
                    </a>
                  </div>
                </div>
              </li>
              <li>
                <a
                  href="https://wa.me/201223233620"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:text-emerald-400 group transition-colors"
                >
                  <MessageCircle className="w-5 h-5 shrink-0 text-emerald-500 group-hover:text-emerald-400 transition-colors" />
                  <span className="text-sm font-medium group-hover:underline underline-offset-4" dir="ltr">
                    WhatsApp: +20 122 323 3620
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:Sherbiny.co@gmail.com"
                  className="flex items-center gap-3 hover:text-white group transition-colors"
                >
                  <Mail className="w-5 h-5 shrink-0 text-white/50 group-hover:text-amber-400 transition-colors" />
                  <span className="text-sm group-hover:underline underline-offset-4">Sherbiny.co@gmail.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} {t.name}. {t.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
