export const config = {
  runtime: 'edge',
};

const WEB3FORMS_KEY = process.env.WEB3FORMS_KEY || '3e68732b-9a04-4410-a35d-f1386a6deb3c';

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
  }

  try {
    const data = (await req.json()) as any;

    // Anti-bot honeypot check
    if (data._gotcha || data.bot_field) {
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    }

    const formData = new FormData();
    formData.append('access_key', WEB3FORMS_KEY);
    formData.append('subject', String(data.subject || 'رسالة جديدة من الموقع').slice(0, 200));
    formData.append('from_name', 'موقع أحمد الشربيني وشركاه');
    formData.append('name', String(data.name || 'عميل').slice(0, 100));
    formData.append('email', String(data.email || 'غير محدد').slice(0, 100));
    formData.append('phone', String(data.phone || 'غير محدد').slice(0, 50));
    if (data.service) formData.append('service', String(data.service).slice(0, 100));
    if (data.notes) formData.append('notes', String(data.notes).slice(0, 2000));
    if (data.message) formData.append('message', String(data.message).slice(0, 3000));

    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData
    });

    if (!res.ok) {
      return new Response(JSON.stringify({ error: 'Form delivery error' }), { status: 502 });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    console.error('Contact API error:', err);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}
