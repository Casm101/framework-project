// Service imports
import { FetchContent } from "./index.js";


/**
 * Service fo series movies from TMDB
 */
export class FetchSeries extends FetchContent {
    
    getSeries(page = 1) {
        return this.getContent('tv', page);
    };

    getSeriesById(id) {
        return this.getContentById('tv', id);
    };
}