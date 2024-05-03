import { LocalStore } from "../utils/LocalStore.js";
import { useDebounce } from "../hooks/debounce.js";
import { Modal } from "../components/Modal.js";

/**
 * Method for artificial link routing.
 */
export const handleLinkClick = (event) => {
    
    // Prevent default link functionality
    event.preventDefault();

    // Retrieve link href and push to history
    const href = event.currentTarget.getAttribute('href');
    window.history.pushState({}, '', href);
};

/**
 * Method to replace links with artificial routing
 */
export const replaceLinks = () => {
    const links = document.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', handleLinkClick);
    });
};

/**
 * Method to add pagination listeners
 */
export const addPaginationListeners = () => {
    document.querySelectorAll('.pagination-button').forEach(button => {
        if (!button.classList.contains('disabled')) {
            button.addEventListener('click', async (e) => {
                let newPage = e.target.innerHTML;
                if (newPage === 'Prev') newPage = parseInt(pageNumber) - 1;
                if (newPage === 'Next') newPage = parseInt(pageNumber) + 1;
                pageNumber = newPage > 500 ? 500 : newPage;
                await renderContent(search);
            })
        }
    });
};

/**
 * Method to add content card listeners
 */
export const addContentCardListeners = () => {
    document.querySelectorAll('.content-card').forEach(card => {
        card.addEventListener('click', (e) => {
            const clickTarget = e.target;
            const contentId = clickTarget.closest('.content-card').getAttribute('content');
            const contentType = contentId.split('_')[0];
            const contentValue = contentId.split('_')[1];
            let existing = [];

            const liked = (isLiked) => {
                return isLiked ?`
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                        <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                    </svg>
                `
                    :
                `
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                    </svg>
                `;
            };

            // Action if like button is clicked
            if (clickTarget.closest('.content-like')) {
                const ls = new LocalStore;
                let likedButton;

                if (contentType === 'movie') {
                    existing = ls.getMovies();
                    
                    if (!existing.includes(contentValue)) {
                        ls.addMovies([contentValue]);
                        likedButton = liked(true);
                    };
                    if (existing.includes(contentValue)) {
                        ls.removeMovie(contentValue);
                        likedButton = liked(false);
                    };

                    clickTarget.closest('.content-like').innerHTML = likedButton;
                }

                if (contentType === 'series') {
                    existing = ls.getSeries();

                    if (!existing.includes(contentValue)) {
                        ls.addSeries([contentValue]);
                        likedButton = liked(true);
                    };
                    if (existing.includes(contentValue)) {
                        ls.removeSeries(contentValue);
                        likedButton = liked(false);
                    };

                    clickTarget.closest('.content-like').innerHTML = likedButton;
                }
            }

            // Action if card is clicked
            if (!clickTarget.closest('.content-like')) {
                const modalRender = document.querySelector('#render-modal');

                modalRender.classList.toggle('visible');
                modalRender.innerHTML = new Modal().render();

                addCloseModalListener();
            }
        });
    });
};

/**
 * Method to add close modal listener
 */
export const addCloseModalListener = () => {
    const modalRender = document.querySelector('#render-modal');
    
    document.querySelector('.modal-close').addEventListener('click', () => {
        modalRender.classList.toggle('visible');
    });
};

/**
 * Method to add search bar listener
 */
export const addSearchBarListener = () => {
    document.querySelector('.searchbar-input')?.addEventListener('keyup', useDebounce((e) => {
        search = setValue('search', e.target.value);
        pageNumber = 1;
    }, 500));
};

/**
 * Method to add toggle button listener
 */
export const addToggleButtonListner = () => {
    const toggle = document.querySelector('.toggleButton-styled');
    toggle?.addEventListener('click', (e) => {
        const isActive = new Array(...toggle.classList).indexOf('active') !== -1;
        if (isActive) {
            document.querySelector(':root').classList.remove('light');
            return toggle.classList.remove('active');
        }
        if (!isActive) {
            document.querySelector(':root').classList.add('light');
            return toggle.classList.add('active');
        }
    });
}