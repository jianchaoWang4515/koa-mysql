let Router = require('koa-router');


class myRouter {
    constructor(app) {
        this.app = app;
        this.router = this.init();
        this.initPlugin();
    }
    init() {
        return new Router({
            prefix: '/wjc'
        })
    }
    initPlugin() {
        this.app.use(this.router.routes()).use(this.router.allowedMethods());
    }
}

module.exports = myRouter;