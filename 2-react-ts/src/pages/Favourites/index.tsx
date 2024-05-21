// Module imports
import { useEffect, useState } from "react";

// Component imports
import { ContentCard } from "../../components/ContentCard";
import { SearchBar } from "../../components/SearchBar";
import { ToggleButton } from "../../components/ToggleButton";
import { Pagination } from "../../components/Pagination";

// Type imports
import { IMovie } from "../../types/movieTypes";

// Service imports
import { MovieService } from "../../services/MovieService";

// Hook imports
import { useDebounce } from '../../hooks/useDebounce'
import { useScrollToTop } from "../../hooks/useScrollToTop";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { SeriesService } from "../../services/SeriesService";


// Init localStorage hook
const [setValue, getValue] = useLocalStorage();


/**
 * Movie page
 * @returns JSX.Element
 */
export default function Favourites() {

    // Movie state declaration
    const [content, setContent] = useState<IMovie[]>([]);
    const [movieGenres, setMovieGenres] = useState<string[]>([]);
    const [seriesGenres, setSeriesGenres] = useState<string[]>([]);
    const [likedContent, setLikedContent] = useState<number[]>(getValue('movies') || []);

    // Page state declarations
    const [totalResults, setTotalResults] = useState<number>(0);


    // Method to toggle liking content
    const toggleLiked = (id: number) => {
        const isLiked: number = likedContent.indexOf(id);
        if (isLiked !== -1) {
            const removedContent = likedContent.filter(cId => cId !== id);
            setValue('movies', removedContent);
            setLikedContent(removedContent);
        };
        if (isLiked === -1) {
            setValue('movies', [...likedContent, id]);
            setLikedContent([...likedContent, id]);
        };
    };

    // Init services
    const movieService = new MovieService();
    const seriesService = new SeriesService();


    // Methods to run on page load
    useEffect(() => {
        const fetchMovies = async () => {

            // Get favourite content from local storage
            const movieIds = getValue('movies');
            const seriesIds = getValue('series');



            setContent(() => []);
            setTotalResults(content.length);
            setMovieGenres((await movieService.getMovieGenres()));
        };

        fetchMovies();
    }, []);


    return (
        <div className="page-wrapper">

            {/* Page header */}
            <div className="page-header">
                <p className="header-title">Favourites</p>
                <p className="header-sum">{totalResults}</p>
            </div>

            {/* Content grid */}
            <div className="content-grid">
                {content.map((con, idx) => {
                    return <ContentCard
                        key={idx}
                        {...con}
                        cover={con.poster_path}
                        genres={con.genre_ids.map(genId => movieGenres[genId])}
                        handleLike={toggleLiked}
                        isLiked={likedContent.includes(con.id)}
                    />
                })}
            </div>
        </div>
    );
};