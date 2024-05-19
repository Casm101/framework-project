// Style imports
import './styles.scss';

interface SearchBarProps {
    placeholder: string;
    setQuery: (val: string) => void;
}

/**
 * SearchBar component
 */
export const SearchBar = ({
    placeholder,
    setQuery
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
                onChange={(e) => setQuery(e.target.value)}
            />
            <img
                src="/icons/search-icon.svg"
                alt=""
                className="searchbar-icon"
            />
        </div>
    );
};