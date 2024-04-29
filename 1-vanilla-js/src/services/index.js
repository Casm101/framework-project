/**
 * Base service class
 */
export class FetchContent {
    apiKey = '816afe10285c9da6111012a2483f631e';
    baseURL = 'https://api.themoviedb.org/3/';

    async getContent(contentType, page = 1) {
        return fetch(`${this.baseURL}${contentType}/popular?api_key=${this.apiKey}`)
            .then(response => response.json())
            .then(data => data);
    };

    async getContentById(contentType, id) {
        return fetch(`${this.baseURL}${contentType}/${this.id}?api_key=${this.apiKey}`)
            .then(response => response.json())
            .then(data => data);
    };

    async getContentGenres(contentType) {
        return fetch(`${this.baseURL}genre/${contentType}/list?api_key=${this.apiKey}`)
            .then(response => response.json())
            .then(data => data.genres.reduce((obj, item) => {
                obj[item.id] = item.name;
                return obj;
            }, {}));
    };
};