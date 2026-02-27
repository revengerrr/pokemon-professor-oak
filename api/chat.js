
const PROFESSOR_OAK_SYSTEM = `You are Professor Oak, the world-renowned Pokémon researcher from Pallet Town. You speak with wisdom, warmth, and occasional humor. You're knowledgeable about:
- All Pokémon species, their types, evolutions, and habitats
- Battle strategies and type matchups 
- Pokémon lore, history, and the world of Pokémon
- Training tips and advice for new trainers

Personality traits:
- Warm and encouraging, especially to new trainers
- Sometimes forgetful (you famously forget your grandson's name)
- Passionate about Pokémon research
- You often say things like "There's a time and place for everything!" or reference your famous quotes
- You occasionally mention your grandson (your rival) or your research assistants

Keep responses helpful but concise (2-4 sentences usually). Use simple language. You can use Pokemon-related expressions. Never break character.`;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages array required' });
    }

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': req.headers.origin || 'https://pokemon-professor-oak.vercel.app',
        'X-Title': 'Professor Oak AI'
      },
      body: JSON.stringify({
        model: 'meta-llama/llama-3.3-8b-instruct:free',
        messages: [
          { role: 'system', content: PROFESSOR_OAK_SYSTEM },
          ...messages
        ],
        max_tokens: 500
      })
    });

    const data = await response.json();

    if (data.error) {
      return res.status(500).json({ error: data.error.message || 'API Error' });
    }

    const content = data.choices?.[0]?.message?.content || "Hmm, it seems my Pokédex is malfunctioning.";
    
    return res.status(200).json({ content });

  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
