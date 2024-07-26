// Type declarations
type TContentType = 'movie' | 'tv' | 'anime';


// Base service class declaration
export class FetchContent {
    private apiKey: string = process.env.VUE_APP_API_KEY;
    private baseUrl: string = process.env.VUE_APP_API_BASE_URL;
    private optionalParams: string = '';

    // Method to add optional params if content is anime
    private isAnime(type: TContentType): TContentType {
        if (type === 'anime') {
            this.optionalParams = '&with_genres=16&with_origin_country=JP';
            return 'tv'
        }
        return type;
    }

    // Method to handle TMDB responses
    private handleResponse = async (response: any) => {
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Data could not be retrieved');
        }
        return response.json();
    };

    // Method to get list of content
    public async getContent(contentType: TContentType, page: number = 1) {
        contentType = this.isAnime(contentType);
        const response = await fetch(`${this.baseUrl}discover/${contentType}?api_key=${this.apiKey}${this.optionalParams}&page=${page}`);
        return await this.handleResponse(response);
    }

    // Method to get content by ID
    public async getContentById(contentType: TContentType, id: number) {
        contentType = this.isAnime(contentType);
        const response = await fetch(`${this.baseUrl}${contentType}/${id}?api_key=${this.apiKey}${this.optionalParams}`);
        return await this.handleResponse(response);
    }

    // Method to get recommendations given a content ID
    public async getRecommendationsById(contentType: TContentType, id: number) {
        contentType = this.isAnime(contentType);
        const response = await fetch(`${this.baseUrl}${contentType}/${id}/recommendations?api_key=${this.apiKey}${this.optionalParams}`);
        return await this.handleResponse(response);
    }

    // Method to get content genres
    public async getContentGenres(contentType: TContentType) {
        contentType = this.isAnime(contentType);
        const response = await fetch(`${this.baseUrl}genre/${contentType}/list?api_key=${this.apiKey}`);
        const genres = (await this.handleResponse(response)).genres;
        return genres.reduce((obj: Record<number, string>, item: { id: number, name: string }) => {
            obj[item.id] = item.name;
            return obj;
        }, {});
    }

    // Method to search content given query
    public async searchContent(
        contentType: TContentType,
        searchQuery: string,
        page: number = 1
    ) {
        contentType = this.isAnime(contentType);
        const response = await fetch(`${this.baseUrl}search/${contentType}?query=${searchQuery}&api_key=${this.apiKey}${this.optionalParams}&page=${page}`);
        return await this.handleResponse(response);
    }
}