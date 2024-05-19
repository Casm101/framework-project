// Type declarations
type TContentType = 'movie' | 'tv' | 'anime';


/**
 * Base service class
 */
export class FetchContent {
    private apiKey: string = '816afe10285c9da6111012a2483f631e';
    private baseUrl: string = 'https://api.themoviedb.org/3/';
    private optionalParams: string = '';

    /**
     * Method to add optional params if content is anime
     * @param {TContentType} type 
     * @returns TContentType
     */
    private isAnime(type: TContentType): TContentType {
        if (type === 'anime') {
            this.optionalParams += '&with_genres=16&with_origin_country=JP';
            return 'tv'
        };
        return type;
    };

    /**
     * Method to handle TMDB responses
     * @param response 
     * @returns 
     */
    private handleResponse = async (response: any) => {
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Data could not be retrieved');
        }
        return response.json();
    };


    /**
     * 
     * @param contentType 
     * @param page 
     * @returns 
     */
    public async getContent(contentType: TContentType, page: number = 1) {
        contentType = this.isAnime(contentType);
        const response = await fetch(`${this.baseUrl}discover/${contentType}?api_key=${this.apiKey}${this.optionalParams}&page=${page}`);
        return await this.handleResponse(response);
    };

    /**
     * 
     * @param contentType 
     * @param id 
     * @returns 
     */
    public async getContentById(contentType: TContentType, id: number) {
        contentType = this.isAnime(contentType);
        const response = await fetch(`${this.baseUrl}${contentType}/${id}?api_key=${this.apiKey}${this.optionalParams}`);
        return await this.handleResponse(response);
    };

    /**
     * 
     * @param contentType 
     * @param id 
     * @returns 
     */
    public async getRecommendationsById(contentType: TContentType, id: number) {
        contentType = this.isAnime(contentType);
        const response = await fetch(`${this.baseUrl}${contentType}/${id}/recommendations?api_key=${this.apiKey}${this.optionalParams}`);
        return await this.handleResponse(response);
    };

    /**
     * 
     * @param contentType 
     * @returns []
     */
    public async getContentGenres(contentType: TContentType) {
        contentType = this.isAnime(contentType);
        const response = await fetch(`${this.baseUrl}genre/${contentType}/list?api_key=${this.apiKey}`);
        const genres = (await this.handleResponse(response)).genres;
        return genres.reduce((obj: Record<number, string>, item: { id: number, name: string }) => {
            obj[item.id] = item.name;
            return obj;
        }, {});
    };

    /**
     * 
     * @param contentType 
     * @param searchQuery {string}
     * @param {number} page 
     * @returns 
     */
    public async searchContent(
        contentType: TContentType,
        searchQuery: string,
        page: number = 1
    ) {
        contentType = this.isAnime(contentType);
        const response = await fetch(`${this.baseUrl}search/${contentType}?query=${searchQuery}&api_key=${this.apiKey}&page=${page}`);
        return await this.handleResponse(response);
    };
};