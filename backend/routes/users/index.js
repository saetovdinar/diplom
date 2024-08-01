const Router = require('koa-router');
const chat = require('../../db/db');

const router = new Router();


router.post('/users', async (ctx) => {
    ctx.response.set('Access-Control-Allow-Origin', '*');
  
    const {login, password} = ctx.request.body;

      if(chat.data.some(user => user.login === login)) {
        
        ctx.response.status = 400;
        ctx.response.body = {status: 'user exists'};
        return;
      }
  
      chat.add({
        login: login, 
        password: password});
  
  
      ctx.response.body =  {status: 'user added'};
  
  });

router.delete('/users/:login', async (ctx) => {

  ctx.response.set('Access-Control-Allow-Origin', '*');
  
  const {login} = ctx.params;

  if(chat.data.some(user => user.login === login)) {
    chat.data = chat.data.filter(user => user.login !== login);
  
    ctx.response.status = 200;
    ctx.response.body = {status: 'user deleted'};
       
    return;
  }
  
    ctx.response.status = 400;
    ctx.response.body = {status: 'user doesnt exists'};
      
});

module.exports = router;