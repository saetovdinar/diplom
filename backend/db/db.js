const users = {
    data: [],
    add(user) {
        this.data.push(user);
        this.listeners.forEach(handler => handler(user));
       
        
    },
    listeners: [],
    listen(handler) {
        this.listeners.push(handler);
    }
}

module.exports = users