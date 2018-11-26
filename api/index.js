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
        // 获取全部数据
        this.router.get('/', async (ctx, next) => {
            let data = await Mysql.selectAll(ctx.params.id);
            ctx.body = {
                code: 'success',
                data
            };
        });
        // 注册
        this.router.post('/register', async (ctx, next) => {
            let { user, account, password } = { ...ctx.request.body };
            await Mysql.insert({ user, account, password, time: new Date() }).then(res => {
                ctx.body = {
                    code: 'success',
                    message: '注册成功'
                };
            });
        });
        // 登录
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
            } else {
                ctx.cookies.set('USER', pwd[0].account, {
                    maxAge:1000*60*1
                })
            }
            ctx.body = {
                code,
                message
            };
        });
        // 登出
        this.router.post('/logout', async (ctx, next) => {
            ctx.cookies.set('USER', null);
            ctx.body = {
                code: 'success',
                message: '登出成功'
            };
        });
        // 根据id查询数据
        this.router.get('/get/:id', async (ctx, next) => {
            let USER = ctx.cookies.get('USER');
            if (!USER) {
                ctx.body = {
                    code: 'no-login',
                    message: '用户未登录'
                };
                return;
            }
            let data = await Mysql.select(ctx.params.id);
            ctx.body = {
                code: 'success',
                data
            };
        });
    }
}

module.exports = myRouter;