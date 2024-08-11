

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
        {
            message: '3', 
            type: 'text'
        }, 
        {
            message: '4', 
            type: 'text'
        },
        {
            message: '5', 
            type: 'text'
        }, 
        {
            message: '6', 
            type: 'text'
        }, 
        {
            message: '7', 
            type: 'text'
        },
        {
            message: '8', 
            type: 'text'
        }, 
        {
            message: '9', 
            type: 'text'
        }, 
        {
            message: '10', 
            type: 'text'
        },
        {
            message: '11', 
            type: 'text'
        }, 
        {
            message: '12', 
            type: 'text'
        }, 
        {
            message: '13', 
            type: 'text'
        },
        {
            message: '14', 
            type: 'text'
        }, 
        {
            message: '15', 
            type: 'text'
        }, 
        {
            message: '16', 
            type: 'text'
        },
        {
            message: '17', 
            type: 'text'
        }, 
        {
            message: '18', 
            type: 'text'
        }, 
        {
            message: '19', 
            type: 'text'
        },
        {
            message: '20', 
            type: 'text'
        }, 
    ],
    copied : false,
    weather: ['cold', 'hot', 'normal', 'windy', 'sunny'],
    copyOfData: [],

    
    clearTemporary() {
        this.temporaryStorage = [];
    },

    add(message) {
        this.data.push(message);
        this.copyOfData.push(message)
    },

    lazyLoad() {
        const temporaryStorage =[];
        for(let i= 0; i < 10; i++) {
          
            temporaryStorage.push(...this.copyOfData.splice(-1, 1)) 
        } 
        

        return temporaryStorage;
    },

    copyData() {
        if( this.copied === true) {
            return;
        }
        this.copyOfData = Array.from(this.data);
        this.copied = true;
        
    }
    
}

module.exports = chat