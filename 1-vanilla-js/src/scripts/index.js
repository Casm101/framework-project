// Component imports
import { Sidebar } from "../components/Sidebar.js";
import { Page } from "../components/Page.js";
import { ContentCard } from "../components/ContentCard.js";

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
import { useDebounce } from "../hooks/debounce.js";


// Initialise event emitter
window.getValue = getValue;
window.setValue = setValue;
window.em = new EventEmmiter();

let search;
let content;
let genres;
let pageNumber = 1;

// Sidebar links
const sidebarLinks = [
    {
        name: 'Movies',
        href: '/'
    },
    {
        name: 'TV Series',
        href: '/tv-series'
    },
    {
        name: 'Anime',
        href: '/anime'
    },
    {
        name: 'Favourites',
        href: '/favourites'
    }
];


/**
 * Method for artificial link routing.
 */
const handleLinkClick = (event) => {
    
    // Prevent default link functionality
    event.preventDefault();

    // Retrieve link href and push to history
    const href = event.currentTarget.getAttribute('href');
    window.history.pushState({}, '', href);
};

/**
 * Method to replace links with artificial routing
 */
const replaceLinks = () => {
    const links = document.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', handleLinkClick);
    });
};

/**
 * Method to render content to existing page
 */
const renderContent = async (search) => {

    let titleName;
    let searchContent;
    
    const path = window.location.pathname;

    // Fetch data depending on current path
    switch (path) {
        case '/': {
            if (search !== '') searchContent = await new FetchMovies().searchMovies(search);
            if (search === '') searchContent = await new FetchMovies().getMovies();
            titleName = 'title';
            genres = await new FetchMovies().getMoviesGenres();
            break;
        }
        case '/tv-series': {
            if (search !== '') searchContent = await new FetchSeries().searchSeries(search);
            if (search === '') searchContent = await new FetchSeries().getSeries();
            titleName = 'name';
            genres = await new FetchSeries().getSeriesGenres();
            break;
        }
        case '/anime': {
            if (search !== '') searchContent = await new FetchAnime().searchAnime(search);
            if (search === '') searchContent = await new FetchAnime().getAnime();
            titleName = 'name';
            genres = await new FetchSeries().getSeriesGenres();
            break;
        }
    };

    // Change total content from search results
    document.querySelector('.header-sum').innerHTML = searchContent.total_results;
    
    // Create content cards from search results
    content = searchContent.results.map(c => (
        new ContentCard(
            c[titleName],
            c.genre_ids.map(genreId => genres[genreId]),
            `https://image.tmdb.org/t/p/original${c.poster_path}`
        ).render())
    ).join('');

    // Render cards to content grid
    document.querySelector('.content-grid').innerHTML = content;
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
            console.log('error here bud');
            break;
        }
    };

    // Render page component with corresponding page template
    page = new Page(await content.getHtml(), content.title, content.description);
    document.querySelector('#render-page').innerHTML = page.render();
    
    // Toggle switch listener
    const toggle = document.querySelector('.toggleButton-styled');
    toggle.addEventListener('click', (e) => {
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

    // Add search listener
    document.querySelector('.searchbar-input').addEventListener('keyup', useDebounce((e) => {
        search = setValue('search', e.target.value);
        page = 1;
    }, 500));

    // Listen to search input and re-render content
    em.on('setValue-search', (e) => renderContent(e));
};

/**
 * Listener for page load.
 */
window.onload = () => {
    
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