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
  ],
  es: [
    {
      city: 'El Cairo (Sede Central)',
      address: '59 Media City - Agouza, El Cairo',
      phones: ['+20 2 3347 0139', '+20 106 616 2823'],
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=59+Media+City%2C+Agouza%2C+Giza%2C+Cairo'
    },
    {
      city: 'Mansoura',
      address: 'Torre Al Hegaz - Plaza Tamyouhi',
      phones: ['+20 50 2269 057'],
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=Al+Hegaz+Tower+Tamyouhi+Square+Mansoura'
    }
  ],
  ja: [
    {
      city: 'カイロ（本部）',
      address: 'カイロ、アグーザ、メディアシティ59',
      phones: ['+20 2 3347 0139', '+20 106 616 2823'],
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=59+Media+City%2C+Agouza%2C+Giza%2C+Cairo'
    },
    {
      city: 'マンスーラ',
      address: 'アル・ヘガズタワー - タムユーヒ広場',
      phones: ['+20 50 2269 057'],
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=Al+Hegaz+Tower+Tamyouhi+Square+Mansoura'
    }
  ],
  zh: [
    {
      city: '开罗（总部）',
      address: '开罗阿古扎媒体城59号',
      phones: ['+20 2 3347 0139', '+20 106 616 2823'],
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=59+Media+City%2C+Agouza%2C+Giza%2C+Cairo'
    },
    {
      city: '曼苏拉',
      address: '阿尔赫加斯大厦 - 塔姆尤希广场',
      phones: ['+20 50 2269 057'],
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=Al+Hegaz+Tower+Tamyouhi+Square+Mansoura'
    }
  ],
  ko: [
    {
      city: '카이로 (본사)',
      address: '카이로 아구자 미디어 시티 59번지',
      phones: ['+20 2 3347 0139', '+20 106 616 2823'],
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=59+Media+City%2C+Agouza%2C+Giza%2C+Cairo'
    },
    {
      city: '만수라',
      address: '알 헤가즈 타워 - 탐유히 광장',
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
      tr: 'Ana Hat / WhatsApp', ja: 'メイン / WhatsApp', zh: '主要 / WhatsApp', ko: '기본 / WhatsApp', es: 'Principal / WhatsApp'
    },
    phone: '+20 122 323 3620',
    isPrimary: true
  },
  {
    label: {
      ar: 'القاهرة (أرضي)',
      en: 'Cairo Office',
      fr: 'Le Caire (Fixe)',
      tr: 'Kahire (Sabit)', ja: 'カイロオフィス', zh: '开罗办公室', ko: '카이로 사무소', es: 'Oficina El Cairo'
    },
    phone: '+20 2 3347 0139'
  },
  {
    label: {
      ar: 'المحمول الثاني',
      en: 'Mobile 2',
      fr: 'Mobile 2',
      tr: 'Mobil Hat 2', ja: 'モバイル2', zh: '手机2', ko: '모바일 2', es: 'Móvil 2'
    },
    phone: '+20 106 616 2823'
  },
  {
    label: {
      ar: 'المنصورة (أرضي)',
      en: 'Mansoura Office',
      fr: 'Mansourah (Fixe)',
      tr: 'Mansura (Sabit)', ja: 'マンスーラオフィス', zh: '曼苏拉办公室', ko: '만수라 사무소', es: 'Oficina Mansoura'
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
  },
  ja: {
    title: 'お問い合わせ',
    subtitle: '財務および税務コンサルティングサービスに関するご質問にお答えします。お問い合わせいただければ、迅速に回答いたします。',
    workingHoursTitle: '営業時間',
    workingHours: 'ご質問ですか？このフォームにご記入いただければ、できるだけ早くご連絡いたします。通常4時間以内に回答いたします。営業日は土曜日から木曜日（午前9時〜午後9時）です。',
    branchesTitle: '支店と住所',
    phonesTitle: '直通電話番号',
    emailTitle: 'メールでのお問い合わせ',
    emails: ['Sherbiny.co@gmail.com', 'A.elsherbiny@yahoo.com'],
    openMap: 'Google マップで開く',
    callNow: '電話する',
    qrBadge: '即時連絡先 QR コード',
    qrTitle: 'スキャンして連絡先を保存',
    qrDesc: 'スマートフォンのカメラでスキャンして、アハメド・エル・シェルビニ事務所の公式連絡先を保存してください。',
    form: {
      name: '氏名',
      email: 'メールアドレス',
      phone: '電話番号',
      message: 'メッセージ内容',
      submit: 'メッセージを送信'
    },
    back: '戻る'
  },
  zh: {
    title: '联系我们',
    subtitle: '我们随时为您解答关于财务与税务咨询服务的任何疑问。欢迎垂询，我们将尽快为您回复。',
    workingHoursTitle: '工作时间',
    workingHours: '有疑问？请填写此表单，我们将尽快与您联系！我们通常在4小时内答复。工作时间为周六至周四上午9:00至晚上21:00。',
    branchesTitle: '分支机构与地址',
    phonesTitle: '直拨电话专线',
    emailTitle: '电子邮件',
    emails: ['Sherbiny.co@gmail.com', 'A.elsherbiny@yahoo.com'],
    openMap: '在谷歌地图中打开',
    callNow: '立即拨打',
    qrBadge: '即时名片二维码',
    qrTitle: '扫码保存联系方式',
    qrDesc: '使用手机相机扫描二维码，即可将艾哈迈德·谢尔比尼事务所官方联系方式保存至通讯录。',
    form: {
      name: '您的全名',
      email: '电子邮箱',
      phone: '联系电话',
      message: '留言内容',
      submit: '发送留言'
    },
    back: '返回'
  },
  ko: {
    title: '문의하기',
    subtitle: '당사의 재무 및 세무 컨설팅 서비스에 대해 궁금한 점이 있으시면 문의해 주십시오. 신속하게 답변해 드리겠습니다.',
    workingHoursTitle: '업무 시간',
    workingHours: '궁금한 점이 있으신가요? 이 양식을 작성해 주시면 최대한 신속히 연락드리겠습니다! 보통 4시간 이내에 답변을 드립니다. 근무 시간은 토요일부터 목요일(오전 9시~오후 9시)입니다.',
    branchesTitle: '지점 및 위치',
    phonesTitle: '직통 전화 상담',
    emailTitle: '이메일 문의',
    emails: ['Sherbiny.co@gmail.com', 'A.elsherbiny@yahoo.com'],
    openMap: 'Google 지도에서 보기',
    callNow: '전화 걸기',
    qrBadge: '즉시 연락처 QR 코드',
    qrTitle: '스캔하여 연락처 저장',
    qrDesc: '스마트폰 카메라로 스캔하여 아흐메드 엘 셰르비니 법인의 공식 연락처를 바로 저장하세요.',
    form: {
      name: '성함',
      email: '이메일 주소',
      phone: '전화번호',
      message: '문의 내용',
      submit: '메시지 전송'
    },
    back: '뒤로가기'
  },
  es: {
    title: 'Ponte en Contacto',
    subtitle: 'Estamos aquí para responder cualquier pregunta sobre nuestros servicios de consultoría financiera y fiscal. Contáctanos y responderemos pronto.',
    workingHoursTitle: 'Horario de Trabajo',
    workingHours: '¿Preguntas? ¡Completa este formulario y nos pondremos en contacto contigo lo antes posible! Nuestro equipo responde a las consultas en 4 horas. El horario de trabajo es de Sábado a Jueves de 9 AM a 9 PM.',
    branchesTitle: 'Nuestras Sucursales',
    phonesTitle: 'Líneas Telefónicas Directas',
    emailTitle: 'Envíanos un Correo',
    emails: ['Sherbiny.co@gmail.com', 'A.elsherbiny@yahoo.com'],
    openMap: 'Abrir en Google Maps',
    callNow: 'Llamar',
    qrBadge: 'Código QR de Contacto Inmediato',
    qrTitle: 'Escanea para Guardar Contacto',
    qrDesc: 'Escanea con la cámara de tu smartphone para guardar los datos de contacto oficiales de Ahmed El Sherbiny & Co.',
    form: {
      name: 'Nombre Completo',
      email: 'Dirección de Correo',
      phone: 'Número de Teléfono',
      message: 'Tu Mensaje',
      submit: 'Enviar Mensaje'
    },
    back: 'Atrás'
  }
};

