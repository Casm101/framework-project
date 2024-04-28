// Service imports
import { FetchContent } from "./index.js";


/**
 * Service fo fetch movies from TMDB
 */
export class FetchMovies extends FetchContent {
    
    getMovies(page = 1) {
        return this.getContent('movie', page);
    };

    getMovieById(id) {
        return this.getContentById('movie', id);
    };
}