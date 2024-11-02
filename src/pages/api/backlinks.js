import { XMLHttpRequest } from 'xmlhttprequest';

export async function post({ request }) {
  const { url } = await request.json();
  const apiKey = '4dd7a616abmshe432066db06c437p1cea1fjsnb7af23cf2dcf';

  return new Promise((resolve) => {
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener('readystatechange', function () {
      if (this.readyState === this.DONE) {
        console.log('Raw API Response:', this.responseText);
        
        try {
          const data = JSON.parse(this.responseText);
          resolve(new Response(JSON.stringify(data), {
            status: 200,
            headers: { "Content-Type": "application/json" }
          }));
        } catch (error) {
          console.error('Error parsing API response:', error);
          resolve(new Response(JSON.stringify({ error: 'Failed to parse API response' }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
          }));
        }
      }
    });

    xhr.open('GET', `https://ahrefs1.p.rapidapi.com/v1/backlink-checker?url=${encodeURIComponent(url)}&mode=subdomains`);
    xhr.setRequestHeader('x-rapidapi-key', apiKey);
    xhr.setRequestHeader('x-rapidapi-host', 'ahrefs1.p.rapidapi.com');

    xhr.send(null);
  });
}