const CONTACT_UI_STRINGS: Record<LangType, {
  sendError: string;
  connError: string;
  successMsg: string;
  sending: string;
  chatWhatsApp: string;
  bookConsultation: string;
}> = {
  ar: {
    sendError: 'حدث خطأ أثناء الإرسال، يرجى المحاولة مرة أخرى.',
    connError: 'حدث خطأ في الاتصال، يرجى المحاولة لاحقاً.',
    successMsg: '✅ تم إرسال رسالتك بنجاح وسنقوم بالرد عليك في أقرب وقت!',
    sending: 'جاري الإرسال...',
    chatWhatsApp: 'تواصل عبر الواتساب',
    bookConsultation: 'احجز استشارة'
  },
  en: {
    sendError: 'Error sending message, please try again.',
    connError: 'Connection error, please try again later.',
    successMsg: '✅ Your message was sent successfully! We will get back to you shortly.',
    sending: 'Sending...',
    chatWhatsApp: 'Chat on WhatsApp',
    bookConsultation: 'Book Consultation'
  },
  fr: {
    sendError: 'Une erreur est survenue lors de l’envoi. Veuillez réessayer.',
    connError: 'Erreur de connexion, veuillez réessayer ultérieurement.',
    successMsg: '✅ Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.',
    sending: 'Envoi en cours...',
    chatWhatsApp: 'Contacter sur WhatsApp',
    bookConsultation: 'Réserver une Consultation'
  },
  tr: {
    sendError: 'Gönderim sırasında bir hata oluştu, lütfen tekrar deneyin.',
    connError: 'Bağlantı hatası, lütfen daha sonra tekrar deneyin.',
    successMsg: '✅ Mesajınız başarıyla gönderildi! En kısa sürede sizinle iletişime geçeceğiz.',
    sending: 'Gönderiliyor...',
    chatWhatsApp: "WhatsApp'tan Yazın",
    bookConsultation: 'Danışmanlık Alın'
  },
  ja: {
    sendError: '送信中にエラーが発生しました。もう一度お試しください。',
    connError: '接続エラーが発生しました。後でもう一度お試しください。',
    successMsg: '✅ メッセージが正常に送信されました！折り返しご連絡いたします。',
    sending: '送信中...',
    chatWhatsApp: 'WhatsAppでチャット',
    bookConsultation: '相談を予約'
  },
  zh: {
    sendError: '发送时出错，请重试。',
    connError: '网络连接错误，请稍后再试。',
    successMsg: '✅ 您的留言已成功发送！我们将尽快回复您。',
    sending: '发送中...',
    chatWhatsApp: '通过WhatsApp联系',
    bookConsultation: '预约咨询'
  },
  ko: {
    sendError: '전송 중 오류가 발생했습니다. 다시 시도해 주세요.',
    connError: '연결 오류가 발생했습니다. 나중에 다시 시도해 주세요.',
    successMsg: '✅ 메시지가 성공적으로 전송되었습니다! 곧 연락드리겠습니다.',
    sending: '전송 중...',
    chatWhatsApp: 'WhatsApp으로 문의',
    bookConsultation: '상담 예약'
  },
  es: {
    sendError: 'Error al enviar el mensaje, por favor inténtalo de nuevo.',
    connError: 'Error de conexión, por favor inténtalo más tarde.',
    successMsg: '✅ ¡Tu mensaje fue enviado con éxito! Nos comunicaremos contigo a la brevedad.',
    sending: 'Enviando...',
    chatWhatsApp: 'Chatear en WhatsApp',
    bookConsultation: 'Reservar Consulta'
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
  const t = CONTACT_INFO[lang] || CONTACT_INFO.ar || CONTACT_INFO.en;
  const ui = CONTACT_UI_STRINGS[lang] || CONTACT_UI_STRINGS.ar || CONTACT_UI_STRINGS.en;
  const branches = BRANCHES[lang] || BRANCHES.ar || BRANCHES.en;

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
        alert(ui.sendError);
      }
    } catch (err) {
      console.error('Contact form error:', err);
      alert(ui.connError);
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

          {onBookConsultation && (
            <button 
              onClick={onBookConsultation}
              className="bg-black text-white px-5 py-2 rounded-full text-xs sm:text-sm font-bold hover:bg-black/80 transition-colors shadow-md active:scale-95"
            >
              {ui.bookConsultation}
            </button>
          )}
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
                  <span>{ui.successMsg}</span>
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
                <span>{isSubmitting ? ui.sending : t.form.submit}</span>
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
                    <span>{ui.chatWhatsApp}</span>
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
