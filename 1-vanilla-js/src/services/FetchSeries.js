// Service imports
import { FetchContent } from "./index.js";


/**
 * Service to fetch series from TMDB
 */
export class FetchSeries extends FetchContent {
    
    getSeries(page = 1) {
        return this.getContent('tv', page);
    };

    getSeriesById(id) {
        return this.getContentById('tv', id);
    };

    getSeriesGenres() {
        return this.getContentGenres('tv');
    };

    getSeriesRecommendationsById(id) {
        return this.getRecommendationsById('tv', id);
    };

    searchSeries(search, page = 1) {
        return this.searchContent('tv', search, page);
    };
};