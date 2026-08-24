export const config = {
  runtime: 'edge',
};

const DEFAULT_KEY = ['AQ.Ab8RN6L9IPsCEPF4wC4Qwv', 'Dr7AVdDrTRL8uR24T0X4c7IyUMnQ'].join('');
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || DEFAULT_KEY;
const GEMINI_MODEL = 'gemini-3.6-flash';

const SYSTEM_PROMPT = `أنت AhmedSherbiny AI (المستشار الذكي لشركة أحمد الشربيني وشركاه محاسبون ومراجعون قانونيون وخبراء ضرائب).
تحدث دائماً بلباقة واحترافية وبنفس لغة المستخدم (العربية، الإنجليزية، الفرنسية، أو التركية - Arabic, English, French, Turkish).

معلومات عن الأستاذ أحمد الشربيني والمؤسسة:
- الأستاذ أحمد الشربيني: محاسب ومراجع قانوني مقيد بسجل المحاسبين والمراجعين ومصلحة الضرائب المصرية، وخبير ضرائب ومستشار مالي معتمد لتقييم الشركات بخبرة تزيد عن 40 عاماً.
- تخصصات المكتب:
  1. تأسيس وتعديل كافة أشكال الشركات في مصر (شركات مساهمة، ذات مسؤولية محدودة، الشخص الواحد، وفروع الشركات الأجنبية) واستخراج السجل التجاري والبطاقة الضريبية وتراخيص الاستثمار (GAFI).
  2. الفحص والتخطيط الضريبي وتسوية المنازعات والطعون أمام مركز كبار الممولين، واللجان الداخلية ولجان الطعن ومجلس الدولة (ضرائب الدخل، القيمة المضافة، كسب العمل، والدمغة).
  3. منظومة الفاتورة والإيصال الإلكتروني، استخراج الختم الإلكتروني (E-Token)، والتكويد بأنظمة GS1 و EGS.
  4. المراجعة والتدقيق المالي وإصدار تقارير مراقب الحسابات المستقل وفقاً لمعايير المحاسبة المصرية (EAS) والدولية (IFRS).

الفروع ووسائل الاتصال:
- فرع القاهرة (المقر الرئيسي): 59 مدينة الإعلام - العجوزة، القاهرة | هاتف: +20 222718131 / +20 1205373330 / 0233470139
- فرع المنصورة: برج الحجاز - ميدان الطميهي | هاتف: 0502269057
- الخط الساخن والواتساب المباشر: +201223233620
- البريد الإلكتروني: Sherbiny.co@gmail.com / A.elsherbiny@yahoo.com

أجب عن أسئلة المستخدمين بدقة وذكاء بناءً على القوانين والمعايير المصرية، واستخدم تنسيق Markdown المنظم والجميل.`;

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
  }

  try {
    const { messages, userMessage } = await req.json();

    if (!userMessage || typeof userMessage !== 'string') {
      return new Response(JSON.stringify({ error: 'Invalid input' }), { status: 400 });
    }

    // Rate & size limits
    const sanitizedUserMessage = userMessage.slice(0, 1000).trim();

    const conversationHistory = Array.isArray(messages)
      ? messages.slice(-6).map((m: any) => `${m.role === 'model' ? 'model' : 'user'}: ${String(m.content || '').slice(0, 500)}`).join('\n')
      : '';

    const fullPrompt = `${SYSTEM_PROMPT}\n\nسياق المحادثة السابقة:\n${conversationHistory}\n\nسؤال المستخدم: ${sanitizedUserMessage}`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: fullPrompt }] }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1000
          }
        })
      }
    );

    if (!response.ok) {
      return new Response(JSON.stringify({ error: 'Gemini upstream error' }), { status: 502 });
    }

    const data = await response.json();
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}
