const Router = require('koa-router');
const chat = require('../../db/db');

const router = new Router();

router.get('/upload/chat', async (ctx) => {
    ctx.response.set('Access-Control-Allow-Origin', '*');
    ctx.response.body = chat.data;
  });


  module.exports = router;