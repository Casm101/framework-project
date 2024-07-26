// Style imports
import { Dispatch, SetStateAction } from 'react';
import './styles.scss';

// Component props
interface PaginationProps {
    page: number;
    totalPages: number;
    handlePage: (update: number | 'Prev' | 'Next') => void;
}

interface PaginationButtonProps {
    value: number | string;
    isActive: boolean;
    isDisabled: boolean;
    onClick?: () => void;
}


/**
 * Pagination component
 */
export const Pagination = ({
    page = 0,
    totalPages = 0,
    handlePage
}: PaginationProps) => {

    const PaginationButton = ({
        value,
        isActive,
        isDisabled,
        onClick
    }: PaginationButtonProps) => {

        const activeClass = isActive ? 'active' : '';
        const disabledClass = isDisabled ? 'disabled' : '';

        return (
            <div
                className={['pagination-button', activeClass, disabledClass].join(' ')}
                onClick={onClick}
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
                onClick={() => handlePage('Prev')}
                key={'Prev'}
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
                        onClick={() => handlePage(i)}
                        key={i}
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
                        onClick={() => handlePage(i)}
                        key={i}
                    />
                );
            }
            buttons.push(
                <PaginationButton
                    value="..."
                    isActive={false}
                    isDisabled={true}
                    key={'...-0'}
                />
            );
            buttons.push(
                <PaginationButton
                    value={totalPages}
                    isActive={false}
                    isDisabled={false}
                    onClick={() => handlePage(totalPages)}
                    key={totalPages}
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
                    onClick={() => handlePage(1)}
                    key={1}
                />
            );
            buttons.push(
                <PaginationButton
                    value="..."
                    isActive={false}
                    isDisabled={true}
                    key={'...-1'}
                />
            );

            for (let i = start; i < end; i++) {
                const isActive = i == page;
                buttons.push(
                    <PaginationButton
                        value={i}
                        isActive={isActive}
                        isDisabled={false}
                        onClick={() => handlePage(i)}
                        key={i}
                    />
                );
            }

            buttons.push(
                <PaginationButton
                    value="..."
                    isActive={false}
                    isDisabled={true}
                    key={'...-2'}
                />
            );
            buttons.push(
                <PaginationButton
                    value={totalPages}
                    isActive={false}
                    isDisabled={false}
                    onClick={() => handlePage(totalPages)}
                    key={totalPages}
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
                    onClick={() => handlePage(1)}
                    key={1}
                />
            );
            buttons.push(
                <PaginationButton
                    value="..."
                    isActive={false}
                    isDisabled={true}
                    key={'...-3'}
                />
            );

            for (let i = start; i <= end; i++) {
                const isActive = i == page;
                buttons.push(
                    <PaginationButton
                        value={i}
                        isActive={isActive}
                        isDisabled={false}
                        onClick={() => handlePage(i)}
                        key={i}
                    />
                );
            }
        }

        buttons.push(
            <PaginationButton
                value="Next"
                isActive={false}
                isDisabled={nextDisabled}
                onClick={() => handlePage("Next")}
                key={'Next'}
            />
        );

        return buttons;
    }

    return (
        <div className="pagination-styled">
            {generateButtons()}
        </div>
    );
};