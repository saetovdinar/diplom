const Router = require('koa-router');
const chat = require('../../db/db');

const router = new Router();


router.post('/chat', async (ctx) => {
    ctx.response.set('Access-Control-Allow-Origin', '*');
  
    const {message} = ctx.request.body;
    chat.add(message);
    ctx.response.body =  chat.data;
  });



module.exports = router;