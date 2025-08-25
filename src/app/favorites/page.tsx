'use client';

import { useEffect, useState } from 'react';
import NavBar from '../Home/Components/Navbar';

interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Type: string;
  Poster: string;
}

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch('/api/favorites');
        if (!response.ok) {
          throw new Error('Failed to fetch favorites');
        }
        const data = await response.json();
        setFavorites(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white">
      <NavBar />
      <div className="px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">My List</h1>
        {loading && <p>Loading your favorite movies...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && favorites.length === 0 && (
          <p>You haven't added any movies to your list yet.</p>
        )}
        {!loading && !error && favorites.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favorites.map((movie) => (
              <div key={movie.imdbID} className="group">
                <div className="aspect-[2/3] relative overflow-hidden rounded-lg bg-gray-800">
                  <img
                    src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450'}
                    alt={movie.Title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="mt-3 text-white">{movie.Title}</h3>
                <p className="text-sm text-gray-400">{movie.Year}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
