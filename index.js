let Mysql = require('./mysql');
let Koa = require('koa');
let ROUTER = require('./api');
const app = new Koa();
// 启动koa-router
const router = new ROUTER(app).router;

router.get('/get/:id', async (ctx, next) => {
	let data = await Mysql.select(ctx.params.id);
	ctx.body = {
		code: 'success',
		data
	};
});

// Mysql.insert({ id: 2, user: '王建超', password: 'wangjianchao' }).then(res => {
// 	console.log("插入成功");
// });
// Mysql.delete(1).then(res => {
// 	console.log("删除成功");
// });

app.listen(9999);
