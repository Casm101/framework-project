/**
 * Event emmiter utility
 */
export class EventEmmiter {
    events = {};

    /**
     * Method to subscribe to an event
     * @param {string} eventName 
     * @param {([]) => void} eventCallback 
     */
    on(eventName, eventCallback) {
        if (!this.events[eventName]) this.events[eventName] = [];
        this.events[eventName].push(eventCallback);
    };

    /**
     * Method to un-suscribe from an event
     * @param {string} eventName 
     * @param {([]) => void} eventCallback 
     */
    off(eventName, eventCallback) {
        const event = this.events[eventName];
        if (!event) throw new Error(`${event} doesn't exist.`);

        const index = event.indexOf(eventCallback);
        if (index < 0) throw new Error(`Listener for ${event} doesn't exist.`);
        event.splice(index, 1)
    };

    /**
     * Method to emit an event
     * @param {string} eventName 
     * @param {[*]} params 
     */
    emit(eventName, params) {
        if (this.events[eventName]) {
            this.events[eventName].forEach(callback => {
                callback(params);
            });
        }
    };
};