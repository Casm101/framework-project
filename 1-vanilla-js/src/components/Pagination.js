/**
 * Pagination component
 */
export class Pagination {
    page = 0;
    totalPages = 0;

    /**
     * Constructor for the pagination component
     * @param {number} page 
     * @param {number} totalPages 
     */
    constructor(page, totalPages) {
        this.page = page;
        this.totalPages = totalPages;
    };

    paginationButton(number, isActive, isDisabled) {
        const activeClass = isActive ? 'active' : '';
        const disabledClass = isDisabled ? 'disabled' : '';

        return `
            <div class="pagination-button ${activeClass} ${disabledClass}">${number}</div>
        `;
    };

    generateButtons() {
        const buttons = [];
        const prevDisabled = this.page === 1 ? true : false;
        const nextDisabled = this.page === this.totalPages ? 'true' : false;

        buttons.push(this.paginationButton('Prev', false, prevDisabled));

        if (this.page < 5 && this.totalPages <= 5) {
            for (let i = 1; i < this.totalPages + 1; i++) {
                const isActive = i === this.page;
                buttons.push(this.paginationButton(i, isActive, false));
            }
        }

        if (this.page < 5 && this.totalPages > 5) {
            for (let i = 1; i < 6; i++) {
                const isActive = i === this.page;
                buttons.push(this.paginationButton(i, isActive, false));
            }
            buttons.push(this.paginationButton('...', false, true));
            buttons.push(this.paginationButton(this.totalPages, false, false));
        }

        if (this.page >= 5 && this.page <= this.totalPages - 5) {
            const start = this.page - 2;
            const end = this.page + 3;

            buttons.push(this.paginationButton('1', false, false));
            buttons.push(this.paginationButton('...', false, true));

            for (let i = start; i < end; i++) {
                const isActive = i === this.page;
                buttons.push(this.paginationButton(i, isActive, false));
            };

            buttons.push(this.paginationButton('...', false, true));
            buttons.push(this.paginationButton(this.totalPages, false, false));
        }

        if (this.page > 5 && this.page > this.totalPages - 5) {
            const start = this.totalPages - 4;
            const end = this.totalPages;

            buttons.push(this.paginationButton('1', false, false));
            buttons.push(this.paginationButton('...', false, true));

            for (let i = start; i < end; i++) {
                const isActive = i === this.page;
                buttons.push(this.paginationButton(i, isActive, false));
            };

            buttons.push(this.paginationButton(this.totalPages, false, false));
        }

        buttons.push(this.paginationButton('Next', false, nextDisabled));

        return buttons.join('');
    };

    render() {
        return `
            <div class="pagination-styled">
                ${this.generateButtons()}
            </div>
        `;
    };
};