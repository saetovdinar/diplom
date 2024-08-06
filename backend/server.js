const koaBody = require('koa-body');
const http = require('http');
const Koa = require('koa');
const koaStatic = require('koa-static');
const path = require('path');
const WS = require('ws');
const router = require('./routes');
const fs = require('fs');
const uuid = require('uuid');

const app = new Koa();


const publicPath = path.join(__dirname, 'public');

app.use(koaStatic(publicPath));  

app.use(koaBody({ 
    urlencoded: true,
    multipart: true,
  }));


app.use(async (ctx, next) => {
  
  if(ctx.request.method !== 'OPTIONS') {
    

    next();

    return;
  }
  ctx.response.set('Access-Control-Allow-Origin', '*');
  
  ctx.response.set('Access-Control-Allow-Methods', 'DELETE, GET, PATCH, POST, PUT');

  ctx.response.status = 200;

  
 
});

// app.use(async (ctx, next) => {

//   if(ctx.request.method !== 'POST' && ctx.request.url !== '/upload') {
  

//     next();

//     return;
//   }
//   ctx.response.set('Access-Control-Allow-Origin', '*');

//   let fileName;


//   try {
//     const public = path.join(__dirname, 'public');

//     const { file } = ctx.request.files;
//     console.log(file);
//     const subFolder = uuid.v4();

//     fs.mkdirSync(public + '/' + subFolder);

//     fs.copyFileSync(file.path, public + '/' + subFolder +'/' + file.name);

//     fileName = subFolder+ '/' + file.name;
//   } catch (err) {


//     console.log(err);

//     ctx.response.status = 500;

//     return;
//   }

  

//   ctx.response.body = fileName;
// });



app.use(router());





const port = process.env.PORT || 7070;
const server = http.createServer(app.callback())
// const wsServer = new WS.Server({ server });



// wsServer.on('connection', (ws, req) => {
//   ws.on('message', message => {
//     chat.push(message)

//     Array.from(wsServer.clients)
//     .filter(client => client.readyState === WS.OPEN)
//     .forEach(client => client.send(JSON.stringify({chat: [message]})));
//   });

// });




server.listen(port);
