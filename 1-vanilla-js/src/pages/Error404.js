/**
 * TV Series page component
 */
export class Error404Page {
    title = 'TV Series - Framework Movies';
    description = 'All TV Series availible on the site.';

    /**
     *  Method that returns page html in string
     */
    getHtml() {
        return `
            <div class="error-wrapper">
                <h1>404</h1>
                <p>Page was not found</p>
            </div>
        `;
    };
};