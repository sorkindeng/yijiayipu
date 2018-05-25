
const config_default = {
  LEANCLOUD_APP_ID : 'aaa' ,
  LEANCLOUD_APP_KEY : '123' ,
}

// 自启动匿名函数
module.exports = (function(){
  var config = config_default;
  var config_env;
  //  production/development
  try{
    if( process.env.NODE_ENV === 'production' ){
      config_env = require('./cfg.production.js');
      config.is_production = true;
    }else{
      config_env = require('./cfg.development.js');
      config.is_development = true;
    } 
  }catch(err){
    console.log('根据环境设置读取配置出错，请检查环境设置或者配置文件。')
  }
  Object.assign(config, config_env);
  console.log(config);
  return config;
})();