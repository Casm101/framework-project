/**
 * Movies page component
 */
export class MoviesPage {
    title = 'Movies - Framework Movies';
    description = 'All movies availible on the site.';

    /**
     *  Method that returns page html in string
     */
    getHtml() {
        return `
            <div class="page-header">
                <p class="header-title">Movies</p>
                <p class="header-sum">420</p>
            </div>

            <div class="content-grid">
                <article class="content-card">
                    <img class="cover" src="./public/posters/sample.jpeg" alt="">
                    <div class="overlay">
                        <div class="overlay-title">
                            Hot Fuzz
                        </div>
                        <div class="overlay-tags">
                            Action, Comedy
                        </div>
                    </div>
                </article>

                <article class="content-card">
                    <img class="cover" src="./public/posters/sample.jpeg" alt="">
                    <div class="overlay">
                        <div class="overlay-title">
                            Hot Fuzz
                        </div>
                        <div class="overlay-tags">
                            Action, Comedy
                        </div>
                    </div>
                </article>
                <article class="content-card">
                    <img class="cover" src="./public/posters/sample.jpeg" alt="">
                    <div class="overlay">
                        <div class="overlay-title">
                            Hot Fuzz
                        </div>
                        <div class="overlay-tags">
                            Action, Comedy
                        </div>
                    </div>
                </article>
                <article class="content-card">
                    <img class="cover" src="./public/posters/sample.jpeg" alt="">
                    <div class="overlay">
                        <div class="overlay-title">
                            Hot Fuzz
                        </div>
                        <div class="overlay-tags">
                            Action, Comedy
                        </div>
                    </div>
                </article>
                <article class="content-card">
                    <img class="cover" src="./public/posters/sample.jpeg" alt="">
                    <div class="overlay">
                        <div class="overlay-title">
                            Hot Fuzz
                        </div>
                        <div class="overlay-tags">
                            Action, Comedy
                        </div>
                    </div>
                </article>
                <article class="content-card">
                    <img class="cover" src="./public/posters/sample.jpeg" alt="">
                    <div class="overlay">
                        <div class="overlay-title">
                            Hot Fuzz
                        </div>
                        <div class="overlay-tags">
                            Action, Comedy
                        </div>
                    </div>
                </article>
                <article class="content-card">
                    <img class="cover" src="./public/posters/sample.jpeg" alt="">
                    <div class="overlay">
                        <div class="overlay-title">
                            Hot Fuzz
                        </div>
                        <div class="overlay-tags">
                            Action, Comedy
                        </div>
                    </div>
                </article>
                <article class="content-card">
                    <img class="cover" src="./public/posters/sample.jpeg" alt="">
                    <div class="overlay">
                        <div class="overlay-title">
                            Hot Fuzz
                        </div>
                        <div class="overlay-tags">
                            Action, Comedy
                        </div>
                    </div>
                </article>
                <article class="content-card">
                    <img class="cover" src="./public/posters/sample.jpeg" alt="">
                    <div class="overlay">
                        <div class="overlay-title">
                            Hot Fuzz
                        </div>
                        <div class="overlay-tags">
                            Action, Comedy
                        </div>
                    </div>
                </article>
                <article class="content-card">
                    <img class="cover" src="./public/posters/sample.jpeg" alt="">
                    <div class="overlay">
                        <div class="overlay-title">
                            Hot Fuzz
                        </div>
                        <div class="overlay-tags">
                            Action, Comedy
                        </div>
                    </div>
                </article>
            </div>
        `;
    };
};