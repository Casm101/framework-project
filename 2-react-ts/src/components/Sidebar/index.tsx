// Style imports
import './styles.scss';

// Interface and type declarations
interface ILink {
    name: string;
    href: string;
    icon: string;
}

interface SidebarProps {
    logo: string;
    navLinks: ILink[];
}

// Sidebar component
export const Sidebar = ({
    logo,
    navLinks
}: SidebarProps) => {

    const NavLink = ({
        name,
        href,
        icon
    }: ILink) => {

        const isActive = window.location.pathname === href;
        const activeClass = isActive ? 'active' : null;

        return (
            <a href={href} className={`navigation-link ${activeClass}`}>
                <img src={icon} />
                <span>{name}</span>
            </a>
        );
    };

    return (
        <aside className="sidebar-styled">

            {/* Sidebar logo */}
            <div className="sidebar-logo">
                <a href="/">
                    <img src={logo} alt="Home Page" />
                </a>
            </div>

            {/* Sidebar navigation */}
            <nav className="sidebar-navigation">
                {navLinks &&
                    navLinks.map((link, idx) => (
                        <NavLink {...link} key={idx} />
                    ))
                }
            </nav>

            {/* Sidebar footer */}
            <footer className="sidebar-footer">
                <p>Framework Movies ©️ 2024</p>
            </footer>
        </aside>
    );
};