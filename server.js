var AV = require('leanengine');
var config = require('./src/config/config')

AV.init({
  appId: process.env.LEANCLOUD_APP_ID || config.LEANCLOUD_APP_ID ,
  appKey: process.env.LEANCLOUD_APP_KEY || config.LEANCLOUD_APP_KEY
});

// 1
var app = require('./src/app.js');

// 加载云引擎中间件
app.use(AV.koa2());
app.use(AV.Cloud.CookieSession({ framework: 'koa2', secret: 'yijiayipu', maxAge: 3600000, fetchUser: true }));


var PORT = parseInt(process.env.LEANCLOUD_APP_PORT || process.env.PORT || 3000);

app.listen(PORT, function (err) {
  console.log('Node app is running on port:', PORT);

  // 注册全局未捕获异常处理器
  process.on('uncaughtException', function(err) {
    console.error("Caught exception:", err.stack);
  });
  process.on('unhandledRejection', function(reason, p) {
    console.error("Unhandled Rejection at: Promise ", p, " reason: ", reason.stack);
  });
});
