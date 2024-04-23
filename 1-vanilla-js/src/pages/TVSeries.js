/**
 * TV Series page component
 */
export class TVSeriesPage {
    title = 'TV Series - Framework Movies';
    description = 'All TV Series availible on the site.';

    /**
     *  Method that returns page html in string
     */
    getHtml() {
        return `
            <div class="page-header">
                <p class="header-title">TV Series</p>
                <p class="header-sum">69</p>
            </div>

            <div class="content-grid">
            </div>
        `;
    };
};