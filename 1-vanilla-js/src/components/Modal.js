/**
 * Modal component
 */
export class Modal {

    render() {
        return `
            <!-- Modal component -->
            <div class="modal-background">
                <img src="https://image.tmdb.org/t/p/original/yrjFk8OVnwOQ5qUxbHZJYobxQra.jpg" alt="">
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
                        <h1>Addams Family: Family Values</h1>
                        <p>Family - Comedy - Horror</p>
                    </div>
                    
                    <img src="https://image.tmdb.org/t/p/original/yrjFk8OVnwOQ5qUxbHZJYobxQra.jpg" alt="">

                    <div class="main-description">
                        <p class="description-title">Description</p>
                        <hr>
                        <p class="description-content">
                            Po is gearing up to become the spiritual leader of his Valley of Peace, but also needs someone to take his place as
                            Dragon Warrior. As such, he will train a new kung fu practitioner for the spot and will encounter a villain called the
                            Chameleon who conjures villains from the past.
                        </p>
                    </div>
                </div>

                <div class="modal-sidebar">
                    <div class="sidebar-group">
                        <p class="group-title">
                            Year
                        </p>
                        <p class="group-value">
                            1998
                        </p>
                    </div>
                </div>
            </div>
        `;
    }
}