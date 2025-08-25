'use client';

import { useState, useEffect, useCallback } from 'react';

interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Type: string;
  Poster: string;
}

const popularSearchTerms = [
  'avengers', 'batman', 'spider', 'star wars', 'harry potter', 
  'lord rings', 'fast furious', 'mission impossible', 'john wick', 
  'marvel', 'dc', 'disney'
];

const fetchMovies = async (searchTerm: string = ''): Promise<Movie[]> => {
  const query = searchTerm || popularSearchTerms[Math.floor(Math.random() * popularSearchTerms.length)];
  
  try {
    const response = await fetch(`/api/movies?query=${encodeURIComponent(query)}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch movies');
    }
    
    const data = await response.json();
    
    if (data.error) {
      throw new Error(data.error || 'No movies found');
    }
    
    return data || [];
  } catch (err) {
    console.error('Error fetching movies:', err);
    return [];
  }
};

export const useMovies = (initialGenre: string = 'All') => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeGenre, setActiveGenre] = useState(initialGenre);

  const loadMoviesForGenre = useCallback(async (genre: string) => {
    setLoading(true);
    setError(null);
    
    try {
      let allMovies: Movie[] = [];
      
      if (genre === 'All') {
        const searchPromises = popularSearchTerms.slice(0, 4).map(term => fetchMovies(term));
        const results = await Promise.all(searchPromises);
        allMovies = results.flat();
      } else {
        allMovies = await fetchMovies(genre.toLowerCase());
      }
      
      const uniqueMovies = allMovies.filter((movie, index, self) => 
        index === self.findIndex(m => m.imdbID === movie.imdbID)
      ).slice(0, 16);
      
      setMovies(uniqueMovies);
    } catch (err) {
      setError('Failed to load movies. Please try again.');
      console.error('Error loading movies:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      loadMoviesForGenre(activeGenre);
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const searchResults = await fetchMovies(query);
      setMovies(searchResults.slice(0, 16));
    } catch (err) {
      setError('Search failed. Please try again.');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMoviesForGenre(activeGenre);
  }, [activeGenre, loadMoviesForGenre]);

  return { movies, loading, error, activeGenre, setActiveGenre, handleSearch, loadMoviesForGenre };
};