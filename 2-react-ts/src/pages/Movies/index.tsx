// Component imports
import { ContentCard } from "../../components/ContentCard";
import { SearchBar } from "../../components/SearchBar";
import { ToggleButton } from "../../components/ToggleButton";


export default function Movies() {

    return (
        <div className="page-wrapper">

            {/* Page header */}
            <div className="page-header" style={{ gap: '3rem' }}>
                <SearchBar placeholder="Search Movies" />
                <ToggleButton isActive />
            </div>

            {/* Page header */}
            <div className="page-header">
                <p className="header-title">Movies</p>
                <p className="header-sum">420</p>
            </div>

            {/* Content grid */}
            <div className="content-grid">
                <ContentCard
                    id="321"
                    title="Hot Fuzz"
                    tags={['action', 'comedy']}
                />
            </div>

        </div>
    );
};