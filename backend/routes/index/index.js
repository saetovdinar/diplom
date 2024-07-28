const Router = require('koa-router');


const router = new Router();

router.get('/index', async (ctx) => {
    ctx.response.set('Access-Control-Allow-Origin', '*');
    ctx.response.body = 'index';
  });


  module.exports = router;