// Module imports
import { Outlet } from "react-router-dom";

// Component imports
import { Sidebar } from "../components/SideBar";

// Sidebar links
const sidebarLinks = [
    {
        name: 'Movies',
        href: '/',
        icon: '/icons/film-icon.svg'
    },
    {
        name: 'TV Series',
        href: '/tv-series',
        icon: '/icons/series-icon.svg'

    },
    {
        name: 'Anime',
        href: '/anime',
        icon: '/icons/anime-icon.svg'

    },
    {
        name: 'Favourites',
        href: '/favourites',
        icon: '/icons/heart-icon.svg'
    }
];


export default function Root() {

    return (
        <>
            <Sidebar
                logo="/logo.svg"
                navLinks={sidebarLinks}
            />
            <Outlet />
        </>
    );
};