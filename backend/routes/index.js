const combineRouters = require('koa-combine-routers');

const users = require('./users');
const sse = require('./sse');
const index = require('./upload_chat/index.js');

const router = combineRouters(
    users, 
    index,
    sse,
);

module.exports = router;