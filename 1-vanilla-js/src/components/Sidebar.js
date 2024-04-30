/**
 * Sidebar component
 */
export class Sidebar {
    navLinks = [];

    /**
     * Constructor for the sidebar component
     * @param { name: string, href: string }[] links 
     */
    constructor(links) {
        this.navLinks = links;
    }

    /**
     * Method to render sidebar links
     * @param { name: string, href: string }[] link 
     * @returns {string}
     */
    link(link) {

        const isActive = window.location.pathname === link.href;
        const activeClass = isActive ? 'active' : null;
        
        return `
            <a href="${link.href}" class="navigation-link ${activeClass}">
                <img src="${link.icon}">
                <span>${link.name}</span>
            </a>
        `;
    };

    /**
     * Method to render sidebar component
     * @returns string
     */
    render() {

        return `
            <!-- Sidebar component -->
            <aside class="sidebar-styled">

                <!-- Sidebar logo -->
                <div class="sidebar-logo">
                    <a href="/">
                        <img src="./public/logo.svg" alt="Home Page">
                    </a>
                </div>

                <!-- Sidebar navigation -->
                <nav class="sidebar-navigation">
                    ${this.navLinks.map(link => this.link(link)).join('')}
                </nav>

                <!-- Sidebar footer -->
                <footer class="sidebar-footer">
                    <p>Framework Movies ©️ 2024</p>
                </footer>
            </aside>  
        `;
    };
};