// Component imports
import { Sidebar } from "../components/Sidebar.js";
import { Page } from "../components/Page.js";

// Page imports
import { MoviesPage } from "../pages/Movies.js";
import { TVSeriesPage } from "../pages/TVSeries.js";
import { AnimePage } from "../pages/Anime.js";
import { FavouritesPage } from "../pages/Favourites.js";
import { Error404Page } from "../pages/Error404.js";

// Util and hook imports
import { EventEmmiter } from "../utils/EventEmitter.js";
import { getValue, setValue } from "../hooks/stateHooks.js";
import { useDebounce } from "../hooks/debounce.js";


// Initialise event emitter
window.getValue = getValue;
window.setValue = setValue;
window.em = new EventEmmiter();

let search;

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

    page = new Page(await content.getHtml(), content.title, content.description);
    document.querySelector('#render-page').innerHTML = page.render();

    
    // Toggle switch listener
    const toggle = document.querySelector('.toggleButton-styled');
    toggle.addEventListener('click', (e) => {
        const isActive = new Array(...toggle.classList).indexOf('active') !== -1;
        if (isActive) return toggle.classList.remove('active');
        return toggle.classList.add('active');
    })
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

    // Add search listener
    document.querySelector('.searchbar-input').addEventListener('keyup', useDebounce((e) => {
        search = setValue('search', e.target.value);
    }, 500));

    em.on('setValue-search', (e) => console.log('Recieved new value: ', e))
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