/**
 * Local store utility
 */
export class LocalStore {
    
    /**
     * Method to retrieve movies from local storage
     * @returns [string]
     */
    getMovies() {
        const movies = JSON.parse(localStorage.getItem('movies'));
        if (movies?.length <= 0 || movies?.length == undefined) return [];
        return movies;
    };

    /**
     * Method to store movies to local storage
     * @param [string] moviesArray 
     */
    addMovies(moviesArray) {
        const existingMovies = JSON.parse(localStorage.getItem('movies')) || [];
        if (existingMovies.constructor !== Array) {
            localStorage.setItem('movies', JSON.stringify(moviesArray));
        } else {
            localStorage.setItem('movies', JSON.stringify([...existingMovies, ...moviesArray]));
        }
    };

    /**
     * Method to remove movie from local storage
     * @param {string} movieId
     */
    removeMovie(movieId) {
        const existingMovies = JSON.parse(localStorage.getItem('movies'));
        const newArr = existingMovies.filter(id => id !== movieId)
        localStorage.setItem('movies', JSON.stringify(newArr));
    };

    /**
     * Method to retrieve series from local storage
     * @returns [string]
     */
    getSeries() {
        const series = JSON.parse(localStorage.getItem('series'));
        if (series?.length <= 0) return [];
        return series;
    };

    /**
     * Method to store series to local storage
     * @param [string] seriesArray 
     */
    addSeries(seriesArray) {
        const existingSeries = JSON.parse(localStorage.getItem('series'));
        if (existingSeries.length <= 0) {
            localStorage.setItem('series', seriesArray);
        } else {
            localStorage.setItem('series', [...existingSeries, ...seriesArray]);
        }
    };
};