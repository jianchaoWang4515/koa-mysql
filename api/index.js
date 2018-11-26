let Router = require('koa-router');
let koaBody = require('koa-body');
let Mysql = require('../mysql');
class myRouter {
    constructor(app) {
        this.app = app;
        this.router = this.init();
        this.initPlugin();
        this.initApi();
    }
    init() {
        return new Router();
    }
    initPlugin() {
        this.app.use(koaBody()) // ctx.request.body可以获取到Content-Type: application/json;charset=UTF-8 前台到JSON数据
            .use(this.router.routes())
            .use(this.router.allowedMethods());
    }
    initApi() {
        this.router.get('/', async (ctx, next) => {
            let data = await Mysql.selectAll(ctx.params.id);
            ctx.body = {
                code: 'success',
                data
            };
        });
        this.router.post('/register', async (ctx, next) => {
            let { user, account, password } = { ...ctx.request.body };
            await Mysql.insert({ user, account, password, time: new Date() }).then(res => {
                ctx.body = {
                    code: 'success',
                    message: '注册成功'
                };
            });
        });
        this.router.post('/login', async (ctx, next) => {
            let { account, password } = { ...ctx.request.body };
            let pwd = await Mysql.select(account);
            if (!pwd.length) {
                ctx.body = {
                    code: 'error',
                    message: '帐号不存在'
                };
                return;
            };
            let message = '登录成功';
            let code = 'success';
            if (password !== pwd[0].password) {
                message = '帐号或密码错误';
                code = 'error';
            }
            ctx.body = {
                code,
                message
            };
        });
        this.router.get('/get/:id', async (ctx, next) => {
            let data = await Mysql.select(ctx.params.id);
            ctx.body = {
                code: 'success',
                data
            };
        });
    }
}

module.exports = myRouter;