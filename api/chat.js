export default async function handler(req, res) {
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

if (req.method !== 'POST') {
return res.status(405).json({ error: 'Method not allowed' });
@@ -15,7 +16,7 @@ export default async function handler(req, res) {
method: 'POST',
headers: {
'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
},
body: JSON.stringify({
model: 'gpt-4.1-mini',
@@ -26,21 +27,29 @@ export default async function handler(req, res) {
},
...messages
],
        temperature: 0.7
        temperature: 0.7,
        max_tokens: 700
})
});

const data = await response.json();

    res.status(200).json({
      reply: data.choices?.[0]?.message?.content || JSON.stringify(data)
    if (!response.ok) {
      console.error('OpenAI error:', data);
      return res.status(response.status).json({
        error: data.error?.message || 'Errore OpenAI'
      });
    }

    return res.status(200).json({
      reply: data.choices?.[0]?.message?.content || 'Non sono riuscito a generare una risposta.'
});

} catch (error) {
    console.error(error);
    console.error('Server error:', error);

    res.status(500).json({
      error: 'Errore server'
    return res.status(500).json({
      error: error.message || 'Errore server'
});
}
}
