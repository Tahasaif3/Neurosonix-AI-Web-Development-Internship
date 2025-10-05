import { Star, Calendar } from 'lucide-react';
import { type Movie, movieService } from '../services/movie_app';

interface MovieCardProps {
  movie: Movie;
}

export const MovieCard = ({ movie }: MovieCardProps) => {
  const posterUrl = movieService.getPosterUrl(movie.poster_path);
  const year = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';

  return (
    <div className="group relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
      <div className="relative aspect-[2/3] overflow-hidden bg-gray-200 dark:bg-gray-700">
        {movie.poster_path ? (
          <img
            src={posterUrl}
            alt={movie.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-600">
            No Image
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <p className="text-white text-sm line-clamp-3">
              {movie.overview || 'No description available.'}
            </p>
          </div>
        </div>

        <div className="absolute top-3 right-3 flex items-center space-x-1 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-full">
          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          <span className="text-white text-sm font-semibold">
            {movie.vote_average.toFixed(1)}
          </span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-1">
          {movie.title}
        </h3>

        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
          <Calendar className="w-4 h-4 mr-1" />
          <span>{year}</span>
        </div>
      </div>
    </div>
  );
};
