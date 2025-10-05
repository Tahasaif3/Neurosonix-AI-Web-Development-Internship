import { useState, useEffect, useRef } from 'react';
import { AlertCircle } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { type Movie } from '../services/movie_app';
import { MovieCard } from './MovieCard';
import { LoadingSpinner } from './LoadingSpinner';

gsap.registerPlugin(ScrollTrigger);

interface MovieGridProps {
  title: string;
  fetchFunction: () => Promise<{ results: Movie[] }>;
  sectionId: string;
}

export const MovieGrid = ({ title, fetchFunction, sectionId }: MovieGridProps) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchFunction();
        setMovies(data.results.slice(0, 12));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch movies');
        console.error('Error fetching movies:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    if (!loading && movies.length > 0 && gridRef.current) {
      const cards = gridRef.current.querySelectorAll('.movie-card');

      gsap.fromTo(
        cards,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }
  }, [loading, movies]);

  return (
    <section id={sectionId} className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-10">
          {title}
        </h2>

        {loading && <LoadingSpinner />}

        {error && (
          <div className="flex items-center justify-center p-8">
            <div className="flex items-center space-x-3 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 px-6 py-4 rounded-lg border border-red-200 dark:border-red-800">
              <AlertCircle className="w-6 h-6 flex-shrink-0" />
              <p className="font-medium">{error}</p>
            </div>
          </div>
        )}

        {!loading && !error && movies.length === 0 && (
          <div className="text-center text-gray-600 dark:text-gray-400 py-12">
            No movies found.
          </div>
        )}

        {!loading && !error && movies.length > 0 && (
          <div
            ref={gridRef}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 sm:gap-6"
          >
            {movies.map((movie) => (
              <div key={movie.id} className="movie-card">
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
