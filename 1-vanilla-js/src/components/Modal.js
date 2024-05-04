/**
 * Modal component
 */
export class Modal {

    content;

    constructor(content) {
        this.content = content;
    };

    render() {

        return `
            <!-- Modal component -->
            <div class="modal-background">
                <img src="https://image.tmdb.org/t/p/w300/${this.content.backdrop_path}" alt="">
                <div class="background-overlay"></div>
                <div class="modal-close">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                        <path fill-rule="evenodd"
                            d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                            clip-rule="evenodd" />
                    </svg>
                </div>
            </div>
            <div class="modal">
                
                <div class="modal-main">
                    
                    <div class="main-header">
                        <h1>${this.content.title ? this.content.title : this.content.name}</h1>
                        <p>${this.content.genres.map(genre => genre.name).join(" - ")}</p>
                    </div>
                    
                    <img src="https://image.tmdb.org/t/p/w780/${this.content.backdrop_path}" alt="${this.content.title ? this.content.title : this.content.name} poster.">

                    <div class="main-description">
                        <p class="description-title">Description</p>
                        <hr>
                        <p class="description-content">
                            ${this.content.overview}
                        </p>
                    </div>
                </div>

                <div class="modal-sidebar">
                    <div class="sidebar-group">
                        <p class="group-title">
                            Runtime
                        </p>
                        <p class="group-value">
                            ${this.content.runtime || this.content.episode_run_time[0]}min
                        </p>
                    </div>

                    <div class="sidebar-group">
                        <p class="group-title">
                            Year
                        </p>
                        <p class="group-value">
                            ${new Date(this.content.release_date || this.content.first_air_date).getFullYear()}
                        </p>
                    </div>

                    <div class="sidebar-group">
                        <p class="group-title">
                            Release Date
                        </p>
                        <p class="group-value">
                            ${this.content.release_date || this.content.first_air_date}
                        </p>
                    </div>

                    <div class="sidebar-group">
                        <p class="group-title">
                            Language
                        </p>
                        <p class="group-value uppercase">
                            ${this.content.original_language}
                        </p>
                    </div>

                    <div class="sidebar-group">
                        <p class="group-title">
                            Rating
                        </p>
                        <p class="group-value uppercase">
                            ${this.content.vote_average}
                        </p>
                    </div>

                    <div class="sidebar-group">
                        <p class="group-title">
                            Production
                        </p>
                        <p class="group-value uppercase">
                            ${this.content.production_companies.map(pc => 
                                pc.name
                            ).join(' - ')}
                        </p>
                    </div>
                </div>
            </div>
        `;
    }
}