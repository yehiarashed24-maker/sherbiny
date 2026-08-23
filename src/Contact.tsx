import { useState } from 'react';
import { ArrowLeft, ArrowRight, MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

const CONTACT_INFO = {
  en: {
    title: 'Get in Touch',
    subtitle: 'We are here to answer any questions you may have about our financial consulting services. Reach out to us and we\'ll respond as soon as we can.',
    workingHoursTitle: 'Working Hours',
    workingHours: 'Questions? Fill out this form and we will get back to you as soon as possible! We try to answer your inquiry within 4 hours. Please note that our working days are Monday to Saturday from 9 AM to 9 PM CET. We try to respond to all emails sent before 5 PM on the same day. In any case, you can expect a response within 48 hours.',
    branchesTitle: 'Our Branches',
    branches: [
      { city: 'Cairo', address: '59 Media City - Agouza', tel: '(02) 33470139' },
      { city: 'Alexandria', address: 'Concorde Tower - Raml Station', tel: '(03) 4806050' },
      { city: 'Mansoura', address: 'Al Hegaz Tower - Tamyouhi Square', tel: '(050) 2269057' }
    ],
    phonesTitle: 'Direct Lines',
    phones: ['+20 122 323 3620', '+20 233 470 139', '+20 502 269 057', '+20 348 060 50'],
    emailTitle: 'Email Us',
    email: 'A.elsherbiny@yahoo.com',
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
    subtitle: 'نحن هنا للإجابة على أي أسئلة قد تكون لديكم حول خدماتنا الاستشارية المالية. تواصل معنا وسنرد عليك في أقرب وقت ممكن.',
    workingHoursTitle: 'ساعات العمل',
    workingHours: 'الأسئلة ؟ املأ هذا النموذج ونعود إليك في أقرب وقت ممكن! نحاول الإجابة على استفسارك خلال 4 ساعات. يرجى ملاحظة أن أيام العمل لدينا هي من الاثنين إلى السبت من الساعة 9 صباحًا إلى 9 مساءً. نحاول الرد على جميع رسائل البريد الإلكتروني التي يتم إرسالها قبل الساعة 5 مساء في نفس اليوم. في أي حال ، يمكنك أن تتوقع ردا في غضون 48 ساعة.',
    branchesTitle: 'فروعنا',
    branches: [
      { city: 'القاهرة', address: '59 مدينة الإعلام - العجوزة', tel: '33470139 (02)' },
      { city: 'الأسكندرية', address: 'برج كوكورد - محطة الرمل', tel: '4806050 (03)' },
      { city: 'المنصورة', address: 'برج الحجاز - ميدان الطميهى', tel: '2269057 (050)' }
    ],
    phonesTitle: 'خطوط مباشرة',
    phones: ['+20 122 323 3620', '+20 233 470 139', '+20 502 269 057', '+20 348 060 50'],
    emailTitle: 'البريد الإلكتروني',
    email: 'A.elsherbiny@yahoo.com',
    form: {
      name: 'الاسم الكامل',
      email: 'البريد الإلكتروني',
      phone: 'رقم الهاتف',
      message: 'نص الرسالة',
      submit: 'إرسال الرسالة'
    },
    back: 'العودة'
  }
};

export default function Contact({ lang, onBack }: { lang: 'en' | 'ar', onBack: () => void }) {
  const isRtl = lang === 'ar';
  const BackIcon = isRtl ? ArrowRight : ArrowLeft;
  const t = CONTACT_INFO[lang];

  const [formState, setFormState] = useState({ name: '', email: '', phone: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Prevent actual submission for demo
    alert(isRtl ? 'تم إرسال الرسالة بنجاح!' : 'Message sent successfully!');
    setFormState({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div 
      className="absolute inset-0 bg-white text-black overflow-y-auto font-sans" 
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* Navbar/Header area */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-black/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <button onClick={onBack} className="inline-flex items-center gap-2 text-black/70 hover:text-black transition-colors duration-200">
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
                className="w-full sm:w-auto bg-black text-white px-8 py-4 rounded-xl font-medium hover:bg-black/80 transition-colors inline-flex justify-center items-center gap-2"
              >
                <span>{t.form.submit}</span>
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

            {/* Email & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pl-13 rtl:pl-0 rtl:pr-13">
              <div>
                <div className="flex items-center gap-3 mb-3 text-black">
                  <Phone className="w-5 h-5" />
                  <h4 className="font-semibold">{t.phonesTitle}</h4>
                </div>
                <ul className="space-y-2 text-black/60" dir="ltr" style={{ textAlign: isRtl ? 'right' : 'left' }}>
                  {t.phones.map((phone, i) => (
                    <li key={i}>{phone}</li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-3 text-black">
                  <Mail className="w-5 h-5" />
                  <h4 className="font-semibold">{t.emailTitle}</h4>
                </div>
                <p className="text-black/60">{t.email}</p>
              </div>
            </div>

            {/* Branches */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center text-black">
                  <MapPin className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-semibold">{t.branchesTitle}</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pl-13 rtl:pl-0 rtl:pr-13">
                {t.branches.map((branch, idx) => (
                  <div key={idx} className="bg-black/5 p-5 rounded-2xl">
                    <h4 className="font-semibold text-lg mb-2">{branch.city}</h4>
                    <p className="text-black/60 text-sm mb-2">{branch.address}</p>
                    <p className="text-black/80 font-medium text-sm" dir="ltr" style={{ textAlign: isRtl ? 'right' : 'left' }}>Tel: {branch.tel}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
