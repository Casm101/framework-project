// Component imports
import { ContentCard } from "../components/ContentCard.js";
import { SearchBar } from "../components/SearchBar.js";
import { ToggleButton } from "../components/ToggleButton.js";
import { Pagination } from "../components/Pagination.js";

// Service imports
import { FetchAnime } from "../services/FetchAnime.js";

/**
 * Anime page component
 */
export class AnimePage {
    title = 'Anime - Framework Movies';
    description = 'All Anime availible on the site.';

    genres = {};
    content = [];
    contentItems = 0;
    contentPages = 0;

    async getAnime() {
        const animeData = await new FetchAnime().getAnime();
        this.content = animeData.results;
        this.contentItems = animeData.total_results;
        this.contentPages = animeData.total_pages > 500 ? 500 : animeData.total_pages;
    };

    async getGenres() {
        this.genres = await new FetchAnime().getAnimeGenres();
    }

    /**
     *  Method that returns page html in string
     */
    async getHtml() {

        await this.getGenres();
        await this.getAnime();

        return `
            <div class="page-header" style="gap: 3rem">
                ${new SearchBar('Search anime').render()}
                ${new ToggleButton().render()}
            </div>

            <div class="page-header">
                <p class="header-title">Anime</p>
                <p class="header-sum">${this.contentItems}</p>
            </div>

            <div class="content-grid">
                ${this.content.map(c =>
                    new ContentCard(
                        c.name,
                        c.genre_ids.map(genreId => this.genres[genreId]),
                        `https://image.tmdb.org/t/p/original${c.poster_path}`
                    ).render()).join('')
                }
            </div>

            ${new Pagination(pageNumber, this.contentPages).render()}
        `;
    };
};