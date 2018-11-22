let Koa = require('koa');
let ROUTER = require('./api');
const app = new Koa();
// 启动koa-router
new ROUTER(app);



// Mysql.insert({ id: 2, user: '王建超', password: 'wangjianchao' }).then(res => {
// 	console.log("插入成功");
// });
// Mysql.delete(1).then(res => {
// 	console.log("删除成功");
// });

app.listen(9999);
