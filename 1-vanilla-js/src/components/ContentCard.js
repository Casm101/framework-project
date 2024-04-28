/**
 * Content card component
 */
export class ContentCard {
    title = '';
    tags = [];
    cover = '';

    constructor(title, tags, cover = './public/posters/sample.jpeg') {
        this.title = title;
        this.tags = tags;
        this.cover = cover;
    }

    render() {
        return `
            <article class="content-card">
                <img class="cover" src="${this.cover}" alt="">
                <div class="overlay">
                    <div class="overlay-title">
                        ${this.title}
                    </div>
                    <div class="overlay-tags">
                        ${this.tags.map(tag => tag)}
                    </div>
                </div>
            </article>
        `;
    }
}