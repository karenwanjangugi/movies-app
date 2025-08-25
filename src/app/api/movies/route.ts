export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const searchTerm = searchParams.get('query') || 'batman'; 
    const page = searchParams.get('page') || '1';
    const API_KEY = process.env.OMDB_API_KEY || '';
    const baseUrl = 'http://www.omdbapi.com';
  
    if (!API_KEY) {
      return new Response('API key is missing', { status: 500 });
    }
  
    try {
      const response = await fetch(`${baseUrl}/?apikey=${API_KEY}&s=${encodeURIComponent(searchTerm)}&type=movie&page=${page}`);
      const result = await response.json();
  
      if (result.Response === 'False') {
        return new Response(JSON.stringify({ error: result.Error }), { status: 404 });
      }
  
      return new Response(JSON.stringify(result.Search), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      return new Response((error as Error).message, { status: 500 });
    }
  }
  

