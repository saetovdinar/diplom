export default class ChatApi {

    constructor(apiUrl) {
        this.apiUrl = apiUrl;
    }

    async add(message) {
        const request = await fetch(this.apiUrl, {
            method: 'POST',
            body: message
        })
        const response = await request.json();

        return response;
    }
    // async delete(user) {
    //     const request = await fetch(this.apiUrl + '/' + user.login , {
    //         method: 'DELETE',
           
    //     })
    //     const response = await request.json();

    //     return response.status;
    // }
}
