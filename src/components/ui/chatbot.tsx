import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, Loader2, Sparkles, PhoneCall } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import type { LangType } from './language-selector';

interface ChatbotProps {
  isRtl?: boolean;
  lang?: LangType;
}

type Message = {
  role: 'user' | 'model';
  content: string;
};

const CHAT_TEXT: Record<LangType, {
  greeting: string;
  quickPrompts: string[];
  thinking: string;
  placeholder: string;
  hotline: string;
  subTitle: string;
}> = {
  ar: {
    greeting: 'مرحباً بك! أنا **AhmedSherbiny AI** 🤖، المستشار الذكي لشركة **أحمد الشربيني وشركاه**. كيف يمكنني مساعدتك اليوم في استشاراتك القانونية، الضريبية، وتأسيس الشركات؟',
    quickPrompts: ['من هو المحاسب القانوني أحمد الشربيني؟', 'تأسيس شركة جديدة', 'الفحص والطعن الضريبي', 'الفاتورة الإلكترونية', 'أرقام وعناوين الفروع'],
    thinking: 'جاري التفكير وصياغة الاستشارة...',
    placeholder: 'اسأل AhmedSherbiny AI أي استشارة قانونية أو ضريبية...',
    hotline: 'الخط الساخن للمكتب:',
    subTitle: 'المستشار الذكي - أحمد الشربيني وشركاه'
  },
  en: {
    greeting: 'Welcome! I am **AhmedSherbiny AI** 🤖, your smart advisor for **Ahmed El Sherbiny & Co.** How can I assist you today with corporate, tax, and accounting inquiries in Egypt?',
    quickPrompts: ['Who is Ahmed El Sherbiny?', 'Company Formation', 'Tax Inspection & Appeals', 'E-Invoicing System', 'Office Branches & Contacts'],
    thinking: 'AhmedSherbiny AI is analyzing...',
    placeholder: 'Ask AhmedSherbiny AI any legal or tax question...',
    hotline: 'Direct Hotline:',
    subTitle: 'Smart Legal & Tax Advisor'
  },
  fr: {
    greeting: 'Bienvenue ! Je suis **AhmedSherbiny AI** 🤖, le conseiller intelligent du cabinet **Ahmed El Sherbiny & Co.** Comment puis-je vous guider aujourd’hui pour vos projets en Égypte ?',
    quickPrompts: ['Qui est Ahmed El Sherbiny ?', "Création d'Entreprise", 'Contrôle & Contentieux Fiscal', 'Facturation Électronique', 'Agences & Coordonnées'],
    thinking: 'AhmedSherbiny AI analyse votre demande...',
    placeholder: 'Posez votre question fiscale ou juridique à AhmedSherbiny AI...',
    hotline: 'Hotline Directe :',
    subTitle: 'Conseiller Fiscal & Juridique IA'
  },
  tr: {
    greeting: "Hoş geldiniz! Ben **AhmedSherbiny AI** 🤖, **Ahmed El Sherbiny & Co.** akıllı mali ve vergi danışmanıyım. Mısır'daki şirket kuruluşu ve vergi süreçlerinizde nasıl yardımcı olabilirim?",
    quickPrompts: ['Ahmed El Sherbiny Kimdir?', 'Şirket Kuruluşu', 'Vergi Teftişi ve İtirazlar', 'E-Fatura Sistemi', 'Şubeler ve İletişim'],
    thinking: 'AhmedSherbiny AI yanıt hazırlıyor...',
    placeholder: "AhmedSherbiny AI'a vergi veya şirket sorularınızı sorun...",
    hotline: 'Doğrudan Danışma Hattı:',
    subTitle: 'Akıllı Mali ve Vergi Danışmanı'
  },
  ja: {
    greeting: 'ようこそ！私は**アハメド・シェルビニ AI** 🤖、**アハメド・エル・シェルビニ事務所**のスマートアドバイザーです。本日はエジプトでの法人、税務、会計についてどのようなご質問がありますか？',
    quickPrompts: ['アハメド・エル・シェルビニとは？', '会社設立', '税務調査と不服申し立て', '電子請求書システム', 'オフィス支店と連絡先'],
    thinking: 'AhmedSherbiny AI が分析中...',
    placeholder: 'アハメド・シェルビニ AI に法的または税務上の質問をしてください...',
    hotline: '直通ホットライン:',
    subTitle: 'スマートな法的および税務アドバイザー'
  },
  zh: {
    greeting: '欢迎！我是**AhmedSherbiny AI** 🤖，您在**艾哈迈德·谢尔比尼公司**的智能顾问。今天我能为您在埃及的企业、税务和会计咨询提供什么帮助？',
    quickPrompts: ['艾哈迈德·谢尔比尼是谁？', '公司成立', '税务稽查与上诉', '电子发票系统', '办公分部与联系方式'],
    thinking: 'AhmedSherbiny AI 正在分析...',
    placeholder: '向 AhmedSherbiny AI 提出任何法律或税务问题...',
    hotline: '直拨热线：',
    subTitle: '智能法律与税务顾问'
  },
  ko: {
    greeting: '환영합니다! 저는 **AhmedSherbiny AI** 🤖, **아흐메드 엘 셰르비니 주식회사**의 스마트 자문입니다. 오늘 이집트에서의 기업, 세무, 회계 문의와 관련하여 어떻게 도와드릴까요?',
    quickPrompts: ['아흐메드 엘 셰르비니는 누구인가?', '회사 설립', '세무 조사 및 불복', '전자 세금계산서 시스템', '지점 및 연락처'],
    thinking: 'AhmedSherbiny AI가 분석 중입니다...',
    placeholder: 'AhmedSherbiny AI에게 법률 또는 세무 관련 질문을 하세요...',
    hotline: '직통 핫라인:',
    subTitle: '스마트 법률 및 세무 자문'
  },
  es: {
    greeting: '¡Bienvenido! Soy **AhmedSherbiny AI** 🤖, tu asesor inteligente para **Ahmed El Sherbiny & Co.** ¿Cómo puedo ayudarte hoy con tus consultas corporativas, fiscales y contables en Egipto?',
    quickPrompts: ['¿Quién es Ahmed El Sherbiny?', 'Formación de Empresas', 'Inspección Fiscal y Apelaciones', 'Sistema de Facturación Electrónica', 'Sucursales y Contacto'],
    thinking: 'AhmedSherbiny AI está analizando...',
    placeholder: 'Haz a AhmedSherbiny AI cualquier pregunta legal o fiscal...',
    hotline: 'Línea Directa:',
    subTitle: 'Asesor Inteligente Legal y Fiscal'
  }
};

