// Component imports
import { ContentCard } from "../components/ContentCard.js";
import { SearchBar } from "../components/SearchBar.js";
import { ToggleButton } from "../components/ToggleButton.js";

// Service imports
import { FetchSeries } from "../services/FetchSeries.js";

/**
 * TV Series page component
 */
export class TVSeriesPage {
    title = 'TV Series - Framework Movies';
    description = 'All TV Series availible on the site.';

    genres = {};
    content = [];
    contentItems = 0;

    async getSeries() {
        const seriesData = await new FetchSeries().getSeries();
        this.content = seriesData.results;
        this.contentItems = seriesData.total_results;
    };

    async getGenres() {
        this.genres = await new FetchSeries().getSeriesGenres();
    }

    /**
     *  Method that returns page html in string
     */
    async getHtml() {

        await this.getGenres();
        await this.getSeries();

        return `
            <div class="page-header" style="gap: 3rem">
                ${new SearchBar('Search series').render()}
                ${new ToggleButton().render()}
            </div>

            <div class="page-header">
                <p class="header-title">TV Series</p>
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
        `;
    };
};