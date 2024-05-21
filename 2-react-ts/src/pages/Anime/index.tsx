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
import { AnimeService } from "../../services/AnimeService";

// Hook imports
import { useDebounce } from '../../hooks/useDebounce'
import { useScrollToTop } from "../../hooks/useScrollToTop";
import { useLocalStorage } from "../../hooks/useLocalStorage";


// Init localStorage hook
const [setValue, getValue] = useLocalStorage();


/**
 * Series page
 * @returns JSX.Element
 */
export default function Anime() {

    // Anime state declaration
    const [anime, setAnime] = useState<IMovie[]>([]);
    const [animeGenres, setAnimeGenres] = useState<string[]>([]);
    const [likedContent, setLikedContent] = useState<number[]>(getValue('series') || []);

    // Page state declaration
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [totalResults, setTotalResults] = useState<number>(0);

    // Search query state
    const [searchQuery, setSearchQuery] = useState<string>('');


    // Method to toggle liking content
    const toggleLiked = (id: number) => {
        const isLiked: number = likedContent.indexOf(id);
        if (isLiked !== -1) {
            const removedContent = likedContent.filter(cId => cId !== id);
            setValue('series', removedContent);
            setLikedContent(removedContent);
        };
        if (isLiked === -1) {
            setValue('series', [...likedContent, id]);
            setLikedContent([...likedContent, id]);
        };
    };

    // Method to search and set movies
    const searchAnime = useDebounce(async (query: string, pageQuery: number) => {
        let searchResults;

        if (query.length !== 0) {
            searchResults = (await animeService.searchAnime(query, pageQuery));
        } else {
            searchResults = (await animeService.getAnime(pageQuery));
        }

        setAnime(await searchResults.results);
        setTotalPages(await searchResults.total_pages);
        setTotalResults(await searchResults.total_results);
    });

    // Method to handle page change
    const handlePageChange = (update: number | 'Next' | 'Prev') => {
        if (typeof update === 'number') setPage(update);
        if (update === 'Next') setPage((current) => current + 1);
        if (update === 'Prev') setPage((current) => current - 1);
    };

    // Init services
    const animeService = new AnimeService();


    // Methods to run on page load
    useEffect(() => {
        const fetchMovies = async () => {
            const movies = await animeService.getAnime();
            setAnime(movies.results);
            setTotalPages(movies.total_pages);
            setTotalResults(movies.total_results);
            setAnimeGenres((await animeService.getAnimeGenres()));
        };

        fetchMovies();
    }, []);

    // Methods to run on search change
    useEffect(() => {
        searchAnime(searchQuery, page);
    }, [searchQuery, page]);

    // Reset to first page on search update
    useEffect(() => {
        setPage(1);
    }, [searchQuery])

    // Scroll to top of page
    useEffect(() => {
        useScrollToTop();
    }, [page]);

    return (
        <div className="page-wrapper">

            {/* Page header */}
            <div className="page-header" style={{ gap: '3rem' }}>
                <SearchBar
                    placeholder="Search Series"
                    setQuery={setSearchQuery}
                />
                <ToggleButton isActive />
            </div>

            {/* Page header */}
            <div className="page-header">
                <p className="header-title">Movies</p>
                <p className="header-sum">{totalResults}</p>
            </div>

            {/* Content grid */}
            <div className="content-grid">
                {anime.map((content, idx) => {
                    return <ContentCard
                        key={idx}
                        id={content.id}
                        title={content.name}
                        cover={content.poster_path}
                        genres={content.genre_ids.map(genId => animeGenres[genId])}
                        handleLike={toggleLiked}
                        isLiked={likedContent.includes(content.id)}
                    />
                })}
            </div>

            {/* Page pagination */}
            <Pagination
                page={page}
                totalPages={totalPages > 500 ? 500 : totalPages}
                handlePage={handlePageChange}
            />
        </div>
    );
};