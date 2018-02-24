var Koa=require('koa');

var router=require('./router');

var app=new Koa();
app.keys = ['yijiayipu'];

app.use(router.routes())


// 监听在3000端口
app.listen(3000, ()=>{
  console.log('[yijiayipu]The server is starting at port 3000');
});