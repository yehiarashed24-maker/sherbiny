import { MapPin, Phone, Mail } from 'lucide-react';

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
            <h3 className="text-2xl font-bold mb-4">
              {isRtl ? 'أحمد الشربيني' : 'Ahmed El Sherbiny'}
            </h3>
            <p className="text-white/60 mb-6 max-w-sm text-sm leading-relaxed">
              {isRtl
                ? 'مكتب أحمد الشربينى وشركاه محاسبون قانونيون، خبراء في تقديم الاستشارات المالية، المراجعة المحاسبية وتأسيس الشركات لضمان نموك المالي بأمان.'
                : 'Ahmed El Sherbiny & Co. Certified Public Accountants. Experts in financial consulting, auditing, and company formation.'}
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
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-0.5 shrink-0 text-white/50" />
                <span className="text-sm leading-relaxed">
                  {isRtl ? '19 ش الصومال متفرع من ش إبراهيم نوار, المنطقة السادسة، مدينة نصر' : '19 Somalia St, off Ibrahim Nawar St, 6th Zone, Nasr City'}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 shrink-0 text-white/50" />
                <span className="text-sm" dir="ltr">+20 222718131 / +20 1205373330</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 shrink-0 text-white/50" />
                <span className="text-sm">Sherbiny.co@gmail.com</span>
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
