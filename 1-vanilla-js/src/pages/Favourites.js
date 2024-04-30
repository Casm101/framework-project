// Component imports
import { ContentCard } from "../components/ContentCard.js";

// Service imports
import { FetchMovies } from "../services/FetchMovies.js";

// Utility imports
import { LocalStore } from "../utils/LocalStore.js";

/**
 * Favourites page component
 */
export class FavouritesPage {
    title = 'Favourites - Framework Movies';
    description = 'All Favourites availible on the site.';
    moviesContent = [];
    seriesContent = [];

    /**
     *  Method that returns page html in string
     */
    async getHtml() {

        const ls = new LocalStore();
        const movies = ls.getMovies() || [];
        const series = ls.getSeries() || [];

        const fm = new FetchMovies();

        this.moviesContent = await Promise.all(movies.map(async (id) => {
            return await fm.getMovieById(id)
        }));

        this.seriesContent = await Promise.all(series.map(async (id) => {
            return await fm.getSeriesById(id)
        }));

        return `
            <div class="page-header">
                <p class="header-title">Favourites</p>
                <p class="header-sum">${this.moviesContent.length + this.seriesContent.length}</p>
            </div>

            <div class="content-grid">
                ${this.moviesContent?.map(c =>
                    new ContentCard(
                        c.id,
                        c.title,
                        c.genres.map(genre => genre.name),
                        `https://image.tmdb.org/t/p/original${c.poster_path}`,
                        'movie'
                    ).render()).join('')
                }
            </div>
        `;
    };
};