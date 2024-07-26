// Service imports
import { FetchContent } from "./index";


// Anime service declaration
export class AnimeService extends FetchContent {

    getAnime(page: number = 1) {
        return this.getContent('anime', page);
    }

    getAnimeById(id: number) {
        return this.getContentById('anime', id);
    }

    getAnimeGenres() {
        return this.getContentGenres('anime');
    }

    searchAnime(search: string, page: number = 1) {
        return this.searchContent('anime', search, page);
    }
}