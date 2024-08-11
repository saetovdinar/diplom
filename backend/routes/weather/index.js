const Router = require('koa-router');
const chat = require('../../db/db');

const router = new Router();


router.get('/weather', async (ctx) => {
    ctx.response.set('Access-Control-Allow-Origin', '*');

    
   
    ctx.response.body =  chat.weather;
  });


module.exports = router;