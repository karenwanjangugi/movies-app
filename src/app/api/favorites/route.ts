
import { NextRequest, NextResponse } from 'next/server';

interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Type: string;
  Poster: string;
}

let favorites: Movie[] = [];

export async function GET() {
  return NextResponse.json(favorites);
}

export async function POST(request: NextRequest) {
  try {
    const movie = await request.json();
    
    if (!movie || !movie.imdbID) {
      return NextResponse.json({ error: 'Invalid movie data' }, { status: 400 });
    }
    if (favorites.find((fav) => fav.imdbID === movie.imdbID)) {
      return NextResponse.json({ message: 'Movie already in favorites' }, { status: 200 });
    }

    favorites.push(movie);
    
    return NextResponse.json({ message: 'Movie added to favorites', movie }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add movie' }, { status: 500 });
  }
}
