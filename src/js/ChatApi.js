export default class ChatApi {

    constructor(apiUrl) {
        this.apiUrl = apiUrl;
    }

    async getChat() {
        const request = await fetch(this.apiUrl + '/upload/chat')
        const response = await request.json();

        return response;
    }

    async add(message) {
        const request = await fetch(this.apiUrl + '/chat', {
            method: 'POST',
            body: message
        })
        const response = await request.json();

        return response;
    }

    async getWeather() {
        const request = await fetch(this.apiUrl + '/weather')
        const response = await request.json();
      
        return  response;
    }

  
  
}
