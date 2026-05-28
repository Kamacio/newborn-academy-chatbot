const { knowledgeBase } = require('../data/knowledge.js');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { messages } = req.body;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4.1-mini',
        messages: [
          {
            role: 'system',
            content: knowledgeBase
          },
          ...messages
        ],
        temperature: 0.7,
        max_tokens: 700
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('OpenAI error:', data);

      return res.status(response.status).json({
        error: data.error?.message || 'Errore OpenAI'
      });
    }

    return res.status(200).json({
      reply:
        data.choices?.[0]?.message?.content ||
        'Non sono riuscito a generare una risposta.'
    });

  } catch (error) {
    console.error('Server error:', error);

    return res.status(500).json({
      error: error.message || 'Errore server'
    });
  }
};
