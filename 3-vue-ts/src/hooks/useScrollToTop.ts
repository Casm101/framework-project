// Hook declaration
export const useScrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};