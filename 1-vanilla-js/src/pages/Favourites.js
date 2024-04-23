/**
 * Favourites page component
 */
export class FavouritesPage {
    title = 'Favourites - Framework Movies';
    description = 'All Favourites availible on the site.';

    /**
     *  Method that returns page html in string
     */
    getHtml() {
        return `
            <div class="page-header">
                <p class="header-title">Favourites</p>
                <p class="header-sum">0</p>
            </div>

            <div class="content-grid">
            </div>
        `;
    };
};