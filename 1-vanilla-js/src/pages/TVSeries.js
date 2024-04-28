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

    content = [];

    async getSeries() {
        this.content = await new FetchSeries().getSeries();
    };

    /**
     *  Method that returns page html in string
     */
    async getHtml() {

        await this.getSeries();

        return `
            <div class="page-header" style="gap: 3rem">
                ${new SearchBar('Search movies').render()}
                ${new ToggleButton().render()}
            </div>

            <div class="page-header">
                <p class="header-title">TV Series</p>
                <p class="header-sum">69</p>
            </div>

            <div class="content-grid">
                ${this.content.map(c =>
                    new ContentCard(
                        c.name,
                        c.genre_ids,
                        `https://image.tmdb.org/t/p/original${c.poster_path}`
                    ).render()).join('')
                }
            </div>
        `;
    };
};