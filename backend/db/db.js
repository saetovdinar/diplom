const chat = {
    data: [],
    add(message) {
        this.data.push(message);
        this.listeners.forEach(handler => handler(message));
       
        
    },
    listeners: [],
    listen(handler) {
        this.listeners.push(handler);
    }
}

module.exports = chat