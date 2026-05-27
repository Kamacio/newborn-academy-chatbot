export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message } = req.body;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4.1-mini',
        messages: [
          {
            role: 'system',
            content: `
Sei l'assistente ufficiale della Newborn Academy.

Rispondi in italiano.

Aiuti fotografi interessati ai corsi:
- newborn
- maternity
- marketing
- percorso completo

Prima di dare informazioni approfondite cerca di capire:
- esperienza del fotografo
- obiettivi
- interesse principale
- se vuole partire subito o sta solo valutando

Non inventare prezzi o disponibilità.
Mantieni un tono professionale, chiaro e umano.
`
          },
          {
            role: 'user',
            content: message
          }
        ],
        temperature: 0.7
      })
    });

    const data = await response.json();

    res.status(200).json({
      reply: data.choices[0].message.content
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Errore server'
    });
  }
}
