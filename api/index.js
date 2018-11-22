let Router = require('koa-router');
let Mysql = require('../mysql');
class myRouter {
    constructor(app) {
        this.app = app;
        this.router = this.init();
        this.initPlugin();
        this.initApi();
    }
    init() {
        return new Router({
            prefix: '/wjc'
        })
    }
    initPlugin() {
        this.app.use(this.router.routes()).use(this.router.allowedMethods());
    }
    initApi() {
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