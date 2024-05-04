// Utility imports
import { LocalStore } from "../utils/LocalStore.js";

/**
 * Content card component
 */
export class ContentCard {
    id = 0;
    title = '';
    tags = [];
    cover = '';
    type = '';

    constructor(id, title, tags, cover = './public/posters/sample.jpeg', type = 'movie') {
        this.id = id;
        this.title = title;
        this.tags = tags.splice(0, 2);
        this.cover = cover;
        this.type = type;
    };

    likeButton(isLiked) {
        return isLiked ?
        `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
            </svg>
        `
            :
        `
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
        `;
    };

    render() {

        const ls = new LocalStore();
        const likes = [...ls.getMovies(), ...ls.getSeries()];

        return `
            <article class="content-card" content="${this.type}_${this.id}">
                <div class="content-like">
                    ${this.likeButton(likes.includes(this.id.toString()))}
                </div>

                ${this.cover ? 
                    `<img
                        class="cover"
                        src="https://image.tmdb.org/t/p/w342${this.cover}"
                        alt="${this.title} poster"
                    >`
                :
                    `<div class="cover fallback">No Image Available</div>`
                }
                
                <div class="overlay">
                    <div class="overlay-title">
                        ${this.title}
                    </div>
                    <div class="overlay-tags">
                        ${this.tags.map(tag => tag).join(' - ')}
                    </div>
                </div>
            </article>
        `;
    };
};