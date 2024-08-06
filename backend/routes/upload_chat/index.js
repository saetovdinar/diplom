const Router = require('koa-router');
const chat = require('../../db/db');

const router = new Router();

router.get('/upload/chat', async (ctx) => {
    ctx.response.set('Access-Control-Allow-Origin', '*');
    chat.copyData();
    console.log(chat.copyOfData)
    const temporary = chat.lazyLoad();
    console.log(temporary)
    
    ctx.response.body = temporary;
  });


  module.exports = router;