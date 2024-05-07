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
        if (series?.length <= 0 || series?.length == undefined) return [];
        return series;
    };

    /**
     * Method to store series to local storage
     * @param [string] seriesArray 
     */
    addSeries(seriesArray) {
        const existingSeries = JSON.parse(localStorage.getItem('series')) || [];
        if (existingSeries.constructor !== Array) {
            localStorage.setItem('series', JSON.stringify(seriesArray));
        } else {
            localStorage.setItem('series', JSON.stringify([...existingSeries, ...seriesArray]));
        }
    };

    /**
     * Method to remove series from local storage
     * @param {string} movieId
     */
    removeSeries(seriesId) {
        const existingSeries = JSON.parse(localStorage.getItem('series'));
        const newArr = existingSeries.filter(id => id !== seriesId)
        localStorage.setItem('series', JSON.stringify(newArr));
    };

    /**
     * Method to retrieve theme stored in local storage
     * @returns {string | null}
     */
    getTheme() {
        return JSON.parse(localStorage.getItem('theme') || null);
    };

    /**
     * Method to store theme in local storage
     * @param {'light' | 'dark'} value
     * @returns {'light' | 'dark'}
     */
    setTheme(value) {
        return localStorage.setItem('theme', JSON.stringify(value));
    };
};