// Module imports
import { useEffect, useState } from "react";

// Component imports
import { ContentCard } from "../../components/ContentCard";
import { SearchBar } from "../../components/SearchBar";
import { ToggleButton } from "../../components/ToggleButton";

// Type imports
import { IMovie } from "../../types/movieTypes";

// Service imports
import { MovieService } from "../../services/MovieService";

// Hook imports
import { useDebounce } from '../../hooks/useDebounce'
import { Pagination } from "../../components/Pagination";
import { useScrollToTop } from "../../hooks/useScrollToTop";


/**
 * Movie page
 * @returns 
 */
export default function Movies() {

    // Page state declaration
    const [movies, setMovies] = useState<IMovie[]>([]);
    const [movieGenres, setMovieGenres] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');

    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [totalResults, setTotalResults] = useState<number>(0);


    // Method to search and set movies
    const searchMovies = useDebounce(async (query: string, pageQuery: number) => {
        let searchResults;

        if (query.length !== 0) {
            searchResults = (await movieService.searchMovies(query, pageQuery));
        } else {
            searchResults = (await movieService.getMovies(pageQuery));
        }

        setMovies(await searchResults.results);
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
    const movieService = new MovieService();


    // Methods to run on page load
    useEffect(() => {
        const fetchMovies = async () => {
            const movies = await movieService.getMovies();
            setMovies(movies.results);
            setTotalPages(movies.total_pages);
            setTotalResults(movies.total_results);
            setMovieGenres((await movieService.getMovieGenres()));
        };

        fetchMovies();
    }, []);

    // Methods to run on search change
    useEffect(() => {
        searchMovies(searchQuery, page);
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
                    placeholder="Search Movies"
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
                {movies.map((movie, idx) => {
                    return <ContentCard
                        key={idx}
                        {...movie}
                        cover={movie.poster_path}
                        genres={movie.genre_ids.map(genId => movieGenres[genId])}
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