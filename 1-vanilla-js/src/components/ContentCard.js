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

    render() {
        return `
            <article class="content-card" content="${this.type}_${this.id}">
                <img class="cover" src="${this.cover}" alt="">
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