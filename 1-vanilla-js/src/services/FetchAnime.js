// Service imports
import { FetchContent } from "./index.js";


/**
 * Service to fetch anime from TMDB
 */
export class FetchAnime extends FetchContent {
    
    getAnime(page = 1) {
        return this.getContent('anime', page);
    };

    getAnimeById(id) {
        return this.getContentById('anime', id);
    };

    getAnimeGenres() {
        return this.getContentGenres('anime');
    };

    searchAnime(search, page = 1) {
        return this.searchContent('anime', search, page);
    }
};