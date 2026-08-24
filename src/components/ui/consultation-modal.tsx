import React, { useState } from 'react';
import { X, CheckCircle2, Phone, User, Mail, MessageSquare, Send, Loader2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  isRtl?: boolean;
}

export default function ConsultationModal({ isOpen, onClose, isRtl = true }: ConsultationModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState('tax');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('access_key', '3e68732b-9a04-4410-a35d-f1386a6deb3c');
      formData.append('subject', `طلب حجز استشارة جديد من: ${name}`);
      formData.append('from_name', 'موقع أحمد الشربيني - حجز استشارة');
      formData.append('name', name);
      formData.append('phone', phone);
      formData.append('service', service);
      formData.append('email', email || 'غير محدد');
      formData.append('notes', notes || 'لا توجد ملاحظات إضافية');

      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
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
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4" dir={isRtl ? 'rtl' : 'ltr'}>
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
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.15 }}
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-black/10 overflow-hidden z-10"
          >
            {/* Close Button */}
            <button
              onClick={handleResetAndClose}
              className={`absolute top-5 ${isRtl ? 'left-5' : 'right-5'} w-10 h-10 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-black/70 hover:text-black transition-colors z-20`}
            >
              <X className="w-5 h-5" />
            </button>

            {!isSuccess ? (
              <div className="p-7 md:p-9">
                {/* Header */}
                <div className="mb-6">
                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-black text-white text-xs font-bold mb-3 shadow-sm">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{isRtl ? 'استشارة مالية وضريبية مجانية' : 'Complimentary Consultation'}</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-black tracking-tight mb-2">
                    {isRtl ? 'احجز استشارتك الآن' : 'Book a Consultation'}
                  </h3>
                  <p className="text-xs md:text-sm text-black/60 leading-relaxed">
                    {isRtl
                      ? 'املأ النموذج وسيقوم أحد خبرائنا الماليين بالتواصل معك لمناقشة احتياجاتك وتحديد أفضل خطة عمل.'
                      : 'Fill in your details and our senior financial consultant will reach out to tailor the ideal roadmap for you.'}
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-bold text-black/80 mb-1.5">
                      {isRtl ? 'الاسم بالكامل *' : 'Full Name *'}
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
                        placeholder={isRtl ? 'أدخل اسمك أو اسم الشركة' : 'Enter your name or company'}
                        className={`w-full bg-[#F6F5F2] border border-black/10 rounded-xl py-3 ${isRtl ? 'pr-10 pl-4' : 'pl-10 pr-4'} text-sm text-black placeholder:text-black/40 focus:outline-none focus:border-black/40 focus:bg-white transition-all`}
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-bold text-black/80 mb-1.5">
                      {isRtl ? 'رقم الهاتف / الواتساب *' : 'Phone / WhatsApp *'}
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
                        placeholder={isRtl ? '010XXXXXXXX' : '+20 1XXXXXXXXX'}
                        className={`w-full bg-[#F6F5F2] border border-black/10 rounded-xl py-3 ${isRtl ? 'pr-10 pl-4' : 'pl-10 pr-4'} text-sm text-black placeholder:text-black/40 focus:outline-none focus:border-black/40 focus:bg-white transition-all`}
                      />
                    </div>
                  </div>

                  {/* Service Selector & Email in Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-bold text-black/80 mb-1.5">
                        {isRtl ? 'نوع الاستشارة' : 'Service'}
                      </label>
                      <select
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        className="w-full bg-[#F6F5F2] border border-black/10 rounded-xl py-3 px-3 text-sm text-black focus:outline-none focus:border-black/40 focus:bg-white transition-all"
                      >
                        <option value="tax">{isRtl ? 'الضرائب والفحص الضريبي' : 'Tax & Inspection'}</option>
                        <option value="audit">{isRtl ? 'المحاسبة والمراجعة' : 'Audit & Accounting'}</option>
                        <option value="incorporation">{isRtl ? 'تأسيس وتعديل الشركات' : 'Company Formation'}</option>
                        <option value="advisory">{isRtl ? 'الاستشارات المالية والتقييم' : 'Financial Advisory'}</option>
                        <option value="other">{isRtl ? 'استشارة أخرى' : 'Other'}</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-black/80 mb-1.5">
                        {isRtl ? 'البريد الإلكتروني (اختياري)' : 'Email (Optional)'}
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
                        />
                      </div>
                    </div>
                  </div>

                  {/* Notes / Details */}
                  <div>
                    <label className="block text-xs font-bold text-black/80 mb-1.5">
                      {isRtl ? 'تفاصيل إضافية أو موعد مفضل' : 'Additional Notes / Preferred Time'}
                    </label>
                    <div className="relative">
                      <div className={`absolute top-3.5 ${isRtl ? 'right-3.5' : 'left-3.5'} text-black/40`}>
                        <MessageSquare className="w-4 h-4" />
                      </div>
                      <textarea
                        rows={2}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder={isRtl ? 'اكتب نبذة مختصرة عن موضوع استشارتك...' : 'Briefly describe your inquiry...'}
                        className={`w-full bg-[#F6F5F2] border border-black/10 rounded-xl py-2.5 ${isRtl ? 'pr-10 pl-4' : 'pl-10 pr-4'} text-sm text-black placeholder:text-black/40 focus:outline-none focus:border-black/40 focus:bg-white transition-all resize-none`}
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-black text-white hover:bg-black/90 py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl mt-2 disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>{isRtl ? 'جاري إرسال الطلب...' : 'Submitting...'}</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>{isRtl ? 'تأكيد وحجز الاستشارة' : 'Confirm & Request Consultation'}</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            ) : (
              /* Success Screen */
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 md:p-12 text-center flex flex-col items-center justify-center"
              >
                <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mb-6 shadow-inner">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                
                <h3 className="text-2xl md:text-3xl font-extrabold text-black mb-3 tracking-tight">
                  {isRtl ? 'تم استلام طلبك بنجاح!' : 'Request Received Successfully!'}
                </h3>
                
                <p className="text-sm md:text-base text-black/70 max-w-sm mx-auto leading-relaxed mb-8">
                  {isRtl
                    ? 'شكراً لثقتك بنا. سيقوم أحد مستشارينا الماليين والقانونيين بالتواصل معك هاتفياً أو عبر الواتساب في أقرب وقت لتحديد موعد الجلسة.'
                    : 'Thank you for reaching out. One of our senior financial and tax advisors will contact you shortly via phone or WhatsApp.'}
                </p>

                <div className="bg-[#F6F5F2] p-4 rounded-2xl w-full text-xs text-black/60 mb-8 border border-black/5 flex flex-wrap items-center justify-center gap-2">
                  <Phone className="w-4 h-4 text-black/80 shrink-0" />
                  <div className="flex items-center gap-2" dir="ltr">
                    <a href="tel:+20222718131" className="hover:text-black font-semibold hover:underline">
                      +20 222718131
                    </a>
                    <span>/</span>
                    <a href="tel:+201205373330" className="hover:text-black font-semibold hover:underline">
                      +20 1205373330
                    </a>
                  </div>
                </div>

                <button
                  onClick={handleResetAndClose}
                  className="bg-black text-white px-8 py-3 rounded-full font-bold text-sm hover:bg-black/85 transition-all shadow-md"
                >
                  {isRtl ? 'حسناً، تم' : 'Close'}
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
