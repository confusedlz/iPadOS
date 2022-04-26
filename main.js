const path = require('path')
const Koa = require('koa');
const serve=require('koa-static');

// 创建一个Koa对象表示web app本身:
const app = new Koa();
/*app.use(async ctx => {
  console.log('request index.html');
  if (ctx.path === '/index.html') {
    ctx.set("Content-Type", "text/html");
    // ctx.body='./dist/index.html';
    ctx.body = fs.readFileSync(path.join(__dirname, "/dist/index.html"));
  }
  // if (ctx.path === '/bundle.js') {
  //   ctx.set("application/javascript; charset=utf-8");
  //   ctx.body = fs.readFileSync(path.join(__dirname, "/dist/bundle.js"));
  // }
});*/
const resource=serve(path.join(__dirname));
app.use(resource);

module.exports = app;