/**
 * Toggle button component
 */
export class ToggleButton {
    isActive = false;

    /**
     * Constructor fot the toggle button component
     * @param {boolean} isActive 
     */
    constructor(isActive) {
        this.isActive = isActive;
    };

     /**
     * Method to render searchbar component
     * @returns {string}
     */
    render() {
        const activeClass = this.isActive ? 'active' : null;

        return `
            <!-- Toggle button -->
            <div class="toggleButton-styled ${activeClass}">
                <div class="toggleButton-circle"></div>
            </div>
        `;
    }
}