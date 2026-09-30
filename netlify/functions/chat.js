const https = require('https');

exports.handler = async function (event) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    const { prompt, userName, points, lang } = JSON.parse(event.body || '{}');
    const apiKey = process.env.GEMINI_API_KEY || '';

    if (!apiKey) {
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ success: false, reason: 'no_api_key' })
      };
    }

    const isEn = lang === 'en';
    const systemPrompt = isEn
      ? `You are "Rashid", the friendly AI travel companion and explorer of Jordan in the "Masar" app. User: ${userName || 'Traveler'}. Points balance: ${points || '10000'} points. Answer any tourism, cultural, or travel question in warm, concise, and helpful English with Jordanian hospitality.`
      : `أنت "راشد" رفيق المسار ومستكشف الأردن في تطبيق "مسار" (Masar). المستخدم: ${userName || 'zeyad'}. رصيد نقاطه: ${points || '10000'} نقطة. أجب عن أي سؤال بلهجة أردنية ودودة ومختصرة ومفيدة.`;

    const payload = JSON.stringify({
      contents: [{ parts: [{ text: `${systemPrompt}\n\nالسؤال: ${prompt}` }] }]
    });

    const reply = await new Promise((resolve, reject) => {
      const req = https.request(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(payload) }
      }, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          try {
            const json = JSON.parse(data);
            const text = json?.candidates?.[0]?.content?.parts?.[0]?.text;
            resolve(text ? text.trim() : null);
          } catch (e) {
            resolve(null);
          }
        });
      });
      req.on('error', reject);
      req.write(payload);
      req.end();
    });

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: !!reply, reply: reply || '' })
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: err.message })
    };
  }
};
