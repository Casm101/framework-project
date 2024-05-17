// Style imports
import './styles.scss'

// Component props
interface ToggleButtonProps {
    isActive: boolean;
}

/**
 * Toggle button component
 */
export const ToggleButton = ({
    isActive
}: ToggleButtonProps) => {

    const activeClass = isActive ? 'active' : null;

    return (
        <div className={`toggleButton-styled ${activeClass}`} >
            <div className="toggleButton-circle"></div>
        </div>
    );
};