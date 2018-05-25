// app.js
const Koa=require('koa');
const bodyParser = require('koa-bodyparser')
const session = require('koa-session');
const koaStatic = require('koa-static');
//const views = require('koa-views');
//const nunjucks = require('nunjucks');
const nunjucks = require('koa-nunjucks-2');

const path = require('path');

const router=require('./config/router');

const app = new Koa();
app.keys = ['yijiayipu'];

// 配置静态资源加载中间件
app.use(koaStatic(path.join(__dirname , '../public'),{ maxage :24*60*60*1000 }));

app.use(bodyParser());

app.use(session({ key: 'koa:sid',}, app));

app.use(nunjucks({ path: path.join(__dirname, 'views') }));

app.use(async(ctx,next)=>{
  console.log(`=======>>>${ctx.method} ${ctx.url}`);
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`===<<<<<<<${ctx.method} ${ctx.url} - ${ms}ms`);
})

app.use(router.routes())



module.exports = app;