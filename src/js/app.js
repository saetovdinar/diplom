import Chat from "./Chat";


const chatCont = document.querySelector('.chat_cont');

new Chat(chatCont);

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

