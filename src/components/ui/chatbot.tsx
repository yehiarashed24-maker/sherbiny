import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface ChatbotProps {
  isRtl: boolean;
}

type Message = {
  role: 'user' | 'model';
  content: string;
};

const GEMINI_API_KEY = 'AQ.Ab8RN6K2eSU4AgWgPE6Yv1rOIUDKBMigudWwgjLSiMZGP_UzLg';
const SYSTEM_PROMPT = `أنت مستشار قانوني ومالي محترف تعمل لدى شركة أحمد الشربيني وشركاه محاسبون ومراجعون قانونيون.
مهمتك هي الإجابة على استفسارات العملاء حول القوانين المصرية (الضرائب، الشركات، الاستثمار، المحاسبة) باحترافية وبطريقة رسمية ومهذبة.
أجب باللغة العربية دائماً، واستخدم تنسيق Markdown لتوضيح إجابتك إذا لزم الأمر.
كن موجزاً ودقيقاً.`;

export default function Chatbot({ isRtl }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', content: isRtl ? 'مرحباً بك في أحمد الشربيني وشركاه. كيف يمكنني مساعدتك اليوم في استشاراتك القانونية والمالية؟' : 'Welcome to Ahmed El Sherbiny & Co. How can I assist you today with legal and financial consultations?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      // Prepare history for Gemini API
      const history = messages.slice(1).map(msg => ({
        role: msg.role,
        parts: [{ text: msg.content }]
      }));
      
      const requestBody = {
        system_instruction: {
          parts: { text: SYSTEM_PROMPT }
        },
        contents: [
          ...history,
          { role: 'user', parts: [{ text: userMessage }] }
        ],
        generationConfig: {
          temperature: 0.7,
        }
      };

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:streamGenerateContent?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let assistantResponse = '';

      // Add a placeholder message for the assistant
      setMessages(prev => [...prev, { role: 'model', content: '' }]);

      let buffer = '';

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          
          buffer += decoder.decode(value, { stream: true });
          
          // Try to extract all "text" fields using a global regex
          const textMatches = [...buffer.matchAll(/"text":\s*"([^"\\]*(?:\\.[^"\\]*)*)"/g)];
          
          let currentText = '';
          for (const match of textMatches) {
            if (match[1]) {
                // Parse the JSON string to handle unicode and escapes properly
                try {
                    currentText += JSON.parse('"' + match[1] + '"');
                } catch(e) {
                    currentText += match[1].replace(/\\n/g, '\n').replace(/\\"/g, '"');
                }
            }
          }
          
          if (currentText) {
             setMessages(prev => {
                 const newMsgs = [...prev];
                 newMsgs[newMsgs.length - 1].content = currentText;
                 return newMsgs;
             });
          }
        }
      }
      
      // Do a final fetch if the streaming parsing was too brittle, just in case (fallback)
      // We actually want robust JSON parsing. Let's build a small robust stream parser.
      
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { role: 'model', content: 'عذراً، حدث خطأ أثناء الاتصال. يرجى المحاولة لاحقاً.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 ${isRtl ? 'left-6' : 'right-6'} w-14 h-14 bg-black text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300 z-50 ${isOpen ? 'hidden' : ''}`}
        aria-label="Open Chat"
      >
        <MessageSquare className="w-6 h-6" />
      </button>

      {/* Chat Window */}
      <div className={`fixed bottom-6 ${isRtl ? 'left-6' : 'right-6'} w-[90vw] max-w-[400px] h-[600px] max-h-[80vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50 transition-all duration-300 origin-bottom ${isOpen ? 'scale-100 opacity-100' : 'scale-50 opacity-0 pointer-events-none'}`}>
        
        {/* Header */}
        <div className="bg-black text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg leading-tight">{isRtl ? 'المستشار القانوني' : 'Legal Consultant'}</h3>
              <p className="text-xs text-white/70">{isRtl ? 'أحمد الشربيني وشركاه' : 'Ahmed El Sherbiny & Co.'}</p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 bg-[#F6F5F2] flex flex-col gap-4">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-sm ${msg.role === 'user' ? 'bg-black text-white rounded-br-sm' : 'bg-white text-black rounded-bl-sm border border-black/5'}`}>
                {msg.role === 'model' ? (
                  <div className="prose prose-sm rtl:prose-p:text-right rtl:prose-headings:text-right prose-p:leading-relaxed text-black/80">
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                ) : (
                  <p className="text-sm leading-relaxed">{msg.content}</p>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm border border-black/5 flex items-center gap-2">
                <Loader2 className="w-4 h-4 text-black/50 animate-spin" />
                <span className="text-xs text-black/50">{isRtl ? 'يكتب...' : 'Typing...'}</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-black/5">
          <form onSubmit={handleSubmit} className="flex items-center gap-2 relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={isRtl ? 'اكتب استفسارك هنا...' : 'Type your question here...'}
              className="flex-1 bg-[#F6F5F2] border border-transparent rounded-full px-5 py-3 text-sm focus:outline-none focus:border-black/20 focus:bg-white transition-all rtl:text-right"
              dir="auto"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${input.trim() && !isLoading ? 'bg-black text-white hover:scale-105' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
            >
              <Send className={`w-5 h-5 ${isRtl ? 'mr-1 rtl:-scale-x-100' : 'ml-1'}`} />
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