export default function Chatbot({ isRtl = false, lang = 'ar' }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const t = CHAT_TEXT[lang] || CHAT_TEXT.en;

  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      content: t.greeting
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Update greeting if language changes and no conversation has occurred yet
  useEffect(() => {
    setMessages(prev => {
      if (prev.length === 1 && prev[0].role === 'model') {
        return [{ role: 'model', content: t.greeting }];
      }
      return prev;
    });
  }, [t.greeting]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, isLoading]);

  const sendQuery = async (queryText: string) => {
    if (!queryText.trim() || isLoading) return;

    const userMessage = queryText.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    let assistantResponse = '';

    try {
      // Secure serverless backend API call (Zero client-side keys exposed)
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages,
          userMessage,
          isRtl,
          lang
        })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.reply) {
          assistantResponse = data.reply;
        }
      }
    } catch (err) {
      console.error('Chat API request error:', err);
    }

    // Reliable fallback if server is unreachable
    if (!assistantResponse) {
      assistantResponse = isRtl
        ? `أهلاً بك! أنا **AhmedSherbiny AI** 🤖 المستشار الذكي لمكتب **أحمد الشربيني وشركاه**. يسعدنا تقديم استشارة قانونية وضريبية فورية. يمكنك الاتصال مباشرة على الخط الساخن: **+201223233620**.`
        : `Hello! I am **AhmedSherbiny AI** 🤖 representing **Ahmed El Sherbiny & Co.** Feel free to reach out directly to our advisors at **+20 122 323 3620**.`;
    }

    setMessages(prev => [...prev, { role: 'model', content: assistantResponse }]);
    setIsLoading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendQuery(input);
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-20 md:bottom-6 ${
          isRtl ? 'left-4 md:left-6' : 'right-4 md:right-6'
        } w-14 h-14 bg-black text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 z-50 group ${
          isOpen ? 'hidden' : ''
        }`}
        aria-label="Open Chat"
      >
        <MessageSquare className="w-6 h-6 group-hover:rotate-12 transition-transform" />
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-500"></span>
        </span>
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-20 md:bottom-6 ${
          isRtl ? 'left-3 md:left-6' : 'right-3 md:right-6'
        } w-[94vw] max-w-[430px] h-[600px] max-h-[80vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden z-50 transition-all duration-300 origin-bottom border border-black/10 ${
          isOpen ? 'scale-100 opacity-100' : 'scale-75 opacity-0 pointer-events-none'
        }`}
      >
        {/* Header */}
        <div className="bg-neutral-900 text-white p-4 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-500/20 border border-amber-500/40 rounded-full flex items-center justify-center text-amber-400">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base leading-tight">
                  AhmedSherbiny AI
                </h3>
                <span className="inline-flex items-center gap-1 text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Online
                </span>
              </div>
              <p className="text-xs text-white/70">
                {t.subTitle}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white/70 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 bg-[#F8F9FA] flex flex-col gap-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[88%] rounded-2xl px-4 py-3 shadow-sm text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-neutral-900 text-white rounded-br-sm'
                    : 'bg-white text-neutral-800 rounded-bl-sm border border-black/5 shadow-sm'
                }`}
              >
                {msg.role === 'model' ? (
                  <div className="prose prose-sm rtl:prose-p:text-right rtl:prose-headings:text-right prose-p:leading-relaxed text-neutral-800 space-y-2">
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                ) : (
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm border border-black/5 flex items-center gap-2 text-neutral-600">
                <Loader2 className="w-4 h-4 animate-spin text-amber-600" />
                <span className="text-xs font-medium">
                  {t.thinking}
                </span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-3 py-2 bg-neutral-100/80 border-t border-black/5 flex gap-1.5 overflow-x-auto no-scrollbar">
          {t.quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => sendQuery(prompt)}
              disabled={isLoading}
              className="text-[11px] whitespace-nowrap bg-white hover:bg-neutral-900 hover:text-white text-neutral-700 font-medium px-3 py-1.5 rounded-full border border-black/10 transition-colors flex items-center gap-1 shadow-2xs"
            >
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span>{prompt}</span>
            </button>
          ))}
        </div>

        {/* Contact Hotline Bar */}
        <div className="px-4 py-1.5 bg-amber-50 border-t border-amber-100 flex items-center justify-between text-xs text-amber-950 font-medium">
          <span className="flex items-center gap-1.5">
            <PhoneCall className="w-3.5 h-3.5 text-amber-600" />
            {t.hotline}
          </span>
          <a
            href="tel:+201223233620"
            className="font-bold text-amber-700 hover:underline font-mono"
            dir="ltr"
          >
            +20 122 323 3620
          </a>
        </div>

        {/* Input Area */}
        <div className="p-3 bg-white border-t border-black/5">
          <form onSubmit={handleSubmit} className="flex items-center gap-2 relative">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder={t.placeholder}
              className="flex-1 bg-neutral-100 border border-transparent rounded-full px-4 py-2.5 text-sm focus:outline-none focus:border-black/30 focus:bg-white transition-all rtl:text-right"
              dir="auto"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                input.trim() && !isLoading
                  ? 'bg-neutral-900 text-white hover:scale-105 active:scale-95'
                  : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
              }`}
            >
              <Send className={`w-4 h-4 ${isRtl ? 'mr-0.5 rtl:-scale-x-100' : 'ml-0.5'}`} />
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
