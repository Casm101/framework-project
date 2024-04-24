import { ContentCard } from "../components/ContentCard.js";

/**
 * Movies page component
 */
export class MoviesPage {
    title = 'Movies - Framework Movies';
    description = 'All movies availible on the site.';

    sampleContent = [
        {
            title: "Shaun of the Dead",
            tags: ["Action", "Comedy"],
            cover: "./public/posters/sample.jpeg"
        },
        {
            title: "Hot Fuzz",
            tags: ["Action", "Comedy"],
            cover: "./public/posters/sample.jpeg"
        },
        {
            title: "The World's End",
            tags: ["Action", "Comedy"],
            cover: "./public/posters/sample.jpeg"
        }
    ];

    /**
     *  Method that returns page html in string
     */
    getHtml() {
        return `
            <div class="page-header">
                <p class="header-title">Movies</p>
                <p class="header-sum">420</p>
            </div>

            <div class="content-grid">
                ${this.sampleContent.map(c =>
                    new ContentCard(c.title, c.tags, c.cover).render()).join('')
                }
            </div>
        `;
    };
};