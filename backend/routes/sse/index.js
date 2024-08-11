const Router = require('koa-router');
const {streamEvents} = require('http-event-stream');
const users = require('../../db/db');
const {v4} = require('uuid');


const router = new Router();

router.get('/sse', async (ctx) => {
    ctx.response.set('Access-Control-Allow-Origin', '*');
    
    streamEvents(ctx.req, ctx.res, {
        async fetch(lastEventId) {
            return [];
        },
        async stream(sse) {
                users.listen((item) => {
                    sse.sendEvent({
                        id: v4(),
                        data: JSON.stringify(item),
                    })
                })

            return () => {};
        }
    });

    ctx.respond = false;

  });


module.exports = router;