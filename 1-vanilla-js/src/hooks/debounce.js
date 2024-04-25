/**
 * Method to delay and reduce callback execution
 * @param {(param) => void} callback 
 * @param {int} delay 
 * @returns 
 */
export const useDebounce = (callback, delay = 250) => {
    let timerId;

    return function(...args) {
        clearTimeout(timerId);
        timerId = setTimeout(() => {
            callback.apply(this, args);
        }, delay);
    };
}