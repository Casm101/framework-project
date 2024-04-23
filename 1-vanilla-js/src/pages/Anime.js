/**
 * Anime page component
 */
export class AnimePage {
    title = 'Anime - Framework Movies';
    description = 'All Anime availible on the site.';

    /**
     *  Method that returns page html in string
     */
    getHtml() {
        return `
            <div class="page-header">
                <p class="header-title">Anime</p>
                <p class="header-sum">1826</p>
            </div>

            <div class="content-grid">
            </div>
        `;
    };
};