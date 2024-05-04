// Component imports
import { ContentCard } from "../components/ContentCard.js";
import { SearchBar } from "../components/SearchBar.js";
import { ToggleButton } from "../components/ToggleButton.js";
import { Pagination } from "../components/Pagination.js";

// Service imports
import { FetchMovies } from "../services/FetchMovies.js";


/**
 * Movies page component
 */
export class MoviesPage {
    title = 'Movies - Framework Movies';
    description = 'All movies availible on the site.';

    genres = {};
    content = [];
    contentItems = 0;
    contentPages = 0;


    async getMovies() {
        const movieData = await new FetchMovies().getMovies();
        this.content = movieData.results;
        this.contentItems = movieData.total_results;
        this.contentPages = movieData.total_pages > 500 ? 500 : movieData.total_pages;
    };

    async getGenres() {
        this.genres = await new FetchMovies().getMoviesGenres();
    };


    /**
     *  Method that returns page html in string
     */
    async getHtml() {

        await this.getGenres();
        await this.getMovies();

        return `
            <div class="page-header" style="gap: 3rem">
                ${new SearchBar('Search movies').render()}
                ${new ToggleButton().render()}
            </div>

            <div class="page-header">
                <p class="header-title">Movies</p>
                <p class="header-sum">${this.contentItems}</p>
            </div>

            <div class="content-grid">
                ${this.content.map(c =>
                    new ContentCard(
                        c.id,
                        c.title,
                        c.genre_ids.map(genreId => this.genres[genreId],),
                        `https://image.tmdb.org/t/p/w342${c.poster_path}`,
                        'movie'
                    ).render()).join('')
                }
            </div>

            ${new Pagination(pageNumber, this.contentPages).render()}
        `;
    };
};