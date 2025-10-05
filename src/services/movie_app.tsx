const API_KEY = import.meta.env.VITE_TMDB_API_KEY || '3fd2be6f0c70a2a598f084ddfb75487c';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
}

export interface MovieResponse {
  results: Movie[];
  page: number;
  total_pages: number;
  total_results: number;
}

class MovieService {
  private async fetchFromAPI<T>(endpoint: string): Promise<T> {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}${endpoint.includes('?') ? '&' : '?'}api_key=${API_KEY}`);

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch data: ${error.message}`);
      }
      throw new Error('An unknown error occurred');
    }
  }

  async getTrending(timeWindow: 'day' | 'week' = 'day'): Promise<MovieResponse> {
    return this.fetchFromAPI<MovieResponse>(`/trending/movie/${timeWindow}`);
  }

  async getPopular(page: number = 1): Promise<MovieResponse> {
    return this.fetchFromAPI<MovieResponse>(`/movie/popular?page=${page}`);
  }

  async getTopRated(page: number = 1): Promise<MovieResponse> {
    return this.fetchFromAPI<MovieResponse>(`/movie/top_rated?page=${page}`);
  }

  async getUpcoming(page: number = 1): Promise<MovieResponse> {
    return this.fetchFromAPI<MovieResponse>(`/movie/upcoming?page=${page}`);
  }

  async getNowPlaying(page: number = 1): Promise<MovieResponse> {
    return this.fetchFromAPI<MovieResponse>(`/movie/now_playing?page=${page}`);
  }

  async searchMovies(query: string, page: number = 1): Promise<MovieResponse> {
    return this.fetchFromAPI<MovieResponse>(`/search/movie?query=${encodeURIComponent(query)}&page=${page}`);
  }

  getImageUrl(path: string | null, size: 'w500' | 'w780' | 'original' = 'w500'): string {
    if (!path) return '/placeholder-movie.jpg';
    return `${IMAGE_BASE_URL}/${size}${path}`;
  }

  getPosterUrl(path: string | null): string {
    return this.getImageUrl(path, 'w500');
  }

  getBackdropUrl(path: string | null): string {
    return this.getImageUrl(path, 'original');
  }
}

export const movieService = new MovieService();
