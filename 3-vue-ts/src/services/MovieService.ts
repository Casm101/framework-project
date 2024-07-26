// Service imports
import { FetchContent } from "./index";


// Movie service declaration
export class MovieService extends FetchContent {

    getMovies(page: number = 1) {
        return this.getContent('movie', page);
    }

    getMovieById(id: number) {
        return this.getContentById('movie', id);
    }

    getMovieRecommendationsById(id: number) {
        return this.getRecommendationsById('movie', id);
    }

    getMovieGenres() {
        return this.getContentGenres('movie');
    }

    searchMovies(search: string, page: number = 1) {
        return this.searchContent('movie', search, page);
    }
}