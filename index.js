let Mysql = require('./mysql');
let Koa = require('koa');
const app = new Koa();

app.use(async ctx => {
	let data = await Mysql.selectAll();
	let user = await Mysql.select(2);
	ctx.body = {
		data,
		user
	};
});

Mysql.insert({ id: 2, user: '王建超', password: 'wangjianchao' }).then(res => {
	console.log("插入成功");
});
Mysql.delete(1).then(res => {
	console.log("删除成功");
});

app.listen(9999);
