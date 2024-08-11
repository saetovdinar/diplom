const Router = require('koa-router');
const chat = require('../../db/db');

const router = new Router();

router.get('/upload/chat', async (ctx) => {
    ctx.response.set('Access-Control-Allow-Origin', '*');
    chat.copyData();

    const temporary = chat.lazyLoad();

    
    ctx.response.body = temporary;
  });


  module.exports = router;