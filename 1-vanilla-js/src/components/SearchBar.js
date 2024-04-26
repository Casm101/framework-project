/**
 * SearchBar component
 */
export class SearchBar {
    placeholder;
    defaultValue;

    /**
     * Constructor for the searchbar component
     * @param {*} placeholder 
     * @param {*} defaultValue 
     */
    constructor(placeholder, defaultValue) {
        this.placeholder = placeholder;
        this.defaultValue = defaultValue ? defaultValue : null;
    };

    /**
     * Method to render searchbar component
     * @returns {string}
     */
    render() {

        return `
            <!-- Searchbar -->
            <div class="searchbar-styled">
                <input
                    type="search"
                    class="searchbar-input"
                    placeholder="${this.placeholder}"
                >
                <img src="./public/icons/search-icon.svg" alt="" class="searchbar-icon">
            </div>
        `;
    };
};