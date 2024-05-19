// Service imports
import { FetchContent } from "./index.js";


/**
 * Service to fetch series from TMDB
 */
export class SeriesService extends FetchContent {

    getSeries(page: number = 1) {
        return this.getContent('tv', page);
    };

    getSeriesById(id: number) {
        return this.getContentById('tv', id);
    };

    getSeriesGenres() {
        return this.getContentGenres('tv');
    };

    getSeriesRecommendationsById(id: number) {
        return this.getRecommendationsById('tv', id);
    };

    searchSeries(search: string, page: number = 1) {
        return this.searchContent('tv', search, page);
    };
};