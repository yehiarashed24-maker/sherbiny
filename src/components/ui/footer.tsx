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
  chat: string;
  rights: string;
  qrLabel: string;
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
    chat: 'محادثة',
    rights: 'جميع الحقوق محفوظة.',
    qrLabel: 'بيانات التواصل الفوري'
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
    chat: 'Chat',
    rights: 'All rights reserved.',
    qrLabel: 'Instant Contact & QR'
  },
  fr: {
    name: 'Ahmed El Sherbiny & Co.',
    sub: 'Experts-Comptables & Commissaires aux Comptes',
    desc: "Cabinet d'expertise comptable, d'audit financier et de conseil fiscal stratégique en Égypte pour assurer votre croissance financière en toute sécurité.",
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
    chat: 'Discuter',
    rights: 'Tous droits réservés.',
    qrLabel: 'Contact Immédiat'
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
    chat: 'Sohbet',
    rights: 'Tüm hakları saklıdır.',
    qrLabel: 'Hızlı İletişim'
  },
  ja: {
    name: 'アハメド・エル・シェルビニ事務所',
    sub: '公認会計士および監査人',
    desc: 'アハメド・エル・シェルビニ公認会計士・監査法人。エジプトにおける財務コンサルティング、会計監査、会社設立の専門家として、お客様の安全な成長を支援します。',
    quickLinks: 'クイックリンク',
    home: 'ホーム',
    about: '私たちについて',
    services: 'サービス',
    laws: '法律',
    contact: 'お問い合わせ',
    address: 'カイロ、アグーザ、メディアシティ59',
    cairo: 'カイロオフィス',
    mobile: 'モバイル2',
    mansoura: 'マンスーラオフィス',
    whatsapp: 'メインのWhatsApp',
    chat: 'チャット',
    rights: '全著作権所有。',
    qrLabel: 'インスタント連絡先'
  },
  zh: {
    name: '艾哈迈德·谢尔比尼公司',
    sub: '注册会计师和审计师',
    desc: '艾哈迈德·谢尔比尼会计师事务所，公认会计师与审计师。埃及财务咨询、会计审计及公司设立领域的专家，全力守护您的财富增长。',
    quickLinks: '快速链接',
    home: '首页',
    about: '关于我们',
    services: '服务',
    laws: '法律',
    contact: '联系我们',
    address: '开罗阿古扎媒体城59号',
    cairo: '开罗办公室',
    mobile: '手机2',
    mansoura: '曼苏拉办公室',
    whatsapp: '主要WhatsApp',
    chat: '聊天',
    rights: '版权所有。',
    qrLabel: '即时联系与二维码'
  },
  ko: {
    name: '아흐메드 엘 셰르비니 주식회사',
    sub: '공인 회계사 및 감사관',
    desc: '아흐메드 엘 셰르비니 공인회계사 및 감사 법인. 이집트 내 재무 컨설팅, 회계 감사 및 회사 설립 전문 기업으로 고객의 안전한 금융 성장을 지원합니다.',
    quickLinks: '빠른 링크',
    home: '홈',
    about: '회사 소개',
    services: '서비스',
    laws: '법률',
    contact: '문의하기',
    address: '카이로 아구자 미디어 시티 59번지',
    cairo: '카이로 사무소',
    mobile: '모바일 2',
    mansoura: '만수라 사무소',
    whatsapp: '기본 WhatsApp',
    chat: '채팅',
    rights: '모든 권리 보유.',
    qrLabel: '빠른 연락처 및 QR'
  },
  es: {
    name: 'Ahmed El Sherbiny & Co.',
    sub: 'Contadores Públicos y Auditores',
    desc: 'Ahmed El Sherbiny & Co. Contadores Públicos y Auditores. Expertos en consultoría financiera, auditoría y formación de empresas en Egipto.',
    quickLinks: 'Enlaces Rápidos',
    home: 'Inicio',
    about: 'Acerca de',
    services: 'Servicios',
    laws: 'Leyes',
    contact: 'Contáctanos',
    address: '59 Media City - Agouza, El Cairo',
    cairo: 'Oficina de El Cairo',
    mobile: 'Móvil 2',
    mansoura: 'Oficina de Mansoura',
    whatsapp: 'WhatsApp Principal',
    chat: 'Chat',
    rights: 'Todos los derechos reservados.',
    qrLabel: 'Contacto Inmediato'
  },
  it: {
    name: 'Ahmed El Sherbiny & Co.',
    sub: 'Dottori Commercialisti e Revisori Legali',
    desc: 'Studio Ahmed El Sherbiny & Co. Dottori Commercialisti e Revisori Contabili. Esperti in consulenza tributaria, revisione contabile e costituzione societaria in Egitto.',
    quickLinks: 'Collegamenti Rapidi',
    home: 'Home',
    about: 'Chi Siamo',
    services: 'Servizi',
    laws: 'Leggi',
    contact: 'Contattaci',
    address: '59 Media City - Agouza, Il Cairo',
    cairo: 'Ufficio Il Cairo (Fisso)',
    mobile: 'Cellulare 2',
    mansoura: 'Ufficio Mansura (Fisso)',
    whatsapp: 'WhatsApp Principale',
    chat: 'Chat',
    rights: 'Tutti i diritti riservati.',
    qrLabel: 'Contatto Rapido & QR'
  }
};

