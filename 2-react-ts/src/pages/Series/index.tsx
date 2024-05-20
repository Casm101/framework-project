// Module imports
import { useEffect, useState } from "react";

// Component imports
import { ContentCard } from "../../components/ContentCard";
import { SearchBar } from "../../components/SearchBar";
import { ToggleButton } from "../../components/ToggleButton";

// Type imports
import { IMovie } from "../../types/movieTypes";

// Service imports
import { SeriesService } from "../../services/SeriesService";

// Hook imports
import { useDebounce } from '../../hooks/useDebounce'
import { Pagination } from "../../components/Pagination";
import { useScrollToTop } from "../../hooks/useScrollToTop";


/**
 * Series page
 * @returns 
 */
export default function Series() {

    // Page state declaration
    const [series, setSeries] = useState<IMovie[]>([]);
    const [seriesGenres, setSeriesGenres] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');

    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [totalResults, setTotalResults] = useState<number>(0);


    // Method to search and set movies
    const searchSeries = useDebounce(async (query: string, pageQuery: number) => {
        let searchResults;

        if (query.length !== 0) {
            searchResults = (await seriesService.searchSeries(query, pageQuery));
        } else {
            searchResults = (await seriesService.getSeries(pageQuery));
        }

        setSeries(await searchResults.results);
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
    const seriesService = new SeriesService();


    // Methods to run on page load
    useEffect(() => {
        const fetchMovies = async () => {
            const movies = await seriesService.getSeries();
            setSeries(movies.results);
            setTotalPages(movies.total_pages);
            setTotalResults(movies.total_results);
            setSeriesGenres((await seriesService.getSeriesGenres()));
        };

        fetchMovies();
    }, []);

    // Methods to run on search change
    useEffect(() => {
        searchSeries(searchQuery, page);
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
                {series.map((content, idx) => {
                    return <ContentCard
                        key={idx}
                        id={content.id}
                        title={content.name}
                        cover={content.poster_path}
                        genres={content.genre_ids.map(genId => seriesGenres[genId])}
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