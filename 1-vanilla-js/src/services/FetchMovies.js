// Service imports
import { FetchContent } from "./index.js";


/**
 * Service to fetch movies from TMDB
 */
export class FetchMovies extends FetchContent {
    
    getMovies(page = 1) {
        return this.getContent('movie', page);
    };

    getMovieById(id) {
        return this.getContentById('movie', id);
    };

    getMoviesGenres() {
        return this.getContentGenres('movie');
    };

    searchMovies(search, page = 1) {
        return this.searchContent('movie', search, page);
    }
};