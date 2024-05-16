// Style imports
import './styles.scss';

interface SearchBarProps {
    placeholder: string;
}

/**
 * SearchBar component
 */
export const SearchBar = ({
    placeholder
}: SearchBarProps) => {

    /**
     * Method to render searchbar component
     * @returns {React.JSXElement}
     */
    return (
        <div className="searchbar-styled">
            <input
                type="search"
                className="searchbar-input"
                placeholder={placeholder}
            />
            <img
                src="/icons/search-icon.svg"
                alt=""
                className="searchbar-icon"
            />
        </div>
    );
};