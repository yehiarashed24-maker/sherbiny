import { MapPin, Phone, Mail, MessageCircle } from 'lucide-react';

interface FooterProps {
  isRtl: boolean;
  setView: (view: 'home' | 'about' | 'contact' | 'services' | 'laws') => void;
}

export default function Footer({ isRtl, setView }: FooterProps) {
  return (
    <footer className="bg-black text-white pt-16 pb-8" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="max-w-[88rem] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1 flex flex-col items-start">
            <div className="flex items-center gap-3 mb-4 bg-white/10 p-2.5 rounded-2xl backdrop-blur-sm">
              <img src="/logo.png" alt="Ahmed El Sherbiny" className="h-10 w-auto object-contain brightness-0 invert" />
            </div>
            <h3 className="text-xl font-bold mb-1">
              {isRtl ? 'أحمد الشربيني وشركاه' : 'Ahmed El Sherbiny & Co.'}
            </h3>
            <p className="text-xs text-white/50 mb-4 font-medium">
              {isRtl ? 'محاسبون ومراجعون قانونيون' : 'Certified Public Accountants & Auditors'}
            </p>
            <p className="text-white/60 mb-6 max-w-sm text-sm leading-relaxed">
              {isRtl
                ? 'مكتب أحمد الشربينى وشركاه محاسبون ومراجعون قانونيون، خبراء في تقديم الاستشارات المالية، المراجعة المحاسبية وتأسيس الشركات لضمان نموك المالي بأمان.'
                : 'Ahmed El Sherbiny & Co. Certified Public Accountants and Auditors. Experts in financial consulting, auditing, and company formation.'}
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col">
            <h4 className="text-lg font-semibold mb-6">{isRtl ? 'روابط سريعة' : 'Quick Links'}</h4>
            <ul className="space-y-4 text-white/70">
              <li>
                <button onClick={() => setView('home')} className="hover:text-white transition-colors text-sm">
                  {isRtl ? 'الرئيسية' : 'Home'}
                </button>
              </li>
              <li>
                <button onClick={() => setView('about')} className="hover:text-white transition-colors text-sm">
                  {isRtl ? 'من نحن' : 'About Us'}
                </button>
              </li>
              <li>
                <button onClick={() => setView('services')} className="hover:text-white transition-colors text-sm">
                  {isRtl ? 'الخدمات' : 'Services'}
                </button>
              </li>
              <li>
                <button onClick={() => setView('laws')} className="hover:text-white transition-colors text-sm">
                  {isRtl ? 'القوانين' : 'Laws'}
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col col-span-1 md:col-span-2">
            <h4 className="text-lg font-semibold mb-6">{isRtl ? 'تواصل معنا' : 'Contact Us'}</h4>
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
                    {isRtl ? '59 مدينة الإعلام - العجوزة، القاهرة' : '59 Media City - Agouza, Cairo'}
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
            © {new Date().getFullYear()} {isRtl ? 'أحمد الشربيني وشركاه. جميع الحقوق محفوظة.' : 'Ahmed El Sherbiny & Co. All rights reserved.'}
          </p>
        </div>
      </div>
    </footer>
  );
}
