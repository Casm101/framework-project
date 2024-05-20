/**
 * Method to scroll to top of page
 */
export const useScrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};