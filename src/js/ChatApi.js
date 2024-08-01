export default class ChatApi {

    constructor(apiUrl) {
        this.apiUrl = apiUrl;
    }

    async add(user) {
        const request = await fetch(this.apiUrl, {
            method: 'POST',
            body: user
        })
        const response = await request.json();

        return response.status;
    }
    async delete(user) {
        const request = await fetch(this.apiUrl + '/' + user.login , {
            method: 'DELETE',
           
        })
        const response = await request.json();

        return response.status;
    }
}
