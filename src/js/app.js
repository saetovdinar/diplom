// TODO: write code here
import Timeline from "./Timeline";

const timeline = document.querySelector('.timeline');
const timelineCont = document.querySelector('.timeline_cont');

new Timeline(timelineCont);








const uploadForm = document.querySelector('.upload_file');
const prewiewImg = document.querySelector('.prewiew');

class SubscriptionApi {

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


uploadForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const body = new FormData();
    body.append('login', 'admin');
    body.append('password', '1232');

    const api = new SubscriptionApi('http://localhost:7070/users');
    api.add(body)
    // api.delete({login: 'admin'})

})

// const eventSource = new EventSource('http://localhost:7070/sse');

// eventSource.addEventListener('open', (event) => {
//     console.log(event);

//     console.log('open');
// });
// eventSource.addEventListener('error', (event) => {
//     console.log(event);

//     console.log('error');
// });
// eventSource.addEventListener('message', (event) => {
//     console.log(event);
//     const {login, password} = JSON.parse(event.data);

//     timeline.append(login, password);
//     console.log('message');
// });

const ws = new WebSocket('ws://localhost:7070/ws');

ws.addEventListener('open', (event) => {
    console.log(event);

    console.log('ws open');
});
ws.addEventListener('close', (event) => {
    console.log(event);

    console.log('ws close');
});
ws.addEventListener('message', (event) => {
    console.log(event);

    console.log('ws message');
});

