const path = require('path')
const Koa = require('koa');
const serve=require('koa-static');

// 创建一个Koa对象表示web app本身:
const app = new Koa();

const resource=serve(path.join(__dirname));
app.use(resource);

module.exports = app;