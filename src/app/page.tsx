"use client";


import { useEffect, useState } from "react";
import { Play, Plus } from "lucide-react"; 
import Button from "./Shared/Button/index"; 
import NavBar from "./Home/Components/Navbar";
import Footer from "./Home/Components/Footer";
import Link from "next/link"; 
import { useMovies } from './hooks/useMovies';


interface Movie {
  imdbID: string; 
  Title: string;
  Year: string;
  Type: string; 
  Poster: string; 
}


interface OMDBResponse {
  Search: Movie[]; 
  totalResults: string; 
  Response: string; 
  Error?: string; 
}


export default function App() {
  const [searchQuery, setSearchQuery] = useState(''); 
 
  const {
    movies,         
    loading,        
    error,          
    activeGenre,    
    setActiveGenre,
    handleSearch,   
    loadMoviesForGenre 
  } = useMovies('All'); 

  
  const addToFavorites = async (movie: Movie) => {
    try {
      const response = await fetch('/api/favorites', { 
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify(movie), 
      });

      if (response.ok) {
        alert(`${movie.Title} has been added to your list!`);
      } else {
 
        const data = await response.json(); 
        alert(data.message || 'Failed to add movie to your list.');
      }
    } catch (error) {
      console.error('Error adding to favorites:', error);
      alert('Failed to add movie to your list.');
    }
  };

  const genres = ['All', 'Comedy', 'Sci-fi', 'Horror', 'Adventure', 'Crime'];

  const popularSearchTerms = [
    'avengers', 'batman', 'spider', 'star wars', 'harry potter',
    'lord rings', 'fast furious', 'mission impossible', 'john wick',
    'marvel', 'dc', 'disney'
  ];


  const handleGenreChange = (genre: string) => {
    setActiveGenre(genre);
  };


  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault(); 
    handleSearch(searchQuery); 
  };


  
  const movieGrid = [];
  const moviesPerRow = 4; 
  for (let i = 0; i < movies.length; i += moviesPerRow) {
    const rowMovies = movies.slice(i, i + moviesPerRow);
    movieGrid.push(rowMovies);
  }

  
  
  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white m-auto mx-50 border-2 rounded-3xl border-amber-400/30">
      <NavBar /> 
      <section className="relative h-[500px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        />
        <div>
          {loading && <h3 className="text-center p-4">Loading movies...</h3>}
          {error && <h3 className="text-center p-4 text-red-500">Error: {error}</h3>}
        </div>
        <div className="absolute inset-0 bg-[url(https://www.google.com/url?sa=i&url=https%3A%2F%2Fcosettepaneque.com%2Fmaleficent%2F&psig=AOvVaw2sPJXF1Udyt1B1oCxs3Zog&ust=1756181110036000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCLikxMyKpY8DFQAAAAAdAAAAABAE)] bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

        <div className="relative z-10 flex items-center h-full px-8">
          <div className="max-w-xl">
            <h1 className="text-5xl font-bold mb-4">
              Maleficent:{" "}
              <span className="text-[#FEAF23]">Mistress of Evil</span>
            </h1>
            <p className="text-gray-300 mb-6 leading-relaxed">
              A fantasy adventure that picks up several years after Maleficent,
              in which audiences learned of the events that hardened the heart
              of Disney's most notorious villain and drove her to curse a baby
              Princess Aurora.
            </p>
            <div className="flex gap-4">
              <Button className="bg-[#FEAF23] hover:bg-[#FEAF23]/80 text-white px-8 py-3 flex items-center gap-2">
                <Play className="w-5 h-5" /> 
                Watch Now
              </Button>
              <Link href="/favorites" className="text-gray-400 hover:text-[#FEAF23] transition-colors">
                <Button
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-black px-8 py-3 flex items-center gap-2"
                >
                  My List
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="px-8 py-8">
        <div className="flex items-center gap-6 mb-8 overflow-x-auto pb-2"> 
          {genres.map((genre) => (
            <button
              key={genre} 
              onClick={() => handleGenreChange(genre)} 
              className={`px-6 py-2 rounded-full transition-colors whitespace-nowrap ${ 
                genre === activeGenre 
                  ? "bg-[#FEAF23] text-white font-semibold" 
                  : "bg-gray-800/50 text-gray-400 hover:bg-gray-700 hover:text-white" 
                }`}
            >
              {genre}
            </button>
          ))}
        </div>

        {!loading && !error && movieGrid.length > 0 && (
          <div className="space-y-8">
            {movieGrid.map((rowOfMovies, rowIndex) => (
              <div key={rowIndex} className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-${moviesPerRow} gap-6`}> 
                {rowOfMovies.map((movie) => (
                  <div
                    key={movie.imdbID} 
                    className="group cursor-pointer transform transition-transform duration-300 hover:scale-105"
                  >
                    <div className="aspect-[2/3] relative overflow-hidden rounded-lg bg-gray-800"> 
                      <img
                        src={movie.Poster !== 'N/A' ? movie.Poster : 'https://placehold.co/400x600?text=No+Image'} 
                        alt={movie.Title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" 
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                      </div>
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"> 
                        <Button
                          variant="outline"
                          className="border-amber-400 text-amber-400 bg-black/50 hover:bg-amber-400 hover:text-black p-2 rounded-full"
                          onClick={(e) => { e.stopPropagation(); addToFavorites(movie); }}
                          aria-label={`Add ${movie.Title} to favorites`} 
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <h3 className="mt-3 text-white group-hover:text-[#FEAF23] transition-colors truncate"> 
                      {movie.Title}
                    </h3>
                    <p className="text-sm text-gray-400">{movie.Year}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
        {!loading && !error && movies.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-400 mb-4">No movies found for "{activeGenre}". Try another genre or search term.</p>
            {activeGenre !== 'All' && (
              <Button
                onClick={() => handleGenreChange('All')}
                className="bg-[#FEAF23] hover:bg-[#FEAF23]/80 text-white"
              >
                Browse All Movies
              </Button>
            )}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
