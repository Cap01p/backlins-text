export async function post({ request }) {
  const { url } = await request.json();
  const apiKey = import.meta.env.RAPIDAPI_KEY || '4dd7a616abmshe432066db06c437p1cea1fjsnb7af23cf2dcf';

  try {
    const response = await fetch(`https://moz-da-pa-spam-score.p.rapidapi.com/dapa?domain=${url}`, {
      headers: {
        'x-rapidapi-key': apiKey,
        'x-rapidapi-host': 'moz-da-pa-spam-score.p.rapidapi.com'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return new Response(JSON.stringify({ spamScore: data.spam_score }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
