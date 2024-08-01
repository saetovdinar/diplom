import Timeline from "./Timeline";

const timelineCont = document.querySelector('.timeline_cont');

new Timeline(timelineCont);




const uploadForm = document.querySelector('.upload_file');



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



// const ws = new WebSocket('ws://localhost:7070/ws');
// sendMessage.addEventListener('click', (event) => {
//     const message = input.value;

//     if(!message) return;

//     ws.send(message )


//     input.value = '';
// });
// ws.addEventListener('open', (event) => {
//     console.log(event);

//     console.log('ws open');
// });
// ws.addEventListener('error', (event) => {
//     console.log(event);

//     console.log('ws error');
// });
// ws.addEventListener('close', (event) => {
//     console.log(event);

//     console.log('ws close');
// });
// ws.addEventListener('message', (event) => {
//     const data = JSON.parse(event.data);
//     const {chat: meassages} = data;
//     meassages.forEach((msg) => {
//         timeline.append(msg )
//     })
 
// });

