const combineRouters = require('koa-combine-routers');

const users = require('./users');
const wheather = require('./weather');
const sse = require('./sse');
const index = require('./upload_chat/index.js');

const router = combineRouters(
    users, 
    index,
    sse,
    wheather,
);

module.exports = router;