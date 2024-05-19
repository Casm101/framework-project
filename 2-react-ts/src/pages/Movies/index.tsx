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


/**
 * Movie page
 * @returns 
 */
export default function Movies() {

    // Page state declaration
    const [movies, setMovies] = useState<IMovie[]>([]);
    const [movieGenres, setMovieGenres] = useState<string[]>([]);

    // Init services
    const movieService = new MovieService();

    // Methods to run on page load
    useEffect(() => {
        const fetchMovies = async () => {
            setMovies((await movieService.getMovies()).results);
            setMovieGenres((await movieService.getMovieGenres()));
        };

        fetchMovies();
    }, []);

    return (
        <div className="page-wrapper">

            {/* Page header */}
            <div className="page-header" style={{ gap: '3rem' }}>
                <SearchBar placeholder="Search Movies" />
                <ToggleButton isActive />
            </div>

            {/* Page header */}
            <div className="page-header">
                <p className="header-title">Movies</p>
                <p className="header-sum">420</p>
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

        </div>
    );
};