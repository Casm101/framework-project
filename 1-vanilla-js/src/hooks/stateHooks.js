/**
 * Method to GET a value.
 * @param {*} variable
 * @returns {*}
 */
export const getValue = (variable) => {
    window.em.emit(`getValue-${variable}`, variable);
    return variable;
};

/**
 * Method to SET a value.
 * @param {*} variable 
 * @param {*} value 
 * @returns {*}
 */
export const setValue = (variable, value) => {
    window.em.emit(`setValue-${variable}`, value);
    return value;
};