// Util imports
import { getItem, setItem, removeItem } from '../utils/localStorage';


/**
 * Hook wrapper to handle localStorage setting, getting and removing
 */
export const useLocalStorage = () => {

    const setValue = (key: string, val: any) => {
        try {
            setItem(key, val);
        } catch (err) {
            console.error(`Error setting value in local storage: ${err}`);
        }
    };

    const getValue = (key: string): any => {
        try {
            return getItem(key);
        } catch (err) {
            console.error(`Error getting value from local storage: ${err}`);
            return undefined;
        }
    };

    const removeValue = (key: string) => {
        try {
            removeItem(key);
        } catch (err) {
            console.error(`Error removing value from local storage: ${err}`);
        }
    };

    return [setValue, getValue, removeValue] as const;
};
