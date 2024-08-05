

const chat = {
    data: 
    [
        {
            message: 'hello', 
            type: 'text'
        }, 
        {
            message: 'My name is Dinar', 
            type: 'text'
        },
        {
            message: 'https://netology.ru/profile', 
            type: 'text'
        },
       
        
    ],

    temporaryStorage: [],
    
    clearTemporary() {
        this.temporaryStorage = [];
    },

    add(message) {
        this.data.push(message);
    },

    lazyLoad() {

        for(const i= 0; i < 10; i++) {
            if(!this.copyOfData.pop()) {
                return;
            }
            this.temporaryStorage.push(this.copyOfData.pop())
        } 
        return this.temporaryStorage;
    },

    copyOfData() {
        this.copyOfData = Array.from(this.data);
        return this.copyOfData;
    }
    
}

module.exports = chat