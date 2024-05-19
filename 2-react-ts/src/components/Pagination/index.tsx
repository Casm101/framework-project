// Style imports
import './styles.scss';

// Component props
interface PaginationProps {
    page: number;
    totalPages: number;
}

interface PaginationButtonProps {
    value: number | string;
    isActive: boolean;
    isDisabled: boolean;
}


/**
 * Pagination component
 */
export const Pagination = ({
    page = 0,
    totalPages = 0
}: PaginationProps) => {

    const PaginationButton = ({
        value,
        isActive,
        isDisabled
    }: PaginationButtonProps) => {

        const activeClass = isActive ? 'active' : '';
        const disabledClass = isDisabled ? 'disabled' : '';

        return (
            <div
                className={['pagination-button', activeClass, disabledClass].join(' ')}
            >
                {value}
            </div>

        );
    };

    function generateButtons() {
        const buttons = [];
        const prevDisabled = page === 1 ? true : false;
        const nextDisabled = page === totalPages ? true : false;

        buttons.push(
            <PaginationButton
                value="Prev"
                isActive={false}
                isDisabled={prevDisabled}
            />
        );

        if (page < 5 && totalPages <= 5) {
            for (let i = 1; i < totalPages + 1; i++) {
                const isActive = i == page;
                buttons.push(
                    <PaginationButton
                        value={i}
                        isActive={isActive}
                        isDisabled={false}
                    />
                );
            }
        }

        if (page < 5 && totalPages > 5) {
            for (let i = 1; i < 6; i++) {
                const isActive = i == page;
                buttons.push(
                    <PaginationButton
                        value={i}
                        isActive={isActive}
                        isDisabled={false}
                    />
                );
            }
            buttons.push(
                <PaginationButton
                    value="..."
                    isActive={false}
                    isDisabled={true}
                />
            );
            buttons.push(
                <PaginationButton
                    value={totalPages}
                    isActive={false}
                    isDisabled={false}
                />
            );
        }

        if (page >= 5 && page <= totalPages - 5) {
            const start = page - 2;
            const end = page + 3;

            buttons.push(
                <PaginationButton
                    value={1}
                    isActive={false}
                    isDisabled={false}
                />
            );
            buttons.push(
                <PaginationButton
                    value="..."
                    isActive={false}
                    isDisabled={true}
                />
            );

            for (let i = start; i < end; i++) {
                const isActive = i == page;
                buttons.push(
                    <PaginationButton
                        value={i}
                        isActive={isActive}
                        isDisabled={false}
                    />
                );
            };

            buttons.push(
                <PaginationButton
                    value="..."
                    isActive={false}
                    isDisabled={true}
                />
            );
            buttons.push(
                <PaginationButton
                    value={totalPages}
                    isActive={false}
                    isDisabled={false}
                />
            );
        }

        if (page > 5 && page > totalPages - 5) {
            const start = totalPages - 4;
            const end = totalPages;

            buttons.push(
                <PaginationButton
                    value={1}
                    isActive={false}
                    isDisabled={false}
                />
            );
            buttons.push(
                <PaginationButton
                    value="..."
                    isActive={false}
                    isDisabled={true}
                />
            );

            for (let i = start; i <= end; i++) {
                const isActive = i == page;
                buttons.push(
                    <PaginationButton
                        value={i}
                        isActive={isActive}
                        isDisabled={false}
                    />
                );
            };
        }

        buttons.push(
            <PaginationButton
                value="Next"
                isActive={false}
                isDisabled={nextDisabled}
            />
        );

        return buttons.join('');
    };

    return (
        <div className="pagination-styled">
            {generateButtons()}
        </div>
    );
};