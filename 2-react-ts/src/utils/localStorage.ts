/**
 * Method to set item in localStorage
 * @param key 
 * @param value 
 */
export const setItem = (key: string, value: any) => {
    try {
        const serializedValue = JSON.stringify(value);
        localStorage.setItem(key, serializedValue);
    } catch (err) {
        console.error(`Error setting value in local storage: ${err}`);
    }
};

/**
 * Method to retrieve item from localStorage
 * @param key 
 * @returns 
 */
export const getItem = <T>(key: string): T | undefined => {
    try {
        const serializedValue = localStorage.getItem(key);
        if (serializedValue === null) return;
        return JSON.parse(serializedValue) as T;
    } catch (err) {
        console.error(`Error getting value from local storage: ${err}`);
        return;
    }
};

/**
 * Method to remove item from localStorage
 * @param key 
 */
export const removeItem = (key: string): void => {
    try {
        localStorage.removeItem(key);
    } catch (err) {
        console.error(`Error removing value from local storage: ${err}`);
    }
};