export default function Footer({ isRtl = false, lang = 'ar', setView }: FooterProps) {
  const t = FOOTER_TEXT[lang] || FOOTER_TEXT.ar;

  return (
    <footer 
      className="relative text-white pt-16 pb-28 md:pb-12 border-t border-[#1e4632]/50 overflow-hidden" 
      style={{
        background: 'radial-gradient(ellipse at 50% 0%, #163625 0%, #0d2217 40%, #07130d 100%)'
      }}
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* Ambient green & gold glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(16,185,129,0.08),_transparent_65%)] pointer-events-none" />

      <div className="max-w-[88rem] mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 mb-14">
          
          {/* Brand Column (4 cols) */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <div className="flex items-center gap-3 mb-5 bg-[#122e20]/80 p-2.5 rounded-2xl backdrop-blur-sm border border-[#235338]/60 shadow-lg">
              <img
                src={lang === 'ar' ? '/logo.png' : '/logo-en.png'}
                alt={t.name}
                className="h-10 w-auto object-contain brightness-0 invert"
              />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold mb-1.5 tracking-tight text-white">
              {t.name}
            </h3>
            <p className="text-xs text-amber-300 mb-4 font-semibold tracking-wide">
              {t.sub}
            </p>
            <p className="text-white/70 max-w-sm text-sm leading-relaxed mb-6">
              {t.desc}
            </p>
          </div>

          {/* Quick Links Column (2 cols) */}
          <div className="lg:col-span-2 flex flex-col">
            <h4 className="text-base sm:text-lg font-bold mb-6 text-white border-b border-[#235338]/60 pb-2 inline-flex items-center gap-2">
              <span>{t.quickLinks}</span>
            </h4>
            <ul className="space-y-3.5 text-white/75">
              <li>
                <button
                  onClick={() => { setView('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-amber-300 hover:translate-x-1 rtl:hover:-translate-x-1 transition-all duration-200 text-sm font-medium inline-flex items-center gap-1.5"
                >
                  <span>{t.home}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setView('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-amber-300 hover:translate-x-1 rtl:hover:-translate-x-1 transition-all duration-200 text-sm font-medium inline-flex items-center gap-1.5"
                >
                  <span>{t.about}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setView('services'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-amber-300 hover:translate-x-1 rtl:hover:-translate-x-1 transition-all duration-200 text-sm font-medium inline-flex items-center gap-1.5"
                >
                  <span>{t.services}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setView('laws'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-amber-300 hover:translate-x-1 rtl:hover:-translate-x-1 transition-all duration-200 text-sm font-medium inline-flex items-center gap-1.5"
                >
                  <span>{t.laws}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setView('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-amber-300 hover:translate-x-1 rtl:hover:-translate-x-1 transition-all duration-200 text-sm font-medium inline-flex items-center gap-1.5"
                >
                  <span>{t.contact}</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details Column (3 cols) */}
          <div className="lg:col-span-3 flex flex-col">
            <h4 className="text-base sm:text-lg font-bold mb-6 text-white border-b border-[#235338]/60 pb-2 inline-flex items-center gap-2">
              <span>{t.contact}</span>
            </h4>

            <div className="space-y-3">
              {/* Address */}
              <a
                href="https://www.google.com/maps/search/?api=1&query=59+Media+City%2C+Agouza%2C+Giza%2C+Cairo"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-3 p-3 rounded-2xl bg-[#0f291c]/70 hover:bg-[#143625]/90 border border-[#235338]/50 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center shrink-0 text-white/80 group-hover:text-amber-300 transition-colors">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span className="text-xs sm:text-sm text-white/85 group-hover:text-white transition-colors leading-relaxed">
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
                className="flex items-center justify-between gap-3 p-3 rounded-2xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-400/40 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/20 flex items-center justify-center shrink-0 text-emerald-300">
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
                <span className="text-[11px] font-bold text-emerald-300 bg-emerald-400/15 px-2.5 py-1 rounded-full border border-emerald-400/30 group-hover:bg-emerald-400 group-hover:text-black transition-colors shrink-0">
                  {t.chat}
                </span>
              </a>

              {/* Phone Lines Clean Grid */}
              <div className="p-3 rounded-2xl bg-[#0f291c]/70 border border-[#235338]/50 space-y-2">
                <div className="flex items-center justify-between text-xs sm:text-sm pb-1.5 border-b border-white/5">
                  <span className="text-white/70 font-medium">{t.cairo}:</span>
                  <a
                    href="tel:+20233470139"
                    className="font-semibold text-white hover:text-amber-300 transition-colors inline-flex items-center gap-1.5"
                    dir="ltr"
                  >
                    <Phone className="w-3 h-3 text-white/50" />
                    <span>+20 2 3347 0139</span>
                  </a>
                </div>

                <div className="flex items-center justify-between text-xs sm:text-sm pb-1.5 border-b border-white/5">
                  <span className="text-white/70 font-medium">{t.mobile}:</span>
                  <a
                    href="tel:+201066162823"
                    className="font-semibold text-white hover:text-amber-300 transition-colors inline-flex items-center gap-1.5"
                    dir="ltr"
                  >
                    <Phone className="w-3 h-3 text-white/50" />
                    <span>+20 106 616 2823</span>
                  </a>
                </div>

                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="text-white/70 font-medium">{t.mansoura}:</span>
                  <a
                    href="tel:+20502269057"
                    className="font-semibold text-white hover:text-amber-300 transition-colors inline-flex items-center gap-1.5"
                    dir="ltr"
                  >
                    <Phone className="w-3 h-3 text-white/50" />
                    <span>+20 50 2269 057</span>
                  </a>
                </div>
              </div>

              {/* Email */}
              <a
                href="mailto:Sherbiny.co@gmail.com"
                className="flex items-center justify-between gap-3 p-3 rounded-2xl bg-[#0f291c]/70 hover:bg-[#143625]/90 border border-[#235338]/50 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center shrink-0 text-white/80 group-hover:text-amber-300 transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span className="text-xs sm:text-sm text-white/85 group-hover:text-white transition-colors" dir="ltr">
                    Sherbiny.co@gmail.com
                  </span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-white transition-colors shrink-0" />
              </a>

            </div>
          </div>

          {/* QR Code & Signature Column (3 cols) */}
          <div className="lg:col-span-3 flex flex-col items-center sm:items-start lg:items-center">
            <h4 className="text-base sm:text-lg font-bold mb-6 text-white border-b border-[#235338]/60 pb-2 w-full text-center sm:text-start inline-flex items-center justify-center sm:justify-start gap-2">
              <span>{t.qrLabel || (lang === 'ar' ? 'بيانات التواصل الفوري' : 'Instant Contact')}</span>
            </h4>

            <div className="w-full max-w-[270px] mx-auto sm:mx-0 lg:mx-auto flex flex-col items-center p-4 rounded-3xl bg-[#081a11]/85 border border-[#d4af37]/35 shadow-2xl backdrop-blur-md relative overflow-hidden group hover:border-[#d4af37]/60 transition-all duration-300">
              {/* Subtle ambient lighting */}
              <div className="absolute -top-12 -right-12 w-28 h-28 bg-[#d4af37]/10 rounded-full blur-xl pointer-events-none" />
              <div className="absolute -bottom-12 -left-12 w-28 h-28 bg-emerald-500/10 rounded-full blur-xl pointer-events-none" />

              {/* The Gold Framed QR Code */}
              <div className="relative p-1 rounded-2xl group-hover:scale-[1.03] transition-transform duration-300">
                <img
                  src="/qr-gold-blended.png"
                  alt="Ahmed Elsherbiny & Co QR"
                  className="w-40 sm:w-44 h-auto object-contain rounded-xl shadow-lg border border-[#d4af37]/25"
                />
              </div>

              {/* Underneath: The Signature */}
              <div className="mt-2.5 flex flex-col items-center w-full px-2">
                <img
                  src="/signature-gold-transparent.png"
                  alt="Ahmed Elsherbiny"
                  className="h-10 sm:h-12 w-auto object-contain filter drop-shadow group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#1e4632]/50 flex items-center justify-center text-center">
          <p className="text-white/60 text-xs sm:text-sm font-medium">
            © {new Date().getFullYear()} {t.name}. {t.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
