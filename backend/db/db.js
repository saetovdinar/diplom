

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
    
    add(message) {
        this.data.push(message);
    },
    
}

module.exports = chat