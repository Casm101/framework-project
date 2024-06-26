// Component imports
import { Sidebar } from "../components/Sidebar.js";
import { Page } from "../components/Page.js";
import { ContentCard } from "../components/ContentCard.js";
import { Pagination } from "../components/Pagination.js";

// Page imports
import { MoviesPage } from "../pages/Movies.js";
import { TVSeriesPage } from "../pages/TVSeries.js";
import { AnimePage } from "../pages/Anime.js";
import { FavouritesPage } from "../pages/Favourites.js";
import { Error404Page } from "../pages/Error404.js";

// Service imports
import { FetchMovies } from "../services/FetchMovies.js";
import { FetchSeries } from "../services/FetchSeries.js";
import { FetchAnime } from "../services/FetchAnime.js";

// Util and hook imports
import { EventEmmiter } from "../utils/EventEmitter.js";
import { getValue, setValue } from "../hooks/stateHooks.js";
import { scrollToTop } from "../hooks/scrollToTop.js";
import { replaceLinks, addContentCardListeners, addSearchBarListener, addToggleButtonListner } from "../utils/EventListeners.js";
import { LocalStore } from "../utils/LocalStore.js"


// Initialise event emitter
window.getValue = getValue;
window.setValue = setValue;
window.getTheme = new LocalStore().getTheme;
window.setTheme = new LocalStore().setTheme;
window.em = new EventEmmiter();

// Declare global variables
window.theme = getTheme('theme') || 'light';
window.search = '';
window.pageNumber = 1;
let content;
let genres;


// Sidebar links
const sidebarLinks = [
    {
        name: 'Movies',
        href: '/',
        icon: './public/icons/film-icon.svg'
    },
    {
        name: 'TV Series',
        href: '/tv-series',
        icon: './public/icons/series-icon.svg'
        
    },
    {
        name: 'Anime',
        href: '/anime',
        icon: './public/icons/anime-icon.svg'

    },
    {
        name: 'Favourites',
        href: '/favourites',
        icon: './public/icons/heart-icon.svg'
    }
];


/**
 * Method to render content to existing page
 */
const renderContent = async (search) => {

    let titleName;
    let searchContent;
    let contentType;
    
    const path = window.location.pathname;

    // Fetch data depending on current path
    switch (path) {
        case '/': {
            if (search !== '') searchContent = await new FetchMovies().searchMovies(search, pageNumber);
            if (search === '') searchContent = await new FetchMovies().getMovies(pageNumber);
            titleName = 'title';
            genres = await new FetchMovies().getMoviesGenres();
            contentType = 'movie';
            break;
        }
        case '/tv-series': {
            if (search !== '') searchContent = await new FetchSeries().searchSeries(search, pageNumber);
            if (search === '') searchContent = await new FetchSeries().getSeries(pageNumber);
            titleName = 'name';
            genres = await new FetchSeries().getSeriesGenres();
            contentType = 'series';
            break;
        }
        case '/anime': {
            if (search !== '') searchContent = await new FetchAnime().searchAnime(search, pageNumber);
            if (search === '') searchContent = await new FetchAnime().getAnime(pageNumber);
            titleName = 'name';
            genres = await new FetchSeries().getSeriesGenres();
            contentType = 'series';
            break;
        }
    };

    // Change total content from search results
    document.querySelector('.header-sum').innerHTML = searchContent.total_results;
    
    // Create content cards from search results
    content = searchContent.results.map(c => (
        new ContentCard(
            c.id,
            c[titleName],
            c.genre_ids.map(genreId => genres[genreId]),
            c.poster_path,
            contentType
        ).render())
    ).join('');

    // Render cards to content grid
    document.querySelector('.content-grid').innerHTML = content;

    // Re-render pagination on page
    document.querySelector('.pagination-styled').outerHTML = new Pagination(pageNumber, searchContent.total_pages > 500 ? 500 : searchContent.total_pages).render();

    // Run post render actions
    postRenderActions();
};

/**
 * Method that renders the page
 */
const renderPage = async () => {
    const path = window.location.pathname;
    let page;
    let content;

    switch (path) {
        case '/': {
            content = new MoviesPage();
            break;
        }
        case '/tv-series': {
            content = new TVSeriesPage();
            break;
        }
        case '/anime': {
            content = new AnimePage();
            break;
        }
        case '/favourites': {
            content = new FavouritesPage();
            break;
        }
        default: {
            content = new Error404Page();
            break;
        }
    };

    // Render page component with corresponding page template
    page = new Page(await content.getHtml(), content.title, content.description);
    document.querySelector('#render-page').innerHTML = page.render();
    
    // Toggle switch listener
    addToggleButtonListner();

    // Add search listener
    addSearchBarListener();

    // Listen to search input and re-render content
    em.on('setValue-search', (e) => renderContent(e));

    // Run post render actions
    postRenderActions();
};

/**
 * Method to cover post render actions
 */
const postRenderActions = () => {

    // Add pagination listeners
    addPaginationListeners();

    // Add content card listeners
    addContentCardListeners();

    // Scroll to top of page
    scrollToTop();
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
 * Listener for page load.
 */
window.onload = () => {

    // Set initial site theme
    if (theme === 'light') document.querySelector(':root').classList.add('light');
    
    // Render sidebar
    const sidebar = new Sidebar(sidebarLinks);
    document.querySelector('#render-sidebar').outerHTML = sidebar.render();

    // Replace links
    replaceLinks();

    // Render page
    renderPage(window.location.pathname);
};

/**
 * Listen for pathname changes
 */
window.addEventListener('click', e => {
    const isLink = e.target.closest('a')?.tagName === 'A';

    if (isLink) {

        // Re-render page
        renderPage();

        // Re-render navigation links
        const newLinks = sidebarLinks.map(link => new Sidebar().link(link)).join('');
        document.querySelector('.sidebar-navigation').innerHTML = newLinks;

        // Replace links
        replaceLinks();
    };
});