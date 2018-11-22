let Koa = require('koa');
let ROUTER = require('./api');
const app = new Koa();
// 启动koa-router
new ROUTER(app);

app.listen(9999);
