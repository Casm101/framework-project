/**
 * Base service class
 */
export class FetchContent {
    apiKey = '816afe10285c9da6111012a2483f631e';
    baseURL = 'https://api.themoviedb.org/3/';
    optionalParams = '';

    isAnime(type) {
        if (type === 'anime') {
            this.optionalParams += '&with_genres=16&with_origin_country=JP';
            console.log('here');
            return 'tv';
        }
        return type;
    };

    async getContent(contentType, page = 1) {
        contentType = this.isAnime(contentType);
        console.log(`${this.baseURL}discover/${contentType}?api_key=${this.apiKey}${this.optionalParams}`);
        return fetch(`${this.baseURL}discover/${contentType}?api_key=${this.apiKey}${this.optionalParams}`)
            .then(response => response.json())
            .then(data => data);
    };

    async getContentById(contentType, id) {
        contentType = this.isAnime(contentType);
        return fetch(`${this.baseURL}${contentType}/${this.id}?api_key=${this.apiKey}${this.optionalParams}`)
            .then(response => response.json())
            .then(data => data);
    };

    async getContentGenres(contentType) {
        contentType = this.isAnime(contentType);
        return fetch(`${this.baseURL}genre/${contentType}/list?api_key=${this.apiKey}`)
            .then(response => response.json())
            .then(data => data.genres.reduce((obj, item) => {
                obj[item.id] = item.name;
                return obj;
            }, {}));
    };
};